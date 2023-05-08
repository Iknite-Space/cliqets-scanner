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
      // 'https://api.dev.cliqets.xyz/validator/events?user_id=CZZHRog4j4c129cl9HaCbNOBZFA2&start_key=0&count=10',
      'https://api.dev.cliqets.xyz/validator/events?user_id=JewuZ51DpwNSlq6qIjAj5I5uQWp2&start_key=0&count=10',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ1paSFJvZzRqNGMxMjljbDlIYUNiTk9CWkZBMiJ9.SqjofIeuKAhLuoFhYhS6ZB2L03bBFSeZAD5MAhVuWWU',
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiICIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jbGlxZXRzLTRmY2U4IiwiYXVkIjoiY2xpcWV0cy00ZmNlOCIsImF1dGhfdGltZSI6MTY4MzU0MjE5NCwidXNlcl9pZCI6Ikpld3VaNTFEcHdOU2xxNnFJakFqNUk1dVFXcDIiLCJzdWIiOiJKZXd1WjUxRHB3TlNscTZxSWpBajVJNXVRV3AyIiwiaWF0IjoxNjgzNTQyMTk0LCJleHAiOjE2ODM1NDU3OTQsInBob25lX251bWJlciI6IisyMzc2NzAwMDAwMDAiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIisyMzc2NzAwMDAwMDAiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.Wzfl7V7Q0yolY5xB0ojfzmQ6f41Qb6yQQqtEhmnhnmBJFp1vGMnq2XnTii-rZ6o1qNrPN1kMppBccPdzvHu1AormYJ2Rh77xbrW47R-qwWrBCCxevmO9o3KinehfACJaziIh2AzYYNJtG0p8lxH0rrjctsEk13Ij1CyGvpzQGs5dILrP64V29W5SNsVZcHc1sw41FZIAmrJfW_QI_cccS2Xbpn8udvB_w0Mc6QpS6oZVaBHaQG3KA-Ji1V1E8slmLu5wEQEaAIpHiZngjB-Z21V4OYuDeXo29zN8iQl-GOQNdKkApZxKO3S5QPzqV99VrAF8Hfj65f_48j_jo-Rh-Q',
        },
      },
    )
      .then(data => (data.ok ? data.json() : data.json()))
      .then(data => {
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
