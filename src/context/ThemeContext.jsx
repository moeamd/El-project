import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // theme: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    // default to system preference
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Apply theme to documentElement (Tailwind dark mode uses class 'dark')
  const applyThemeToDocument = useCallback((t) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(t === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    applyThemeToDocument(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore storage errors
    }
  }, [theme, applyThemeToDocument]);

  // Watch for system changes and update only if user hasn't explicitly set a choice
  useEffect(() => {
    if (!window.matchMedia) return undefined;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // If user has an explicit saved choice, don't overwrite
      const saved = localStorage.getItem("theme");
      if (saved) return;
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
    };
    try {
      mq.addEventListener
        ? mq.addEventListener("change", handleChange)
        : mq.addListener(handleChange);
    } catch (e) {
      // fallback for older browsers
      mq.addListener(handleChange);
    }

    return () => {
      try {
        mq.removeEventListener
          ? mq.removeEventListener("change", handleChange)
          : mq.removeListener(handleChange);
      } catch (e) {
        mq.removeListener(handleChange);
      }
    };
  }, []);

  const setThemeDirect = (t) => {
    setTheme(t === "dark" ? "dark" : "light");
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const value = {
    theme,
    setTheme: setThemeDirect,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
