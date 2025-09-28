import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, json, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// User storage table - updated for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default('user'), // guest, user, premium, moderator
  permissions: json("permissions"), // specific permissions array for granular control
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Admin Users table - for custom authentication
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: varchar("username").unique().notNull(),
  email: varchar("email").unique().notNull(),
  passwordHash: varchar("password_hash").notNull(),
  role: varchar("role").notNull().default('admin'), // admin, superadmin, editor, viewer
  permissions: json("permissions"), // specific admin permissions array for granular control
  departmentAccess: json("department_access"), // which departments/modules they can access
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

// Permission and Role Management Schema
export const userRoleSchema = z.enum(['guest', 'user', 'premium', 'moderator']);
export const adminRoleSchema = z.enum(['admin', 'superadmin', 'editor', 'viewer']);

export const userPermissionSchema = z.array(z.enum([
  'view_public_content',
  'create_comments', 
  'upload_files',
  'access_premium_content',
  'moderate_comments',
  'manage_basic_content'
]));

export const adminPermissionSchema = z.array(z.enum([
  'view_admin_dashboard',
  'manage_news',
  'manage_contacts', 
  'manage_users',
  'manage_admin_users',
  'manage_uploads',
  'view_analytics',
  'system_configuration',
  'user_impersonation',
  'delete_content',
  'manage_permissions'
]));

export const departmentAccessSchema = z.array(z.enum([
  'news_management',
  'user_management', 
  'contact_management',
  'content_management',
  'analytics_dashboard',
  'system_settings',
  'security_management'
]));

// Enhanced insert schemas for users and admin users
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  role: true,
  permissions: true,
  isActive: true
}).extend({
  role: userRoleSchema.optional(),
  permissions: userPermissionSchema.optional()
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  username: true,
  email: true,
  role: true,
  permissions: true,
  departmentAccess: true,
  isActive: true
}).extend({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: adminRoleSchema.optional(),
  permissions: adminPermissionSchema.optional(),
  departmentAccess: departmentAccessSchema.optional()
});

export const updateAdminUserSchema = insertAdminUserSchema.partial().omit({
  password: true
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().optional(), // Required for self-change, optional for superadmin reset
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Types for permissions and roles
export type UserRole = z.infer<typeof userRoleSchema>;
export type AdminRole = z.infer<typeof adminRoleSchema>;
export type UserPermission = z.infer<typeof userPermissionSchema>;
export type AdminPermission = z.infer<typeof adminPermissionSchema>;
export type DepartmentAccess = z.infer<typeof departmentAccessSchema>;
export type InsertUserData = z.infer<typeof insertUserSchema>;
export type InsertAdminUserData = z.infer<typeof insertAdminUserSchema>;
export type UpdateAdminUserData = z.infer<typeof updateAdminUserSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;

// CMS Tables - matching existing database schema
export const news = pgTable("news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug"),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category").notNull().default('company'), // product, company, technology
  tags: json("tags"),
  featuredImage: text("featured_image"),
  isExternal: boolean("is_external").default(false),
  externalUrl: text("external_url"),
  status: text("status").notNull().default('draft'), // draft, published, archived
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  authorId: varchar("author_id").references(() => users.id).notNull()
});

export const newsUpdates = pgTable("news_updates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  newsId: varchar("news_id").references(() => news.id).notNull(),
  content: text("content").notNull(),
  authorId: varchar("author_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  inquiryType: text("inquiry_type"),
  message: text("message").notNull(),
  status: text("status").notNull().default('new'), // new, in-progress, resolved, closed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const uploads = pgTable("uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: varchar("size").notNull(),
  url: text("url").notNull(),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow()
});

// Insert schemas
export const insertNewsSchema = createInsertSchema(news).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  category: true,
  tags: true,
  featuredImage: true,
  isExternal: true,
  externalUrl: true,
  status: true,
});

export const insertNewsUpdateSchema = createInsertSchema(newsUpdates).pick({
  content: true,
  newsId: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  company: true,
  inquiryType: true,
  message: true,
});

export const insertUploadSchema = createInsertSchema(uploads).pick({
  filename: true,
  originalName: true,
  mimeType: true,
  size: true,
  url: true
});

// Types
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
export type InsertNewsUpdate = z.infer<typeof insertNewsUpdateSchema>;
export type NewsUpdate = typeof newsUpdates.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertUpload = z.infer<typeof insertUploadSchema>;
export type Upload = typeof uploads.$inferSelect;
