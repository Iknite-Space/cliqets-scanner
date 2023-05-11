import React, {useEffect, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {CustomModal} from '../../components';
import {ModalType} from '../../components/general/Modal.component';
import {ButtonType} from '../../components/general/Button.component';
import auth from '@react-native-firebase/auth';
import jwt_decode from 'jwt-decode';

export default function Scanner({navigation, route}: any) {
  const [showModal, setShowModal] = useState(false);
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [validTicket, setValidTicket] = useState() as any;
  const [token, setToken] = useState();
  const [decodedToken, setDecodedToken] = useState({});
  const [purchasId, setPurchaseId] = useState()

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

  const decodeJwt = (jwt: any, verify: any) => {
    setDecodedToken(jwt_decode(jwt));
    verify(() => {
      return decodedToken.purchase_id
    })
  }

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
    <>
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

      <QRCodeScanner
        onRead={({data}) => {
          decodeJwt(data, verifyTicket)
        }}
        reactivate={true}
        reactivateTimeout={5000}
      />
    </>
  );
}
