const URL = process.env.REACT_APP_API_URL

export const handleSignup = async (newUser) => {
  await fetch(URL + "/auth/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
}
