export const LoadingState = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 relative">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Analizando imagen...
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Esto puede tomar unos segundos
            </p>
          </div>

          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
