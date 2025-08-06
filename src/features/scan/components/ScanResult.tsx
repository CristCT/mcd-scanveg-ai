import { Button } from '../../../shared/components';
import type { ScanResultData } from '../types';

interface ScanResultProps {
  result: ScanResultData;
  onReset: () => void;
}

export const ScanResult = ({ result, onReset }: ScanResultProps) => {
  const isHealthy = result.prediction === 'healthy';

  const resultColor = isHealthy ? 'text-green-600' : 'text-red-600';
  const bgColor = isHealthy ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isHealthy ? 'border-green-200' : 'border-red-200';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`${bgColor} ${borderColor} border rounded-lg p-6`}>
        <div className="text-center space-y-4">
          <div
            className={`mx-auto w-16 h-16 ${isHealthy ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}
          >
            {isHealthy ? (
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            )}
          </div>

          <div>
            <h3 className={`text-2xl font-bold ${resultColor}`}>
              {isHealthy ? 'Planta Sana' : 'Planta Enferma'}
            </h3>

            {!isHealthy && result.disease && (
              <p className="text-lg font-medium text-gray-900 mt-2">
                Enfermedad: {result.disease}
              </p>
            )}

            <p className="text-sm text-gray-600 mt-2">
              Confianza: {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>

          {result.details && (
            <div className="text-left">
              <h4 className="font-medium text-gray-900 mb-2">Detalles:</h4>
              <p className="text-sm text-gray-700">{result.details}</p>
            </div>
          )}

          <p className="text-xs text-gray-500">
            Procesado: {new Date(result.processedAt).toLocaleString()}
          </p>

          <div className="pt-4">
            <Button
              variant="outline"
              size="md"
              onClick={onReset}
              className="w-full"
            >
              Analizar otra imagen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
