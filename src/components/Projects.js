import React from 'react'
import './Projects.css'
import { Link } from 'react-router-dom'

const Projects = () => {
    return (
        <div className="project__container">
            <Link to="/random-quotes">
                Random Quotes
            </Link>
        </div>
    )
}

export default Projects
