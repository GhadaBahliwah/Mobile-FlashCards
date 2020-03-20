import React from 'react'
import {TouchableOpacity, Text} from 'react-native'

export default function SubmitBtn({style, onPress, text}){
    return (
        <TouchableOpacity  onPress={onPress}>
                        <Text style={style}>{text}</Text>
         </TouchableOpacity>
    )
}