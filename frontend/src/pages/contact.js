import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import Button from "@material-ui/core/Button"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import clsx from "clsx"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Link } from "gatsby"

import addres from "../images/address.svg"
import phone from "../images/phone-adornment.svg"
import Email from "../images/EmailAdornment"
import send from "../images/send.svg"
import NameAdornment from "../images/NameAdornment"
import backgroungButton from "../images/primary-button-bg.png"

import Layout from "../components/ui/layout"
import validate from "../components/ui/validate"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: "35rem",
    backgroundColor: "#F7D649",
    marginBottom: "7rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "5rem",
      height: "90rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "5rem",
      height: "80rem",
    },
  },
  formContainer: {
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  formWrapper: {
    height: "100%",
    [theme.breakpoints.down("md")]: {
      height: "50%",
      marginTop: "-9rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: "-8.5rem",
    },
  },
  blockContainer: {
    backgroundImage: `url(${backgroungButton})`,
    height: "5rem",
    width: "26rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "4px solid #fff",
    [theme.breakpoints.down("xs")]: {
      width: "20rem",
    },
  },
  titleContainer: {
    marginTop: "-2.5rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "-1.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "-3rem",
    },
  },
  buttonContainer: {
    marginBottom: "-2.5rem",
    textTransform: "none",
    borderRadius: 0,
  },
  sendIcon: {
    marginLeft: "2rem",
    height: "2rem",
    width: "2rem",
  },
  contactInfo: {
    fontSize: "1rem",
    marginLeft: "1rem",
  },
  contactIcon: {
    height: "2rem",
    width: "2rem",
  },
  contactEmailIcon: {
    height: "1.5rem",
    width: "2rem",
  },
  infoContainer: {
    height: "21.25rem",
    [theme.breakpoints.down("xs")]: {
      height: "12.25rem",
    },
  },
  middleInfo: {
    borderTop: "2px solid #000",
    borderBottom: "2px solid #000",
  },
  iconContainer: {
    borderRight: "2px solid #000",
    height: "7rem",
    width: "8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: "4rem",
      width: "4rem",
    },
  },
  textField: {
    width: "30rem",
    [theme.breakpoints.down("xs")]: {
      width: "20rem",
    },
  },
  input: {
    color: "#000",
  },
  multiline: {
    border: "2px solid #000",
    borderRadius: 10,
    padding: "1rem",
  },
  multilineError: {
    border: `2px solid ${theme.palette.error.main}`,
  },
  buttonDisabled: {
    backgroundColor: theme.palette.grey[500],
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #000",
    },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.common.grey}`,
    },
    ".MuiInputBase-input": {
      "&:-webkit-autofill": {
        transitionDelay: "9999s",
        transitionProperty: "background-color, color",
      },
    },
  },
  fieldContainer: {
    marginBottom: "1rem",
  },
  multilineContainer: {
    marginTop: "1rem",
  },
  emailAdornment: {
    height: 17,
    width: 22,
  },
  contactNameIcon: { height: 21, width: 21 },
  contactPhoneIcon: {
    height: 22,
    width: 22,
  },
}))

const ContactPage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState({})

  const fields = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      adornment: (
        <div className={classes.contactNameIcon}>
          <NameAdornment color="#000" />
        </div>
      ),
    },
    email: {
      helperText: "invalid email format",
      placeholder: "Email",
      adornment: (
        <div className={classes.emailAdornment}>
          <Email color="#000" />
        </div>
      ),
    },
    phone: {
      helperText: "invalid phone number",
      placeholder: "Phone number 555555555",
      adornment: (
        <img className={classes.contactPhoneIcon} src={phone} alt="phone" />
      ),
    },
    message: {
      helperText: "you must enter a message",
      placeholder: "Message",
      inputClasses: {
        multiline: classes.multiline,
        error: classes.multilineError,
      },
    },
  }

  const info = [
    {
      label: (
        <span>Calle Lenguas 6 {matchesXS ? <br /> : null} 28021 Madrid</span>
      ),
      icon: <img className={classes.contactIcon} src={addres} alt="adress" />,
    },
    {
      label: "(34) 555555555",
      icon: <img className={classes.contactIcon} src={phone} alt="phone" />,
    },
    {
      label: "pavaoleonardo@hotmail.com",
      icon: (
        <div className={classes.contactEmailIcon}>
          <Email color="#000" />
        </div>
      ),
    },
  ]

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== 4

  return (
    <Layout>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        classes={{ root: classes.mainContainer }}
        direction={matchesMD ? "column" : "row"}
      >
        {/* Contact Form */}
        <Grid item classes={{ root: classes.formWrapper }}>
          <Grid
            container
            classes={{ root: classes.formContainer }}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              classes={{
                root: clsx(classes.titleContainer, classes.blockContainer),
              }}
            >
              <Typography variant="h3">Contact Us</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                {Object.keys(fields).map((field, i) => {
                  const validateHelper = event => {
                    return validate({ [field]: event.target.value })
                  }

                  return (
                    <Grid
                      key={field}
                      item
                      classes={{
                        root:
                          field === "message"
                            ? classes.multilineContainer
                            : classes.fieldContainer,
                      }}
                    >
                      <TextField
                        value={values[field]}
                        onChange={e => {
                          const valid = validateHelper(e)
                          if (errors[field] || valid[field] === true) {
                            setErrors({ ...errors, [field]: !valid[field] })
                          }
                          setValues({ ...values, [field]: e.target.value })
                        }}
                        onBlur={e => {
                          const valid = validateHelper(e)
                          setErrors({ ...errors, [field]: !valid[field] })
                        }}
                        error={errors[field]}
                        helperText={errors[field] && fields[field].helperText}
                        placeholder={fields[field].placeholder}
                        classes={{ root: classes.textField }}
                        multiline={field === "message"}
                        rows={field === "message" ? 8 : undefined}
                        InputProps={{
                          classes: {
                            input: classes.input,
                            ...fields[field].inputClasses,
                          },
                          disableUnderline: field === "message",
                          startAdornment:
                            field === "message" ? undefined : (
                              <InputAdornment position="start">
                                {fields[field].adornment}
                              </InputAdornment>
                            ),
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid
              item
              component={Button}
              disabled={disabled}
              classes={{
                root: clsx(classes.buttonContainer, classes.blockContainer, {
                  [classes.buttonDisabled]: disabled,
                }),
              }}
            >
              <Typography variant="h3">Send message</Typography>
              <img src={send} className={classes.sendIcon} alt="send message" />
            </Grid>
          </Grid>
        </Grid>
        {/* Contact info */}
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            classes={{ root: classes.infoContainer }}
          >
            {info.map((section, i) => (
              <Grid
                key={section.label}
                item
                container
                alignItems="center"
                classes={{ root: i === 1 ? classes.middleInfo : undefined }}
              >
                <Grid item classes={{ root: classes.iconContainer }}>
                  {section.icon}
                </Grid>
                <Grid item>
                  <Typography
                    variant="h2"
                    classes={{ root: classes.contactInfo }}
                  >
                    {section.label}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage
