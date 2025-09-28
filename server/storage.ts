import { 
  users, 
  adminUsers,
  news, 
  newsUpdates,
  contacts,
  uploads,
  type User, 
  type UpsertUser,
  type AdminUser,
  type InsertAdminUser,
  type News, 
  type InsertNews,
  type NewsUpdate,
  type InsertNewsUpdate,
  type Contact,
  type InsertContact,
  type Upload,
  type InsertUpload 
} from "@shared/schema";
import { eq, desc, like, or, and } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  // User operations - required for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Admin User operations - for custom authentication
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: string, adminUser: Partial<InsertAdminUser>): Promise<AdminUser | undefined>;
  updateAdminUserLoginTime(id: string): Promise<void>;
  getAllAdminUsers(): Promise<AdminUser[]>;
  
  // News operations
  getNews(id: string): Promise<News | undefined>;
  getAllNews(): Promise<News[]>;
  getPublishedNews(): Promise<News[]>;
  createNews(news: InsertNews & { authorId: string }): Promise<News>;
  updateNews(id: string, news: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: string): Promise<void>;
  
  // News updates operations
  getNewsUpdates(newsId: string): Promise<NewsUpdate[]>;
  createNewsUpdate(update: InsertNewsUpdate & { authorId: string }): Promise<NewsUpdate>;
  updateNewsUpdate(id: string, update: Partial<InsertNewsUpdate>): Promise<NewsUpdate | undefined>;
  deleteNewsUpdate(id: string): Promise<void>;
  
  // Contact operations
  getContact(id: string): Promise<Contact | undefined>;
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: string, status: string): Promise<Contact | undefined>;
  
  // Upload operations
  getUpload(id: string): Promise<Upload | undefined>;
  createUpload(upload: InsertUpload & { uploadedBy?: string }): Promise<Upload>;
  deleteUpload(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations - required for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Admin User operations - for custom authentication
  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    const [adminUser] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return adminUser;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [adminUser] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return adminUser;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const [adminUser] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return adminUser;
  }

  async createAdminUser(adminUserData: InsertAdminUser): Promise<AdminUser> {
    const [adminUser] = await db.insert(adminUsers).values(adminUserData).returning();
    return adminUser;
  }

  async updateAdminUser(id: string, adminUserData: Partial<InsertAdminUser>): Promise<AdminUser | undefined> {
    const [adminUser] = await db
      .update(adminUsers)
      .set({ ...adminUserData, updatedAt: new Date() })
      .where(eq(adminUsers.id, id))
      .returning();
    return adminUser;
  }

  async updateAdminUserLoginTime(id: string): Promise<void> {
    await db
      .update(adminUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(adminUsers.id, id));
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    return db.select().from(adminUsers).orderBy(desc(adminUsers.createdAt));
  }

  // News operations
  async getNews(id: string): Promise<News | undefined> {
    const [newsItem] = await db.select().from(news).where(eq(news.id, id));
    return newsItem;
  }

  async getAllNews(): Promise<News[]> {
    return db.select().from(news).orderBy(desc(news.createdAt));
  }

  async getPublishedNews(): Promise<News[]> {
    return db.select()
      .from(news)
      .where(eq(news.status, 'published'))
      .orderBy(desc(news.publishedAt));
  }

  async createNews(newsData: InsertNews & { authorId: string }): Promise<News> {
    const [newsItem] = await db.insert(news).values(newsData).returning();
    return newsItem;
  }

  async updateNews(id: string, newsData: Partial<InsertNews>): Promise<News | undefined> {
    const [newsItem] = await db
      .update(news)
      .set({ ...newsData, updatedAt: new Date() })
      .where(eq(news.id, id))
      .returning();
    return newsItem;
  }

  async deleteNews(id: string): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  // News updates operations
  async getNewsUpdates(newsId: string): Promise<NewsUpdate[]> {
    return db.select()
      .from(newsUpdates)
      .where(eq(newsUpdates.newsId, newsId))
      .orderBy(desc(newsUpdates.createdAt));
  }

  async createNewsUpdate(updateData: InsertNewsUpdate & { authorId: string }): Promise<NewsUpdate> {
    const [update] = await db.insert(newsUpdates).values(updateData).returning();
    return update;
  }

  async updateNewsUpdate(id: string, updateData: Partial<InsertNewsUpdate>): Promise<NewsUpdate | undefined> {
    const [update] = await db
      .update(newsUpdates)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(newsUpdates.id, id))
      .returning();
    return update;
  }

  async deleteNewsUpdate(id: string): Promise<void> {
    await db.delete(newsUpdates).where(eq(newsUpdates.id, id));
  }

  // Contact operations
  async getContact(id: string): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createContact(contactData: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(contactData).returning();
    return contact;
  }

  async updateContactStatus(id: string, status: string): Promise<Contact | undefined> {
    const [contact] = await db
      .update(contacts)
      .set({ status, updatedAt: new Date() })
      .where(eq(contacts.id, id))
      .returning();
    return contact;
  }

  // Upload operations
  async getUpload(id: string): Promise<Upload | undefined> {
    const [upload] = await db.select().from(uploads).where(eq(uploads.id, id));
    return upload;
  }

  async createUpload(uploadData: InsertUpload & { uploadedBy?: string }): Promise<Upload> {
    const [upload] = await db.insert(uploads).values(uploadData).returning();
    return upload;
  }

  async deleteUpload(id: string): Promise<void> {
    await db.delete(uploads).where(eq(uploads.id, id));
  }
}

export const storage = new DatabaseStorage();
