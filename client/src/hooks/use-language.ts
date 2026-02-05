import { useSettings } from "./use-settings";
import { getTranslation, type Language, type TranslationKey } from "@/lib/i18n";

export function useLanguage() {
  const { settings } = useSettings();
  
  const currentLanguage = (settings?.language || "ka") as Language;
  
  const t = (key: TranslationKey): string => {
    return getTranslation(currentLanguage, key);
  };
  
  return {
    language: currentLanguage,
    t,
  };
}