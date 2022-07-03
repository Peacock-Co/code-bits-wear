import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"

import marketingAdornment from "../../images/marketing-adornment.svg"
import moreByUs from "../../images/more-by-us.svg"
import store from "../../images/store.svg"

const useStyles = makeStyles(theme => ({
  buttons: {
    backgroundImage: `url(${marketingAdornment})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "40rem",
    width: "40rem",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
    [theme.breakpoints.down("lg")]: {
      height: "30rem",
      width: "30rem",
      margin: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "20rem",
      width: "20rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "15rem",
      width: "15rem",
      "&:hover": {
        transform: "scale(1)",
      },
    },
  },
  container: {
    margin: "12rem 0",
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      height: "8rem",
      width: "8rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5rem",
      width: "5rem",
    },
  },
  label: {
    color: theme.palette.common.black,
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
}))

export default function () {
  const classes = useStyles()

  const buttons = [
    { label: "Store", icon: store, link: "/jumpers" },
    { label: "More by us", icon: moreByUs, href: "https://www.google.com" },
  ]

  return (
    <Grid
      container
      justifyContent="space-around"
      classes={{ root: classes.container }}
    >
      {buttons.map(button => (
        <Grid item key={button.label}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            classes={{ root: classes.buttons }}
            component={button.link ? Link : "a"}
            to={button.link ? button.link : undefined}
            href={button.href ? button.href : undefined}
          >
            <Grid item>
              <img
                className={classes.icon}
                src={button.icon}
                alt={button.label}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" classes={{ root: classes.label }}>
                {button.label}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
