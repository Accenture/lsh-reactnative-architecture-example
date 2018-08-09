import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import styles from './LoginInput.style';

const Input = ({
  placeholder,
  label,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChange={onChangeText}
        style={inputStyle}
      />
    </View>
  );
};
Input.defaultProps = {
  placeholder: 'enter here',
  label: 'label',
  value: '',
  onChangeText: PropTypes.element.isRequired,
  secureTextEntry: false,
};

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
};
export default Input;
