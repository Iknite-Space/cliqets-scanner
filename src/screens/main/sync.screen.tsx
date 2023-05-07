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

const Sync = ({ navigation, route }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [status, setStatus] = useState('');

  const token = route.params.tokenObj
  const decodedToken: any = jwt_decode(token);
  const userId = decodedToken.user_id;

  let progress = 0;
  let Events: any = null

  const progressLoading = setInterval(() => {
    if (status === 'completed') {
      progress = 100;
    } else if (progress < 80 && status === 'loading') {
      progress++;
    }
  }, 1000);

  useEffect(() => {
    
    const fetchValidator = async () => {
      const response = await fetch(`https://api.dev.cliqets.xyz/validator/verify_assignments/${userId}`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then(async (data) => {
        if (data.status == 200) {
          console.log('====================================');
          console.log("Validator Verified");
          const eventsResponse = await fetch(`https://api.dev.cliqets.xyz/validator/events?user_id=${userId}&start_key=0&count=10`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }).then((data) => {
            return data.json();
          }).then((newData) => {
            console.log('====================================');
            console.log({newData});
            console.log('====================================');
            // navigation.navigate("Events", {EventsObj: newData})
            Events = newData;
          })
          console.log('====================================');
        } else {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
        }
      })
    }

    fetchValidator()
  }, []) 


  // try {
  //   setStatus('loading')
  //   fetchValidator();

  // } catch (error) {
  //   setStatus('failed')
  // }finally{
  //   setStatus('completed')
  // }
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
                //   mx="auto"
                mt="3"
                alt="#"

                // w="167px"
                // h="48px"
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
              setShowModal={
                setShowModal
            }
              description={'Data Synchronized'}
              btnText={'Continue'}
              btnType={ButtonType.PRIMARY}
              onPress={() => {
                navigation.navigate("Events", {EventsObj: Events});
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
              setShowModal={setShowFailureModal
            }
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
              {/* <Progress.Bar progress={0.3} width={200} height={1} color="#3935F4" animationConfig={{bounciness: 1}} /> */}
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
              {/* <Progress.Bar progress={0.3} width={200} height={1} color="#3935F4" /> */}
            </Box>
          </>
        ) : (
          <>
            <Button
              rounded="full"
              py="2"
              px="0.5"
              backgroundColor="#3935F400"
              w="50%"
              mx="auto"
              borderColor="#3935F4"
              borderWidth="2">
              <Text bold color="#3935F4">
                Get Help
              </Text>
            </Button>
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
