import {Platform} from 'react-native';

const Shadows = {
  card:
    Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6,
        }
      : {
          elevation: 4,
        },
};

export default Shadows;