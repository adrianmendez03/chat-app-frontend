import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Footer.css'

const Footer = props => {
    return (
        <div className="footer">
            <Link to="/home"><i className="fas fa-comments"></i></Link>
            <Link to=""><i className="fas fa-plus"></i></Link>
            <Link to="/home/friends"><i className="fas fa-user-friends"></i></Link>
        </div>
    )
}

export default Footer