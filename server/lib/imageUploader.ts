// Image uploader utility for downloading and storing images to Object Storage
import { objectStorageClient } from '../objectStorage';
import { randomUUID } from 'crypto';

export interface UploadImageResult {
  objectPath: string;
  publicUrl: string;
}

function getObjectStorageParts() {
  const privateDir = process.env.PRIVATE_OBJECT_DIR || '';
  if (!privateDir) throw new Error('PRIVATE_OBJECT_DIR not set');
  const parts = privateDir.split('/');
  const bucketName = parts[1];
  const basePath = parts.slice(2).join('/');
  return { bucketName, basePath };
}

async function uploadBufferToStorage(
  buffer: Buffer,
  objectName: string,
  contentType: string
): Promise<string> {
  const { bucketName, basePath } = getObjectStorageParts();
  const fullObjectPath = `${basePath}/news-images/${objectName}`;
  const bucket = objectStorageClient.bucket(bucketName);
  const file = bucket.file(fullObjectPath);
  await file.save(buffer, {
    contentType,
    metadata: {
      metadata: {
        'custom:aclPolicy': JSON.stringify({ owner: 'system', visibility: 'public' }),
      },
    },
  });
  return `/objects/news-images/${objectName}`;
}

/**
 * Download an image from a URL and upload it to Object Storage
 */
export async function downloadAndUploadImage(
  imageUrl: string,
  filename?: string
): Promise<UploadImageResult> {
  console.log(`[Image Uploader] Downloading image from: ${imageUrl.substring(0, 100)}...`);

  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Failed to download image: ${response.statusText}`);

  const imageBuffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get('content-type') || 'image/png';
  const ext = contentType.split('/')[1]?.replace('jpeg', 'jpg') || 'png';
  const objectName = filename || `ai-image-${randomUUID()}.${ext}`;

  const objectPath = await uploadBufferToStorage(imageBuffer, objectName, contentType);
  const domain = process.env.APP_DOMAIN || process.env.REPLIT_DOMAINS?.split(',')[0] || '';
  const publicUrl = domain ? `https://${domain}${objectPath}` : objectPath;

  console.log(`[Image Uploader] Image uploaded successfully: ${objectPath}`);
  return { objectPath, publicUrl };
}

/**
 * Process HTML content: extract base64 images, resize with sharp, upload to object storage.
 * Returns updated HTML and the first image's object path (for thumbnail use).
 */
export async function processContentImages(
  htmlContent: string,
  newsId: string
): Promise<{ processedContent: string; firstImagePath: string | null }> {
  // Dynamically import sharp (native module)
  let sharp: any;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.warn('[Image Uploader] sharp not available, skipping image processing');
    return { processedContent: htmlContent, firstImagePath: null };
  }

  // Find all base64 img tags
  const base64ImgRegex = /<img([^>]+)src="(data:image\/([a-zA-Z+]+);base64,([^"]+))"([^>]*)>/gi;
  let processedContent = htmlContent;
  let firstImagePath: string | null = null;
  const replacements: Array<{ original: string; replacement: string }> = [];

  let match: RegExpExecArray | null;
  while ((match = base64ImgRegex.exec(htmlContent)) !== null) {
    const [fullTag, beforeSrc, dataUrl, mimeType, base64Data, afterSrc] = match;
    try {
      const imageBuffer = Buffer.from(base64Data, 'base64');

      // Resize: max 1200px wide, convert to JPEG for compression
      const resized = await sharp(imageBuffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 82 })
        .toBuffer();

      const objectName = `content-${newsId}-${randomUUID()}.jpg`;
      const objectPath = await uploadBufferToStorage(resized, objectName, 'image/jpeg');

      if (!firstImagePath) firstImagePath = objectPath;

      const newTag = `<img${beforeSrc}src="${objectPath}"${afterSrc}>`;
      replacements.push({ original: fullTag, replacement: newTag });

      console.log(`[Image Uploader] Processed base64 image → ${objectPath}`);
    } catch (err) {
      console.error('[Image Uploader] Failed to process image:', err);
    }
  }

  for (const { original, replacement } of replacements) {
    processedContent = processedContent.replace(original, replacement);
  }

  return { processedContent, firstImagePath };
}
