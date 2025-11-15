'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useUpload } from '@/hooks/useUpload';

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  existingImages?: string[];
  maxImages?: number;
}

export default function ImageUpload({
  onImagesUploaded,
  existingImages = [],
  maxImages = 5,
}: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>(existingImages);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFile } = useUpload();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (uploadedImages.length + acceptedFiles.length > maxImages) {
        alert(`Maximum ${maxImages} images allowed`);
        return;
      }

      setIsUploading(true);

      try {
        const uploadPromises = acceptedFiles.map((file) => uploadFile(file));
        const urls = await Promise.all(uploadPromises);
        
        const newImages = [...uploadedImages, ...urls];
        setUploadedImages(newImages);
        onImagesUploaded(newImages);
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload images. Please try again.');
      } finally {
        setIsUploading(false);
      }
    },
    [uploadedImages, uploadFile, onImagesUploaded, maxImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isUploading || uploadedImages.length >= maxImages,
  });

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onImagesUploaded(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      {uploadedImages.length < maxImages && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary-600 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400'
          } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              {isUploading ? (
                <p className="font-medium">Uploading...</p>
              ) : (
                <>
                  <p className="font-medium">
                    {isDragActive
                      ? 'Drop images here'
                      : 'Drag & drop images here, or click to select'}
                  </p>
                  <p className="text-xs mt-1">
                    PNG, JPG, WEBP up to 5MB (max {maxImages} images)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {uploadedImages.map((url, index) => (
            <div key={index} className="relative aspect-square group">
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                sizes="200px"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-500">
        {uploadedImages.length} / {maxImages} images uploaded
      </p>
    </div>
  );
}


