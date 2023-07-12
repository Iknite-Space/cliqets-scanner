import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, TouchableWithoutFeedback} from 'react-native';
import {Pressable, ScrollView, Text, View} from 'native-base';
import {WebView} from 'react-native-webview';

const WebViewPage = ({navigation, route}: any) => {
  return (
    <TouchableWithoutFeedback>
      <WebView
        source={{
          uri: `https://dev.cliqets.xyz/checklist/${route.params.event_id}`,
        }}
        style={{flex: 1}}
      />
    </TouchableWithoutFeedback>
  );
};

export default WebViewPage;
