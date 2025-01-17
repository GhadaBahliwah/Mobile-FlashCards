import React from 'react'
import {View, Text, AsyncStorage} from 'react-native'
import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'flashcards: notifications'

export const getCardsLength = (questions) => {
    if(questions.length === 0){
        return <Text> 0 Cards </Text>
    }else if(questions.length > 1){
        return <Text> {questions.length} Cards</Text>
    }
    else{
        return <Text> 1 Card</Text>
    }
}
function createNotification() {
    return {
        title: 'Did you study today?',
        body: '👋 Do not forget to study today',

    }
}

export function setLocalNotification (){
AsyncStorage.getItem(NOTIFICATION_KEY)
.then(JSON.parse)
.then((data)=> {
    if(data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({status}) => {
            if(status === 'granted'){
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)

                Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                        time: tomorrow,
                        repeat: 'day'
                    }
                )
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
        })
    }
})
}

export function clearLocalNotification (){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}