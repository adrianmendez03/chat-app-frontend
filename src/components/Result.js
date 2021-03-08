import React from 'react'

const Result = props => {

    const { username } = props

    return (
        <div className="result">
            <div className="profile">
                {username[0]}
            </div>
            <div className="room-name">
                {username}
            </div>
        </div>
    )
}

export default Result