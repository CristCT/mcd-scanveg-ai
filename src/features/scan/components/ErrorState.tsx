import { Button } from '../../../shared/components';
import { Flex } from '@chakra-ui/react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onReset: () => void;
}

export const ErrorState = ({ error, onRetry, onReset }: ErrorStateProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-medium text-red-900">
              Error al procesar la imagen
            </h3>
            <p className="text-sm text-red-700 mt-2">{error}</p>
          </div>

          <div className="space-y-2">
            <Flex direction="column" gap={2}>
              <Button
                variant="primary"
                size="md"
                onClick={onRetry}
                className="w-full"
              >
                Intentar de nuevo
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={onReset}
                className="w-full"
              >
                Seleccionar otra imagen
              </Button>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};
