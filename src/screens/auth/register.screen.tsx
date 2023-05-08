import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Box,
  Button,
  FormControl,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  View,
} from 'native-base';
import PhoneInput from 'react-native-phone-input';
import auth from '@react-native-firebase/auth';
import {OTP} from 'react-native-otp-form';
import {CustomButton, CustomModal} from '../../components';
import {ButtonType} from '../../components/general/Button.component';
import {ModalType} from '../../components/general/Modal.component';

type Props = {
  navigation: any;
};

const Register = ({navigation}: Props) => {
  const newRef = useRef('phone');
  const [phoneNumber, setPhoneNumber] = useState('+237670000000');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [showBackground, setShowBackground] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [newToken, setNewToken] = useState('eyJhbGciOiJIUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiICIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jbGlxZXRzLTRmY2U4IiwiYXVkIjoiY2xpcWV0cy00ZmNlOCIsImF1dGhfdGltZSI6MTY4MzM5NjE5NCwidXNlcl9pZCI6ImJiNTZhMTU5LTIyMjItNGU2ZC05OWI3LTk4ODNjMmE3MDlkYiIsInN1YiI6ImJiNTZhMTU5LTIyMjItNGU2ZC05OWI3LTk4ODNjMmE3MDlkYiIsImlhdCI6MTY4MzM5OTc4MSwiZXhwIjoxNjgzNDAzMzgxLCJwaG9uZV9udW1iZXIiOiIrMjM3NjU0MTMxMDI3IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMjM3Njc1NDEzMTAyNyJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.TDBKDbY9_xM0lH7HJjRPAqnLLiMd79D1CP-1sjN9UQU');

  const changeBackground = async (now: any) => {
    setShowBackground(now);
  };

  
  useEffect(() => {
    // const onAuthStateChanged = (user: any) => {
    //   if (user) {
    //     user
    //       .getIdToken()
    //       .then((token: React.SetStateAction<string>) =>
    //         navigation.navigate('MainStack', {
    //           screen: 'Sync',
    //           params: {tokenObj: token},
    //         }),
    //       );
    //   }
    // };
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;
  }, []);

  const login: any = async (phoneNumber: any) => {
    console.log('====================================');
    console.log({phoneNumber});
    console.log('====================================');
    const confirmation: any = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('====================================');
    console.log({confirmation});
    console.log('====================================');
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    console.log('in confirm code');
    try {
      await confirm.confirm(code).then((user: any) => {
        console.log('Code Activated');
        console.log('====================================');
        // const token = user.getIdToken()
        console.log('====================================');
        console.log({user});
        console.log('====================================');
        navigation.navigate('MainStack');
      });
    } catch (error) {
      console.log('Invalid Code.');
    }
  };

  if (!confirm) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          changeBackground(true);
        }}>
        <View flex="1">
          {showBackground ? (
            <>
              <ImageBackground
                source={require('../../assets/ImageBackground1.png')}
                resizeMode="cover"
                style={styles.image}>
                <Image
                  source={require('../../assets/Cliqkets_logo.png')}
                  ml="5"
                  mt="3"
                  alt="logo"
                />
                <Text fontSize="4xl" color="white" bold mx="auto" mb="2">
                  Validator
                </Text>
              </ImageBackground>
            </>
          ) : (
            <>
              <Box maxH="50%" flex="1" flexDirection="column">
                <Image
                  source={require('../../assets/Cliqkets_logo_3.jpg')}
                  ml="5"
                  mt="3"
                  alt="#"
                />
              </Box>
            </>
          )}

          <View flexDirection="column" justifyContent="space-between">
            <Text fontSize="2xl" color="black" bold ml="5" my="2">
              Sign in to continue
            </Text>

            <FormControl width="100" my="3" ml="5">
              <Flex direction="row" align="center">
                <InputGroup>
                  <PhoneInput
                    ref={newRef}
                    initialCountry={'cm'}
                    textProps={{placeholder: 'Enter your phone number'}}
                    flagStyle={{width: 50, height: 35, borderRadius: 5}}
                    onChangePhoneNumber={number => {
                      setPhoneNumber(number);
                    }}
                    textStyle={{
                      width: 200,
                      backgroundColor: 'lightgray',
                      height: 39,
                      borderRadius: 5,
                      paddingLeft: 10,
                    }}
                  />
                </InputGroup>
              </Flex>
            </FormControl>

            <CustomButton
              onPress={() => {
                login(phoneNumber);
              }}
              btnText="Verify phone number"
              btnType={ButtonType.PRIMARY}
            />
            <CustomModal
              heading={'Connection failed'}
              showModal={false}
              modalType={ModalType.ERROR}
              setShowModal={() => {}}
              description={'Check your internet and try again'}
              btnText={'Try again'}
              btnType={ButtonType.PRIMARY}
              onPress={() => {}}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        changeBackground(true);
      }}>
      <View flex="1">
        {showBackground ? (
          <>
            <ImageBackground
              source={require('../../assets/ImageBackground1.png')}
              resizeMode="cover"
              style={styles.image}>
              <Image
                source={require('../../assets/Cliqkets_logo.png')}
                ml="5"
                mt="3"
                alt="#"
              />
              <Text fontSize="4xl" color="white" bold mx="auto" mb="2">
                Validator
              </Text>
            </ImageBackground>
          </>
        ) : (
          <>
            <Box maxH="50%" flex="1" flexDirection="column">
              <Image
                source={require('../../assets/Cliqkets_logo_3.jpg')}
                ml="5"
                mt="3"
                alt="#"
                // w="167px"
                // h="48px"
              />
            </Box>
          </>
        )}
        <Text fontSize="2xl" color="black" bold ml="5" my="2">
          Verify your number
        </Text>
        <Text fontSize="md" color="black" ml="5" my="2" flexWrap="wrap">
          Enter the 6 Digit code sent to your number - e.g. 6 1 2 3 4 5
        </Text>

        <OTP
          codeCount={6}
          containerStyle={{marginTop: 16, marginBottom: 16}}
          otpStyles={{backgroundColor: '#ddd', padding: -20}}
          keyboardType="numeric"
          onFinish={(value: any) => {
            setCode(value);
          }}
        />

        <Button
          mt="3"
          backgroundColor="#3935F4"
          onPress={() => confirmCode()}
          rounded="3xl"
          py="3"
          px="0"
          ml="5"
          width="45%">
          <Text bold color="white" fontSize="md">
            Confirm Code
          </Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: '45%',
    width: '100%',
    justifyContent: 'space-between',
  },
  ContainerStyle: {},
  myDropdownContainerStyle: {},
  myDropdownRowStyle: {},
  myDropdownCountryTextStyle: {},
  mycountryNameStyle: {},
});

export default Register;

{
  /* <TouchableOpacity>
                    <InputLeftAddon>
                      <PhoneInput ref={newRef} initialCountry={'cm'} />
                    </InputLeftAddon>
                  </TouchableOpacity>
                  <Input
                    placeholder="Enter your phone number"
                    size="lg"
                    width="250"
                    maxW="250"
                    variant="outline"
                    keyboardType="numeric"
                    onChangeText={number => {
                      setPhoneNumber(number);
                    }}
                  /> */
}
