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
import {CustomButton} from '../../components';
import {ButtonType} from '../../components/general/Button.component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
// import {WebView} from 'react-native-webview';

const Tables = ({navigation, route}: any) => {
  const [pdfPath, setPdfPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [downloadsFolder, setDownloadsFolder] = useState('');
  let orderNumber = 1;
  // const [webView, setWebView] = useState(false);

  const event_id = route.params.event_id;

  console.log('====================================');
  console.log(event_id);
  console.log('====================================');

  useEffect(() => {
    //get user's file paths from react-native-fs
    setDownloadsFolder(RNFS.DownloadDirectoryPath);
  }, []);

  let ticketlist = route.params.ticketsObj.map((ticket: any) => {
    return {
      n: orderNumber++,
      phone_number: ticket.phone_number,
      name: ticket.user_name,
      ticket_name: ticket.ticket_name,
    };
  });

  let tickets = ticketlist.map(function (obj: any) {
    return Object.keys(obj).map(function (key: any) {
      return obj[key];
    });
  });

  const goBackToSync = () => {
    navigation.goBack();
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', goBackToSync);

  const getHeadings = () => {
    return Object.keys(ticketlist[0]).map(header =>
      header.toUpperCase().replace('_', ' '),
    );
  };

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      const html = '<h1>First PDF Download</h1>';
      const options = {
        html,
        fileName: `ticket_list_${count}`,
        directory: 'Downloads',
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
        <Text textAlign="center" mb="5" fontWeight="900" color="primary.500">
          {' '}
          TICKET GUEST LIST{' '}
        </Text>
        <Table
          textStyle={{margin: 6}}
          borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
          style={{marginBottom: 32}}>
          <Row
            data={getHeadings()}
            textStyle={{
              margin: 6,
              fontWeight: 900,
              color: 'black',
              textAlign: 'center',
            }}
            widthArr={[30, 120, 120, 70]}
          />
          <Rows
            data={tickets}
            textStyle={{
              margin: 6,
              textAlign: 'center',
              paddingTop: 30,
              paddingBottom: 30,
            }}
            widthArr={[30, 120, 120, 70]}
          />
        </Table>
        <CustomButton
          btnType={ButtonType.PRIMARY}
          btnText="Download PDF"
          onPress={() => {
            // setWebView(true);
            navigation.navigate('WebViewPage', {
              event_id: event_id,
            })
          }}
        />
        {pdfPath && (
          <Pdf
            source={{uri: 'file://' + pdfPath}}
            style={{flex: 1, width: '100%'}}
          />
        )}
        {/* {webView && (
          <WebView
            source={{uri: 'http://example.com/'}}
            style={{flex: 1}}></WebView>
        )} */}
      </View>
    </ScrollView>
  );
};

export default Tables;

//
