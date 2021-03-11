import React from 'react'

import '../styles/Profile.css'

const ProfileIcon = props => {

    const { username, display } = props
    
    return (
        <div className="profile" style={display}>
            { username[0] }
        </div>
    )
}

export default ProfileIcon