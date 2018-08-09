import LanguageStore from 'Frontend/src/commons/Language/language.store';
import LoginStore from './screens/LoginForm/login.store';
import HomeStore from './screens/HomeScreen/HomeScreen.store';
import FeatureToggleStore from './layout/featureToggle.store';

export default {
  loginStore: new LoginStore(),
  homeStore: new HomeStore(),
  languageStore: new LanguageStore(),
  featureToggleStore: new FeatureToggleStore(),
};
