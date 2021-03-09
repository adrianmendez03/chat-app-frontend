import React, { useContext, useState } from 'react'

import UserContext from '../context/UserContext'
import Request from '../components/Request'
import Friend from '../components/Friend'
import '../styles/Friends.css'

const Friends = () => {

    const stylesObj = {
        selected: {
            color: 'rgba(0, 0, 0, 0.6)',
            background: 'rgba(0, 0, 0, 0.1)'
        },
        notSelected: {
            color: 'rgba(0, 0, 0, 0.4)',
            background: 'rgba(0, 0, 0, 0)'
        }
    }

    const { user } = useContext(UserContext)
    const friendIds = Object.keys(user.friends)
    const [selected, setSelected] = useState('friends')
    const [styles, setStyles] = useState({
        friends: stylesObj.selected,
        requests: stylesObj.notSelected
    })

    const renderRequests = () => {
        return user.requests.map(request => {
            return <Request request={request} key={request.User_Requests.requestId}/>
        })
    }

    const renderFriends = () => {
        const { friends } = user
        return friendIds.map(friendId => {
            return <Friend friend={friends[friendId]} key={friendId} />
        })
    }

    const handleClick = current => {
        console.log('triggered')
        if (current !== 'friends') {
            setStyles({
                friends: stylesObj.notSelected,
                requests: stylesObj.selected
            })
            setSelected('requests')
        }
        else {
            setStyles({
                friends: stylesObj.selected,
                requests: stylesObj.notSelected
            })
            setSelected('friends')
        }
    }

    const renderCount = (count) => {
        if (count === 0) {
            return null
        } else {
            return count
        }
    }

    return (
        <div id="friends">
            <div className="navigation">
                <div 
                    className="select"
                    onClick={() => handleClick('friends')} 
                    style={styles.friends}
                >
                    FRIENDS {renderCount(friendIds.length)}
                </div>
                <div 
                    className="select" 
                    onClick={() => handleClick('requests')} 
                    style={styles.requests}
                >
                    REQUESTS {renderCount(user.requests.length)}
                </div>
            </div>
            <div className="container">
                { selected === 'friends' ? renderFriends() : renderRequests() }
            </div>
        </div>
    )
}

export default Friends