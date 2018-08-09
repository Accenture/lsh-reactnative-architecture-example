/* eslint-disable */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Header from 'Frontend/src/components/Header';
import styles from './layout.style';

// higher order component
@inject('featureToggleStore')
@observer
export default class Layout extends Component {
  featureToggle() {
    const { featureName } = this.props;
    return this.props.featureToggleStore.isFeatureEnabled(featureName);
  }

  render() {
    const { headerText, hideDrawer, onPress, featureName } = this.props;
    const showFeature = this.featureToggle();
    return (
      <View>
        <Header
          headerText={headerText}
          onPress={onPress}
          hideDrawer={hideDrawer}
        />
        {showFeature && <View>{this.props.children}</View>}
        {!showFeature && (
          <Text style={styles.textStyle}>Nothing to show here!</Text>
        )}
      </View>
    );
  }
}
Layout.defaultProps = {
  children: PropTypes.element.isRequired,
  onPress: PropTypes.element.isRequired,
  headerText: 'Header',
  hideDrawer: false,
};
Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onPress: PropTypes.func,
  headerText: PropTypes.string,
  hideDrawer: PropTypes.bool,
};
