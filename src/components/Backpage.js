import React from 'react'
import { Link } from 'react-router-dom'

const Backpage = props => {
    const { location } = props
    return <Link to={location} className="arrow"><i className="fas fa-arrow-left"></i></Link>
}

export default Backpage