import { SET_USER } from "../actions/action-types"

// function switching over the actions types
export default function userReducer(state, action) {
  const { user } = action.payload

  //make copy the state first
  let newState = { ...state }

  switch (action.type) {
    case SET_USER:
      if (user.username === "Guest") {
        localStorage.removeItem("user")
      } else {
        localStorage.setItem("user", JSON.stringify(user))
      }

      newState = user

      return newState
    default:
      return state
  }
}
