import React, { Component } from 'react';
import { View, YellowBox } from 'react-native';
import { Provider } from 'mobx-react';
// import codePush from 'react-native-code-push';  /* commenting because of build fail*/
import styles from './layout/layout.style';
import stores from './Stores';
import Navigator from './Navigator';

// @codePush
export default class App extends Component {
  render() {
    const { navigatorStyle, viewStyle } = styles;
    const store = stores;

    // Ignore isMounted deprecated warnings until React Native fixes the issue
    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated',
      'Module RCTImageLoader',
      'Warning: `flexWrap: `wrap`` is not supported',
    ]);
    return (
      <View style={viewStyle}>
        <Provider {...store}>
          <Navigator style={navigatorStyle} />
        </Provider>
      </View>
    );
  }
}
