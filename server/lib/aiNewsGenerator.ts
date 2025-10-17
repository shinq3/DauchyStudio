import { storage } from '../storage.js';
import { translateWithGPT4, generateSummaryWithGPT4, generateImageWithDallE } from './openaiClient.js';
import { downloadAndUploadImage } from './imageUploader.js';
import type { RssImportQueue, InsertNews, InsertNewsTranslation, InsertAiGenerationJob } from '@shared/schema';

export interface GenerateNewsFromQueueOptions {
  queueItemId: string;
  adminId: string;
  generateImage?: boolean;
  targetLanguages?: ('ja' | 'en' | 'vi')[];
}

export interface GenerateNewsResult {
  success: boolean;
  newsId?: string;
  jobIds: string[];
  error?: string;
}

function generateSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  if (!baseSlug || baseSlug.length < 3) {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    return `article-${timestamp}-${randomId}`;
  }
  
  return baseSlug;
}

export async function generateNewsFromQueue(options: GenerateNewsFromQueueOptions): Promise<GenerateNewsResult> {
  const { queueItemId, adminId, generateImage = false, targetLanguages = ['ja', 'en', 'vi'] } = options;

  try {
    const queueItem = await storage.getRssImportQueueItem(queueItemId);
    if (!queueItem) {
      return { success: false, jobIds: [], error: 'Queue item not found' };
    }

    if (queueItem.processingState !== 'pending') {
      return { success: false, jobIds: [], error: `Queue item is already ${queueItem.processingState}` };
    }

    const rssSource = await storage.getRssSource(queueItem.sourceId);
    if (!rssSource) {
      return { success: false, jobIds: [], error: 'RSS source not found' };
    }

    const payload = queueItem.rawPayload as any;
    const sourceLanguage = rssSource.language;
    const sourceTitle = payload.title || 'Untitled';
    const sourceExcerpt = payload.contentSnippet || payload.description || '';
    const sourceContent = payload.contentEncoded || payload.content || payload.description || sourceExcerpt;

    console.log(`[AI News Generator] Generating news from queue item: ${queueItemId}`);
    console.log(`[AI News Generator] Source language: ${sourceLanguage}, Target languages: ${targetLanguages.join(', ')}`);
    console.log(`[AI News Generator] Content length: ${sourceContent.length} chars`);

    const slug = generateSlug(sourceTitle);
    
    const newsData: InsertNews = {
      title: sourceTitle,
      slug,
      excerpt: sourceExcerpt.substring(0, 300),
      content: sourceContent,
      category: rssSource.category || 'AI',
      tags: ['AI', 'RSS', rssSource.name],
      featuredImage: payload.thumbnailUrl || null,
      isExternal: false, // AI-generated news is internal content
      sourceUrl: payload.link || payload.guid,
      sourceAttribution: payload.feedTitle || payload.creator || rssSource.name,
      originalPublishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
      status: 'draft',
      authorId: adminId,
    };

    const news = await storage.createNews(newsData);
    console.log(`[AI News Generator] Created news: ${news.id}`);

    const jobIds: string[] = [];
    let firstLanguageSummary = '';

    for (const targetLang of targetLanguages) {
      let translatedTitle = sourceTitle;
      let translatedExcerpt = sourceExcerpt;
      let translatedContent = sourceContent;
      let aiSummary = '';

      if (targetLang !== sourceLanguage) {
        console.log(`[AI News Generator] Translating to ${targetLang}...`);

        const titleJob = await storage.createAiGenerationJob({
          newsId: news.id,
          jobType: 'translation',
          provider: 'openai',
          status: 'processing',
          inputPayload: { type: 'title', sourceLanguage, targetLanguage: targetLang, text: sourceTitle },
        });
        jobIds.push(titleJob.id);

        try {
          const titleResult = await translateWithGPT4({
            sourceText: sourceTitle,
            sourceLanguage,
            targetLanguage: targetLang,
            contentType: 'title',
          });
          translatedTitle = titleResult.translatedText;
          await storage.updateAiGenerationJob(titleJob.id, {
            status: 'completed',
            resultJson: titleResult,
          });
          console.log(`[AI News Generator] Title translated to ${targetLang}: ${translatedTitle.substring(0, 50)}...`);
        } catch (error: any) {
          await storage.updateAiGenerationJob(titleJob.id, {
            status: 'failed',
            errorMessage: error.message,
          });
          console.error(`[AI News Generator] Title translation failed:`, error.message);
        }

        const excerptJob = await storage.createAiGenerationJob({
          newsId: news.id,
          jobType: 'translation',
          provider: 'openai',
          status: 'processing',
          inputPayload: { type: 'excerpt', sourceLanguage, targetLanguage: targetLang, text: sourceExcerpt },
        });
        jobIds.push(excerptJob.id);

        try {
          const excerptResult = await translateWithGPT4({
            sourceText: sourceExcerpt,
            sourceLanguage,
            targetLanguage: targetLang,
            contentType: 'excerpt',
          });
          translatedExcerpt = excerptResult.translatedText;
          await storage.updateAiGenerationJob(excerptJob.id, {
            status: 'completed',
            resultJson: excerptResult,
          });
        } catch (error: any) {
          await storage.updateAiGenerationJob(excerptJob.id, {
            status: 'failed',
            errorMessage: error.message,
          });
          console.error(`[AI News Generator] Excerpt translation failed:`, error.message);
        }

        const contentJob = await storage.createAiGenerationJob({
          newsId: news.id,
          jobType: 'translation',
          provider: 'openai',
          status: 'processing',
          inputPayload: { type: 'content', sourceLanguage, targetLanguage: targetLang, text: sourceContent },
        });
        jobIds.push(contentJob.id);

        try {
          const contentResult = await translateWithGPT4({
            sourceText: sourceContent,
            sourceLanguage,
            targetLanguage: targetLang,
            contentType: 'content',
          });
          translatedContent = contentResult.translatedText;
          await storage.updateAiGenerationJob(contentJob.id, {
            status: 'completed',
            resultJson: contentResult,
          });
        } catch (error: any) {
          await storage.updateAiGenerationJob(contentJob.id, {
            status: 'failed',
            errorMessage: error.message,
          });
          console.error(`[AI News Generator] Content translation failed:`, error.message);
        }
      } else {
        console.log(`[AI News Generator] Using source language content for ${targetLang}`);
      }

      const summaryJob = await storage.createAiGenerationJob({
        newsId: news.id,
        jobType: 'content_summary',
        provider: 'openai',
        status: 'processing',
        inputPayload: { language: targetLang, text: translatedContent },
      });
      jobIds.push(summaryJob.id);

      try {
        const summaryResult = await generateSummaryWithGPT4({
          content: translatedContent,
          language: targetLang,
          maxLength: 200,
        });
        aiSummary = summaryResult.summary;
        
        // Save first language summary to update news excerpt
        if (targetLang === targetLanguages[0]) {
          firstLanguageSummary = aiSummary;
        }
        
        await storage.updateAiGenerationJob(summaryJob.id, {
          status: 'completed',
          resultJson: summaryResult,
        });
        console.log(`[AI News Generator] Summary generated for ${targetLang}`);
      } catch (error: any) {
        await storage.updateAiGenerationJob(summaryJob.id, {
          status: 'failed',
          errorMessage: error.message,
        });
        console.error(`[AI News Generator] Summary generation failed:`, error.message);
      }

      const translationData: InsertNewsTranslation = {
        newsId: news.id,
        locale: targetLang,
        title: translatedTitle,
        excerpt: translatedExcerpt.substring(0, 300),
        content: translatedContent,
        seoTitle: translatedTitle,
        seoDescription: translatedExcerpt.substring(0, 160),
        aiSummary,
      };

      await storage.createNewsTranslation(translationData);
      console.log(`[AI News Generator] Translation created for ${targetLang}`);
    }

    // Update news excerpt with first language AI summary if original excerpt is empty
    if (firstLanguageSummary && (!sourceExcerpt || sourceExcerpt.trim().length === 0)) {
      await storage.updateNews(news.id, {
        excerpt: firstLanguageSummary.substring(0, 300),
      });
      console.log(`[AI News Generator] Updated news excerpt with AI summary`);
    }

    if (generateImage) {
      console.log(`[AI News Generator] Generating featured image...`);
      const imageJob = await storage.createAiGenerationJob({
        newsId: news.id,
        jobType: 'image_generation',
        provider: 'openai',
        status: 'processing',
        inputPayload: { prompt: `Professional news article illustration for: ${sourceTitle}` },
      });
      jobIds.push(imageJob.id);

      try {
        const imageResult = await generateImageWithDallE({
          prompt: `Professional, modern news article hero image for an article about: ${sourceTitle}. Clean, minimalist style suitable for a technology blog.`,
          style: 'natural',
          quality: 'standard',
          size: '1792x1024',
        });
        
        console.log(`[AI News Generator] DALL-E image generated, downloading and uploading to storage...`);
        
        // Download DALL-E image and upload to Object Storage for persistence
        const uploadResult = await downloadAndUploadImage(
          imageResult.imageUrl,
          `news-${news.id}-${Date.now()}.png`
        );
        
        await storage.updateNews(news.id, {
          featuredImage: uploadResult.objectPath,
        });

        await storage.updateAiGenerationJob(imageJob.id, {
          status: 'completed',
          resultJson: { 
            ...imageResult, 
            persistentUrl: uploadResult.objectPath,
            publicUrl: uploadResult.publicUrl,
          },
        });
        console.log(`[AI News Generator] Image saved to storage: ${uploadResult.objectPath}`);
      } catch (error: any) {
        await storage.updateAiGenerationJob(imageJob.id, {
          status: 'failed',
          errorMessage: error.message,
        });
        console.error(`[AI News Generator] Image generation/upload failed:`, error.message);
      }
    }

    await storage.updateRssImportQueueItem(queueItemId, {
      processingState: 'approved',
      newsId: news.id,
      processedByAdminId: adminId,
    });

    console.log(`[AI News Generator] ✅ Successfully generated news: ${news.id} with ${jobIds.length} AI jobs`);

    return {
      success: true,
      newsId: news.id,
      jobIds,
    };
  } catch (error: any) {
    console.error(`[AI News Generator] Failed to generate news:`, error);
    return {
      success: false,
      jobIds: [],
      error: error.message,
    };
  }
}
