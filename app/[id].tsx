import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'
import dayjs from 'dayjs'
import { supabase } from '~/utils/supabase'

export default function EventPage() {
  const { id } = useLocalSearchParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEvent()
  }, [id])


  const fetchEvent = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    setEvent(data)
    setLoading(false)
  }

  if (loading) {
    return <ActivityIndicator />
  }

  if (!event) {
    return <Text>Event not found</Text>
  }
  return (
    <View className='flex-1 gap-3 bg-white p-3'>
      <Stack.Screen options={{ title: "Event", headerBackTitleVisible: false, headerTintColor: 'black' }} />
      <Image
        source={{ uri: event.image_uri }}
        className="aspect-video w-full rounded-xl"
      />
      <Text className='text-3xl font-bold' numberOfLines={2}>
        {event.title}
      </Text>
      <Text className='text-lg font-semibold uppercase text-amber-800'>
        {dayjs(event.date).format('ddd, D MMM')} · {dayjs(event.date).format('hh:mm A')}
      </Text>
      <Text className='text-lg' numberOfLines={2}>
        {event.description}
      </Text>

      <View className='absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t-2 border-gray-300 p-5 pb-10'>
        <Text className='text-xl font-semibold'>Free</Text>
        <Pressable className='rounded-md bg-red-500 p-5 px-8'>
          <Text className='text-lg font-bold text-white'>Join and RSVP</Text>
        </Pressable>
      </View>
    </View>
  )
}