import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
}: ErrorMessageProps) => {
  return (
    <div
      className={`flex w-fit items-center gap-3 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive h-fit my-auto mx-auto`}
    >
      <AlertCircle className="h-5 w-5 shrink-0" />

      <p className="text-sm font-medium sm:text-base">{message}</p>
    </div>
  );
};

export default ErrorMessage;
