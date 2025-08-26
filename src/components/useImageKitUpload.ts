"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
} from "@imagekit/next";
import { useState, useRef } from "react";

type UploadCallbacks = {
  onSuccess?: (response: UploadResponse) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
  onResponse?: (response: UploadResponse) => void;
};

export function useImageKitUpload(callbacks: UploadCallbacks = {}) {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  const authenticator = async () => {
    const response = await fetch("/api/upload-auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    return response.json();
  };

  const uploadFile = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    abortController.current = new AbortController();

    try {
      const { signature, expire, token, publicKey } = await authenticator();

      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          const percent = (event.loaded / event.total) * 100;
          setProgress(percent);
          callbacks.onProgress?.(percent);
        },
        abortSignal: abortController.current.signal,
      });

      callbacks.onSuccess?.(uploadResponse);
      callbacks.onResponse?.(uploadResponse);
      setProgress(0);
      setIsUploading(false);
      
    } catch (error: any) {
      let customError: Error;
      if (error instanceof ImageKitAbortError) {
        customError = new Error("Upload aborted");
      } else if (error instanceof ImageKitInvalidRequestError) {
        customError = new Error(`Invalid request: ${error.message}`);
      } else if (error instanceof ImageKitUploadNetworkError) {
        customError = new Error(`Network error: ${error.message}`);
      } else if (error instanceof ImageKitServerError) {
        customError = new Error(`Server error: ${error.message}`);
      } else {
        customError = new Error(error?.message || "Unknown upload error");
      }
      callbacks.onError?.(customError);
    } finally {
      setIsUploading(false);
    }
  };

  const abortUpload = () => {
    abortController.current?.abort();
  };

  return { uploadFile, abortUpload, progress, isUploading };
}
