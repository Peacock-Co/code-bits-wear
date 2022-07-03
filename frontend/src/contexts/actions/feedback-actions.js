import { SET_SNACKBAR } from "./action-types"

//action creator
export const setSnackbar = ({ status, message, open }) => {
  //action
  return {
    type: SET_SNACKBAR,
    payload: { status, message, open },
  }
}
