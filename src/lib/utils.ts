import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "TRY";
    //notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "TRY"} = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    //notation,
    //minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(numericPrice);
}
