import React from 'react'
import './Projects.css'
import { Link } from 'react-router-dom'
import random from '../images/random.PNG'
import calculator from '../images/calculator.PNG'
import markdown from '../images/markdown.PNG'
import timer from '../images/timer.PNG'
import drum from '../images/drum.PNG'

const Projects = () => {
    return (
        <div className="project__container">
            <div>
            <Link to="/random-quotes" style={{textDecoration:'none', color:'black'}}>
                <div className="random__container">
                    <div className="display__picture">
                        <img src={random}  alt="display picture" className="display__pic" />
                    </div>
                    <p>Random Quotes</p>
                </div>
            </Link>
            </div>

            <div>
            <Link to="/calculator" style={{textDecoration:'none', color:'black'}}>
                <div className="random__container">
                    <div className="display__picture">
                        <img src={calculator}  alt="display picture" className="display__pic" />
                    </div>
                    <p>Calculator Project</p>
                </div>
            </Link>
            </div>

            <div>
            <Link to="/markdown-previewer" style={{textDecoration:'none', color:'black'}}>
                <div className="random__container">
                    <div className="display__picture">
                        <img src={markdown}  alt="display picture" className="display__pic" />
                    </div>
                    <p>Markdown Previewer</p>
                </div>
            </Link>
            </div>

            <div>
            <Link to="/timer" style={{textDecoration:'none', color:'black'}}>
                <div className="random__container">
                    <div className="display__picture">
                        <img src={timer}  alt="display picture" className="display__pic" />
                    </div>
                    <p>25 + 5 Clock</p>
                </div>
            </Link>
            </div>

            <div>
            <Link to="/drum-machine" style={{textDecoration:'none', color:'black'}}>
                <div className="random__container">
                    <div className="display__picture">
                        <img src={drum}  alt="display picture" className="display__pic" />
                    </div>
                    <p>Drum Machine</p>
                </div>
            </Link>
            </div>
        </div>
    )
}

export default Projects
