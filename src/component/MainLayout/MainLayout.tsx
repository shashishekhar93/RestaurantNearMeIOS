import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

import AppScreen from '../AppScreen';
import TopHeader from '../../navigation/TopHeader';

import styles from './styles';

const MainLayout = ({children}: PropsWithChildren) => {
  return (
    <AppScreen edges={['top', 'left', 'right']} style={styles.container}>
      <TopHeader />
      <View style={styles.content}>{children}</View>
    </AppScreen>
  );
};

export default MainLayout;