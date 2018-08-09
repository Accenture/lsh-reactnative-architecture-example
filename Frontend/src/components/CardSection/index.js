import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './CardSection.style';

const CardSection = props => (
  <View style={styles.containerStyle}>{props.children}</View>
);

CardSection.defaultProps = {
  children: PropTypes.element.isRequired,
};

CardSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CardSection;
