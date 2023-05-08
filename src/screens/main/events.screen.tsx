import Event from '../../components/Event';
import {TextBase, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, Button} from 'native-base';
type Props = {
  navigation: any;
};

const Events = ({navigation, route}: any) => {
  const [events, setEvents] = useState();

  useEffect(() => {
    setEvents(route.params.EventsObj);
  }, []);

  console.log('====================================');
  console.log({events});
  console.log('====================================');

  return (
    <ScrollView>
      <View px="2" pb="8" pt="2" bg="blue.700" w="100%">
        <View display="flex"></View>
        <Text color="white" bold fontSize="2xl" textAlign="center">
          Select Event
        </Text>
      </View>

      {events ? (
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
      ) : (
        <>
          <View>
            <Text>You Are not a validator for any event ...</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Events;
