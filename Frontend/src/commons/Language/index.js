// @flow
import I18n from 'react-native-i18n';
import fi from './fi';
import sv from './sv';
import en from './en';

I18n.fallbacks = true;
I18n.missingBehaviour = 'guess';
I18n.defaultLocale = 'en';
I18n.locale = 'en';
I18n.translations = {
  en,
  fi,
  sv,
};
export const setLocale = (locale: string) => {
  I18n.locale = locale;
};
export const getCurrentLocale = () => I18n.locale;
export const translateHeaderText = (langKey: string) => ({
  screenProps,
}: Object) => {
  const title = I18n.translate(langKey, screenProps.language);
  return { title };
};

export default I18n.translate.bind(I18n);
