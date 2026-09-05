import type { ReactNode } from "react";

interface ApiStateProps {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  isEmpty: boolean;
  children: ReactNode;
  emptyMessage?: string;
  emptyTitle?: string;
  loadingComponent?: ReactNode;
  onRetry?: () => void;
  className?: string;
}

const ApiState = ({
  isLoading,
  isError,
  error,
  isEmpty,
  children,
  emptyMessage = "We couldn't find any data to display right now.",
  emptyTitle = "No Results Found",
  loadingComponent,
  onRetry,
  className = "",
}: ApiStateProps) => {
  const containerClasses = `flex min-h-[300px] w-full flex-col items-center justify-center p-6 text-center ${className}`;

  if (isLoading) {
    return (
      loadingComponent ?? (
        <div className={containerClasses}>
          <div className="flex flex-col items-center gap-3">
            <svg
              className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-base font-medium text-gray-600 sm:text-lg dark:text-gray-300">
              Loading data...
            </p>
          </div>
        </div>
      )
    );
  }

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return (
      <div className={containerClasses}>
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50/50 p-6 shadow-sm dark:border-red-900/50 dark:bg-red-950/20">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Failed to Load Data
          </h3>
          <p className="mt-1 text-sm text-red-600 sm:text-base dark:text-red-400">
            {errorMessage}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              type="button"
              className="mt-4 inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={containerClasses}>
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/30">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {emptyTitle}
          </h3>
          <p className="mt-1 text-sm text-gray-500 sm:text-base dark:text-gray-400">
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ApiState;