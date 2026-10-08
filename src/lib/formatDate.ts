import { formatDistanceToNowStrict } from "date-fns";
import { format } from "date-fns";

export function formatDate(date: string) {
  return formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
    
  });
}

export function formatJoinedDate(date: string) {
  return format(new Date(date), "dd MMMM yyyy");
}