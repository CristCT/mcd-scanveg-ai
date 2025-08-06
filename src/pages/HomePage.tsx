import { Layout } from '../shared/components';
import { ScanContainer } from '../features/scan';

export const HomePage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MCD ScanVeg AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Detecta enfermedades en hojas de tomate usando inteligencia
            artificial. Sube una imagen y obtén un diagnóstico instantáneo.
          </p>
        </div>

        <div className="flex justify-center">
          <ScanContainer />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Análisis Rápido
            </h3>
            <p className="text-gray-600">
              Obtén resultados en segundos con nuestra IA entrenada
              específicamente para hojas de tomate.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary-600"
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
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Alta Precisión
            </h3>
            <p className="text-gray-600">
              Modelo entrenado con miles de imágenes para garantizar la máxima
              precisión en el diagnóstico.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Fácil de Usar
            </h3>
            <p className="text-gray-600">
              Interfaz intuitiva que permite a cualquier persona analizar sus
              plantas sin conocimientos técnicos.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
