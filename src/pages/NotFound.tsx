import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "@/i18n";

const NotFound = () => {
  const location = useLocation();
  const { lang, t } = useI18n();
  const T = (obj: { fr: string; en: string }) => obj[lang];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold">404</h1>
        <p className="mb-4 text-base md:text-xl text-muted-foreground">{T(t.notFound.title)}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {T(t.notFound.backHome)}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
