import React from "react"

import "../../styles/Action.css"

const Action = (props) => {
  const { type, handleClick, background } = props

  return (
    <div className="action" onClick={handleClick} style={background}>
      {type}
    </div>
  )
}

export default Action
