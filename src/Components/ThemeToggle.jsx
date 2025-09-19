import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center rounded-full bg-gray-200 dark:bg-card transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-card"
      aria-label={t("theme.toggleTheme")}
    >
      <span
        className={`h-8 w-8 transform rounded-full bg-white dark:bg-text-dark shadow transition-transform duration-300 flex items-center justify-center ${
          theme === "dark" ? "translate-x-10" : "translate-x-1"
        }`}
      >
        {theme === "light" ? (
          <Sun className="h-4 w-4 text-yellow-500" />
        ) : (
          <Moon className="h-4 w-4 text-blue-400" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
