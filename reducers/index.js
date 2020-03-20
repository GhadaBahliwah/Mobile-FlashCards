import {ADD_DECK, RECIEVE_DECKS, ADD_CARD_TO_DECK, DELETE_DECK} from '../actions'
import AddDeck from '../components/AddDeck';

function deck (state={}, action){
switch(action.type){
    case ADD_DECK:
    const newDeck ={
        [action.deck]: {
            title: action.deck,
            questions: []
        }
    }
    return {
        ...state,
        ...newDeck
    }
    case RECIEVE_DECKS:
        return{
            ...state,
            ...action.decks
        }
    case ADD_CARD_TO_DECK:
        const {question, answer, deck, correctAnswer} = action.card
        return{
            ...state,
            [deck]: {
                ...state[deck],
                questions: [...state[deck].questions, {question, answer, correctAnswer}]
            }
        }
    case DELETE_DECK:
      return { ...action.decks }

      default:
        return state
}
}

export default deck