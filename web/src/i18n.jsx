import React, { createContext, useContext, useState, useEffect } from 'react';

import en from './locales/en.json';
import zh from './locales/zh.json';
import zh_tw from './locales/zh_tw.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';

const translations = { en, zh, zh_tw, ja, ko };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('bitmemo_web_lang') || 'zh');

  useEffect(() => {
    localStorage.setItem('bitmemo_web_lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
