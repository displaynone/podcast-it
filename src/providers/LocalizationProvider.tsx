import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { getLocales } from 'expo-localization';
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { messages as messagesAr } from '../locales/ar/messages';
import { messages as messagesCa } from '../locales/ca/messages';
import { messages as messagesDe } from '../locales/de/messages';
import { messages as messagesEn } from '../locales/en/messages';
import { messages as messagesEs } from '../locales/es/messages';
import { messages as messagesEu } from '../locales/eu/messages';
import { messages as messagesFr } from '../locales/fr/messages';
import { messages as messagesGl } from '../locales/gl/messages';
import { messages as messagesHi } from '../locales/hi/messages';
import { messages as messagesIt } from '../locales/it/messages';
import { messages as messagesJa } from '../locales/ja/messages';
import { messages as messagesKo } from '../locales/ko/messages';
import { messages as messagesPl } from '../locales/pl/messages';
import { messages as messagesPt } from '../locales/pt/messages';
import { messages as messagesUr } from '../locales/ur/messages';
import { messages as messagesZh } from '../locales/zh/messages';
import {
  ComponentWithChildren,
  Locale,
  Locales,
  TextDirection,
} from '../types';

export type LocaleContextInterface = {
  locale: string;
  textDirection: TextDirection;
};

export const defaultLocale: Locale = 'en';
export const defaultTextDirection: TextDirection = 'ltr';

export const messages: Record<Locale, any> = {
  ar: messagesAr,
  ca: messagesCa,
  de: messagesDe,
  en: messagesEn,
  es: messagesEs,
  eu: messagesEu,
  fr: messagesFr,
  gl: messagesGl,
  hi: messagesHi,
  it: messagesIt,
  ja: messagesJa,
  ko: messagesKo,
  pl: messagesPl,
  pt: messagesPt,
  ur: messagesUr,
  zh: messagesZh,
};

const loadLanguage = (locale: Locale) => {
  i18n.loadAndActivate({ locale, messages: messages[locale] });
};
loadLanguage(defaultLocale);

const initialLocaleContext: LocaleContextInterface = {
  locale: defaultLocale,
  textDirection: defaultTextDirection,
};

const LocaleContext =
  createContext<LocaleContextInterface>(initialLocaleContext);
export const useLocaleContext = () => useContext(LocaleContext);

const LocalizationProvider: FC<ComponentWithChildren> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [textDirection, setTextDirection] =
    useState<TextDirection>(defaultTextDirection);

  useState<TextDirection>(defaultTextDirection);

  useEffect(() => {
    const mobileLocale = getLocales().find(l =>
      Locales.includes(l.languageCode as Locale),
    );
    const locale: Locale = mobileLocale?.languageCode as Locale;
    setLocale(locale);
    loadLanguage(locale);
    setTextDirection(mobileLocale?.textDirection as TextDirection);
  }, []);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        textDirection,
      }}
    >
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleContext.Provider>
  );
};

export default LocalizationProvider;
