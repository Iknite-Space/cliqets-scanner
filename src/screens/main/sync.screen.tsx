import React, {useEffect, useState, useRef} from 'react';
import {
  Animated,
  Alert,
  BackHandler,
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
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

type Props = {
  navigation: any;
  route: any;
};

const Sync = ({navigation, route}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [status, setStatus] = useState('');
  const [events, setEvents] = useState();
  const [progress, setProgress] = useState(0);
  const [reload, setReload] = useState(false);

  const token = route.params.tokenObj;
  const decodedToken: any = jwt_decode(token);
  const userId = decodedToken.user_id;
  const phoneNumber = decodedToken.phone_number;

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        if (status === 'completed') {
          setProgress(100);
        } else if (status === 'loading' && progress < 80) {
          setProgress(progress + 25);
        }
      }
    }, 250);
    return () => clearInterval(interval);
  }, [progress, status]);

  useEffect(() => {
    const getUser = async () => {
      fetch(`https://api.dev.cliqets.xyz/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async data => {
          if (data.ok) {
            fetchValidator();
          } else {
            fetch('https://api.dev.cliqets.xyz/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                user_id: `${userId}`,
                phone_number: `${phoneNumber}`,
              }),
            }).then(async newUser => {
              if (newUser.ok) {
                const responseUser = newUser.json();
              }
            });
          }
        })
        .then(() => {
          fetchValidator();
        })
        .catch(error => {
          console.log('AN ERROR OCCURED: ', error);
          setShowFailureModal(true);
        });
    };

    const fetchValidator = async () => {
      setStatus('loading');
      fetch(
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
          fetch(
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
              setEvents(newData);
              setStatus('completed');
            })
            .catch(error => {
              console.log('error: ', error);
              setStatus('failed');
            });
        } else {
          setStatus('failed');
        }
      });
    };

    getUser();
  }, [reload]);

  useFocusEffect(() => {
    const exitApp = () => {
      Alert.alert(
        'Sign Out?',
        'Logging out of the application',
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'OK',
            onPress: () => {
              auth()
                .signOut()
                .then(() => {
                  navigation.navigate('AuthStack');
                });
            },
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', exitApp);
  });

  useEffect(() => {
    if (status === 'failed') {
      setShowFailureModal(true);
    }
    if (status === 'completed') {
      setShowModal(true);
    }
  }, [status]);

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
          <Box rounded="full" backgroundColor="green.400" p="3" />
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
            <CustomModal
              heading={'Connection failed'}
              showModal={showFailureModal}
              modalType={ModalType.ERROR}
              setShowModal={setShowFailureModal}
              description={'Check your internet and try again'}
              btnText={'Try again'}
              btnType={ButtonType.PRIMARY}
              onPress={() => {
                setReload(!reload);
                setShowFailureModal(false);
              }}
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
                bg="coolGray.100"
                _filledTrack={{bg: 'primary.500'}}
                mb="4"
              />
            </Box>
          </>
        ) : showModal ? (
          <>
            <Box w="100%" maxW="400">
              <Progress
                value={progress}
                mx="3"
                size="xs"
                bg="coolGray.100"
                _filledTrack={{bg: 'primary.500'}}
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
