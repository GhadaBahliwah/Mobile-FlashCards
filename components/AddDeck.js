import React from 'react'
import {StyleSheet,View, Text, Button, TextInput, TouchableOpacity} from 'react-native'
import {saveDeckTitle} from '../utils/api'
import {addDeck} from '../actions'
import {connect} from 'react-redux'
import {darkBlue, white} from '../utils/colors'

class AddDeck extends React.Component{

    state={
        text: ''
    }

    submitName = () => {
		const { text } = this.state

		if(this.state.text){
			saveDeckTitle(text)
			this.props.dispatch(addDeck(text))
			this.props.navigation.navigate('DeckView', { entryId: text })
			this.setState({ text: '' })
		}
	}

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>What is the new decks name?</Text>
                <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({text: text})}
                value={this.state.text}
                >

                </TextInput>
                <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.submitName}
                >
                    <Text style={styles.btnText}> Create Deck</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
    title: {
        fontSize: 18,
    color: '#333',
    // fontFamily: 'Roboto'
    },
    submitBtn: {
        textAlign: 'center',
        margin: 5,
        padding: 15,
        width: 180,
		justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkBlue,
        borderRadius: 15,
        height: 55

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
export default connect()(AddDeck)