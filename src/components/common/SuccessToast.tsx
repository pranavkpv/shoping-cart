import { CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

interface ToastProps {
  id: string | number;
  title?: string;
  message: string;
}

export const SuccessToast = ({ id, title = "Success", message }: ToastProps) => {
  return (
    <div className="flex w-full max-w-md items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 shadow-lg backdrop-blur-md dark:border-emerald-900/50 dark:bg-emerald-950/80">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <div className="flex-1 pt-0.5">
        <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
          {title}
        </h4>
        <p className="mt-0.5 text-xs text-emerald-700 dark:text-emerald-300">
          {message}
        </p>
      </div>
      <button
        onClick={() => toast.dismiss(id)}
        className="rounded-lg p-1 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const showSuccessToast = (message: string, title?: string) => {
  toast.custom((id) => <SuccessToast id={id} title={title} message={message} />);
};