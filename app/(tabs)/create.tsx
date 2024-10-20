import { View, Text, TextInput, Button, Pressable, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { supabase } from '~/utils/supabase'
import { useAuth } from '~/context/AuthProvider'
import { router } from 'expo-router'
import Avatar from '~/components/Avatar'
import AddressAutoComplete from '~/components/AddressAutoComplete'

export default function CreateEvent() {

    const [open, setOpen] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date())
    const [imageUrl, setImageUrl] = useState('')
    const [location, setLocation] = useState(null)

    const [loading, setLoading] = useState(false)

    const { user } = useAuth()

    const createEvent = async () => {
        const long = location.features[0].geometry.coordinates[0];
        const lat = location.features[0].geometry.coordinates[1];
        setLoading(true)
        const { data, error } = await supabase
            .from('events')
            .insert([{
                title,
                description,
                date: date.toISOString(),
                user_id: user.id,
                image_uri: imageUrl,
                location: location.features[0].properties.name,
                location_point: `POINT(${long} ${lat})`,
            },])
            .select()
            .single()

        if (error) {
            Alert.alert("Failed to create the event", error.message)
        } else {
            setTitle("");
            setDescription("");
            setDate(new Date());
            router.push(`/event/${data.id}`)
        }
        setLoading(false)
    }
    return (
        <ScrollView className='flex-1' contentContainerClassName='gap-3 bg-white p-5'>
            <View className='items-center'>
                <Avatar
                    size={200}
                    url={imageUrl}
                    onUpload={(url: string) => {
                        setImageUrl(url);
                    }}
                />
            </View>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder='Title'
                className='rounded-md border border-gray-200 p-3'
            />
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder='Description'
                multiline
                numberOfLines={3}
                className='min-h-32 rounded-md border border-gray-200 p-3'
            />

            <Text onPress={() => setOpen(true)} className='rounded-md border border-gray-200 p-3'>
                {date.toLocaleString()}
            </Text>

            <DatePicker
                modal
                open={open}
                date={date}
                minimumDate={new Date()}
                minuteInterval={15}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            <AddressAutoComplete onSelected={(location => setLocation(location))} />
            <Pressable className='mt-auto items-center rounded-md bg-red-500 p-3 px-8'>
                <Text
                    onPress={() => createEvent()}
                    disabled={loading}
                    className='text-lg font-bold text-white'>
                    Create Event
                </Text>
            </Pressable>
        </ScrollView>
    )
}