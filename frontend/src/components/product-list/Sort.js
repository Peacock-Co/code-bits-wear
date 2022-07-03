import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Chip from "@material-ui/core/Chip"
import clsx from "clsx"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import sort from "../../images/sort.svg"
import close from "../../images/close-outline.svg"

const useStyles = makeStyles(theme => ({
  chipContainer: {
    [theme.breakpoints.down("md")]: {
      margin: "0.3rem",
    },
  },
  chipRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  chipLabel: {
    ...theme.typography.body2,
  },
  closeIcon: {
    height: "4rem",
    width: "4rem",
    "&:hover": {
      background: "none",
    },
  },
  notActive: {
    backgroundColor: theme.palette.common.grey,
  },
}))

export default function Sort({ setOption, sortOptions, setSortOptions }) {
  const classes = useStyles()

  const matchesSX = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const handleSort = i => {
    const newOptions = [...sortOptions]

    newOptions.map(option => (option.active = false))

    newOptions[i].active = true

    setSortOptions(newOptions)
  }

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={sort} alt="sort" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          justifyContent="space-around"
          direction={matchesSX ? "column" : "row"}
          alignItems={matchesSX ? "center" : undefined}
        >
          {sortOptions.map((option, i) => (
            <Grid
              classes={{ root: classes.chipContainer }}
              item
              key={option.label}
            >
              <Chip
                label={option.label}
                classes={{
                  root: clsx({ [classes.notActive]: option.active !== true }),
                  label: classes.chipLabel,
                }}
                onClick={() => handleSort(i)}
                color={option.active !== true ? "primary" : "secondary"}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => setOption(null)}
          classes={{ root: classes.closeIcon }}
        >
          <img src={close} alt="close" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
