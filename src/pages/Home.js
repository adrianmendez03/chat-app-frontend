import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../styles/Home.css'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Search from './Search'
import Chats from './Chats'

const Home = props => {

    const { signedInUser, handleUser } = props
    let token = JSON.parse(window.localStorage.getItem('token'))

    useEffect(() => {
        if (token.length === 0) {
            props.history.push('/')
        }
    }, [props, token])

    return (
        <>
            <Header history={props.history} signedInUser={signedInUser} handleUser={handleUser}/>
            <div id="home" className="page">
                <Switch>
                    <Route 
                        exact
                        path="/home"
                        render={rp => <Chats {...rp} signedInUser={signedInUser}/>}
                    />
                    <Route 
                        path="/home/search"
                        render={rp => <Search {...rp} />}
                    />
                </Switch>
            </div>
            <Footer />
        </>
    )
}

export default Home