import { useState } from 'react';
import { useScan } from './hooks';
import {
  FileUpload,
  ImagePreview,
  ScanResult,
  LoadingState,
  ErrorState,
} from './components';

export const ScanContainer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { result, isLoading, error, scanImage, reset } = useScan();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    reset();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    reset();
  };

  const handleAnalyze = async () => {
    if (selectedFile) {
      await scanImage({ image: selectedFile });
    }
  };

  const handleRetry = () => {
    if (selectedFile) {
      handleAnalyze();
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    reset();
  };

  if (result) {
    return <ScanResult result={result} onReset={handleReset} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState error={error} onRetry={handleRetry} onReset={handleReset} />
    );
  }

  if (selectedFile) {
    return (
      <ImagePreview
        file={selectedFile}
        onRemove={handleRemoveFile}
        onAnalyze={handleAnalyze}
        disabled={isLoading}
      />
    );
  }

  return <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />;
};
