import React, { useState } from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles } from "@material-ui/core/styles"

import ProductFrameGrid from "../product-list/ProductFrameGrid"

const useStyles = makeStyles(theme => ({
  recentContainer: {
    margin: "10rem 0",
    "& > :not(:last-child)": {
      marginRight: "2rem",
    },
  },
  arrow: {
    minWidth: "0",
    height: "3rem",
    width: "3rem",
    fontSize: "3rem",
    color: theme.palette.common.offBlack,
    borderRadius: 50,
    marginBottom: "4rem",
    [theme.breakpoints.down("xs")]: {
      minWidth: "0",
      height: "1rem",
      width: "1rem",
      fontSize: "2rem",
    },
  },
}))

export default function RecentlyViewed({ products }) {
  const classes = useStyles()

  const [firstIndex, setFirstIndex] = useState(0)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const displayNum = matchesSM ? 1 : matchesMD ? 3 : 4

  const handleNavigation = direction => {
    if (firstIndex === 0 && direction === "backward") return null

    if (firstIndex + displayNum === products.length && direction === "forward")
      return null

    setFirstIndex(direction === "forward" ? firstIndex + 1 : firstIndex - 1)
  }

  return (
    <Grid
      item
      container
      justifyContent="center"
      classes={{ root: classes.recentContainer }}
      alignItems="center"
    >
      <Grid item>
        <Button
          onClick={() => handleNavigation("backward")}
          classes={{ root: classes.arrow }}
        >
          {"<"}
        </Button>
      </Grid>
      {products
        ? // Where we show a portion of the products viewed, like the scroll.
          products.slice(firstIndex, firstIndex + displayNum).map(product => {
            const hasStyles = product.node.variants.some(
              variant => variant.style !== null
            )

            return (
              <ProductFrameGrid
                key={product.node.variants[product.selectedVariant].id}
                product={product}
                variant={product.node.variants[product.selectedVariant]}
                disableQuickView
                small
                hasStyles={hasStyles}
              />
            )
          })
        : null}
      <Grid item>
        <Button
          onClick={() => handleNavigation("forward")}
          classes={{ root: classes.arrow }}
        >
          {">"}
        </Button>
      </Grid>
    </Grid>
  )
}
