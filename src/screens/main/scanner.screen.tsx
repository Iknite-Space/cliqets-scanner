import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {CustomModal} from '../../components';
import {ModalType} from '../../components/general/Modal.component';
import {ButtonType} from '../../components/general/Button.component';

export default function Scanner({navigation}: any) {
  const [ticketState, SetTicketState] = useState('scanning');
  const verifyTicket = async ticket => {
    console.log('ticket id from state: ' + ticket);
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
          SetTicketState('valid');
        } else {
          SetTicketState('invalid');
        }
      });
  };
  return (
    <>
      {ticketState == 'valid' && (
        <CustomModal
          heading={'Ticket valid'}
          showModal={true}
          modalType={ModalType.SUCCESS}
          setShowModal={() => {}}
          description={'Ticket Valid'}
          btnText={'Scan Ticket'}
          btnType={ButtonType.PRIMARY}
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      )}

      {ticketState == 'invalid' && (
        <CustomModal
          heading={'Ticket Invalid'}
          showModal={true}
          modalType={ModalType.ERROR}
          setShowModal={() => {}}
          description={'Ticket Invalid'}
          btnText={'Scan Ticket'}
          btnType={ButtonType.PRIMARY}
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      )}

      <QRCodeScanner
        onRead={({data}) => {
          console.log('ticket id: ', data);
          verifyTicket(data);
        }}
        reactivate={true}
        reactivateTimeout={5000}
      />
    </>
  );
}
