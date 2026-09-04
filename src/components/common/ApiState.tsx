import type { ReactNode } from "react";

interface ApiStateProps {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  isEmpty: boolean;
  children: ReactNode;
  emptyMessage?: string;
  loadingComponent?: ReactNode;
}

const ApiState = ({
  isLoading,
  isError,
  error,
  isEmpty,
  children,
  emptyMessage = "No data found.",
  loadingComponent,
}: ApiStateProps) => {
  if (isLoading) {
    return (
      loadingComponent ?? (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xl">Loading...</p>
        </div>
      )
    );
  }

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong.";

    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-600">{errorMessage}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ApiState;