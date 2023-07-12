import Event from '../../components/Event';
import {Alert, BackHandler, TextBase, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, Button} from 'native-base';
type Props = {
  navigation: any;
  route: any;
};

const Events = ({navigation, route}: Props) => {
  const [events, setEvents] = useState();

  useEffect(() => {
    setEvents(route.params.EventsObj);
  }, []);

  const goBackToSync = () => {
    navigation.goBack();
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', goBackToSync);

  return (
    <ScrollView>
      <View px="2" pb="8" pt="2" bg="primary.500" w="100%">
        <View display="flex" />
        <Text color="white" bold fontSize="2xl" textAlign="center" mt="5">
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
                signing_key={event?.signing_key}
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
