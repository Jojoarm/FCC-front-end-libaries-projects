import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateContext'
import './Calculator.css'

const Calculator = () => {
    // const [{ currentOperand }, dispatch] = useStateValue();
    const [{ currentOperand, previousOperand, operation }, dispatch] = useStateValue();
    const [previousDisplay, setPreviousDisplay] = useState('')
    const [currentDisplay, setCurrentDisplay] = useState(currentOperand)
    // console.log(initialState)

    //update the display of the calculator everytime the input changes
    useEffect(() => {
        updateDisplay()
    }, [currentOperand, operation, previousOperand])
   
    const appendNumber = (e) => {
        e.preventDefault()
        //The display length should not be greater than 14
        if (currentDisplay.length >= 15)return

        //Prevent the user from inputing '.' twice
        if(e.target.innerText ==='.' && currentOperand.includes('.'))return
        
        // dispatch the item into the data layer
        dispatch({
            type: 'INPUT_NUMBER',
            item: {
                num: e.target.innerText
            }, 
        })
    }

    const multiplyOperation = () => {
        if (currentOperand === '') return
        //if we already have already performed a calculation before, clicking another operation should continue from that
        if (previousOperand !== ''){
            dispatch({
                type: 'EQUALS',
            })
        }
        dispatch({
            type: 'MULTIPLY',
        })
    }
    const addOperation = () => {
        if (currentOperand === '') return
        if (previousOperand !== ''){
            dispatch({
                type: 'EQUALS',
            })
        }
        dispatch({
            type: 'ADD',
        })
    }
    const minusOperation = () => {
        if (currentOperand === '') return
        if (previousOperand !== ''){
            dispatch({
                type: 'EQUALS',
            })
        }
        dispatch({
            type: 'MINUS',
        })
    }
    const divideOperation = () => {
        if (currentOperand === '') return
        if (previousOperand !== ''){
            dispatch({
                type: 'EQUALS',
            })
        }
        dispatch({
            type: 'DIVIDE',
        })
    }

    const compute = () => {
        const previous = parseFloat(previousOperand)
        const current = parseFloat(currentOperand)
            //if the previous or current is not a number form no computation should take place
        if (isNaN(previous) || isNaN(current))return
        dispatch({
            type: 'EQUALS',
        })
        
    }

    const clear = () => {
        dispatch({
            type: 'CLEAR'
        })
        updateDisplay()
    }
    // console.log('previous', previousOperand)
    //     console.log('current', currentOperand)
    //     console.log('operation', operation)
    
    const backSpace = () => {
        dispatch({
            type: 'BACKSPACE'
        })
    }
    
    const squareRoot = () => {
        dispatch({
            type: 'SQUAREROOT'
        })
    }

    const percentage = () => {
        dispatch({
            type: 'PERCENTAGE'
        })
    }

    const displayNumber = (num) => {
        const stringNum = num.toString()
        const intPart = parseFloat(stringNum.split('.')[0]) /*You split the stringNum after the fullstop and take the first part as integer side*/
        const decimalPart = stringNum.split('.')[1]
        let integerDisplay
        if(isNaN(intPart)){
            integerDisplay = ''
        } else {
            integerDisplay = intPart.toLocaleString('en')
        }
        if (decimalPart !==undefined){
            return `${integerDisplay}.${decimalPart}`
        } else {return integerDisplay}
    }
    
    const updateDisplay = () => {
        setCurrentDisplay(displayNumber(currentOperand))
        // this.currentDisplay.innerHTML = this.displayNumber(this.currentOperand);
        if (operation !== null){
            setPreviousDisplay(`${displayNumber(previousOperand)} ${operation}`) 
        } else{
            setPreviousDisplay('')
        } 
    }

    // console.log(currentDisplay)

    return (
        <div className="calculator__container" id="container">
            <Link to="/" style={{textDecoration: 'underline', color: 'black', alignSelf: 'flex-start', position: 'fixed', left:'30px', top: '30px', padding: '20px'}}>
                Back to Projects
            </Link>
            <div className="calculator">
                <div className='name'>Calculator by Jojo</div>
                <div className="display" id="screen">
                    <div className="previous-display" id="previous-display">{previousDisplay}</div>
                    <div className="current-display" id="display">{currentDisplay}</div>
                </div>
                <div className="keys" id="keys-section">
                    <button onClick={clear} className="btn operators" id="clear">AC</button>
                    <button onClick={backSpace} className="btn operators" id="back-space">DEL</button>
                    <button onClick={percentage} className="btn operators" id="percentage">%</button>
                    <button onClick={divideOperation} className="btn operation" id="divide">÷</button>
                    <button onClick={squareRoot} className="btn operators" id="square-root">√</button>
                    <button onClick={appendNumber} className="btn number" id="one">1</button>
                    <button onClick={appendNumber} className="btn number" id="two">2</button>
                    <button onClick={multiplyOperation} className="btn operation" id="multiply">*</button>
                    <button onClick={appendNumber} className="btn number" id="three">3</button>
                    <button onClick={appendNumber} className="btn number" id="four">4</button>
                    <button onClick={appendNumber} className="btn number" id="five">5</button>
                    <button onClick={addOperation} className="btn operation" id="add">+</button>
                    <button onClick={appendNumber} className="btn number" id="six">6</button>
                    <button onClick={appendNumber} className="btn number" id="seven">7</button>
                    <button onClick={appendNumber} className="btn number" id="eight">8</button>
                    <button onClick={minusOperation} className="btn operation" id="subtract">-</button>
                    <button onClick={appendNumber} className="btn number" id="nine">9</button>
                    <button onClick={appendNumber} className="btn number" id="zero">0</button>
                    <button onClick={appendNumber} className="btn number" id="decimal">.</button>
                    <button onClick={compute} className="btn operation" id="equals">=</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator
