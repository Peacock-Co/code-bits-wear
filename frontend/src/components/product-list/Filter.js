import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"

import IconButton from "@material-ui/core/IconButton"
import Chip from "@material-ui/core/Chip"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import Checkbox from "@material-ui/core/Checkbox"

import filter from "../../images/filter.svg"
import close from "../../images/close-outline.svg"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: "1rem 0",
  },
  chipRoot: {
    backgroundColor: theme.palette.common.grey,
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
  checkBox: {
    color: theme.palette.common.white,
  },
}))

export default function Filter({ setOption, filterOptions, setFilterOptions }) {
  const classes = useStyles()

  const handleFilter = (option, i) => {
    const newFilters = { ...filterOptions }

    newFilters[option][i].checked = !newFilters[option][i].checked

    setFilterOptions(newFilters)
  }

  return (
    <Grid
      item
      container
      justifyContent="space-between"
      alignItems="center"
      classes={{ root: classes.mainContainer }}
    >
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={filter} alt="filter" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid container justifyContent="space-around">
          {Object.keys(filterOptions)
            .filter(option => filterOptions[option] !== null)
            .map(option => (
              <Grid item key={option}>
                <Grid container direction="column">
                  <Grid item>
                    <Chip
                      label={option}
                      classes={{
                        root: classes.chipRoot,
                        label: classes.chipLabel,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <FormGroup>
                        {filterOptions[option].map(({ label, checked }, i) => (
                          <FormControlLabel
                            key={label}
                            label={label}
                            classes={{ label: classes.checkBox }}
                            control={
                              <Checkbox
                                checked={checked}
                                name={label}
                                classes={{ root: classes.checkBox }}
                                onChange={() => handleFilter(option, i)}
                              />
                            }
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
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
