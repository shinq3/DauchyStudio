import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";
import { insertNewsSchema, insertNewsUpdateSchema, insertNewsTranslationSchema, insertRssSourceSchema, insertContactSchema, adminUsers, insertAdminUserSchema, updateAdminUserSchema, changePasswordSchema } from "@shared/schema";
import { AuthService, isAdminAuthenticated as isAdminAuth, requireSuperadmin, requirePermission, allowSelfOrSuperadmin, protectLastSuperadmin } from "./lib/auth";
import { createInsertSchema } from "drizzle-zod";

// Admin auth schemas
const adminRegisterSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8)
});

const adminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

// Use shared admin authentication middleware from lib/auth.ts

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Admin Auth Routes - First superadmin bootstrap or existing superadmin-only  
  app.post('/api/admin/auth/register', async (req, res) => {
    try {
      // Check if this is first superadmin (bootstrap)
      const superadminCount = await storage.countAdminsByRole('superadmin');
      
      // If superadmins exist, require authentication
      if (superadminCount > 0) {
        return isAdminAuth(req, res, () => {
          return requireSuperadmin(req, res, async () => {
            return await registerAdminUser(req, res);
          });
        });
      }
      
      // Allow first superadmin creation without authentication
      return await registerAdminUser(req, res, true);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });

  // Helper function for admin user registration
  async function registerAdminUser(req: any, res: any, isFirstSuperadmin = false) {
    try {
      const userData = adminRegisterSchema.parse(req.body);
      
      // Normalize and validate inputs
      const normalizedUsername = userData.username.trim().toLowerCase();
      const normalizedEmail = userData.email.trim().toLowerCase();
      
      if (!AuthService.isValidUsername(normalizedUsername)) {
        return res.status(400).json({ message: 'Invalid username format' });
      }
      
      if (!AuthService.isValidEmail(normalizedEmail)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      
      // Check if username or email already exists
      const existingUsername = await storage.getAdminUserByUsername(normalizedUsername);
      if (existingUsername) {
        return res.status(409).json({ message: 'Username already exists' });
      }
      
      const existingEmail = await storage.getAdminUserByEmail(normalizedEmail);
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      
      // Validate password strength
      const passwordValidation = AuthService.isValidPassword(userData.password);
      if (!passwordValidation.valid) {
        return res.status(400).json({ message: passwordValidation.message });
      }
      
      // Hash password and create user with server-enforced defaults
      const passwordHash = await AuthService.hashPassword(userData.password);
      
      const adminUser = await storage.createAdminUser({
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash,
        role: isFirstSuperadmin ? 'superadmin' : 'admin', // First user becomes superadmin
        permissions: isFirstSuperadmin ? ["view_admin_dashboard", "manage_news", "manage_contacts", "manage_users", "manage_admin_users", "manage_uploads", "view_analytics", "system_configuration", "user_impersonation", "delete_content", "manage_permissions"] : [],
        departmentAccess: isFirstSuperadmin ? ["news_management", "user_management", "contact_management", "content_management", "analytics_dashboard", "system_settings", "security_management"] : [],
        isActive: true
      });
      
      // Create corresponding user record for CMS authoring
      const cmsUser = await storage.upsertUser({
        id: adminUser.id, // Use same ID to link admin and CMS user
        email: normalizedEmail,
        firstName: normalizedUsername,
        lastName: 'Admin'
      });
      
      // Create session only if user logged in (not for bootstrap)
      if (!isFirstSuperadmin) {
        (req.session as any).adminUserId = adminUser.id;
        (req.session as any).authorUserId = cmsUser.id;
      }
      
      res.json({ 
        ...AuthService.sanitizeAdminUser(adminUser),
        message: isFirstSuperadmin ? 'First superadmin created successfully. Please log in.' : 'Admin user created successfully'
      });
    } catch (error) {
      console.error('Admin registration error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Registration failed' });
    }
  }

  app.post('/api/admin/auth/login', async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      
      // Normalize username to match registration
      const normalizedUsername = username.trim().toLowerCase();
      
      // Find user by username
      const adminUser = await storage.getAdminUserByUsername(normalizedUsername);
      if (!adminUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Check if user is active
      if (!adminUser.isActive) {
        return res.status(401).json({ message: 'Account is deactivated' });
      }
      
      // Verify password
      const passwordValid = await AuthService.verifyPassword(password, adminUser.passwordHash);
      if (!passwordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Update last login time
      await storage.updateAdminUserLoginTime(adminUser.id);
      
      // Create or update corresponding user record for CMS authoring
      const cmsUser = await storage.upsertUser({
        id: adminUser.id, // Use same ID to link admin and CMS user
        email: adminUser.email,
        firstName: adminUser.username,
        lastName: 'Admin'
      });
      
      // Create session with both admin and CMS user IDs
      (req.session as any).adminUserId = adminUser.id;
      (req.session as any).authorUserId = cmsUser.id;
      
      res.json(AuthService.sanitizeAdminUser(adminUser));
    } catch (error) {
      console.error('Admin login error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Login failed' });
    }
  });

  app.post('/api/admin/auth/logout', isAdminAuth, async (req: any, res) => {
    try {
      req.session.destroy((err: any) => {
        if (err) {
          console.error('Session destroy error:', err);
          return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
      });
    } catch (error) {
      console.error('Admin logout error:', error);
      res.status(500).json({ message: 'Logout failed' });
    }
  });

  app.get('/api/admin/auth/me', isAdminAuth, async (req: any, res) => {
    try {
      res.json(AuthService.sanitizeAdminUser(req.currentAdmin));
    } catch (error) {
      console.error('Admin me error:', error);
      res.status(500).json({ message: 'Failed to fetch user info' });
    }
  });

  // Public API Routes

  // Get published news for frontend with translations
  app.get('/api/news', async (req, res) => {
    try {
      const locale = (req.query.locale as string) || 'ja';
      const allNews = await storage.getPublishedNews();
      
      // Fetch translations for each news item
      const newsWithTranslations = await Promise.all(
        allNews.map(async (newsItem) => {
          const translation = await storage.getNewsTranslation(newsItem.id, locale);
          
          // Filter out AI error messages from excerpt
          let summary = '';
          const excerpt = translation?.excerpt || newsItem.excerpt || '';
          if (excerpt && !excerpt.includes('Please provide')) {
            summary = excerpt;
          } else {
            // Fall back to AI summary if excerpt has error messages
            const aiSummary = translation?.aiSummary || '';
            summary = aiSummary && !aiSummary.includes('Please provide') ? aiSummary : '';
          }
          
          return {
            id: newsItem.id,
            title: translation?.title || newsItem.title || '',
            summary,
            content: translation?.content || newsItem.content || '',
            thumbnail: newsItem.featuredImage || '',
            publishedAt: newsItem.publishedAt?.toISOString() || new Date().toISOString(),
            category: newsItem.category || 'technology',
            tags: newsItem.tags || [],
            source: newsItem.sourceAttribution || 'D\'auchy.Studio',
            sourceUrl: newsItem.sourceUrl || '',
            isExternal: !!newsItem.sourceUrl,
            status: newsItem.status
          };
        })
      );
      
      res.json(newsWithTranslations);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  // Submit contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact" });
    }
  });

  // Protected CMS Routes (Admin only)

  // User Management API
  // List all admin users (superadmin only)
  app.get('/api/admin/users', isAdminAuth, requireSuperadmin, async (req, res) => {
    try {
      const users = await storage.getAllAdminUsers();
      const sanitizedUsers = users.map(user => AuthService.sanitizeAdminUser(user));
      res.json(sanitizedUsers);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  });

  // Create new admin user (superadmin only)
  app.post('/api/admin/users', isAdminAuth, requireSuperadmin, async (req, res) => {
    try {
      const userData = insertAdminUserSchema.parse(req.body);
      
      // Normalize inputs
      const normalizedUsername = userData.username.trim().toLowerCase();
      const normalizedEmail = userData.email.trim().toLowerCase();
      
      // Check for existing users
      const existingUsername = await storage.getAdminUserByUsername(normalizedUsername);
      if (existingUsername) {
        return res.status(409).json({ message: 'Username already exists' });
      }
      
      const existingEmail = await storage.getAdminUserByEmail(normalizedEmail);
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      
      // Validate password
      const passwordValidation = AuthService.isValidPassword(userData.password);
      if (!passwordValidation.valid) {
        return res.status(400).json({ message: passwordValidation.message });
      }
      
      // Hash password and create user
      const passwordHash = await AuthService.hashPassword(userData.password);
      
      const adminUser = await storage.createAdminUser({
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash,
        role: userData.role || 'admin',
        permissions: userData.permissions || [],
        departmentAccess: userData.departmentAccess || [],
        isActive: userData.isActive !== false
      });
      
      // Create corresponding CMS user
      await storage.upsertUser({
        id: adminUser.id,
        email: normalizedEmail,
        firstName: normalizedUsername,
        lastName: 'Admin'
      });
      
      res.json(AuthService.sanitizeAdminUser(adminUser));
    } catch (error) {
      console.error('Error creating admin user:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create user' });
    }
  });

  // Update admin user (superadmin only or self)
  app.put('/api/admin/users/:id', isAdminAuth, allowSelfOrSuperadmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = updateAdminUserSchema.parse(req.body);
      
      const targetUser = await storage.getAdminUser(id);
      if (!targetUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Only superadmin can change role and permissions
      const currentAdmin = (req as any).currentAdmin;
      if (currentAdmin.role !== 'superadmin') {
        delete updateData.role;
        delete updateData.permissions;
        delete updateData.departmentAccess;
        delete updateData.isActive;
      }
      
      // Prevent demoting last superadmin
      if (updateData.role && targetUser.role === 'superadmin' && updateData.role !== 'superadmin') {
        const superadminCount = await storage.countAdminsByRole('superadmin');
        if (superadminCount <= 1) {
          return res.status(403).json({ message: 'Cannot demote the last superadmin' });
        }
      }
      
      const updatedUser = await storage.updateAdminUser(id, updateData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(AuthService.sanitizeAdminUser(updatedUser));
    } catch (error) {
      console.error('Error updating admin user:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update user' });
    }
  });

  // Delete admin user (superadmin only, with protection)
  app.delete('/api/admin/users/:id', isAdminAuth, requireSuperadmin, protectLastSuperadmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      const currentAdmin = (req as any).currentAdmin;
      if (currentAdmin.id === id) {
        return res.status(403).json({ message: 'Cannot delete your own account' });
      }
      
      await storage.deleteAdminUser(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting admin user:', error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  });

  // Change password (self or superadmin resetting others)
  app.patch('/api/admin/users/:id/password', isAdminAuth, allowSelfOrSuperadmin, async (req, res) => {
    try {
      const { id } = req.params;
      const passwordData = changePasswordSchema.parse(req.body);
      
      const currentAdmin = (req as any).currentAdmin;
      const targetUser = await storage.getAdminUser(id);
      
      if (!targetUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // If changing own password, verify current password
      if (currentAdmin.id === id && passwordData.currentPassword) {
        const isCurrentPasswordValid = await AuthService.verifyPassword(
          passwordData.currentPassword, 
          targetUser.passwordHash
        );
        if (!isCurrentPasswordValid) {
          return res.status(400).json({ message: 'Current password is incorrect' });
        }
      }
      
      // Validate new password
      const passwordValidation = AuthService.isValidPassword(passwordData.newPassword);
      if (!passwordValidation.valid) {
        return res.status(400).json({ message: passwordValidation.message });
      }
      
      // Hash and update password
      const newPasswordHash = await AuthService.hashPassword(passwordData.newPassword);
      await storage.setAdminPassword(id, newPasswordHash);
      
      // If changing own password, destroy current session to force re-login
      if (currentAdmin.id === id) {
        req.session.destroy(() => {});
      }
      
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to change password' });
    }
  });

  // News management
  app.get('/api/admin/news', isAdminAuth, async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.post('/api/admin/news', isAdminAuth, async (req: any, res) => {
    try {
      const { publishedAt, ...restData } = req.body;
      const newsData = insertNewsSchema.omit({ authorId: true, publishedAt: true }).parse(restData);
      const authorId = req.currentAdmin?.id;
      
      if (!authorId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const news = await storage.createNews({ 
        ...newsData, 
        authorId,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined
      });
      res.json(news);
    } catch (error) {
      console.error("Error creating news:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create news" });
    }
  });

  app.put('/api/admin/news/:id', isAdminAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      
      // Manually extract and transform fields
      const updateData: any = {};
      
      if (body.title !== undefined) updateData.title = body.title;
      if (body.slug !== undefined) updateData.slug = body.slug;
      if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
      if (body.content !== undefined) updateData.content = body.content;
      if (body.category !== undefined) updateData.category = body.category;
      if (body.tags !== undefined) updateData.tags = body.tags;
      if (body.featuredImage !== undefined) updateData.featuredImage = body.featuredImage;
      if (body.isExternal !== undefined) updateData.isExternal = body.isExternal;
      if (body.externalUrl !== undefined) updateData.externalUrl = body.externalUrl;
      if (body.sourceUrl !== undefined) updateData.sourceUrl = body.sourceUrl;
      if (body.sourceAttribution !== undefined) updateData.sourceAttribution = body.sourceAttribution;
      if (body.originalPublishedAt !== undefined) updateData.originalPublishedAt = body.originalPublishedAt ? new Date(body.originalPublishedAt) : null;
      if (body.status !== undefined) updateData.status = body.status;
      if (body.publishedAt !== undefined) updateData.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
      
      const news = await storage.updateNews(id, updateData);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      res.json(news);
    } catch (error) {
      console.error("Error updating news:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update news" });
    }
  });

  app.delete('/api/admin/news/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteNews(id);
      res.json({ message: "News deleted" });
    } catch (error) {
      console.error("Error deleting news:", error);
      res.status(500).json({ message: "Failed to delete news" });
    }
  });

  // Generate AI content for existing news
  app.post('/api/admin/news/:id/generate-content', isAdminAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { generateImage } = req.body;
      
      const { generateContentForExistingNews } = await import('./lib/aiNewsGenerator.js');
      
      const result = await generateContentForExistingNews({
        newsId: id,
        generateImage: generateImage || false,
        targetLanguages: ['ja', 'en', 'vi'],
      });

      if (result.success) {
        res.json({ 
          message: "AI content generated successfully", 
          newsId: result.newsId,
          jobCount: result.jobIds.length 
        });
      } else {
        res.status(500).json({ message: result.error || "Failed to generate content" });
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
      res.status(500).json({ message: "Failed to generate AI content" });
    }
  });

  // News updates management
  app.get('/api/admin/news/:newsId/updates', isAdminAuth, async (req, res) => {
    try {
      const { newsId } = req.params;
      const updates = await storage.getNewsUpdates(newsId);
      res.json(updates);
    } catch (error) {
      console.error("Error fetching news updates:", error);
      res.status(500).json({ message: "Failed to fetch news updates" });
    }
  });

  app.post('/api/admin/news/:newsId/updates', isAdminAuth, async (req: any, res) => {
    try {
      const { newsId } = req.params;
      const updateData = insertNewsUpdateSchema.parse({ ...req.body, newsId });
      const authorId = req.session.authorUserId;
      const update = await storage.createNewsUpdate({ ...updateData, authorId });
      res.json(update);
    } catch (error) {
      console.error("Error creating news update:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create news update" });
    }
  });

  app.put('/api/admin/news/updates/:id', isAdminAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const updateData = insertNewsUpdateSchema.partial().parse(req.body);
      const update = await storage.updateNewsUpdate(id, updateData);
      if (!update) {
        return res.status(404).json({ message: "News update not found" });
      }
      res.json(update);
    } catch (error) {
      console.error("Error updating news update:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update news update" });
    }
  });

  app.delete('/api/admin/news/updates/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteNewsUpdate(id);
      res.json({ message: "News update deleted" });
    } catch (error) {
      console.error("Error deleting news update:", error);
      res.status(500).json({ message: "Failed to delete news update" });
    }
  });

  // News translations management
  app.get('/api/admin/news/:newsId/translations', isAdminAuth, async (req, res) => {
    try {
      const { newsId } = req.params;
      const translations = await storage.getNewsTranslations(newsId);
      res.json(translations);
    } catch (error) {
      console.error("Error fetching news translations:", error);
      res.status(500).json({ message: "Failed to fetch news translations" });
    }
  });

  app.get('/api/admin/news/:newsId/translations/:locale', isAdminAuth, async (req, res) => {
    try {
      const { newsId, locale } = req.params;
      const translation = await storage.getNewsTranslation(newsId, locale);
      if (!translation) {
        return res.status(404).json({ message: "Translation not found" });
      }
      res.json(translation);
    } catch (error) {
      console.error("Error fetching news translation:", error);
      res.status(500).json({ message: "Failed to fetch news translation" });
    }
  });

  app.post('/api/admin/news/:newsId/translations', isAdminAuth, async (req, res) => {
    try {
      const { newsId } = req.params;
      const translationData = insertNewsTranslationSchema.parse({ ...req.body, newsId });
      const translation = await storage.createNewsTranslation(translationData);
      res.json(translation);
    } catch (error) {
      console.error("Error creating news translation:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create news translation" });
    }
  });

  app.put('/api/admin/news/translations/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const translationData = insertNewsTranslationSchema.partial().parse(req.body);
      const translation = await storage.updateNewsTranslation(id, translationData);
      if (!translation) {
        return res.status(404).json({ message: "Translation not found" });
      }
      res.json(translation);
    } catch (error) {
      console.error("Error updating news translation:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update news translation" });
    }
  });

  app.delete('/api/admin/news/translations/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteNewsTranslation(id);
      res.json({ message: "Translation deleted" });
    } catch (error) {
      console.error("Error deleting news translation:", error);
      res.status(500).json({ message: "Failed to delete news translation" });
    }
  });

  // RSS sources management
  app.get('/api/admin/rss/sources', isAdminAuth, async (req, res) => {
    try {
      const sources = await storage.getAllRssSources();
      res.json(sources);
    } catch (error) {
      console.error("Error fetching RSS sources:", error);
      res.status(500).json({ message: "Failed to fetch RSS sources" });
    }
  });

  app.post('/api/admin/rss/poll-now', isAdminAuth, async (req, res) => {
    try {
      const { pollAllActiveRssFeeds } = await import('./lib/rssPoller');
      await pollAllActiveRssFeeds();
      res.json({ message: "RSS polling triggered successfully" });
    } catch (error) {
      console.error("Error triggering RSS poll:", error);
      res.status(500).json({ message: "Failed to trigger RSS polling" });
    }
  });

  app.post('/api/admin/rss/sources', isAdminAuth, async (req, res) => {
    try {
      const sourceData = insertRssSourceSchema.parse(req.body);
      const source = await storage.createRssSource(sourceData);
      res.json(source);
    } catch (error) {
      console.error("Error creating RSS source:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create RSS source" });
    }
  });

  app.put('/api/admin/rss/sources/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const sourceData = insertRssSourceSchema.partial().parse(req.body);
      const source = await storage.updateRssSource(id, sourceData);
      if (!source) {
        return res.status(404).json({ message: "RSS source not found" });
      }
      res.json(source);
    } catch (error) {
      console.error("Error updating RSS source:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update RSS source" });
    }
  });

  app.delete('/api/admin/rss/sources/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteRssSource(id);
      res.json({ message: "RSS source deleted" });
    } catch (error) {
      console.error("Error deleting RSS source:", error);
      res.status(500).json({ message: "Failed to delete RSS source" });
    }
  });

  // RSS import queue management
  app.get('/api/admin/rss/queue', isAdminAuth, async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const queueItems = await storage.getRssImportQueue(status);
      res.json(queueItems);
    } catch (error) {
      console.error("Error fetching RSS import queue:", error);
      res.status(500).json({ message: "Failed to fetch RSS import queue" });
    }
  });

  app.post('/api/admin/rss/queue/:id/approve', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const existingItem = await storage.getRssImportQueueItem(id);
      
      if (!existingItem) {
        return res.status(404).json({ message: "Queue item not found" });
      }
      
      if (existingItem.processingState !== 'pending') {
        return res.status(400).json({ message: "Only pending items can be approved" });
      }
      
      const item = await storage.updateRssImportQueueItem(id, {
        processingState: 'approved',
        processedByAdminId: req.currentAdmin?.id,
        updatedAt: new Date(),
      });
      res.json(item);
    } catch (error) {
      console.error("Error approving queue item:", error);
      res.status(500).json({ message: "Failed to approve queue item" });
    }
  });

  app.post('/api/admin/rss/queue/:id/reject', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const existingItem = await storage.getRssImportQueueItem(id);
      
      if (!existingItem) {
        return res.status(404).json({ message: "Queue item not found" });
      }
      
      if (existingItem.processingState !== 'pending') {
        return res.status(400).json({ message: "Only pending items can be rejected" });
      }
      
      const item = await storage.updateRssImportQueueItem(id, {
        processingState: 'rejected',
        processedByAdminId: req.currentAdmin?.id,
        updatedAt: new Date(),
      });
      res.json(item);
    } catch (error) {
      console.error("Error rejecting queue item:", error);
      res.status(500).json({ message: "Failed to reject queue item" });
    }
  });

  // AI Generation Routes
  app.post('/api/admin/ai/generate-from-queue/:id', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { generateImage = false, targetLanguages = ['ja', 'en', 'vi'] } = req.body;
      const adminId = req.currentAdmin?.id;

      if (!adminId) {
        return res.status(401).json({ message: "Admin authentication required" });
      }

      const { generateNewsFromQueue } = await import('./lib/aiNewsGenerator.js');

      const result = await generateNewsFromQueue({
        queueItemId: id,
        adminId,
        generateImage,
        targetLanguages,
      });

      if (!result.success) {
        return res.status(400).json({ message: result.error || 'Failed to generate news' });
      }

      res.json(result);
    } catch (error: any) {
      console.error("Error generating news from queue:", error);
      res.status(500).json({ message: error.message || "Failed to generate news from queue" });
    }
  });

  app.get('/api/admin/ai/jobs/:newsId', isAdminAuth, async (req, res) => {
    try {
      const { newsId } = req.params;
      const jobs = await storage.getAiGenerationJobsByNewsId(newsId);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching AI jobs:", error);
      res.status(500).json({ message: "Failed to fetch AI jobs" });
    }
  });

  // Contact management
  app.get('/api/admin/contacts', isAdminAuth, async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.put('/api/admin/contacts/:id/status', isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const contact = await storage.updateContactStatus(id, status);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      console.error("Error updating contact status:", error);
      res.status(500).json({ message: "Failed to update contact status" });
    }
  });

  // Object Storage routes - for serving uploaded images
  app.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      const { ObjectStorageService, ObjectNotFoundError } = await import('./objectStorage');
      const objectStorageService = new ObjectStorageService();
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      await objectStorageService.downloadObject(objectFile, res);
    } catch (error: any) {
      if (error?.name === 'ObjectNotFoundError') {
        return res.sendStatus(404);
      }
      console.error("Error serving object:", error);
      return res.sendStatus(500);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
