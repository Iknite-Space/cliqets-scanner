import {
  BackHandler,
  Keyboard,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, Button, Image, Input, Text, View} from 'native-base';
import {useRoute} from '@react-navigation/native';
import {CustomButton} from '../../components';
import {ButtonType} from '../../components/general/Button.component';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import DownloadIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import * as jose from 'jose';

export default function Home({navigation, route}: any) {
  // const downloadGuestList = () => {};
  const [tickets, setTickets] = useState([]);

  const goBackToEvents = () => {
    navigation.goBack();
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', goBackToEvents);

  BackHandler.removeEventListener('hardwareBackPress', goBackToEvents);

  const event_id = route.params.event_id;

  // let jwtCode =
  //   'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcl9uYW1lIjoiQWtvbmVoIiwiYW1vdW50IjoiMTAiLCJ0aWNrZXRfbm8iOiIiLCJoYWxsX25vIjowLCJvcmRlcl9ubyI6IiIsInNlYXRfbm8iOjAsInRpY2tldF9uYW1lIjoiR29sZCIsIm51bWJlcl9vZl90aWNrZXRzIjoiMSIsInBob25lX251bWJlciI6IjIzNzY4MTA5OTIzOCIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiand0LmlvIiwiYXVkIjoiY2xpcWtldHMuY29tIn0.qtc_oUvwk1u84YozVway1bD0c7-JxI-BE88Kzs8jIp-lC2ZcveXL7JHRzLtcaz29OhbwnR80o_Rs0PU2aKXHrQ';

  // const verifyJWT: any = async () => {
  //   const alg = 'ES256';
  //   const spki = `-----BEGIN PUBLIC KEY-----
  //   MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVs/o5+uQbTjL3chynL4wXgUg2R9
  //   q9UU8I5mEovUf86QZ7kOBIjJwqnzD1omageEHWwHdBO6B+dFabmdT9POxg==
  //   -----END PUBLIC KEY-----`;
  //   const publicKey = await jose.importSPKI(spki, alg);

  //   const verifiedJwt = await jose.jwtVerify(jwtCode, publicKey, {
  //     issuer: 'jwt.io',
  //     audience: 'cliqkets.com',
  //   });

  //   console.log(verifiedJwt);
  // };

  useEffect(() => {
    const getTickets = async () => {
      await fetch(
        `https://api.dev.cliqets.xyz/tickets/${route.params.event_id}`,
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
          if (data) {
            setTickets(data);
          }
        });
    };
    getTickets();
  }, [route.params?.event_id]);

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
          mt="5">
          <Box maxH="50%" flex="1" flexDirection="column">
            <Image
              source={require('../../assets/Cliqkets_logoNew.png')}
              ml="5"
              alt="#"
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
            backgroundColor="#F4F4F9">
            <Text fontSize="md" bold>
              Online
            </Text>
            <Box rounded="full" backgroundColor="green.400" p="3" />
          </Box>
        </View>
        <View alignItems="center" mt="5">
          <Input
            w={{
              base: '90%',
              md: '25%',
            }}
            InputRightElement={
              <SearchIcon.Button
                name="search1"
                size={25}
                mr="2"
                color="#FF5500"
                backgroundColor="transparent"
                onPress={() => {}}
              />
            }
            placeholder="Search tickets by number, name, email"
            fontWeight="semibold"
            borderColor="primary.500"
            borderRadius="xl"
            mb="10"
            mt="7"
            size="md"
          />
          <Image
            source={require('../../assets/QR.png')}
            alt="#"
            my="5"
            mb="10"
          />
          <CustomButton
            btnType={ButtonType.PRIMARY}
            btnText="Scan Tickets"
            onPress={() => navigation.navigate('Scanner', {tickets})}
          />
          {/* <Box my="5">
            <CustomButton
              btnType={ButtonType.PRIMARY}
              btnText="Verify Tickets"
              disabled={false}
              loading={false}
              onPress={() => {
                verifyJWT();
              }}
            />
          </Box> */}

          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="16"
            mx="auto">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Tables', {
                  ticketsObj: tickets,
                  event_id: event_id,
                })
              }>
              <Text bold color="primary.500" fontSize="md">
                Print Ticket Guest List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Tables', {
                  ticketsObj: tickets,
                  event_id: event_id,
                })
              }>
              <DownloadIcon.Button
                name="file-download-outline"
                size={25}
                color="#FF5500"
                backgroundColor="transparent"
              />
            </TouchableOpacity>
          </Box>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
