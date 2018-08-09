import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import styles from './Loader.styles';

const Loader = ({ size }) => (
  <View style={styles}>
    <ActivityIndicator size={size} />
  </View>
);

Loader.defaultProps = {
  size: 'large',
};

Loader.propTypes = {
  size: PropTypes.string,
};

export default Loader;
