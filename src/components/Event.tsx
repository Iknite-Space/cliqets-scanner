import {TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from 'native-base';
export default function Event({
  navigation,
  imgsrc,
  title,
  description,
  location,
  date,
}: any) {
  // let title = title;
  // let description = description;
  // let location = location;
  // let date = date;

  // let eventProps = { title, description, location, date }

  return (
    <Box alignItems="center">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
          console.log('Home clicked');
        }}>
        <Box
          maxW="80"
          rounded="md"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          display="flex"
          flexDirection="row"
          marginY={2}>
          <Flex direction="row" align="center" px="3" bg="#C2BDF5:alpha.30">
            <Image
              source={{
                uri: imgsrc,
              }}
              alt="image"
              size="lg"
              rounded="lg"
            />
            <Box p="4">
              <Stack space={2}>
                <Heading size="md" ml="-1" width="80%">
                  {title}
                </Heading>
              </Stack>
              <Text fontWeight="400" bold width="50%">
                {description}
              </Text>
              <Text fontWeight="400" width="50%">
                {location}
              </Text>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between">
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                    fontWeight="400">
                    {date}
                  </Text>
                </HStack>
              </HStack>
            </Box>
          </Flex>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}

{
  /* <Text
                fontSize="xs"
                _light={{
                  color: "violet.500",
                }}
                _dark={{
                  color: "violet.400",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                The Silicon Valley of India.
              </Text> */
}
