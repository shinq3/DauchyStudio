import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ICU from 'i18next-icu';
import { defaultLocale, locales } from '@shared/i18n';

// Import translation resources
import jaCommon from './locales/ja/common.json';
import jaHeader from './locales/ja/header.json';
import jaFooter from './locales/ja/footer.json';
import jaHome from './locales/ja/pages/home.json';
import jaProducts from './locales/ja/pages/products.json';
import jaContact from './locales/ja/pages/contact.json';
import jaNews from './locales/ja/pages/news.json';

import enCommon from './locales/en/common.json';
import enHeader from './locales/en/header.json';
import enFooter from './locales/en/footer.json';
import enHome from './locales/en/pages/home.json';
import enProducts from './locales/en/pages/products.json';
import enContact from './locales/en/pages/contact.json';
import enNews from './locales/en/pages/news.json';

import viCommon from './locales/vi/common.json';
import viHeader from './locales/vi/header.json';
import viFooter from './locales/vi/footer.json';
import viHome from './locales/vi/pages/home.json';
import viProducts from './locales/vi/pages/products.json';
import viContact from './locales/vi/pages/contact.json';
import viNews from './locales/vi/pages/news.json';

const resources = {
  ja: {
    common: jaCommon,
    header: jaHeader,
    footer: jaFooter,
    home: jaHome,
    products: jaProducts,
    contact: jaContact,
    news: jaNews,
  },
  en: {
    common: enCommon,
    header: enHeader,
    footer: enFooter,
    home: enHome,
    products: enProducts,
    contact: enContact,
    news: enNews,
  },
  vi: {
    common: viCommon,
    header: viHeader,
    footer: viFooter,
    home: viHome,
    products: viProducts,
    contact: viContact,
    news: viNews,
  },
};

i18n
  .use(ICU)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    supportedLngs: locales,
    
    // Language detection configuration
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    
    // Namespace configuration
    defaultNS: 'common',
    ns: ['common', 'header', 'footer', 'home', 'products', 'contact', 'news'],
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    debug: import.meta.env.MODE === 'development',
  });

export default i18n;