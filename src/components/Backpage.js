import React, { useContext } from 'react'

import { HistoryContext } from '../context'

const Backpage = () => {

    const { history } = useContext(HistoryContext)

    return <div onClick={() => history.goBack()} className="arrow"><i className="fas fa-arrow-left"></i></div>

}

export default Backpage