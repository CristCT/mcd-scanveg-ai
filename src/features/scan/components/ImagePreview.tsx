import { useState, useEffect } from 'react';
import { Button } from '../../../shared/components';

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
  onAnalyze: () => void;
  disabled?: boolean;
}

export const ImagePreview = ({
  file,
  onRemove,
  onAnalyze,
  disabled = false,
}: ImagePreviewProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Vista previa"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="text-sm text-gray-600">
            <p className="font-medium">{file.name}</p>
            <p className="text-xs text-gray-400 mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onAnalyze}
              disabled={disabled}
              className="flex-1"
            >
              Analizar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRemove}
              disabled={disabled}
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
