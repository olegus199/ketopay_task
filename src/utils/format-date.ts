import { format, parseISO } from "date-fns";

export function formatDate(date: string, type: "header" | "paragraph"): string {
  switch (type) {
    case "header":
      return format(parseISO(date), "dd.MM.yy");
    case "paragraph":
      return format(parseISO(date), "MMM dd, yyyy, h:mm a");
    default:
      return "unknown date type";
  }
}