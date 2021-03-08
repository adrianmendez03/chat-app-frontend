import React, { useContext, useEffect, useState } from 'react'

import UserContext from '../context/UserContext'
import Result from '../components/Result'

const Search = props => {

    const { url } = props
    const token = JSON.parse(window.localStorage.getItem('token'))
    const { user } = useContext(UserContext)
    const [searchVal, setSearchVal] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchVal.length > 0) {
                const response = await fetch(`${url}/users/${user.id}/search/${searchVal}`, {
                    method: 'get',
                    headers: { Authorization: `Bearer ${token}`}
                })
                const data = await response.json()
                setResults(data)
            } else {
                setResults([])
            }
        }

        fetchSearchResults()
    }, [searchVal, token, user, url])


    const handleChange = async e => {
        setSearchVal(e.target.value)
    }

    const renderResults = () => {
        return results.map(result => {
            return <Result {...result} key={result.id}/>
        })
    }

    return (
        <div>
            <input type="text" placeholder="Search by username" value={searchVal} onChange={handleChange} />
            <div>
                {renderResults()}
            </div>
        </div>
    )
}

export default Search