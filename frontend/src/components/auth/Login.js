import React, { useState } from "react"
import axios from "axios"
import clsx from "clsx"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"

import { makeStyles } from "@material-ui/core/styles"

import accountIcon from "../../images/account.svg"
import EmailAdornment from "../../images/EmailAdornment"
import passwordAdornement from "../../images/password-adornment.svg"
import hidePasswordIcon from "../../images/hide-password.svg"
import showPasswordIcon from "../../images/show-password.svg"
import addUserIcon from "../../images/add-user.svg"
import forgotPassordIcon from "../../images/forgot.svg"
import close from "../../images/close.svg"

import Fields from "./Fields"
import { setUser, setSnackbar } from "../../contexts/actions"

const useStyles = makeStyles(theme => ({
  loginAdornment: {
    marginTop: "2rem",
  },
  emailAdornment: {
    height: 15,
    width: 22,
    marginBottom: 4,
  },
  loginButton: {
    width: "20rem",
    borderRadius: 50,
    textTransform: "none",
    marginTop: "1rem",
    backgroundColor: theme.palette.common.grey,
  },
  facebookButton: {
    marginTop: "-1rem",
  },
  facebookText: {
    fontSize: "1rem",
    fontWeight: 700,
    textTransform: "none",
    color: "#1877F2",
  },
  visibleIcon: {
    padding: 0,
  },
  passwordError: {
    marginTop: "0",
  },
  close: {
    paddingTop: 5,
  },
  reset: {
    marginTop: "-4rem",
  },
}))

export const EmailPassword = (
  classes,
  hideEmail,
  hidePassword,
  visible,
  setVisible
) => ({
  email: {
    helperText: "invalid email",
    placeholder: "Email",
    type: "text",
    hidden: hideEmail,
    startAdornment: (
      <span className={classes.emailAdornment}>
        <EmailAdornment />
      </span>
    ),
  },
  password: {
    helperText:
      "your password must be at least eight characteres and include one uppercase letter, one number, and one special character",
    placeholder: "Password",
    hidden: hidePassword,
    type: visible ? "text" : "password",
    startAdornment: <img src={passwordAdornement} alt="password" />,
    endAdornment: (
      <IconButton
        classes={{ root: classes.visibleIcon }}
        onClick={() => setVisible(!visible)}
      >
        <img
          src={visible ? showPasswordIcon : hidePasswordIcon}
          alt={`${visible ? "Show" : "Hide"} Password`}
        />
      </IconButton>
    ),
  },
})

export default function Login({
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
  })

  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [forgot, setForgot] = useState(false)
  const [loading, setLoading] = useState(false)

  const fields = EmailPassword(classes, false, forgot, visible, setVisible)

  const navigateSignUp = () => {
    const signUp = steps.find(step => step.label === "Sign Up")

    setSelectedStep(steps.indexOf(signUp))
  }

  const handleLogin = () => {
    setLoading(true)

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then(response => {
        setLoading(false)
        dispatchUser(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        )
      })
      .catch(error => {
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const handleForgot = () => {
    setLoading(true)

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/forgot-password", {
        email: values.email,
      })
      .then(response => {
        setLoading(false)

        dispatchFeedback(
          setSnackbar({ status: "success", message: "Reset code sent!" })
        )
        setTimeout(() => {
          setForgot(false)
        }, 6000)
      })
      .catch(error => {
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  return (
    <>
      <Grid item>
        <img
          src={accountIcon}
          alt="login page"
          className={classes.loginAdornment}
        />
      </Grid>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid>
        <Button
          variant="contained"
          color="primary"
          classes={{
            root: clsx(classes.loginButton, {
              [classes.reset]: forgot,
            }),
          }}
          disabled={loading || (!forgot && disabled)}
          onClick={() => (forgot ? handleForgot() : handleLogin())}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h3">
              {forgot ? "reset password" : "login"}
            </Typography>
          )}
        </Button>
      </Grid>
      {forgot ? null : (
        <Grid item>
          <Button
            classes={{
              root: clsx(classes.facebookButton, {
                [classes.passwordError]: errors.password,
              }),
            }}
          >
            <Typography variant="h3" classes={{ root: classes.facebookText }}>
              login with facebook
            </Typography>
          </Button>
        </Grid>
      )}
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={navigateSignUp}>
            <img src={addUserIcon} alt="sign up" />
          </IconButton>
        </Grid>
        <Grid
          item
          classes={{
            root: clsx({
              [classes.close]: forgot,
            }),
          }}
        >
          <IconButton onClick={() => setForgot(!forgot)}>
            <img
              src={forgot ? close : forgotPassordIcon}
              alt={forgot ? "back to login" : "forgot password"}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
