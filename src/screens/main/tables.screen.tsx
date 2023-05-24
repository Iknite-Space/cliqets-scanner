import React, {useEffect, useState} from 'react';
// import data from '../../data.json';
// import Table from '../../../table';
import {Alert, BackHandler} from 'react-native';
import {Pressable, ScrollView, Text, View} from 'native-base';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import { CustomButton } from '../../components';
import { ButtonType } from '../../components/general/Button.component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

const Tables = ({navigation, route}: any) => {
  const [pdfPath, setPdfPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [downloadsFolder, setDownloadsFolder] = useState('');
  let orderNumber = 1;

  useEffect(() => {
    //get user's file paths from react-native-fs
    setDownloadsFolder(RNFS.DownloadDirectoryPath);
  }, [])

  let ticketlist = route.params.ticketsObj.filter(ticket => {
    delete ticket.cover_image;
    delete ticket.event_date;
    delete ticket.event_id;
    delete ticket.order_id;
    delete ticket.order_no;
    delete ticket.organizer_name;
    delete ticket.ticket_no;
    delete ticket.title;
    delete ticket.user_id;
    delete ticket.venue;
    delete ticket.purcchase_ticket_id;
    delete ticket.seat_no;
    delete ticket.hall_no;
    delete ticket.no
    ticket.n = orderNumber++
  });

  console.log('====================================');
  console.log({tickets: route.params.ticketsObj});
  console.log('====================================');

  let tickets = route.params.ticketsObj.map(function (obj: any) {
    return Object.keys(obj).reverse().map(function (key: any) {
      return obj[key];
    });
  });

  console.log('====================================');
  console.log(tickets);
  console.log('====================================');

  const goBackToSync = () => {
    navigation.goBack();
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', goBackToSync);

  const getHeadings = () => {
    return Object.keys(route.params.ticketsObj[0]).reverse().map(header => header.toUpperCase().replace("_", " "));
  };

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      const html = `

      <html>
      <head>
        <style>
          body {
            font-family: 'Helvetica';
            font-size: 12px;
          }
          header, footer {
            height: 50px;
            background-color: #fff;
            color: #000;
            display: flex;
            justify-content: center;
            padding: 0 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 5px;
          }
          th {
            background-color: #ccc;
          }
  </style>
      </head>
      <body>
        <header>
          <h1>Invoice for Order #${count}</h1>
        </header>
<h1>Ticket List</h1>
        <table>
          ${getHeadings().map(head => `
          <tr>
            <th>${head}</th>            
          </tr>
          `          
            )}
          ${tickets
            .map(ticket => `
            <tr>
              <td>${ticket.purrchase_ticket_id}</td>
              <td>${ticket.first_name}</td>
              <td>${ticket.last_name}</td>
              <td>${ticket.seat_no}</td>
              <td>${ticket.ticket_type}</td>
              <td>${ticket.phone_number}</td>
            </tr>
          `,
            )
            .join('')}
        </table>
        <footer>
          <p>Thank you for your patience!</p>
        </footer>
      </body>
    </html>

      `;
      const options = {
        html,
        fileName: `ticket_list_${count}`,
        directory: downloadsFolder,
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF saved to ${file.filePath}`);
      setCount(count + 1);
      setIsLoading(false);
      const fileExists = await RNFS.exists(file.filePath);
      if (!fileExists) {
        console.log('File does not exist!');
        return;
      }
      setPdfPath(file.filePath);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  // style={{ transform: [{rotate: '90deg'}] }}
  return (
    <ScrollView>
      <View p="2" paddingTop="10">
        <Text textAlign="center" mb="5" fontWeight="900" color="primary.500"> TICKET GUEST LIST </Text>
        <Table
          textStyle={{margin: 6}}
          borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={{marginBottom: 32}} >
          <Row data={getHeadings()} textStyle={{margin: 6, fontWeight: 900, color: 'black', textAlign: "center"}} widthArr={[30, 120, 60, 60, 70]} />
          <Rows data={tickets} textStyle={{margin: 6, textAlign: "center", paddingTop: 30, paddingBottom: 30}} widthArr={[30, 120, 60, 60, 70]}/>
        </Table>
        <CustomButton btnType={ButtonType.PRIMARY} btnText='Generate PDF' onPress={() => generatePDF()}/>
        {pdfPath && <Pdf source={{ uri: 'file://' + pdfPath }} style={{flex: 1, width: '100%'}} />}
      </View>
    </ScrollView>
  );
};

export default Tables;

/*

const [tableHead, setTableHead] = useState([
    'Head',
    'Head2',
    'Head3',
    'Head4',
  ]);
  const [tableData, setTableData] = useState([
    ['1', '2', '3', '4'],
    ['a', 'b', 'c', 'd'],
    ['1', '2', '3', '456\n789'],
    ['a', 'b', 'c', 'd'],
  ]);


*/
