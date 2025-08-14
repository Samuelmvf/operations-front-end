import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatTimePeriod = (time) => {
  if (!time) return "";

  const date = new Date(time);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return formattedTime.replace("AM", "a.m").replace("PM", "p.m");
};

export const formatCurrency = (amount, currency = "USD") => {
  if (!amount) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const getActualDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0];
};

export const HTTP_STATUS = {
  UNPROCESSABLE_ENTITY: 422,
};
