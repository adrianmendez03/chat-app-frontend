import React from 'react'

const Action = props => {
    const { type, handleClick, background } = props

    return (
        <div className="action" onClick={handleClick} style={background}>{type}</div>
    )
}

export default Action

