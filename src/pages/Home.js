import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
    UrlContext,
    UserContext,
    SocketContext
} from '../context'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Search from './Search'
import Chats from './Chats'
import Friends from './Friends'
import '../styles/Home.css'

const Home = props => {

    const token = JSON.parse(window.localStorage.getItem('token'))
    const { url } = useContext(UrlContext)
    const { user, setUser } = useContext(UserContext)
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (!user) {
            props.history.push('/')
        }
    }, [props, user])

    socket.on('refresh', async () => {
        console.log('refresh')
        const response = await fetch(`${url}/users/${user.id}`, {
            method: 'get',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        setUser(data)
    })

    return (
        <>
            <Header history={props.history}/>
            <div id="home">
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
                    <Route 
                        path="/home/friends"
                        render={rp => <Friends {...rp}/>}
                    />
                </Switch>
            </div>
            <Footer />
        </>
    )
}

export default Home