import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";
import { insertNewsSchema, insertNewsUpdateSchema, insertContactSchema, adminUsers } from "@shared/schema";
import { AuthService } from "./lib/auth";
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

// Admin authentication middleware
const isAdminAuthenticated = async (req: any, res: any, next: any) => {
  try {
    const adminUserId = req.session?.adminUserId;
    if (!adminUserId) {
      return res.status(401).json({ message: 'Admin authentication required' });
    }
    
    const adminUser = await storage.getAdminUser(adminUserId);
    if (!adminUser || !adminUser.isActive) {
      return res.status(401).json({ message: 'Admin user not found or inactive' });
    }
    
    req.adminUser = adminUser;
    next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({ message: 'Authentication error' });
  }
};

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

  // Admin Auth Routes
  app.post('/api/admin/auth/register', async (req, res) => {
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
        role: 'admin', // Server-enforced, cannot be overridden by client
        isActive: true // Server-enforced, cannot be overridden by client
      });
      
      // Create corresponding user record for CMS authoring
      const cmsUser = await storage.upsertUser({
        id: adminUser.id, // Use same ID to link admin and CMS user
        email: normalizedEmail,
        firstName: normalizedUsername,
        lastName: 'Admin'
      });
      
      // Create session with both admin and CMS user IDs
      req.session.adminUserId = adminUser.id;
      req.session.authorUserId = cmsUser.id;
      
      res.json(AuthService.sanitizeAdminUser(adminUser));
    } catch (error) {
      console.error('Admin registration error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Registration failed' });
    }
  });

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
      req.session.adminUserId = adminUser.id;
      req.session.authorUserId = cmsUser.id;
      
      res.json(AuthService.sanitizeAdminUser(adminUser));
    } catch (error) {
      console.error('Admin login error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Login failed' });
    }
  });

  app.post('/api/admin/auth/logout', isAdminAuthenticated, async (req: any, res) => {
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

  app.get('/api/admin/auth/me', isAdminAuthenticated, async (req: any, res) => {
    try {
      res.json(AuthService.sanitizeAdminUser(req.adminUser));
    } catch (error) {
      console.error('Admin me error:', error);
      res.status(500).json({ message: 'Failed to fetch user info' });
    }
  });

  // Public API Routes

  // Get published news for frontend
  app.get('/api/news', async (req, res) => {
    try {
      const news = await storage.getPublishedNews();
      res.json(news);
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

  // News management
  app.get('/api/admin/news', isAdminAuthenticated, async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.post('/api/admin/news', isAdminAuthenticated, async (req: any, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const authorId = req.session.authorUserId;
      const news = await storage.createNews({ ...newsData, authorId });
      res.json(news);
    } catch (error) {
      console.error("Error creating news:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create news" });
    }
  });

  app.put('/api/admin/news/:id', isAdminAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const newsData = insertNewsSchema.partial().parse(req.body);
      const news = await storage.updateNews(id, newsData);
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

  app.delete('/api/admin/news/:id', isAdminAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteNews(id);
      res.json({ message: "News deleted" });
    } catch (error) {
      console.error("Error deleting news:", error);
      res.status(500).json({ message: "Failed to delete news" });
    }
  });

  // News updates management
  app.get('/api/admin/news/:newsId/updates', isAdminAuthenticated, async (req, res) => {
    try {
      const { newsId } = req.params;
      const updates = await storage.getNewsUpdates(newsId);
      res.json(updates);
    } catch (error) {
      console.error("Error fetching news updates:", error);
      res.status(500).json({ message: "Failed to fetch news updates" });
    }
  });

  app.post('/api/admin/news/:newsId/updates', isAdminAuthenticated, async (req: any, res) => {
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

  app.put('/api/admin/news/updates/:id', isAdminAuthenticated, async (req: any, res) => {
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

  app.delete('/api/admin/news/updates/:id', isAdminAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteNewsUpdate(id);
      res.json({ message: "News update deleted" });
    } catch (error) {
      console.error("Error deleting news update:", error);
      res.status(500).json({ message: "Failed to delete news update" });
    }
  });

  // Contact management
  app.get('/api/admin/contacts', isAdminAuthenticated, async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.put('/api/admin/contacts/:id/status', isAdminAuthenticated, async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
