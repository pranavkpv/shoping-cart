import { AlertCircle, X } from "lucide-react";
import { toast } from "sonner";

interface ToastProps {
  id: string | number;
  title?: string;
  message: string;
}

export const ErrorToast = ({ id, title = "Error", message }: ToastProps) => {
  return (
    <div className="flex w-full max-w-md items-start gap-3 rounded-xl border border-red-200 bg-red-50/90 p-4 shadow-lg backdrop-blur-md dark:border-red-900/50 dark:bg-red-950/80">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
        <AlertCircle className="h-5 w-5" />
      </div>
      <div className="flex-1 pt-0.5">
        <h4 className="text-sm font-semibold text-red-900 dark:text-red-100">
          {title}
        </h4>
        <p className="mt-0.5 text-xs text-red-700 dark:text-red-300">
          {message}
        </p>
      </div>
      <button
        onClick={() => toast.dismiss(id)}
        className="rounded-lg p-1 text-red-500 hover:bg-red-100 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const showErrorToast = (message: string, title?: string) => {
  toast.custom((id) => <ErrorToast id={id} title={title} message={message} />);
};