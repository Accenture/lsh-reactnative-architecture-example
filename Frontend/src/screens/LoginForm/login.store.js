// @flow

import { observable, action, computed } from 'mobx';
import { AsyncStorage } from 'react-native';

export default class LoginStore {
  @observable
  email = '';

  @observable
  password = '';

  @observable
  jwtToken = '';

  @observable
  isAuthenticated = false;

  @observable
  errorMessage = '';

  @action
  setEmail(newEmail: string) {
    this.email = newEmail;
  }

  @action
  setPassword(newPassword: string) {
    this.password = newPassword;
  }

  @action
  async setJwtToken(newToken: string) {
    this.jwtToken = newToken;
    await AsyncStorage.removeItem(this.jwtToken);
    await AsyncStorage.setItem(this.jwtToken, newToken);
  }

  @action
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  async getJwtToken() {
    if (this.jwtToken) {
      return (this.jwtToken: string);
    }
    await AsyncStorage.getItem(this.jwtToken);
    return this.jwtToken;
  }

  @computed
  get isLoggedIn(): boolean {
    return !!this.jwtToken && !!this.isAuthenticated;
  }

  @computed
  get requestLogInWithEmailPassword(): boolean {
    if (this.email === 'email' && this.password === 'password') {
      this.jwtToken = 'newToken';
      this.isAuthenticated = true;
      return this.isAuthenticated;
    }
    return false;
  }

  @action
  logout() {
    this.jwtToken = '';
    this.isAuthenticated = false;
  }
}
