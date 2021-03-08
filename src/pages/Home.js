import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import '../styles/Home.css'
import UserContext from '../context/UserContext'
// import SocketContext from '../context/SocketContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Search from './Search'
import Chats from './Chats'

const Home = props => {

    const { user } = useContext(UserContext)
    // const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!user) {
            props.history.push('/')
        }
    }, [props, user])

    return (
        <>
            <Header history={props.history}/>
            <div id="home" className="page">
                <Switch>
                    <Route 
                        exact
                        path="/home"
                        render={rp => <Chats {...rp}/>}
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