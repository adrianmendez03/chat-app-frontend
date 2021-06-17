export const createObjectFromArray = (arr) => {
  const obj = {}
  arr.forEach((elem) => {
    obj[elem.id] = elem
  })
  return obj
}

export const createMessageStylings = (messages, sender, index) => {
  let borderRadius = ""
  let profileDisplay = "none"
  let nameDisplay = "none"
  let marginTop = ""
  const prevMessage = messages[index - 1]
  const nextMessage = messages[index + 1]

  // Case: Previous message does not exist - Next message does exist
  if (!prevMessage && nextMessage) {
    if (sender === nextMessage.user.username) {
      borderRadius = "25px 25px 25px 5px"
    } else {
      borderRadius = "25px 25px 25px 25px"
    }
  }
  // Case: Previous message does exist - Next message does not exist
  else if (prevMessage && !nextMessage) {
    if (sender === prevMessage.user.username) {
      borderRadius = "5px 25px 25px 25px"
    } else {
      borderRadius = "25px 25px 25px 25px"
    }
  }
  // Case: Both Previous and Next message exist
  else if (prevMessage && nextMessage) {
    const prevSender = prevMessage.user.username
    const nextSender = nextMessage.user.username
    if (sender === prevSender && sender !== nextSender) {
      profileDisplay = "flex"
      borderRadius = "5px 25px 25px 25px"
    } else if (sender !== prevSender && sender === nextSender) {
      marginTop = "10px"
      nameDisplay = "flex"
      borderRadius = "25px 25px 25px 5px"
    } else if (sender === prevSender && sender === nextSender) {
      borderRadius = "5px 25px 25px 5px"
    } else {
      marginTop = "10px"
      profileDisplay = "flex"
      nameDisplay = "flex"
      borderRadius = "25px 25px 25px 25px"
    }
  }
  // Case: Neither messages exist aka only one message in conversation
  else {
    profileDisplay = "none"
    nameDisplay = "none"
    borderRadius = "25px 25px 25px 25px"
  }
  return { borderRadius, nameDisplay, profileDisplay, marginTop }
}
