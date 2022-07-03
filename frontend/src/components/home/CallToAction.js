import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { Link } from "gatsby"

import logo from "../../images/varxlogo.svg"

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: "5rem",
  },
  logoContainer: {
    height: "15rem",
    width: "15rem",
  },
  buttonsContainer: {
    marginTop: "1rem",
  },
  headingContainer: {
    [theme.breakpoints.down("sm")]: {
      padding: "0 1rem",
    },
  },
  body: {
    maxWidth: "45rem",
    marginTop: ".5rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 1rem",
    },
  },
  logo: {
    marginTop: "0rem",
  },
  contactButton: {
    color: theme.palette.common.black,
    marginRight: "1rem",
  },
}))

export default function CallToAction() {
  const classes = useStyles()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      classes={{ root: classes.container }}
      direction={matchesMD ? "column" : "row"}
    >
      <Grid item classes={{ root: classes.logoContainer }}>
        <img src={logo} alt="quality-commited" className={classes.logo} />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item classes={{ root: classes.headingContainer }}>
            <Typography variant="h2" align={matchesMD ? "center" : undefined}>
              Commited to quality
            </Typography>
          </Grid>
          <Grid item classes={{ root: classes.body }}>
            <Typography
              variant="body1"
              align={matchesMD ? "center" : undefined}
            >
              At codewear our mission is to provide comfortable, durable,
              premium, designer clothing accessories to developers and
              techonology enthusiasts.'
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent={matchesMD ? "center" : undefined}
            classes={{ root: classes.buttonsContainer }}
          >
            <Grid item>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                classes={{ root: classes.contactButton }}
              >
                Contact us
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/account"
                variant="contained"
                color="secondary"
                classes={{ root: classes.account }}
              >
                Create account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
