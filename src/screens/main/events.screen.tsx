import Event from '../../components/Event';
import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, Button} from 'native-base';
type Props = {
  navigation: any;
};

const Events = ({navigation}: Props) => {
  const [events, setEvents] = useState();

  const verifyAssigments = async () => {
    await fetch(
      'https://api.dev.cliqets.xyz/validator/events?user_id=CZZHRog4j4c129cl9HaCbNOBZFA2&start_key=0&count=10',
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
        console.log(data);
        setEvents(data);
      });
  };

  useEffect(() => {
    const events = verifyAssigments();
    console.log(events);
  }, []);

  return (
    <ScrollView>
      <View px="2" pb="8" pt="2" bg="blue.700" w="100%">
        <View display="flex"></View>
        <Text color="white" bold fontSize="2xl" textAlign="center">
          Select Event
        </Text>
      </View>

      <View>
        {events?.map(event => {
          return (
            <Event
              key={event?.event_id}
              id={event?.event_id}
              imgsrc={event?.cover_photo}
              title={event?.title}
              description={event?.description}
              location={event?.venue}
              date={event?.date}
              navigation={navigation}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Events;
