import React, { useEffect, useState, useRef, useContext } from "react"
// import io from "socket.io-client"

import { sendMessage } from "../../api/room"
import { createMessageStylings } from "../../utils"
import Message from "./Message"
import MessageBar from "./MessageBar"

const Display = (props) => {
  const [messages, setMessages] = useState(props.messages)
  const socketRef = useRef()
  const bottom = useRef()

  //   useEffect(() => {
  //     socketRef.current = io.connect("https://socket-io-am.herokuapp.com/")
  //     socketRef.current.emit("joinRoom", roomId)
  //     socketRef.current.on("message", (message) => {
  //       setMessages([...messages, message])
  //       bottom.current.scrollIntoView({ behavior: "smooth" })
  //     })
  //     if (bottom.current) {
  //       bottom.current.scrollIntoView({ behavior: "smooth" })
  //     }
  //     return () => socketRef.current.disconnect()
  //   }, [messages, roomId])

  const renderMessages = () => {
    return messages.map((message, index) => {
      const stylings = createMessageStylings(
        messages,
        message.user.username,
        index
      )
      return <Message message={message} stylings={stylings} key={index} />
    })
  }

  const handleSend = (message) => {
    sendMessage(message, props.roomId)
  }

  return (
    <>
      <div className="messages">
        {renderMessages()}
        <div ref={bottom} />
      </div>
      <MessageBar handleSend={handleSend} />
    </>
  )
}

export default Display
