import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        invalidData: "Invalid Data",
        save: "Save",
        notSaved: "Changes are not saved",
        translation: require('./locales/en/translation.json'),
      },
      he: {
        invalidData: "נתונים לא תקינים",
        save: "שמור",
        notSaved: "השינויים לא נשמרו",
        translation: require('./locales/he/translation.json'),
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
