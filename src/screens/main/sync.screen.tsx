import React, {useEffect, useState, useRef} from 'react';
import {
  Animated,
  FlexAlignType,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Box,
  Button,
  Image,
  Flex,
  Modal,
  Progress,
  Text,
  View,
} from 'native-base';
import {CustomButton, CustomModal} from '../../components';
import {ButtonType} from '../../components/general/Button.component';
import {ModalType} from '../../components/general/Modal.component';
import jwt_decode from 'jwt-decode';

type Props = {
  navigation: any;
};

const Sync = ({navigation, route}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [status, setStatus] = useState('');
  const [events, setEvents] = useState();

  const token = route.params.tokenObj;
  const decodedToken: any = jwt_decode(token);
  const userId = decodedToken.user_id;
  const phoneNumber = decodedToken.phone_number;

  console.log('====================================');
  console.log({decodedToken});
  console.log({userId});
  console.log('====================================');

  let progress = 0;

  const progressLoading = setInterval(() => {
    if (status === 'completed') {
      progress = 100;
    } else if (progress < 80 && status === 'loading') {
      progress++;
    }
  }, 1000);

  useEffect(() => {
    const getUser = async () => {
      const resposnse = await fetch(
        `https://api.dev.cliqets.xyz/user/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(async data => {
          if (data.ok) {
            console.log('====================================');
            console.log('user exists');
            console.log('====================================');
            fetchValidator();
          } else {
            console.log('====================================');
            console.log({userNoDey: data});
            console.log('====================================');
            const userResponse = await fetch(
              `https://api.dev.cliqets.xyz/user`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  user_id: `${userId}`,
                  phone_number: `${phoneNumber}`,
                }),
              },
            ).then(async newUser => {
              if (newUser.ok) {
                console.log('====================================');
                const responseUser = newUser.json();
                console.log({responseUser});
                console.log('====================================');
              }
            });
          }
        })
        .then(() => {
          fetchValidator();
        });
    };

    const fetchValidator = async () => {
      const response = await fetch(
        `https://api.dev.cliqets.xyz/validator/verify_assignments/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      ).then(async data => {
        if (data.status == 200) {
          console.log('====================================');
          console.log('Validator Verified');
          const eventsResponse = await fetch(
            `https://api.dev.cliqets.xyz/validator/events?user_id=${userId}&start_key=0&count=10`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          )
            .then(data => {
              return data.json();
            })
            .then(newData => {
              console.log('====================================');
              console.log({events: newData});
              console.log('====================================');
              // navigation.navigate("Events", {EventsObj: newData})
              setEvents(newData);
            });
          console.log('====================================');
        } else {
          console.log('====================================');
          console.log({noEvent: data});
          console.log('====================================');
        }
      });
    };

    getUser();
  }, []);

  return (
    <View flex="1">
      <ImageBackground
        source={require('../../assets/ImageBackground1.png')}
        resizeMode="cover"
        style={styles.image}>
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
          right="0"
          position="absolute">
          <Text fontSize="md" bold>
            Online
          </Text>
          <Box rounded="full" backgroundColor="green.400" p="3"></Box>
        </Box>

        <Box mx="auto" mt="110%" alignItems="center">
          {!(showModal || showFailureModal) ? (
            <>
              <Image
                source={require('../../assets/Cliqkets_logo.png')}
                mt="3"
                alt="#"
              />
              <Text fontSize="md" color="white" mb="2" mt="5">
                Synchronizing with Server ...
              </Text>
            </>
          ) : (
            <></>
          )}

          <Box flexDirection="row" justifyContent="space-between">
            <CustomButton
              onPress={() => {
                setShowModal(true);
              }}
              btnText="Success"
              btnType={ButtonType.PRIMARY}
            />
            <CustomModal
              heading={'Success'}
              showModal={showModal}
              modalType={ModalType.SUCCESS}
              setShowModal={setShowModal}
              description={'Data Synchronized'}
              btnText={'Continue'}
              btnType={ButtonType.PRIMARY}
              onPress={() => {
                navigation.navigate('Events', {EventsObj: events});
              }}
            />

            <CustomButton
              onPress={() => {
                setShowFailureModal(true);
              }}
              btnText="Failure"
              btnType={ButtonType.PRIMARY}
            />
            <CustomModal
              heading={'Connection failed'}
              showModal={showFailureModal}
              modalType={ModalType.ERROR}
              setShowModal={setShowFailureModal}
              description={'Check your internet and try again'}
              btnText={'Try again'}
              btnType={ButtonType.PRIMARY}
              onPress={() => {}}
            />
          </Box>
        </Box>

        {!(showModal || showFailureModal) ? (
          <>
            <Box w="100%" maxW="400">
              <Progress
                value={progress}
                mx="3"
                size="xs"
                colorScheme="primary"
                mb="4"
              />
            </Box>
          </>
        ) : showModal ? (
          <>
            <Box w="100%" maxW="400">
              <Progress
                value={100}
                mx="3"
                size="xs"
                colorScheme="primary"
                mb="4"
              />
            </Box>
          </>
        ) : (
          <>
            <CustomButton btnText="Get Help" btnType={ButtonType.SECONDARY} />
          </>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    // height: "100%",
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default Sync;
