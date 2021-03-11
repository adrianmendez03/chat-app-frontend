import React from 'react'
import { Link } from 'react-router-dom'

import Backpage from './Backpage'
import ProfileIcon from './ProfileIcon'
import Loading from './Loading'

const ChatNav = props => {

    const { friend } = props

    const loading = () => <Loading />
    const loaded = () => {
        return (
            <>
                <div id="chatnav" className="nav">
                    <Backpage location={'/home'} />
                    <Link to={`/user/${friend.id}`} className="profile-container">
                        <ProfileIcon username={friend.username}/>
                        {friend.username}
                    </Link>
                </div>
            </>
        )
    }

    return friend ? loaded() : loading()

}

export default ChatNav