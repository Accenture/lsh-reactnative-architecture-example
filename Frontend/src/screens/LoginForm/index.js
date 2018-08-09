import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { observer, inject, PropTypes } from 'mobx-react';
import Card from 'Frontend/src/components/Card';
import CardSection from 'Frontend/src/components/CardSection';
import Button from 'Frontend/src/components/Button';
import LoginInput from 'Frontend/src/components/LoginInput';
import Loader from 'Frontend/src/components/Loader';
import translate from 'Frontend/src/commons/Language';
import Layout from 'Frontend/src/layout';
import styles from './LoginForm.style';

@inject('loginStore', 'languageStore')
@observer
export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  onLoginSuccess() {
    this.setState({ loading: false });
    this.props.loginStore.setErrorMessage('');
    this.props.navigation.navigate('home');
  }

  onLoginFail() {
    this.props.loginStore.setErrorMessage(translate('AUTH_error'));
    this.setState({ loading: false });
  }

  saveEmail(e) {
    this.props.loginStore.setEmail(e.nativeEvent.text);
  }

  savePassword(e) {
    this.props.loginStore.setPassword(e.nativeEvent.text);
  }

  onButtonPress() {
    this.setState({ loading: true });
    const loggedIn =
      this.props.loginStore.requestLogInWithEmailPassword &&
      this.props.loginStore.isLoggedIn;
    if (loggedIn) {
      this.onLoginSuccess();
    } else {
      this.onLoginFail();
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <Loader size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress}>
        <Text>{translate('AUTH_login')}</Text>
      </Button>
    );
  }

  render() {
    const { errorTextStyle, translateText, translateContainer } = styles;
    const langs = ['fi', 'en', 'sv'];
    return (
      <Layout headerText={'AUTH_title'} featureName="Auth" hideDrawer>
        <View key={this.props.languageStore.key}>
          <Card>
            <CardSection>
              <LoginInput
                placeholder={'email@email.com'}
                label={translate('AUTH_email')}
                value={this.props.loginStore.email}
                onChangeText={this.saveEmail}
              />
            </CardSection>
            <CardSection>
              <LoginInput
                secureTextEntry
                placeholder={'*******'}
                label={translate('AUTH_password')}
                value={this.props.loginStore.password}
                onChangeText={this.savePassword}
              />
            </CardSection>
            <Text style={errorTextStyle}>
              {this.props.loginStore.errorMessage}
            </Text>
            <CardSection>{this.renderButton()}</CardSection>
          </Card>
          <View style={translateContainer}>
            {langs.map(lang => (
              <TouchableOpacity
                key={lang}
                onPress={() =>
                  this.props.languageStore.setCurrentLanguage(lang)
                }
              >
                <Text style={translateText}> {lang.toUpperCase()} </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Layout>
    );
  }
}

LoginForm.propTypes = {
  loginStore: PropTypes.objectOrObservableObject,
  navigation: PropTypes.objectOrObservableObject,
  languageStore: PropTypes.objectOrObservableObject,
};
