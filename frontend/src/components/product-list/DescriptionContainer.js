import React, { useState } from "react"
import clsx from "clsx"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles } from "@material-ui/core/styles"

import background from "../../images/toolbar-background.svg"
import ListIcon from "../../images/ListAdornment"
import GridIcon from "../../images/GridAdornment"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: "3rem",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      padding: "2rem 0",
    },
  },
  description: {
    color: theme.palette.common.white,
    marginTop: "2rem",
  },
  descriptionContainer: {
    backgroundColor: theme.palette.common.grey,
    height: "15rem",
    width: "60%",
    borderRadius: 25,
    padding: "1rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRadius: 0,
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
    },
  },
  button: {
    border: `2px solid ${theme.palette.common.grey}`,
    borderRadius: 25,
    borderRightColor: `${theme.palette.common.grey} !important`,
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
    padding: "0.5rem 1.5rem",
  },
  selectedLayout: {
    backgroundColor: theme.palette.common.grey,
    "&:hover": {
      backgroundColor: "#F7D649",
    },
  },
  buttonGroup: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: "1rem",
    marginBottom: "3rem",
    [theme.breakpoints.down("md")]: {
      position: "relative",
      display: "flex",
      alignSelf: "flex-end",
      marginRight: "1rem",
      marginBottom: 0,
      marginTop: "2rem",
    },
  },
}))

export default function DescriptionContainer({
  name,
  description,
  buttonLayout,
  setButtonLayout,
}) {
  const classes = useStyles()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const changeLayout = option => {
    setButtonLayout(option)
  }

  return (
    <Grid
      item
      container
      direction={matchesMD ? "column" : "row"}
      classes={{ root: classes.mainContainer }}
      justifyContent="center"
      alignItems={matchesMD ? "center" : undefined}
    >
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography
          align="center"
          variant="h2"
          paragraph
          gutterBottom
          classes={{ root: classes.description }}
        >
          {name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
          classes={{ root: classes.description }}
        >
          {description}
        </Typography>
      </Grid>
      <Grid item classes={{ root: classes.buttonGroup }}>
        <ButtonGroup>
          <Button
            onClick={() => changeLayout("list")}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selectedLayout]: buttonLayout === "list",
              }),
            }}
          >
            <ListIcon color={buttonLayout === "list" ? "#fff" : undefined} />
          </Button>
          <Button
            onClick={() => changeLayout("grid")}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selectedLayout]: buttonLayout === "grid",
              }),
            }}
            disableRipple
          >
            <GridIcon color={buttonLayout === "grid" ? "#fff" : undefined} />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}
