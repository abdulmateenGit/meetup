import { Feather } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';


export default function EventListItem({ event }) {
    return (
        <View className='p-3 gap-3'>
            <View className='flex-row'>
                <View className='flex-1 gap-2'>
                    <Text className='text-lg font-semibold uppercase text-amber-800'> Wed 13, Sep · 19:30 CET </Text>
                    <Text className='text-xl font-bold' numberOfLines={2}> {event.title}</Text>
                    <Text className='text-gray-700'> {event.location} </Text>
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
        </View>
    )
}