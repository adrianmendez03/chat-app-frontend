import React, { useContext, useEffect, useRef, useState } from 'react'

import UserContext from '../context/UserContext'
import UrlContext from '../context/UrlContext'
import Result from '../components/Result'
import '../styles/Search.css'

const Search = props => {

    const token = JSON.parse(window.localStorage.getItem('token'))
    const searchBar = useRef(null)
    const { url } = useContext(UrlContext)
    const { user } = useContext(UserContext)
    const [searchVal, setSearchVal] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        searchBar.current.focus()
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

    const renderLabel = () => {
        if (searchVal.length === 0) {
            return null
        } else {
            return `Showing results for ${searchVal}`
        }
    }

    return (
        <div id="search" className="page">
            <input className="searchbar" maxLength="40" ref={searchBar} type="text" placeholder="Search by username" value={searchVal} onChange={handleChange} />
            <span className="label">{renderLabel()}</span>
            <div>
                {renderResults()}
            </div>
        </div>
    )
}

export default Search