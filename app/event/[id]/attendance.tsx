import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '~/utils/supabase'

export default function ExportAttendance() {
    const { id } = useLocalSearchParams()

    const [attendees, setAttendees] = useState([])

    useEffect(() => {
        fetchAttendees()
    }, [id])

    const fetchAttendees = async () => {
        const { data } = await supabase
            .from('attendance')
            .select('*, profiles(*)')
            .eq('event_id', id);
        setAttendees(data)

    }

    return (
        <>
            <FlatList
                data={attendees}
                renderItem={({ item }) => (
                    <View className='p-3'>
                        <Text className='font-bold'>{item.profiles.full_name || 'User'}</Text>
                    </View>
                )}
            />
        </>
    )
}