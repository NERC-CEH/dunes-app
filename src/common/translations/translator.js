import appModel from 'appModel';
import i18n from 'i18next';
import { observe } from 'mobx';
import { initReactI18next } from 'react-i18next';
import resources from './loader';

const DEFAULT_LANGUAGE = 'en';

// console command to extract into .po file
window.getNewTerms = () => {
  let all = '';
  window.dic.forEach(word => {
    all += `\n# Context term \nmsgid "${word}"\nmsgstr "${word}"\n`;
  });
  console.log(all);
};

function saveMissingKey(key) {
  window.dic = window.dic || [];

  if (window.dic.includes(key)) {
    return;
  }

  console.warn(`🇬🇧: ${key}`);
  window.dic.push(key);
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS: 'interface',
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,

    keySeparator: false, // we do not use keys in form messages.welcome
    nsSeparator: false, // no namespace use in keys

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    saveMissing: true,
    missingKeyHandler: (_, ns, key) => {
      if (ns === 'interface') {
        saveMissingKey(key);
      }
    },
  });

observe(appModel.attrs, 'language', ({ newValue }) => {
  if (!newValue) {
    return;
  }

  i18n.changeLanguage(newValue);
});

// backwards compatible: START
window.t = key => {
  console.warn(`DEPRECATED USE OF GLOBAL t() used with: ${key}`);

  return i18n.t(key);
};
// backwards compatible: END
