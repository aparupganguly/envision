import { type ClassValue, clsx } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";

import { aspectRatioOptions } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ERROR-HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// FORMURLQUERY
export type FormUrlQueryParams = {
  searchParams: URLSearchParams;
  key: string;
  value: string;
};

export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams): string => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

// REMOVEKEYFROMQUERY
export type RemoveUrlQueryParams = {
  searchParams: URLSearchParams | string;
  keysToRemove: string[];
};

export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams): string {
  const currentUrl = qs.parse(
    typeof searchParams === "string" ? searchParams : searchParams.toString()
  );

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

// DEBOUNCE
export const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;
  return (...args: unknown[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// GETIMAGESIZE
export type AspectRatioKey = keyof typeof aspectRatioOptions;

export type Image = {
  aspectRatio?: string;
  width?: number;
  height?: number;
};

export const getImageSize = (
  type: string,
  image: Image,
  dimension: "width" | "height"
): number => {
  if (type === "fill") {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return image?.[dimension] || 1000;
};

// DEEPMERGEOBJECTS
export const deepMergeObjects = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
): T => {
  if (!obj2) return obj1;

  return Object.keys(obj1).reduce((acc, key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    acc[key] =
      typeof val1 === "object" && typeof val2 === "object"
        ? deepMergeObjects(val1 as T, val2 as T)
        : val1 ?? val2;

    return acc;
  }, { ...obj2 } as T);
};
