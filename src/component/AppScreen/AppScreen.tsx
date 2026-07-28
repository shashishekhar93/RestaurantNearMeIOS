import React, {PropsWithChildren} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

import styles from './styles';

interface Props extends PropsWithChildren, SafeAreaViewProps {
  style?: StyleProp<ViewStyle>;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

const AppScreen = ({
  children,
  style,
  edges = ['left', 'right'],
  ...rest
}: Props) => {
  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, style]}
      {...rest}>
      {children}
    </SafeAreaView>
  );
};

export default AppScreen;
// import React, {PropsWithChildren} from 'react';
// import {StyleProp, ViewStyle} from 'react-native';
// import {
//   SafeAreaView,
//   SafeAreaViewProps,
// } from 'react-native-safe-area-context';

// import styles from './styles';

// interface Props extends PropsWithChildren, SafeAreaViewProps {
//   style?: StyleProp<ViewStyle>;
// }

// const AppScreen = ({children, style, ...rest}: Props) => {
//   return (
//     <SafeAreaView
//       edges={['top', 'left', 'right']}
//       style={[styles.container, style]}
//       {...rest}>
//       {children}
//     </SafeAreaView>
//   );
// };

// export default AppScreen;