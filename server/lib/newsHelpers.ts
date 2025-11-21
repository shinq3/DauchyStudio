/**
 * Helper functions for news article processing
 */

/**
 * Extract the first image from HTML content
 * @param htmlContent - HTML content from ReactQuill
 * @returns URL of the first image, or null if no image found
 */
export function extractFirstImage(htmlContent: string): string | null {
  if (!htmlContent) return null;
  
  // Match <img> tags and extract src attribute
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = htmlContent.match(imgRegex);
  
  if (match && match[1]) {
    return match[1];
  }
  
  return null;
}

/**
 * Create initial translation records for a news article
 * Creates empty translation records for each language
 * Users should edit each language separately in the translation editor
 * or use AI generation to create multilingual content
 */
export interface InitialTranslationData {
  newsId: string;
  title: string;
  excerpt: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
}

export function createInitialTranslations(data: InitialTranslationData) {
  const { newsId, title, excerpt, content, seoTitle, seoDescription } = data;
  const locales = ['ja', 'en', 'vi'] as const;
  
  // Create empty translations for each language
  // Users should fill these in via the translation editor or AI generation
  return locales.map(locale => ({
    newsId,
    locale,
    title: `[${locale.toUpperCase()}] ${title}`, // Prefix with language code for clarity
    excerpt: '', // Empty - user should fill in each language
    content: '', // Empty - user should fill in each language
    seoTitle: `[${locale.toUpperCase()}] ${seoTitle || title}`,
    seoDescription: '', // Empty - user should fill in each language
  }));
}

/**
 * Strip HTML tags to get plain text for excerpt
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Generate a slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}
