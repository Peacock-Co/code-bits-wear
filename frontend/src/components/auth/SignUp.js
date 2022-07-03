import React, { useState } from "react"
import clsx from "clsx"
import axios from "axios"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Fields from "./Fields"
import { EmailPassword } from "./Login"
import { setUser, setSnackbar } from "../../contexts/actions"

import addUserIcon from "../../images/add-user.svg"
import nameAdornement from "../../images/name-adornment.svg"
import forward from "../../images/forward-outline.svg"
import backward from "../../images/backwards-outline.svg"

const useStyles = makeStyles(theme => ({
  addUserIcon: {
    height: "9rem",
    width: "10rem,",
    marginTop: "5rem",
  },
  signUpText: {
    fontSize: "1.3rem",
    textTransform: "none",
  },
  signUpButton: {
    height: "3rem",
    width: "20rem",
    borderRadius: 50,
    textTransform: "none",
    marginTop: "-2rem",
    backgroundColor: theme.palette.common.grey,
  },
  text: {
    fontSize: "1.3rem",
  },
  textField: {
    width: "20rem",
  },
  navigation: {
    height: "3rem",
    width: "3rem",
  },
  visibleIcon: {
    padding: 0,
  },
  emailAdornment: {
    height: 15,
    width: 22,
    marginBottom: 4,
  },
  removeButtonMargin: {
    marginTop: 0,
  },
}))

export default function Signup({
  steps,
  setSelectedStep,
  user,
  dispatchUser,
  dispatchFeedback,
}) {
  const classes = useStyles()
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  })

  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNavigate = direction => {
    if (direction === "forward") {
      setInfo(true)
    } else {
      if (info) {
        setInfo(false)
      } else {
        const login = steps.find(step => step.label === "Login")

        setSelectedStep(steps.indexOf(login))
      }
    }
  }

  const handleComplete = () => {
    setLoading(true)
    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local/register", {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then(response => {
        setLoading(false)
        dispatchUser(setUser({ ...response.data.user, jwt: response.data.jwt }))

        const complete = steps.find(step => step.label === "Complete")

        setSelectedStep(steps.indexOf(complete))
      })
      .catch(error => {
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const nameField = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <img src={nameAdornement} alt="name" />,
    },
  }

  const fields = info
    ? EmailPassword(classes, false, false, visible, setVisible)
    : nameField

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  return (
    <>
      <Grid item>
        <img src={addUserIcon} alr="new user" className={classes.addUserIcon} />
      </Grid>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid item>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={loading || (info && disabled)}
            onClick={() => (info ? handleComplete() : null)}
            classes={{
              root: clsx(classes.signUpButton, {
                [classes.passwordError]: errors.password,
              }),
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h3" classes={{ root: classes.signUpText }}>
                sign up{info ? "" : " with Facebook"}
              </Typography>
            )}
          </Button>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={() => handleNavigate("backward")}>
            <img
              src={backward}
              alt="back to login"
              className={classes.navigation}
            />
          </IconButton>
        </Grid>
        {info ? null : (
          <Grid item>
            <IconButton onClick={() => handleNavigate("forward")}>
              <img
                src={forward}
                alt="continue registration"
                className={classes.navigation}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  )
}
