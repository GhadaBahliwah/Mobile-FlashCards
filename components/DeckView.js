import React from 'react'
import {StyleSheet, Text, View, Button, Alert} from'react-native'
import DeckList from './DeckList'
import {getData, removeDeck} from '../utils/api'
import { connect } from 'react-redux'
import ActionBtn from'./ActionBtn'
import {pink, lightGreen, white, lightBlue, darkBlue } from '../utils/colors'
import {getCardsLength} from '../utils/helper'



class DeckView extends React.Component {

render(){
    const deck = this.props.route.params.entryId
    const {decks} = this.props
    const questions = decks[deck].questions
    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.mainText}> {decks[deck].title} </Text>
                <Text style={styles.subText}>{decks[deck].questions ? getCardsLength(questions): null}</Text>

                <ActionBtn styles={styles}
                text={'Add Card'}
                onPress={()=> this.props.navigation.navigate('AddCard',{entryId: deck})}
                color={darkBlue}/>

                <ActionBtn styles={styles}
                text={'Start Quiz'}
                onPress={()=> this.props.navigation.navigate('Quiz',{entryId: deck})}
                color={lightBlue}/>


            </View>
        </View>


    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: white,
        padding: 10
    },
    androidBtn: {
        textAlign: 'center',
        margin: 5,
        padding: 15,
        width: 180,
		justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkBlue,
        borderRadius: 15,
        // fontFamily: 'Roboto',
        fontSize: 14,
        color: white,
        fontSize: 14,
        fontWeight: 'bold',
        height: 55
    },
    submitBtnText: {
        color: white,
        fontSize: 20,
        textAlign: 'center',
        // fontFamily: 'sans-serif-medium'
    },
    card: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
        padding: 10,
        borderRadius: 7,
		backgroundColor: '#E6E4FA',
		alignSelf: 'stretch',
		shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset: {
        width: 0,
        height: 3
      },
        shadowRadius: 4,
        shadowOpacity: 1
    },
    mainText: {
        fontSize: 40,
        // fontFamily: 'sans-serif-medium',
        color: '#444'

    },
    subText: {
        fontSize: 25,
        marginBottom: 160,
        color: '#444'
    }

})
function mapStateToProps(decks){
	return {
		decks
	}
}
export default connect(mapStateToProps)(DeckView)