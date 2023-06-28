import {NativeBaseProvider, extendTheme} from 'native-base';
import React, {useEffect} from 'react';
// import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import MainRouter from './src/navigation';
import {Alert, PermissionStatus, Platform} from 'react-native';

const newColorTheme = {
  primary: {
    500: '#FF5500',
    300: '#FFCCB2',
  },
  secondary: {
    500: '#1500FF',
  },
  error: {
    500: '#EB250F',
  },
};
const theme = extendTheme({colors: newColorTheme});

function App(): JSX.Element {
  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     check(PERMISSIONS.IOS.CAMERA).then((res: PermissionStatus) => {
  //       console.log('here', {res});
  //       if (res === RESULTS.GRANTED) {
  //         return;
  //       }
  //       console.log({res});

  //       request(PERMISSIONS.IOS.CAMERA).then((r: PermissionStatus) => {
  //         Alert.alert('Permission status', r);
  //       });
  //     });
  //   }
  // }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <MainRouter />
    </NativeBaseProvider>
  );
}

export default App;
