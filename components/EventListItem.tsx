import { Feather } from '@expo/vector-icons';
import { Image, Text, View, Pressable } from 'react-native';
import dayjs from 'dayjs';
import { Link, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import SupaImage from './SupaImage';


export default function EventListItem({ event }) {
    const [numberofattendees, setNumberOfAttendees] = useState(0)

    useEffect(() => {
        fetchNumberOfAttendees()
    }, [event.id])

    const fetchNumberOfAttendees = async () => {
        const { count } = await supabase
            .from('attendance')
            .select('*', { count: 'exact', head: true })
            .eq('event_id', event.id);
        setNumberOfAttendees(count)
    }

    return (
        <Link href={`/event/${event.id}`} asChild>
            <Pressable className='gap-3 border-b-2 border-gray-100 p-3 pb-3'>
                <View className='flex-row'>
                    <View className='flex-1 gap-2'>
                        <Text className='text-lg font-semibold uppercase text-amber-800'>
                            {dayjs(event.date).format('ddd, D MMM')} · {dayjs(event.date).format('hh:mm A')}
                        </Text>
                        <Text className='text-xl font-bold' numberOfLines={2}>
                            {event.title}
                        </Text>
                        <Text className='text-gray-700'>
                            {event.location}
                        </Text>
                    </View>
                    {event.image_uri && (
                        <SupaImage
                            path={event.image_uri}
                            className="aspect-video w-2/5 rounded-xl"
                        />
                    )}
                </View>
                <View className='flex-row gap-3'>
                    <Text className='mr-auto text-gray-700'> {numberofattendees} going · {Math.round(event.dist_meters / 1000)}km from you </Text>
                    <Feather name="share" size={20} color="grey" />
                    <Feather name="bookmark" size={20} color="grey" />
                </View>
            </Pressable>
        </Link>
    )
}