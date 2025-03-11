export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64" data-testid="loading-spinner">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
};
