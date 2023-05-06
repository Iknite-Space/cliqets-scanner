import {Box, Text} from 'native-base';
import React from 'react';

type Props = {
  navigation: any;
};

const Home = ({navigation}: Props) => {
  return (
    <Box>
      <Text>Home screen</Text>
    </Box>
  );
};

export default Home;
