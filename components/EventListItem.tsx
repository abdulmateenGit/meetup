import { Feather } from '@expo/vector-icons';
import { Image, Text, View, Pressable } from 'react-native';
import dayjs from 'dayjs';
import { Link } from 'expo-router';


export default function EventListItem({ event }) {
    return (
        <Link href={`/${event.id}`} asChild>
            <Pressable className='p-3 gap-3 border-b-2 border-gray-100 pb-3'>
                <View className='flex-row'>
                    <View className='flex-1 gap-2'>
                        <Text className='text-lg font-semibold uppercase text-amber-800'>
                            {dayjs(event.datetime).format('ddd, D MMM')} · {dayjs(event.datetime).format('hh:mm A ')}
                        </Text>
                        <Text className='text-xl font-bold' numberOfLines={2}>
                            {event.title}
                        </Text>
                        <Text className='text-gray-700'>
                            {event.location}
                        </Text>
                    </View>
                    <Image
                        source={{ uri: event.image }}
                        className="aspect-video w-2/5 rounded-xl"
                    />
                </View>
                <View className='flex-row gap-3'>
                    <Text className='text-gray-700 mr-auto'> 16 going </Text>
                    <Feather name="share" size={20} color="grey" />
                    <Feather name="bookmark" size={20} color="grey" />
                </View>
            </Pressable>
        </Link>
    )
}