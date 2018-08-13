// @flow

import { observable, action } from 'mobx';
import { getCurrentLocale, setLocale } from './index';

export default class LanguageStore {
  @observable
  locale = getCurrentLocale();

  @observable
  key = 0;

  @action
  setCurrentLanguage(langKey: string) {
    this.locale = langKey;
    setLocale(this.locale);
    this.updateApp();
  }

  @action.bound
  updateApp() {
    this.key = this.key + 1;
  }
}
