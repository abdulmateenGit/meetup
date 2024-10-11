import { View, Text, TextInput, Button, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { supabase } from '~/utils/supabase'
import { useAuth } from '~/context/AuthProvider'
import { router } from 'expo-router'

export default function CreateEvent() {

    const [open, setOpen] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date())

    const [loading, setLoading] = useState(false)

    const { user } = useAuth()

    const createEvent = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('events')
            .insert([{
                title,
                description,
                date,
                user_id: user.id,
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
        <View className='flex-1 gap-3 bg-white p-5'>
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
            <Pressable className='mt-auto items-center rounded-md bg-red-500 p-3 px-8'>
                <Text
                    onPress={() => createEvent()}
                    disabled={loading}
                    className='text-lg font-bold text-white'>
                    Create Event
                </Text>
            </Pressable>
        </View>
    )
}