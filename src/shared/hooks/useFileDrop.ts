import { useState, useCallback } from 'react';
import type { DragEvent } from 'react';

interface UseFileDropOptions {
  accept?: string[];
  maxSize?: number;
  onFileSelect?: (file: File) => void;
}

export const useFileDrop = (options: UseFileDropOptions = {}) => {
  const { accept, maxSize = 5 * 1024 * 1024, onFileSelect } = options;

  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File): boolean => {
      setError(null);

      if (accept && !accept.some(type => file.type.includes(type))) {
        setError(
          `Tipo de archivo no permitido. Solo se permiten: ${accept.join(', ')}`
        );
        return false;
      }

      if (file.size > maxSize) {
        setError(
          `El archivo es demasiado grande. Tamaño máximo: ${(
            maxSize /
            1024 /
            1024
          ).toFixed(1)}MB`
        );
        return false;
      }

      return true;
    },
    [accept, maxSize]
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (file && validateFile(file)) {
        onFileSelect?.(file);
      }
    },
    [validateFile, onFileSelect]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file && validateFile(file)) {
        onFileSelect?.(file);
      }
    },
    [validateFile, onFileSelect]
  );

  return {
    isDragOver,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
  };
};
