import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import i18n from "../i18n/i18n";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

export const LanguageProvider = ({ children }) => {
  const getInitial = () => {
    try {
      return i18n.language || localStorage.getItem("i18nextLng") || "en";
    } catch (e) {
      return "en";
    }
  };

  const [language, setLanguageState] = useState(getInitial);

  const setLanguage = useCallback((lng) => {
    setLanguageState(lng);
    try {
      i18n.changeLanguage(lng);
      localStorage.setItem("i18nextLng", lng);
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    } catch (e) {
      // ignore
    }
  }, []);

  // Ensure i18n changes reflect here
  useEffect(() => {
    const handle = (lng) => setLanguageState(lng);
    i18n.on("languageChanged", handle);
    return () => i18n.off("languageChanged", handle);
  }, []);

  // apply initial html attrs
  useEffect(() => {
    try {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    } catch (e) {}
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "ar" : "en");
  }, [language, setLanguage]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
