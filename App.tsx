import {NativeBaseProvider, Text, extendTheme} from 'native-base';
import React from 'react';

import {SafeAreaView} from 'react-native';
import {CustomButton} from './src/components';

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
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView>
        <Text color="primary.500">primary 500</Text>
        <Text color="primary.300">primary 300</Text>
        <Text color="secondary.500">secondary 500</Text>
        <Text color="error.500">error 500</Text>
        <CustomButton btnText="Continue text" />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default App;
