export const initialState = {
    currentOperand : '0',
    previousOperand : '',
    operation : null,
    computation: '',
    display: ''
}

const reducer = (state, action) => {
    // console.log('state is', currentOperand)
    // console.log(action)
    switch(action.type) {
        case 'CLEAR':
            return {...state, operation: null, previousOperand: '', currentOperand: '0', computation: ''}

        case 'INPUT_NUMBER':
            const newOperand = state.currentOperand
            // if(action.item.num ==='.' && newOperand.includes('.'))return 
            return {...state, currentOperand : newOperand.toString() + action.item.num.toString()}

        case 'MULTIPLY':
            return {...state, operation:'*', previousOperand: state.currentOperand, currentOperand: ''}

        case 'ADD':
            return {...state, operation:'+', previousOperand: state.currentOperand, currentOperand: ''}
        case 'MINUS':
            return {...state, operation:'-', previousOperand: state.currentOperand, currentOperand: ''}
        case 'DIVIDE':
            return {...state, operation:'÷', previousOperand: state.currentOperand, currentOperand: ''}
        case 'EQUALS':
            const previous = parseFloat(state.previousOperand)
            const current = parseFloat(state.currentOperand)
            //if the previous or current is not a number form no computation should take place
            // if (isNaN(previous) || isNaN(current))return
            switch(state.operation){
                case '+':
                    state.computation = previous + current; 
                    break;
                case '-':
                    state.computation = previous - current;
                    break;
                case '*':
                    state.computation = previous * current;
                    break;
                case '÷':
                    state.computation = previous / current;
                    break;
                default :
                    return
            }
            return {...state, operation: null, previousOperand: '', currentOperand: state.computation}
        
        case 'BACKSPACE':
            //create a new currentOperand by slicing from the first index to the last index
            return {...state, currentOperand: state.currentOperand.toString().slice(0, -1)}

        case 'SQUAREROOT':
            return {...state, currentOperand: (Math.sqrt(state.currentOperand)).toFixed(2)}

        case 'PERCENTAGE':
            return {...state, currentOperand: (state.currentOperand/1000).toFixed(2)}
        case 'UPDATE_DISPLAY':
            return {...state, display: action.item.name}
        
        default:
            return state

    }
}

export default reducer;