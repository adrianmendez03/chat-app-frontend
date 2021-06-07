import React from "react"
import { useHistory } from "react-router"

const Backpage = () => {
  const history = useHistory()

  return (
    <div className="arrow">
      <i onClick={() => history.goBack()} className="fas fa-arrow-left"></i>
    </div>
  )
}

export default Backpage
