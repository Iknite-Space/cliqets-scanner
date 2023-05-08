import React, {useEffect, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {CustomModal} from '../../components';
import {ModalType} from '../../components/general/Modal.component';
import {ButtonType} from '../../components/general/Button.component';

export default function Scanner({navigation, route}: any) {
  const [showModal, setShowModal] = useState(false);
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [validTicket, setValidTicket] = useState() as any;

  const tickets = route.params?.tickets;

  const verifyTicket = async ticket => {
    await fetch(
      `https://api.dev.cliqets.xyz/guest/purchased_tickets/${ticket}`,
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
        if (data.purcchase_ticket_id) {
          const ticketFound = tickets?.find(
            (t: any) => t.purcchase_ticket_id === data.purcchase_ticket_id,
          );
          console.log('tickets: ', tickets);
          console.log('data: ', data);
          console.log('ticket found', ticketFound);
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
          verifyTicket(data);
        }}
        reactivate={true}
        reactivateTimeout={5000}
      />
    </>
  );
}
