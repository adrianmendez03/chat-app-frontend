import React from 'react'
import { Link } from 'react-router-dom'

const ChatNav = props => {

    const { name } = props

    return (
        <div className="nav">
            <Link to="/home"><i className="fas fa-arrow-left"></i></Link>
            { name }
            <i className="fas fa-info"></i>
        </div>
    )

}

export default ChatNav