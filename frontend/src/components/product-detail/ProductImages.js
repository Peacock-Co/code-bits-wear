import React from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  selected: {
    height: "30rem",
    width: "30rem",
    [theme.breakpoints.down("sm")]: {
      height: "20rem",
      width: "20rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "18rem",
      width: "18rem",
    },
  },
  small: {
    height: "5rem",
    width: "5rem",
    [theme.breakpoints.down("xs")]: {
      height: "3rem",
      width: "3rem",
    },
  },
  imageItem: {
    margin: "1rem",
  },
}))

export default function ProductImages({
  images,
  selectedImage,
  setSelectedImage,
}) {
  const classes = useStyles()

  return (
    <Grid item container direction="column" alignItems="center" lg={6}>
      <Grid item>
        <img
          src={process.env.GATSBY_STRAPI_URL + images[selectedImage].url}
          alt="product_large"
          className={classes.selected}
        />
      </Grid>
      <Grid item container justifyContent="center">
        {images.map((image, i) => (
          <Grid item key={image.url} classes={{ root: classes.imageItem }}>
            <IconButton onClick={() => setSelectedImage(i)}>
              <img
                src={process.env.GATSBY_STRAPI_URL + images[selectedImage].url}
                alt={`product_small${i}`}
                className={classes.small}
              />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
