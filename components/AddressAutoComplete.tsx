import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { getSuggestions, retriveDetails } from '~/utils/AddrssAutoComplete'
import { useAuth } from '~/context/AuthProvider'

export default function AddressAutoComplete({ onSelected }) {
    const [input, setInput] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [selectedLocation, setSelectedLocation] = useState("")

    const { session } = useAuth();

    const search = async () => {
        const data = await getSuggestions(input, session.access_token)
        setSuggestions(data.suggestions)
    }


    const onSuggestionClick = async (suggestion) => {
        setSelectedLocation(suggestion)
        setInput(suggestion.name)
        setSuggestions([])

        const details = await retriveDetails(suggestion.mapbox_id, session.access_token)
        onSelected(details);
    }
    return (
        <View>
            <View className='flex flex-row items-center gap-3'>
                <TextInput placeholder='Location'
                    value={input}
                    onChangeText={setInput}
                    className='flex-1 rounded-md border border-gray-200 p-3'
                />
                <FontAwesome onPress={search} name="search" size={24} color="black" />
            </View>
            <View className='gap-2'>
                {suggestions.map(item => (
                    <Pressable
                        onPress={() => onSuggestionClick(item)}
                        key={item.name}
                        className='rounded border border-gray-300 p-2'
                    >
                        <Text className='font-bold'>{item.name}</Text>
                        <Text>{item.place_formatted}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}