import React, { useState, useContext } from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"

import Login from "./Login"
import Signup from "./SignUp"
import Complete from "./Complete"
import { UserContext, FeedbackContext } from "../../contexts"

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: "#F7D649",
    boxShadow: theme.shadows[4],
    zIndex: 1,
    height: "35rem",
    width: "29rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
  inner: {
    height: "35rem",
    width: "100%",
  },
  container: {
    marginBottom: "8rem",
  },
}))

export default function AuthPortal() {
  const classes = useStyles()

  const [selectedStep, setSelectedStep] = useState(0)

  //React Context
  const { user, dispatchUser } = useContext(UserContext)
  const { feedback, dispatchFeedback } = useContext(FeedbackContext)

  const steps = [
    { component: Login, label: "Login" },
    { component: Signup, label: "Sign Up" },
    { component: Complete, label: "Complete" },
  ]

  return (
    <Grid
      container
      justifyContent="center"
      classes={{ root: classes.container }}
    >
      <Grid item>
        <Paper classes={{ root: classes.paper }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            classes={{ root: classes.inner }}
          >
            {steps.map((Step, i) =>
              selectedStep === i ? (
                <Step.component
                  setSelectedStep={setSelectedStep}
                  steps={steps}
                  user={user}
                  dispatchUser={dispatchUser}
                  feedback={feedback}
                  dispatchFeedback={dispatchFeedback}
                  key={Step.label}
                />
              ) : null
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
