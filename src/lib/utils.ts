export { cn } from "cn";

export const getImageUrl = (src?: string | null) => {
  if (!src) {
    return null;
  }

  if (/^https?:\/\//i.test(src)) {
    return src;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBaseUrl) {
    return src;
  }

  return `${apiBaseUrl.replace(/\/$/, "")}/${src.replace(/^\/+/, "")}`;
};
