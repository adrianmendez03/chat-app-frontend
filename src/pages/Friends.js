import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from '../context'
import Request from '../components/Request'
import Friend from '../components/Friend'
import Loading from '../components/Loading'
import '../styles/Friends.css'

const Friends = props => {

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

    const { user } = props
    let friendIds, requestIds, roomIds
    const [selected, setSelected] = useState('friends')
    const [styles, setStyles] = useState({
        friends: stylesObj.selected,
        requests: stylesObj.notSelected
    })


    // const privateRooms = roomIds.filter(roomId => {
    //     return user.rooms[roomId].users.length < 2
    // })

    const handleClick = current => {
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

    const renderRequests = () => {
        const { requests } = user
        return requestIds.map(requestId => {
            return <Request request={requests[requestId]} key={requests[requestId].User_Requests.requestId}/>
        })
    }

    const renderFriends = () => {
        const { friends } = user
        return friendIds.map(friendId => {
            return <Friend roomIds={roomIds} friend={friends[friendId]} key={friendId} />
        })
    }

    const loading = () => <Loading />
    const loaded = () => {

        friendIds = Object.keys(user.friends)
        requestIds = Object.keys(user.requests)
        roomIds = Object.keys(user.rooms)

        return (
            <div className="page" id="friends">
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
                        REQUESTS {renderCount(requestIds.length)}
                    </div>
                </div>
                <div className="container">
                    { selected === 'friends' ? renderFriends() : renderRequests() }
                </div>
            </div>
        )
    }

    return (user.requests && user.friends) ? loaded() : loading()

}

export default Friends