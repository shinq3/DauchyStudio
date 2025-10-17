import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  console.warn('[OpenAI] OPENAI_API_KEY not found. AI features will be disabled.');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

export interface TranslationRequest {
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  contentType: 'title' | 'excerpt' | 'content';
}

export interface TranslationResult {
  translatedText: string;
  detectedLanguage?: string;
}

export async function translateWithGPT4(request: TranslationRequest): Promise<TranslationResult> {
  const { sourceText, sourceLanguage, targetLanguage, contentType } = request;

  const languageNames: Record<string, string> = {
    ja: 'Japanese',
    en: 'English',
    vi: 'Vietnamese',
  };

  const systemPrompt = contentType === 'title'
    ? `You are a professional translator specializing in news headlines and titles. Translate the following text from ${languageNames[sourceLanguage]} to ${languageNames[targetLanguage]}. Keep it concise and impactful, suitable for a news headline.`
    : contentType === 'excerpt'
    ? `You are a professional translator. Translate the following excerpt from ${languageNames[sourceLanguage]} to ${languageNames[targetLanguage]}. Maintain the tone and style of the original text. This is a brief summary, so keep it concise.`
    : `You are a professional translator. Translate the following article content from ${languageNames[sourceLanguage]} to ${languageNames[targetLanguage]}. Maintain the tone, style, and formatting of the original text. Preserve any technical terms appropriately.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-5',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: sourceText },
    ],
    temperature: 0.3,
    max_tokens: contentType === 'title' ? 100 : contentType === 'excerpt' ? 300 : 2000,
  });

  const translatedText = response.choices[0]?.message?.content || sourceText;

  return {
    translatedText,
    detectedLanguage: sourceLanguage,
  };
}

export interface ImageGenerationRequest {
  prompt: string;
  style?: 'vivid' | 'natural';
  quality?: 'standard' | 'hd';
  size?: '1024x1024' | '1792x1024' | '1024x1792';
}

export interface ImageGenerationResult {
  imageUrl: string;
  revisedPrompt?: string;
}

export async function generateImageWithDallE(request: ImageGenerationRequest): Promise<ImageGenerationResult> {
  const { prompt, style = 'natural', quality = 'standard', size = '1792x1024' } = request;

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size,
    quality,
    style,
  });

  const imageData = response.data?.[0];
  if (!imageData?.url) {
    throw new Error('Failed to generate image: No URL returned from DALL-E');
  }

  return {
    imageUrl: imageData.url,
    revisedPrompt: imageData.revised_prompt,
  };
}

export interface SummaryRequest {
  content: string;
  language: string;
  maxLength?: number;
}

export interface SummaryResult {
  summary: string;
}

export async function generateSummaryWithGPT4(request: SummaryRequest): Promise<SummaryResult> {
  const { content, language, maxLength = 200 } = request;

  const languageNames: Record<string, string> = {
    ja: 'Japanese',
    en: 'English',
    vi: 'Vietnamese',
  };

  const systemPrompt = `You are a professional content summarizer. Create a concise summary of the following article in ${languageNames[language]}. The summary should be around ${maxLength} characters and capture the key points of the article.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-5',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: content },
    ],
    temperature: 0.3,
    max_tokens: 300,
  });

  const summary = response.choices[0]?.message?.content || '';

  return {
    summary,
  };
}
