import React from 'react'
import {View, Text, TouchableOpacity } from 'react-native'

export default function Info({onPress, styles, text}){
return(
<TouchableOpacity onPress={onPress} style={styles}>
    <Text style={styles} >{text}</Text>
</TouchableOpacity>
)
}