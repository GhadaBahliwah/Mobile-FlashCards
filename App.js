import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar } from 'react-native';
import DeckList from './components/DeckList'
import { NavigationContainer  } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { darkBlue, lightBlue, white} from './utils/colors'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {createStore} from 'redux'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import{setLocalNotification} from './utils/helper'

function MyStatusBar ({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor}}>
        <StatusBar translucent barStyle='light-content'
        backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}
const Tab =   createBottomTabNavigator()
const Stack = createStackNavigator()

function Home() {
  return (
    <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Decks') {
            iconName = focused
            ? 'cards'
            : 'cards-outline'
          } else if (route.name === 'Add Deck') {
            iconName = focused
            ? 'plus-circle'
            : 'plus-circle-outline'
          }
          return <MaterialCommunityIcons name={iconName}
                 size={30} color={color}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: white,
        activeBackgroundColor: darkBlue,
        inactiveTintColor: darkBlue,

        style: {
          height: 58,
          backgroundColor: white,

        }

      }}>
            <Tab.Screen name="Decks" component={DeckList} />
            <Tab.Screen name="Add Deck" component={AddDeck} />
      </Tab.Navigator>
  );
}



export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification()
  }
  render(){
    return (
      <Provider store={createStore(reducer)}>
      <MyStatusBar backgroundColor={lightBlue} />
      <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Decks" component={Home} options={{headerTintColor: white, headerStyle: {
                backgroundColor: darkBlue}}}/>
              <Stack.Screen name="DeckView" component={DeckView} options={{headerTintColor: white, headerStyle: {
                backgroundColor: darkBlue}}} />
              <Stack.Screen name="AddCard" component={AddCard} options={{headerTintColor: white, headerStyle: {
                backgroundColor: darkBlue}}}/>
              <Stack.Screen name="Quiz" component={Quiz} options={{headerTintColor: white, headerStyle: {
            backgroundColor: darkBlue}}}/>
            </Stack.Navigator>
      </NavigationContainer>
      </Provider>

        );
  }

}

