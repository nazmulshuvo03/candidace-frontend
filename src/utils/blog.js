import { format, parseISO } from "date-fns";

export const dateFormat = (dateString) => {
    try {
        const date = parseISO(dateString);
        return format(date, "d MMMM yyyy");
    } catch (error) {
        console.error("Error formatting date:", error);
        return dateString;
    }
};