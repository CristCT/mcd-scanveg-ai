import { useRef } from 'react';
import { useFileDrop } from '../../../shared/hooks';
import { Button } from '../../../shared/components';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string[];
  maxSize?: number;
  disabled?: boolean;
}

export const FileUpload = ({
  onFileSelect,
  accept = ['image/jpeg', 'image/png', 'image/jpg'],
  maxSize = 5 * 1024 * 1024,
  disabled = false,
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isDragOver,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
  } = useFileDrop({
    accept,
    maxSize,
    onFileSelect,
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${
            isDragOver
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragOver={!disabled ? handleDragOver : undefined}
        onDragLeave={!disabled ? handleDragLeave : undefined}
        onDrop={!disabled ? handleDrop : undefined}
        onClick={!disabled ? handleButtonClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900">
              {isDragOver
                ? 'Suelta la imagen aquí'
                : 'Sube una imagen de hoja de tomate'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Arrastra y suelta o haz clic para seleccionar
            </p>
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG hasta {(maxSize / 1024 / 1024).toFixed(0)}MB
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={e => {
              e.stopPropagation();
              handleButtonClick();
            }}
          >
            Seleccionar archivo
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};
