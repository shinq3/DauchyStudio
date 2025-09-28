import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";
import { insertNewsSchema, insertNewsUpdateSchema, insertContactSchema } from "@shared/schema";

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
  app.get('/api/admin/news', isAuthenticated, async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.post('/api/admin/news', isAuthenticated, async (req: any, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const authorId = req.user.claims.sub;
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

  app.put('/api/admin/news/:id', isAuthenticated, async (req: any, res) => {
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

  app.delete('/api/admin/news/:id', isAuthenticated, async (req, res) => {
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
  app.get('/api/admin/news/:newsId/updates', isAuthenticated, async (req, res) => {
    try {
      const { newsId } = req.params;
      const updates = await storage.getNewsUpdates(newsId);
      res.json(updates);
    } catch (error) {
      console.error("Error fetching news updates:", error);
      res.status(500).json({ message: "Failed to fetch news updates" });
    }
  });

  app.post('/api/admin/news/:newsId/updates', isAuthenticated, async (req: any, res) => {
    try {
      const { newsId } = req.params;
      const updateData = insertNewsUpdateSchema.parse({ ...req.body, newsId });
      const authorId = req.user.claims.sub;
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

  app.put('/api/admin/news/updates/:id', isAuthenticated, async (req: any, res) => {
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

  app.delete('/api/admin/news/updates/:id', isAuthenticated, async (req, res) => {
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
  app.get('/api/admin/contacts', isAuthenticated, async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.put('/api/admin/contacts/:id/status', isAuthenticated, async (req, res) => {
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
