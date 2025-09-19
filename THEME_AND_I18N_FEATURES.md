# Theme and Internationalization Features

This document describes the newly implemented dark/light theme switching and Arabic/English language support features.

## 🌓 Dark/Light Theme Feature

### Features:

- **Smooth Theme Switching**: Toggle between light and dark modes with smooth transitions
- **Persistent Storage**: Theme preference is saved in localStorage
- **System Preference Detection**: Automatically detects user's system theme preference
- **Professional UI**: Beautiful toggle switch with sun/moon icons
- **CSS Transitions**: All elements transition smoothly when switching themes

### Implementation:

- **ThemeContext**: React context for global theme management
- **ThemeProvider**: Wraps the entire app to provide theme state
- **ThemeToggle Component**: Professional toggle switch component
- **Tailwind Dark Mode**: Configured with class-based dark mode support

### Usage:

```jsx
import { useTheme } from "./context/ThemeContext";

const { theme, toggleTheme, isDark } = useTheme();
```

## 🌍 Internationalization (i18n) Feature

### Features:

- **Arabic & English Support**: Full translation support for both languages
- **RTL Support**: Proper right-to-left layout for Arabic
- **Language Persistence**: Language preference saved in localStorage
- **Professional Language Toggle**: Clean button with globe icon
- **Smooth Language Switching**: Instant language switching with proper RTL/LTR handling

### Supported Languages:

- **English (en)**: Default language
- **Arabic (ar)**: Full RTL support with proper text direction

### Implementation:

- **react-i18next**: Industry-standard i18n library
- **Translation Files**: JSON files for each language in `src/i18n/locales/`
- **LanguageToggle Component**: Professional language switcher
- **Automatic RTL/LTR**: Document direction changes automatically

### Translation Keys:

```json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "noData": "No data found",
    "viewDetails": "View Details",
    "publish": "Publish",
    "unpublish": "Unpublish",
    "hours": "Hours",
    "noMedia": "No Media"
  },
  "dashboard": {
    "title": "All Courses",
    "courses": "Courses"
  },
  "theme": {
    "light": "Light",
    "dark": "Dark",
    "toggleTheme": "Toggle Theme"
  },
  "language": {
    "english": "English",
    "arabic": "العربية",
    "toggleLanguage": "Toggle Language"
  }
}
```

## 🎨 UI Components

### ThemeToggle Component

- Beautiful animated toggle switch
- Sun icon for light mode, moon icon for dark mode
- Smooth sliding animation
- Accessible with proper ARIA labels

### LanguageToggle Component

- Clean button design with globe icon
- Shows current language and toggles to the other
- Proper RTL/LTR handling
- Smooth color transitions

## 🚀 How to Use

### Theme Switching:

1. Click the theme toggle button (sun/moon icon) in the top-right corner
2. The entire app will smoothly transition between light and dark themes
3. Your preference is automatically saved

### Language Switching:

1. Click the language toggle button (globe icon) in the top-right corner
2. The app will switch between English and Arabic
3. Arabic text will display right-to-left automatically
4. Your language preference is saved

## 🛠 Technical Details

### Files Added/Modified:

- `src/context/ThemeContext.jsx` - Theme management context
- `src/i18n/i18n.js` - i18n configuration
- `src/i18n/locales/en.json` - English translations
- `src/i18n/locales/ar.json` - Arabic translations
- `src/Components/ThemeToggle.jsx` - Theme toggle component
- `src/Components/LanguageToggle.jsx` - Language toggle component
- `src/Dashboard/CoursesDahsbord.jsx` - Updated with theme and i18n support
- `src/main.jsx` - Added providers
- `src/index.css` - Added Tailwind and custom styles
- `tailwind.config.js` - Dark mode configuration

### Dependencies Added:

- `react-i18next` - React internationalization
- `i18next` - Core i18n library
- `i18next-browser-languagedetector` - Language detection

## 🎯 Features Highlights

✅ **Professional Design**: Clean, modern UI components
✅ **Smooth Animations**: 300ms transitions for all theme changes
✅ **Accessibility**: Proper ARIA labels and keyboard navigation
✅ **Performance**: Optimized with localStorage caching
✅ **Responsive**: Works perfectly on all screen sizes
✅ **RTL Support**: Full right-to-left layout for Arabic
✅ **System Integration**: Respects user's system theme preference
✅ **Persistence**: User preferences saved across sessions

## 🔧 Customization

### Adding New Translations:

1. Add new keys to both `en.json` and `ar.json`
2. Use the translation key in components with `t('key')`

### Modifying Theme Colors:

1. Update `tailwind.config.js` dark mode colors
2. Modify CSS custom properties in `index.css`

### Adding New Languages:

1. Create new translation file in `src/i18n/locales/`
2. Add language to i18n configuration
3. Update LanguageToggle component

The implementation is fully professional, smooth, and maintains all existing functionality while adding these powerful new features.
