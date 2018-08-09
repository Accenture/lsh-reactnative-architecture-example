import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import translate from 'Frontend/src/commons/Language';
import styles from './Header.style';

const Header = ({ onPress, headerText, hideDrawer }) => {
  const { textStyle, viewStyle, hamburgerStyle } = styles;
  return (
    <View style={viewStyle}>
      <View style={hamburgerStyle}>
        <TouchableOpacity onPress={onPress}>
          {!hideDrawer && <Icon name="menu" />}
        </TouchableOpacity>
      </View>
      <Text style={textStyle}>{translate(headerText)}</Text>
      <TouchableOpacity onPress={onPress}>
        {!hideDrawer && <Icon name="notifications-none" />}
      </TouchableOpacity>
    </View>
  );
};

Header.defaultProps = {
  headerText: 'Header',
  onPress: PropTypes.func.isRequired,
  hideDrawer: false,
};

Header.propTypes = {
  headerText: PropTypes.string,
  onPress: PropTypes.func,
  hideDrawer: PropTypes.bool,
};

export default Header;
