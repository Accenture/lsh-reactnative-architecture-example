import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './Card.style';

const Card = props => (
  <View style={styles.containerStyle}>{props.children}</View>
);
Card.defaultProps = {
  children: PropTypes.element.isRequired,
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default Card;
