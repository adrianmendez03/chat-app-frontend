import React from 'react'

import Backpage from './Backpage'
import ProfileIcon from './ProfileIcon'

const ChatNav = props => {

    const { name } = props

    return (
        <>
            <div id="chatnav" className="nav">
                <Backpage location={'/home'} />
                <div className="profile-container">
                    <ProfileIcon username={name}/>
                    {name}
                </div>
            </div>
        </>
    )

}

export default ChatNav