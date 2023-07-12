import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Box, Flex, Image, Pressable, Spacer, Text, View} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {CustomModal} from '../../components';
import {ModalType} from '../../components/general/Modal.component';
import {ButtonType} from '../../components/general/Button.component';
import auth from '@react-native-firebase/auth';
import jwt_decode from 'jwt-decode';
import * as jose from 'jose';

export default function Scanner({navigation, route}: any) {
  const [showModal, setShowModal] = useState(false);
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [validTicket, setValidTicket] = useState() as any;
  const [token, setToken] = useState();
  const [decodedToken, setDecodedToken] = useState({});
  const [purchasId, setPurchaseId] = useState();
  const [jwtCode, setJwtCode] = useState('');

  const tickets = route.params?.tickets;

  useEffect(() => {
    const onAuthStateChanged = (user: any) => {
      if (user) {
        user.getIdToken().then((t: string) => {
          setToken(t);
        });
      }
    };
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [navigation]);

  // JWT VERIFICATION

  // const verifyJWT = async () => {
  //   const alg = 'ES256';
  //   const spki = `-----BEGIN PUBLIC KEY-----
  // MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVs/o5+uQbTjL3chynL4wXgUg2R9
  // q9UU8I5mEovUf86QZ7kOBIjJwqnzD1omageEHWwHdBO6B+dFabmdT9POxg==
  // -----END PUBLIC KEY-----`;
  //   const publicKey = await jose.importSPKI(spki, alg);

  //   const {payload, protectedHeader}: any = await jose
  //     .jwtVerify(jwtCode, publicKey, {
  //       issuer: 'urn:example:issuer',
  //       audience: 'urn:example:audience',
  //     })
  //     .then(() => {
  //       console.log('====================================');
  //       console.log('Ticket Verified');
  //       console.log('====================================');
  //     });

  //   console.log(protectedHeader);
  //   console.log(payload);
  // };

  const verifyTicket = async ticket => {
    await fetch(
      `https://api.dev.cliqets.xyz/guest/purchased_tickets/${ticket}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(data => (data.ok ? data.json() : data.json()))
      .then(data => {
        if (data.purcchase_ticket_id) {
          const ticketFound = tickets?.find(
            (t: any) => t.purcchase_ticket_id === data.purcchase_ticket_id,
          );
          if (ticketFound) {
            setValidTicket(ticketFound);
            setShowModal(true);
          } else {
            setShowInvalidModal(true);
          }
        } else {
          setShowInvalidModal(true);
        }
      });
  };
  return (
    <Flex backgroundColor="white" h="full" pt="3">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        mt="5"
        alignItems="center">
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../assets/Caret-Left.png')}
            alt="#"
            ml="5"
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Ticket Valid')}>
          <Text bold fontSize="lg">
            Scanner
          </Text>
        </Pressable>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          rounded="full"
          p="1"
          px="2"
          w="27%"
          // h="75%"
          mr="2"
          // mt="4"
          backgroundColor="#F4F4F9"
          // right="0"
          // position="absolute"
        >
          <Text fontSize="md" bold>
            Online
          </Text>
          <Box rounded="full" backgroundColor="#00F89E" px="3" />
        </Box>
      </Box>
      <View px="2" py="5" w="100%" mb="10" alignItems="center">
        <Text
          color="primary.500"
          fontSize="md"
          bold
          textAlign="center"
          mx="auto">
          Place the QR Code inside the frame. Please avoid shaking to get
          results faster.
        </Text>
      </View>

      <QRCodeScanner
        onRead={({data}) => {
          verifyTicket(jwt_decode(data).ticket.purcchase_ticket_id);
          // setJwtCode(data);
          // verifyJWT();
        }}
        reactivate={true}
        reactivateTimeout={5000}
        containerStyle={styles.barCode}
      />

      <CustomModal
        heading={'Valid ticket!'}
        showModal={showModal}
        modalType={ModalType.SUCCESS}
        setShowModal={setShowModal}
        description={`Ticket type:\t\t\t\t${validTicket?.ticket_type}\nOrder number:\t\t${validTicket?.order_no}\nTicket number:\t\t\t${validTicket?.ticket_no}\nSeat number:\t\t\t${validTicket?.seat_no}`}
        btnText={'Scan Ticket'}
        btnType={ButtonType.PRIMARY}
        onPress={() => {
          setShowModal(false);
        }}
      />

      <CustomModal
        heading={'Invalid ticket'}
        showModal={showInvalidModal}
        modalType={ModalType.ERROR}
        setShowModal={setShowInvalidModal}
        description={'This ticket is not valid for this event'}
        btnText={'Scan Ticket'}
        btnType={ButtonType.PRIMARY}
        onPress={() => {
          setShowInvalidModal(false);
        }}
      />
    </Flex>
  );
}

const styles = StyleSheet.create({
  barCode: {
    ...StyleSheet.absoluteFillObject,
    height: '75%',
    top: 125,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
});
