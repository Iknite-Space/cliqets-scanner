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
import { CustomButton } from '../../components';
import { ButtonType } from '../../components/general/Button.component';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import DownloadIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home({navigation, route}: any) {
  const downloadGuestList = () => {};
  const [tickets, setTickets] = useState([]);

  const goBackToEvents = () => {
    navigation.goBack();
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', goBackToEvents);

  BackHandler.removeEventListener("hardwareBackPress", goBackToEvents);

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
          mt="5"
        >
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
            backgroundColor="#F4F4F9"
          >
            <Text fontSize="md" bold>
              Online
            </Text>
            <Box rounded="full" backgroundColor="green.400" p="3"></Box>
          </Box>
        </View>
        <View alignItems="center" mt="5">
        <Input
            w={{
              base: "90%",
              md: "25%",
            }}
            InputRightElement={
              <SearchIcon.Button name="search1" size={25} mr="2" color="#FF5500" backgroundColor="transparent" onPress={() => {}}/>
            }
            placeholder="Search tickets by number, name, email"
            fontWeight="semibold"            
            borderColor="primary.500"
            borderRadius="xl"
            mb="10"
            mt="7"
            size="md"
          />
          <Image source={require('../../assets/QR.png')} alt="#" my="5" mb="10" />
          <CustomButton btnType={ButtonType.PRIMARY} btnText='Scan Tickets' onPress={() => navigation.navigate('Scanner', {tickets})}/>

          <Box flexDirection="row" justifyContent="space-between" alignItems="center" mt="16" mx="auto">
            <TouchableOpacity onPress={() => downloadGuestList}>
              <Text bold color="primary.500" fontSize="md">
                Print Ticket Guest List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => downloadGuestList}>
              <DownloadIcon.Button name="file-download-outline" size={25} color="#FF5500" backgroundColor="transparent" />
            </TouchableOpacity>
          </Box>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
