import {NativeBaseProvider, extendTheme} from 'native-base';
import React from 'react';

import MainRouter from './src/navigation';

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
      <MainRouter />
    </NativeBaseProvider>
  );
}

export default App;
