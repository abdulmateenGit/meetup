import { Stack } from 'expo-router';
import { FlatList } from 'react-native';

import events from "~/assets/events.json";
import EventListItem from '~/components/EventListItem';


export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      {/* Event list item*/}
      {/* <EventListItem event={events[0]} /> */}
      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
        className='bg-white'
      />
    </>
  );
}
