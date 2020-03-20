import React from 'react'
import {StyleSheet,View, Text, Button, ScrollView, TouchableOpacity } from 'react-native'
import {getData, getDecks, removeDeck} from '../utils/api'
import {connect} from 'react-redux'
import {receiveDecks} from '../actions'
import {orange, lightBlue, lightOrange, pink, white, darkBlue} from '../utils/colors'
import ActionBtn from './ActionBtn'
import {getCardsLength} from '../utils/helper'

class DeckList extends React.Component{
componentDidMount(){
    getDecks()
    .then(decks => this.props.receiveAllDecks(decks))
}

    render(){
        const {decks} = this.props
        return(
            <ScrollView style={styles.container}>
                {
                    Object.keys(decks).map((deck)=>{
                        const {title, questions} = decks[deck]
                        return(
                            <View key={deck} style={styles.card}>
                                <Text style={styles.cardText}>{title}</Text>
                                <Text style={styles.cardsubText}>{questions ? getCardsLength(questions): null}</Text>
                                <TouchableOpacity
                                style={styles.cardBtn}
                                onPress={() => this.props.navigation.navigate('DeckView',{entryId: deck})}
                                ><Text style={styles.btnText}>Go to Deck</Text></TouchableOpacity>



                            </View>

                        )
                    }
                    )
                }
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
		flex: 1,
		alignSelf: 'stretch',
		padding: 5

	},
	card: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: white,
		margin: 8,
		height: 200,
		borderRadius: 10,
		shadowColor: 'rgba(0,0,0,0.34)',
		 shadowOffset: {
		 	width: 0,
		 	height: 3,
		 },
		 shadowRadius: 4,
		 shadowOpacity: 1
	},
	cardText: {
		fontSize: 25,
        color: darkBlue,
        fontWeight: 'bold',
        // fontFamily: 'Roboto',
    },
    cardsubText: {
        fontSize: 18,
        color: darkBlue,
        // fontFamily: 'Roboto',
        margin: 8
    },
	cardBtn: {
        margin: 5,
        padding: 15,
        width: 180,
		justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BDC1E6',
        borderRadius: 15,
        // fontFamily: 'Roboto',
        fontSize: 14,
        height: 55,
    },
    btnText: {
        // fontFamily: 'Roboto',
        fontSize: 16,
        color: white,
        fontWeight: 'bold'

    },
    androidBtn: {
        textAlign: 'center',
        margin: 15,
        padding: 15,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkBlue,
        borderRadius: 15,
        // fontFamily: 'Roboto',
        fontSize: 14,
        color: white,
        fontWeight: 'bold',
        height: 55,

    },
})
function mapStateToProps(decks){
	return {
		decks
	}
}

function mapDispatchToProps(dispatch){
	return {
		receiveAllDecks: (decks) => dispatch(receiveDecks(decks))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)