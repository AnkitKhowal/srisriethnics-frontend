import { useState } from 'react';
import axios from 'axios';
import { apiClient } from '@/lib/api';
import type { PresignedUrlRequest, PresignedUrlResponse } from '@/types/api';

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Get presigned URL
      const presignedRequest: PresignedUrlRequest = {
        fileName: file.name,
        fileType: file.type,
      };

      const response = await apiClient.post<PresignedUrlResponse>(
        '/api/upload/presigned-url',
        presignedRequest
      );

      if (!response.success || !response.data) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, uploadFields, fileUrl } = response.data;

      // Create form data for POST upload
      const formData = new FormData();
      
      // Add all the fields from the presigned post
      if (uploadFields) {
        Object.keys(uploadFields).forEach(key => {
          formData.append(key, uploadFields[key]);
        });
      }
      
      // Add the file last
      formData.append('file', file);

      // Upload file to S3 using fetch to avoid CORS preflight
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }

      setIsUploading(false);
      setProgress(100);
      return fileUrl;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Upload failed';
      setError(errorMessage);
      setIsUploading(false);
      throw new Error(errorMessage);
    }
  };

  const uploadMultiple = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map((file) => uploadFile(file));
    return Promise.all(uploadPromises);
  };

  return {
    uploadFile,
    uploadMultiple,
    isUploading,
    progress,
    error,
  };
}


