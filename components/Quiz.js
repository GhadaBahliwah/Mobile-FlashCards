import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import {darkBlue, lightBlue, white} from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import {connect} from 'react-redux'
import ActionBtn from './ActionBtn'
import Info from './Info'

class Quiz extends React.Component {

    state= {
        questionNum: 0,
        showQuestion: false,
        correct: 0,
        incorrect: 0
    }
    showAnswer = () => (
        !this.state.showQuestion ? this.setState({showQuestion: true})
        : this.setState({showQuestion: false})
    )
    submitAnswer = (answer)=> {
        const {questionNum} = this.state
        const deck = this.props.route.params.entryId
        const decks = this.props.decks
        const correct = decks[deck].questions[questionNum].correctAnswer.toLowerCase()
        // Check if the answer correct
        if (answer.trim() === correct.trim()){
            this.setState({correct: this.state.correct +1})
        }else {
            this.setState({incorrect: this.state.incorrect +1})
        }
        // increment the question number
        this.setState({questionNum: this.state.questionNum +1, showQuestion: false})
    }
    replayQuiz = () => {
        this.setState({
            questionNum: 0,
            showQuestion: false,
            correct: 0,
            incorrect: 0,
        })
    }
    goToBack = () => {
        this.props.navigation.dispatch(CommonActions.goBack({ key: null }))
    }
    render(){
        const {questionNum} = this.state
        const decks = this.props.decks
        const deck = this.props.route.params.entryId
        const qNumber = this.state.questionNum + 1
        if(decks[deck].questions.length === 0){
            return(
                <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.question}>There is no cards in this deck</Text>
                    <ActionBtn styles={styles} text={'Back'} color={lightBlue} onPress={()=> this.goToBack()}/>
                </View>
            </View>
            )
        }

        if(questionNum === decks[deck].questions.length){
            return(
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.question}>You got {this.state.correct} out of {decks[deck].questions.length} !</Text>
                        {this.state.correct > this.state.incorrect ? <Text style={{fontSize: 90}}>🤩🤩</Text>
                        : <Text style={{fontSize: 90}}>😔😔</Text> }
                        <ActionBtn styles={styles} text={'TryAgain'} color={darkBlue} onPress={this.replayQuiz}/>
                        <ActionBtn styles={styles} text={'Back'} color={lightBlue} onPress={()=> this.goToBack()}/>
                    </View>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.questionsIndicator}>{qNumber} / {decks[deck].questions.length}</Text>
                    {!this.state.showQuestion ? <Text style={styles.question}>{decks[deck].questions[questionNum].question}</Text>
                     :  <Text style={styles.question}>{decks[deck].questions[questionNum].answer}</Text> }

                    { !this.state.showQuestion ? <Info style={styles.answer} text="Show Answer" onPress={this.showAnswer}/>
                    : <Info style={styles.answer} text="Show Question" onPress={this.showAnswer} />}

                    <View style={styles.btnContainer}>
                        <ActionBtn color={darkBlue} text={'Correct'} styles={styles} onPress={()=> this.submitAnswer('true')} />
                        <ActionBtn color={lightBlue} text={'Incorrect'} styles={styles} onPress={()=> this.submitAnswer('false')}/>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        padding: 10
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
        fontSize: 14,
        fontWeight: 'bold',
        height: 55,

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
    submitBtnText: {
        color: white,
        fontSize: 20,
        textAlign: 'center',
        // fontFamily: 'sans-serif-medium'
    },
    questionsIndicator: {
        top: 0,
        alignSelf: 'flex-start',
        left: 0,
        fontSize: 18,
        margin: 10,
        position: 'absolute',
        color: '#444'
},
    answer: {
        color: white,
        fontSize: 20,
        margin: 20,
},
  question: {
      fontSize: 30,
      color: '#444',
      marginTop: -50,
      marginBottom: 20,
      textAlign: 'center',
    //   fontFamily: 'sans-serif-medium'
  },
  btnContainer: {
      marginTop: 100
  }

    })

    function mapStateToProps (decks) {
        return {
            decks
        }

    }
export default connect(mapStateToProps)(Quiz)