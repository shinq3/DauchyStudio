# Overview

D'auchy.Studio is a Japanese AI product innovation company developing cutting-edge AI solutions across education, enterprise, and creative industries. The platform showcases four main products: LingaLink (AI-powered online learning), EduMate (collaborative study platform), OfficeBrain (enterprise RAG system), and Bayd-System (music studio management). The website serves as a company showcase with product galleries, news sections, and contact capabilities.

## CMS Phase 2 Complete (2025-10-17)
- ✅ Multilingual news translation editor with ReactQuill WYSIWYG (ja/en/vi)
- ✅ RSS source management UI with CRUD operations and active/inactive toggle
- ✅ RSS feed polling system with automatic article import to queue (rss-parser)
- ✅ RSS import queue management UI with approve/reject workflow
- ✅ Enhanced error handling and status validation
- ✅ Structured logging for debugging
- ✅ End-to-end tested admin workflow

### Default Admin Credentials
- Username: `admin`
- Password: `admin123`
- Role: superadmin

### RSS Feed Automation
- Automatic polling every 5 minutes
- Deduplication by source URL
- Respects per-source polling intervals
- Structured error logging for failed feeds

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a modern React-based frontend with TypeScript and Vite as the build tool. Key architectural decisions include:

- **Component Library**: Built on Radix UI components with shadcn/ui styling for consistent, accessible UI elements
- **Styling Framework**: Tailwind CSS with custom design tokens following an orange-themed color palette inspired by modern tech companies
- **Routing**: Client-side routing implemented with Wouter for lightweight navigation
- **State Management**: React Query (TanStack Query) for server state management with custom query client configuration
- **Animation**: Framer Motion for smooth page transitions and interactive elements
- **Theme System**: Custom dark/light theme provider with CSS custom properties

## Backend Architecture
The server follows a clean Express.js architecture with TypeScript:

- **Framework**: Express.js with middleware for JSON parsing, CORS, and request logging
- **Storage Layer**: DatabaseStorage implementation with PostgreSQL for production data persistence
- **Type Safety**: Shared TypeScript schemas between client and server for consistent data contracts
- **Development Setup**: Vite middleware integration for hot module replacement in development

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe query building
- **Schema Management**: Centralized schema definitions in shared directory with Zod validation
- **Migration Strategy**: Drizzle Kit for database migrations and schema synchronization
- **Cascade Deletion**: Foreign key constraints with ON DELETE CASCADE for automatic cleanup of dependent data

### CMS Database Tables (Phase 1 Complete - 2025-10-17)
- **admin_users**: Custom admin authentication with bcryptjs password hashing, roles (superadmin/admin/editor), and permissions
- **admin_sessions**: Session token management with expiration tracking
- **news_translations**: Multilingual content storage (ja/en/vi) with SEO fields and AI-generated summaries
- **rss_sources**: RSS feed configuration with polling intervals and language settings
- **rss_import_queue**: Automated article import queue with processing states
- **ai_generation_jobs**: AI content/image generation job tracking with provider metadata

## Design System
The application implements a comprehensive design system based on modern tech aesthetics:

- **Color Palette**: Orange primary theme (25 85% 60%) with neutral backgrounds and semantic color tokens
- **Typography**: Inter font family with Noto Sans JP for Japanese text support
- **Component Variants**: Consistent button, card, and form styling with hover states and elevation effects
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Content Management
Currently uses mock data with clear TODO comments for future CMS integration:

- **Product Data**: Structured product information with images, status, and metadata
- **News System**: External and internal news article support with thumbnails and source attribution
- **Internationalization**: Japanese language support with English fallbacks

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for serverless environments
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect

## UI Framework
- **@radix-ui/***: Comprehensive accessible component primitives for forms, navigation, and overlays
- **framer-motion**: Animation library for smooth transitions and interactive effects
- **lucide-react**: Icon library providing consistent iconography

## Development Tools
- **vite**: Fast build tool with hot module replacement
- **typescript**: Type safety across frontend and backend
- **tailwindcss**: Utility-first CSS framework
- **@tanstack/react-query**: Server state management and caching

## Authentication & Sessions
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- Infrastructure prepared for user authentication with session management

## Validation & Forms
- **zod**: Runtime type validation and schema definition
- **@hookform/resolvers**: React Hook Form integration with Zod validation
- **react-hook-form**: Form state management with validation support

The architecture emphasizes type safety, developer experience, and scalability while maintaining clean separation of concerns between presentation, business logic, and data persistence layers.