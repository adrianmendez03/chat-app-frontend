import React, { useContext } from 'react'

import { HistoryContext } from '../context'

const Backpage = () => {

    const { history } = useContext(HistoryContext)

    return <div className="arrow"><i onClick={() => history.goBack()} className="fas fa-arrow-left"></i></div>

}

export default Backpage