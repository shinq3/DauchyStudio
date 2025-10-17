// Image uploader utility for downloading and storing DALL-E images to Object Storage
import { objectStorageClient } from '../objectStorage';
import { randomUUID } from 'crypto';

export interface UploadImageResult {
  objectPath: string;
  publicUrl: string;
}

/**
 * Download an image from a URL and upload it to Object Storage
 * @param imageUrl - The URL of the image to download (e.g., DALL-E URL)
 * @param filename - Optional filename for the uploaded image
 * @returns Object path and public URL for the uploaded image
 */
export async function downloadAndUploadImage(
  imageUrl: string,
  filename?: string
): Promise<UploadImageResult> {
  try {
    console.log(`[Image Uploader] Downloading image from: ${imageUrl.substring(0, 100)}...`);
    
    // Download the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/png';
    
    // Generate filename if not provided
    const ext = contentType.split('/')[1] || 'png';
    const objectName = filename || `ai-image-${randomUUID()}.${ext}`;

    // Upload to Object Storage in public directory
    const privateDir = process.env.PRIVATE_OBJECT_DIR || '';
    if (!privateDir) {
      throw new Error('PRIVATE_OBJECT_DIR not set');
    }

    // Parse bucket name and create full path
    const parts = privateDir.split('/');
    const bucketName = parts[1]; // format: /bucket-name/path
    const fullObjectPath = `${parts.slice(2).join('/')}/news-images/${objectName}`;

    const bucket = objectStorageClient.bucket(bucketName);
    const file = bucket.file(fullObjectPath);

    // Upload the image
    await file.save(imageBuffer, {
      contentType,
      metadata: {
        metadata: {
          'custom:aclPolicy': JSON.stringify({
            owner: 'system',
            visibility: 'public',
          }),
        },
      },
    });

    const objectPath = `/objects/news-images/${objectName}`;
    const publicUrl = `${process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}` : ''}${objectPath}`;

    console.log(`[Image Uploader] Image uploaded successfully: ${objectPath}`);
    
    return {
      objectPath,
      publicUrl,
    };
  } catch (error: any) {
    console.error('[Image Uploader] Failed to upload image:', error);
    throw error;
  }
}
