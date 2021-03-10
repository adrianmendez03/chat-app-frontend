import React from 'react'
import { Link } from 'react-router-dom'

import Backpage from '../components/Backpage'

const ChatNav = props => {

    const { name } = props

    return (
        <div className="nav">
            <Backpage location={'/home'} />
            { name }
            <i className="fas fa-info"></i>
        </div>
    )

}

export default ChatNav