import React from 'react';
import {Text, TextProps} from 'react-native';

import styles from './styles';

const AppText = ({style, ...rest}: TextProps) => {
  return <Text style={[styles.text, style]} {...rest} />;
};

export default AppText;