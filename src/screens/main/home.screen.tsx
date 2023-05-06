import {
  Keyboard,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect} from 'react';
import {Box, Button, Image, Text, View} from 'native-base';

export default function Home({navigation}: any) {
  const downloadGuestList = () => {};
  const verifyAssigments = async () => {
    await fetch(
      'https://api.dev.cliqets.xyz/validator/events?user_id=CZZHRog4j4c129cl9HaCbNOBZFA2&start_key=0&count=10',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ1paSFJvZzRqNGMxMjljbDlIYUNiTk9CWkZBMiJ9.SqjofIeuKAhLuoFhYhS6ZB2L03bBFSeZAD5MAhVuWWU',
        },
      },
    )
      .then(data => (data.ok ? data.json() : data.json()))
      .then(data => {
        console.log(data);
      });
  };

  useEffect(() => {
    const events = verifyAssigments();
    console.log(events);
    // events.then(async () => {

    // });
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View backgroundColor="#FFF" h="full">
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          // mt="1"
        >
          <Box maxH="50%" flex="1" flexDirection="column">
            <Image
              source={require('../../assets/Cliqkets_logo_3.jpg')}
              ml="5"
              // mt="3"
              alt="#"
              // w="167px"
              // h="48px"
            />
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            rounded="full"
            p="1"
            px="2"
            w="27%"
            mr="3"
            mt="4"
            backgroundColor="#F4F4F9"
            // right="0"
            // position="absolute"
          >
            <Text fontSize="md" bold>
              Online
            </Text>
            <Box rounded="full" backgroundColor="green.400" p="3"></Box>
          </Box>
        </View>
        <View alignItems="center" mt="5">
          <Image source={require('../../assets/QR.png')} alt="#" my="5" />
          <Button
            backgroundColor="#3935F4"
            rounded="full"
            px="8"
            py="4"
            mt="3"
            mb="10"
            onPress={() => navigation.navigate('Scanner')}>
            <Text bold color="white" fontSize="lg">
              Scan Tickets
            </Text>
          </Button>

          <Box flexDirection="row" w="55%" alignItems="center">
            <TouchableOpacity onPress={() => downloadGeustList}>
              <Text bold color="#3935F4" fontSize="md">
                Print Guest List
              </Text>
            </TouchableOpacity>
          </Box>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
