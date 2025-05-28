import en from "./content/en.json";
import fi from "./content/fi.json";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
export const translations = { en, fi } as const;
export type Locale = keyof typeof translations;
export const locales = Object.keys(translations) as Locale[];
export const defaultLocale: Locale = "en" as const;



export const pages = ["home", "about", "amazon", "disney", "google"] as const;
export type Page = (typeof pages)[number];
