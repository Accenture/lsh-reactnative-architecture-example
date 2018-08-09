import React, { Component } from 'react';
import { Text } from 'react-native';
import Layout from 'Frontend/src/layout';

export default class App extends Component {
  render() {
    return (
      <Layout
        headerText="SETTINGS_title"
        onPress={this.props.navigation.toggleDrawer}
        featureName="Settings"
      >
        <Text>Settings</Text>
      </Layout>
    );
  }
}
