import { useLanguage } from "@/contexts/LanguageContext";
import { t as translateKey } from "@/config/translations";

/**
 * Custom hook to use translations throughout the app
 * Usage: const t = useTranslation();
 * Then: t("nav.home"), t("nav.services"), etc.
 */
export const useTranslation = () => {
  const { language } = useLanguage();
  
  return (key: string, defaultValue: string = "") => 
    translateKey(language, key, defaultValue);
};
