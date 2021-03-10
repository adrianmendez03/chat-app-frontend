import React from 'react'

import Backpage from '../components/Backpage'

const ChatNav = props => {

    const { name } = props

    return (
        <div className="nav">
            <Backpage location={'/home'} />
            { name }
        </div>
    )

}

export default ChatNav