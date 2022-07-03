import React from "react"
import clsx from "clsx"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  size: {
    color: theme.palette.common.black,
    fontSize: "1.5rem",
  },
  button: {
    border: "2px solid #747474",
    borderRadius: 50,
    height: "3rem",
    width: "3rem",
    minWidth: 0,
  },
  selected: {
    backgroundColor: theme.palette.common.grey,
    "&:hover": {
      backgroundColor: theme.palette.common.grey,
    },
  },
}))

export default function Sizes({ sizes, selectedSize, setSelectedSize }) {
  const classes = useStyles()

  const possibleSizes = ["S", "M", "L"]
  var actualSizes = []

  if (possibleSizes.every(size => sizes.includes(size))) {
    actualSizes = possibleSizes
  }

  return (
    <Grid item container justifyContent="space-between">
      {actualSizes.map(size => (
        <Grid item key={size}>
          <Button
            onClick={() => setSelectedSize(size)}
            classes={{
              root: clsx(classes.button, {
                [classes.selected]: selectedSize === size,
              }),
            }}
          >
            <Typography variant="h4" classes={{ root: classes.size }}>
              {size}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}
