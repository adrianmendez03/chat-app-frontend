import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
    UrlContext,
    UserContext,
    SocketContext,
    HistoryContext
} from '../context'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Search from './Search'
import Chats from './Chats'
import Friends from './Friends'
import Loading from '../components/Loading'
import '../styles/Home.css'

const Home = props => {

    const token = JSON.parse(window.localStorage.getItem('token'))

    const { user, setUser } = useContext(UserContext)
    const { socket } = useContext(SocketContext)
    const { url } = useContext(UrlContext)
    const { setHistory, history } = useContext(HistoryContext)

    const createObjectFromArray = arr => {
        const obj = {}
        arr.forEach(elem => {
            obj[elem.id] = elem
        })
        return obj
    }

    useEffect(() => {
        if (!user || !socket) {
            props.history.push('/')
        } else {
            setHistory(props.history)
            socket.on('refresh', async () => {
                const response = await fetch(`${url}/users/${user.id}/refresh`, {
                    method: 'get',
                    headers: { Authorization: `Bearer ${token}`}
                })
                const data = await response.json()
                data.friends = await createObjectFromArray(data.friends)
                data.requests = await createObjectFromArray(data.requests)
                data.rooms = await createObjectFromArray(data.rooms)
                setUser(data)
            })
        }
    })

    const loading = () => <Loading />
    const loaded = () => {
        return (
            <>
                <Header />
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
                                render={rp => <Friends user={user} {...rp}/>}
                            />
                        </Switch>
                    </div>
                <Footer />
            </>
        )
    }

    return history ? loaded() : loading()
}

export default Home