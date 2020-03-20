import React from 'react'
import { CommonActions } from '@react-navigation/native';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import { pink, white, grey, lightGreen, orange, darkBlue} from '../utils/colors'
import {addCardToDeck} from '../utils/api'
import {connect} from 'react-redux'
import {addCard} from '../actions'
import SubmitBtn from './SubmitBtn'

class AddCard extends React.Component {

    state = {
		question: '',
		answer: '',
		correctAnswer: ''
	}

	submitCard = (deck) => {
		const { question, answer, correctAnswer } = this.state

		if(question && answer){
			this.props.dispatch(addCard({ question, answer, correctAnswer, deck }))
			addCardToDeck(deck, { question, answer, correctAnswer })
			this.setState({ question: '', answer: '', correctAnswer: ''})
			this.props.navigation.dispatch(CommonActions.goBack({ key: null }))
		}
	}

	render(){
		const deckName = this.props.route.params.entryId

		return(
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.title}>What is the question?</Text>
					<TextInput style={styles.input}
							   onChangeText={(question) => this.setState({question})}
							   value={this.state.question}
					></TextInput>

					<Text style={styles.title}>What is the answer?</Text>
					<TextInput style={styles.input}
							   onChangeText={(answer) => this.setState({answer})}
							   value={this.state.answer}
					></TextInput>

					<Text style={styles.title}>Is this true or false?</Text>
					<TextInput style={styles.input}
							   onChangeText={(correctAnswer) => this.setState({correctAnswer})}
							   value={this.state.correctAnswer}>
					</TextInput>

                    {/* <SubmitBtn onPress={()=> this.submitCard(deckName)} style={styles.submitBtn} text='Submit'/> */}
					<TouchableOpacity
                style={styles.submitBtn}
				onPress={()=> this.submitCard(deckName)}
                >
                    <Text style={styles.btnText}> Add Card</Text>
                </TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}


const styles = StyleSheet.create({
 container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
     },
 submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
    fontSize: 14,
 },
 title: {
     fontSize: 18,
    color: '#333',


 },
 submitBtn: {
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
	fontSize: 14,
	fontWeight: 'bold',
	height: 55,

 },
 input: {
     width: 250,
     height: 40,
     padding: 8,
     borderColor:'#757575',
     margin: 20,
     borderRadius: 7,
     backgroundColor: '#dad9db',

 },
 btnText: {
	color: white,
	fontSize: 22,
	textAlign: 'center',
	// fontFamily: 'Roboto',
	fontSize: 16,
	fontWeight: 'bold',
}

})









export default connect()(AddCard)