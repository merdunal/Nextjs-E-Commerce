import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
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

export function constructMetadata({
  title = 'YeşilBeyaz Aksesuar',
  description = 'YeşilBeyaz Aksesuar',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@YesilBeyaz',
    },
    icons,
    //metadataBase: new URL('https://digitalhippo.up.railway.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}