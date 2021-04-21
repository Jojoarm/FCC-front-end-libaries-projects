import React, { useEffect, useState } from 'react'
import './RandomQuotes.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import twitterLogo from '../images/twitter-logo.png'
import { CircularProgress } from '@material-ui/core'

const RandomQuotes = () => {
    const [quote, setQuote]= useState([])
    const [color, setColor] = useState('#fff')

    const fetchQuote = async () => {
        try {
            const response = await axios.get("https://type.fit/api/quotes")
            const data = await response.data
            setQuote(data)
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        fetchQuote()
        hexaColor()
    }, [])

    const num = Math.floor((Math.random() * quote.length) + 1);

    //Generating random colors
    const hexaColor = () => {
        let str = '0123456789abcdef'
        let color = ''
        for (let i = 0; i < 6; i++) {
          let index = Math.floor(Math.random() * str.length)
          color += str[index]
        }
        setColor('#' + color)
      }
    //   console.log(color)
    // console.log('The quotes gotten are', quote)

    if (!quote.length) return(
        <div className="spinner">
            <CircularProgress />
        </div>
    ) 

    return (
        <div id="container" className="quote__container" style={{backgroundColor:`${color}`}}>
            <Link to="/" style={{color: 'white', alignSelf: 'flex-start', textAlign: 'left', padding: '20px'}}>
                Back to Projects
            </Link>

            <div id="quote-box" className="quotes" style={{border:`${color}`}} >
                <h4 style={{color:`${color}`}}>A Random Quote Generator</h4>
                <div className ="quote">
                    <p className="quote__text" id="text" style={{color:`${color}`}}>{quote[num]?.text}</p>
                    <p className="author" id="author" style={{color:`${color}`}}>{quote[num]?.author}</p>
                </div>
                <div className="share">
                    <a 
                        id="tweet-quote" 
                        target="_blank" 
                        href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=`+
                        encodeURIComponent('"' + quote[num]?.text + '" ' + quote[num]?.author)} 
                        style={{textDecoration:'none'}}
                    >
                            <div className="twitter__share" style={{backgroundColor:`${color}`}}>
                                <img src={twitterLogo} width="40px" height="40px" />
                            </div> 
                    </a>
                    <button 
                        onClick={fetchQuote, hexaColor} 
                        id="new-quote" className="new__quote"
                        style={{backgroundColor:`${color}`}} 
                        >New Joke
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RandomQuotes
