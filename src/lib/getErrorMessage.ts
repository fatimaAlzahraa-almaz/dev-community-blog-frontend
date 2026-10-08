import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (data?.detail) {
      return data.detail;
    }

    if (typeof data === "string") {
      return data;
    }

    if (data && typeof data === "object") {
      const firstError = Object.values(data)[0];

      if (Array.isArray(firstError)) {
        return String(firstError[0]);
      }

      if (typeof firstError === "string") {
        return firstError;
      }
    }

    return "Something went wrong. Please try again.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};