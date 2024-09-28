import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import events from "~/assets/events.json"

export default function EventPage() {
  const { id } = useLocalSearchParams()
  const event = events.find(e => e.id === id);
  return (
    <View>
      <Text>Event id: {event?.title}</Text>
    </View>
  )
}