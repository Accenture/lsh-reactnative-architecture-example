import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { observer, inject } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import { ScrollView, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import translate from 'Frontend/src/commons/Language';
import styles from './SideMenu.style';

@inject('languageStore', 'loginStore')
@observer
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.navigateToScreen = this.navigateToScreen.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
  }

  navigateToScreen(route) {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  onLogoutPress() {
    this.props.loginStore.logout();
    this.props.navigation.navigate('Login');
  }

  render() {
    const randomLang = ['en', 'fi', 'sv'][Math.floor(Math.random() * 3)];
    const list = [
      {
        title: translate('LANGUAGE'),
        icon: 'language',
        onPress: () =>
          this.props.languageStore.setCurrentLanguage(randomLang),
      },
      {
        title: translate('HOME_title'),
        icon: 'home',
        onPress: () => this.navigateToScreen('home'),
      },
      {
        title: translate('LOGOUT'),
        icon: 'power-settings-new',
        onPress: () => {
          Alert.alert(
            translate('LOGOUT'),
            translate('LOGOUT_desc'),
            [
              {
                text: translate('CANCEL'),
                style: 'cancel',
              },
              {
                text: translate('OK'),
                onPress: this.onLogoutPress,
              },
            ],
            { cancelable: false },
          );
        },
      },
    ];
    return (
      <View style={styles.container} key={this.props.languageStore.key}>
        <ScrollView>
          <ListItem
            rightTitle={translate('MENU_title')}
            rightIcon={{ name: 'cancel' }}
            onPress={this.props.navigation.toggleDrawer}
          />
          {list.map(item => (
            <ListItem
              key={item.icon}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={item.onPress}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object,
};

export default SideMenu;
