"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, type I18nKey, type Locale } from "./translations";

type TFn = (key: I18nKey, vars?: Record<string, string>) => string;

interface I18nState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TFn;
}

const Ctx = createContext<I18nState | null>(null);

function interpolate(template: string, vars?: Record<string, string>) {
  if (!vars) return template;
  return template.replaceAll(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("am");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("locale");
      if (saved === "am" || saved === "en") setLocaleState(saved);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<I18nState>(() => {
    const t: TFn = (key, vars) => {
      const dict = translations[locale] ?? translations.am;
      return interpolate(dict[key] ?? key, vars);
    };

    const setLocale = (l: Locale) => {
      setLocaleState(l);
      try {
        window.localStorage.setItem("locale", l);
      } catch {
        // ignore
      }
    };

    return { locale, setLocale, t };
  }, [locale]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used within I18nProvider");
  return v;
}

