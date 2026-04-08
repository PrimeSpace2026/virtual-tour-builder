import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, translations } from "./translations";

type TranslationValue = string | Record<string, any>;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved === "fr" || saved === "en") return saved;
    // Detect browser language
    const browserLang = navigator.language.slice(0, 2);
    return browserLang === "en" ? "en" : "fr";
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** Helper: get a translated string from a {fr, en} object */
export function useLang() {
  const { lang } = useI18n();
  return (obj: { fr: string; en: string }) => obj[lang];
}
