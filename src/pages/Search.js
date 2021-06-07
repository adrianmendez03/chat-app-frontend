import React, { useEffect, useRef, useState } from "react"

import { fetchSearchResults } from "../api/search"
import Result from "../components/Result"
import "../styles/Search.css"

const Search = () => {
  const searchBar = useRef(null)

  const [searchVal, setSearchVal] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    searchBar.current.focus()

    const makeApiCall = async () => {
      const data = await fetchSearchResults(searchVal)
      fetchSearchResults(data)
    }

    makeApiCall()
  }, [searchVal])

  const handleChange = async (e) => {
    setSearchVal(e.target.value)
  }

  const renderResults = () => {
    return results.map((result) => {
      return <Result {...result} key={result.id} />
    })
  }

  return (
    <div id="search" className="page">
      <input
        className="text-input"
        maxLength="40"
        ref={searchBar}
        type="text"
        placeholder="Search by username"
        value={searchVal}
        onChange={handleChange}
      />
      <span className="label">
        {searchVal.length > 0 && `Showing results for ${searchVal}`}
      </span>
      <div>{renderResults()}</div>
    </div>
  )
}

export default Search
