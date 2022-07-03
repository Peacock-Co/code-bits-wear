import React, { useState, useEffect } from "react"
import clsx from "clsx"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"

import { makeStyles } from "@material-ui/core/styles"

import Rating from "../home/Rating"
import Sizes from "../product-list/Sizes"
import Swatches from "../product-list/Swatches"
import QtyButton from "../product-list/QtyButton"
import { colorIndex } from "../product-list/ProductFrameGrid"

import favorite from "../../images/favorite.svg"
import subscription from "../../images/subscription.svg"

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.common.grey,
    height: "35rem",
    width: "25rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "58rem",
    },
  },
  center: {
    backgroundColor: theme.palette.primary.main,
    height: "25rem",
    width: "35rem",
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "48rem",
    },
  },
  icon: {
    height: "3rem",
    width: "3rem",
    margin: "1rem",
  },
  sectionContainer: {
    height: "calc(100% / 3)",
  },
  descriptionContainer: {
    backgroundColor: theme.palette.common.grey,
    overflowY: "auto",
    padding: "0.5rem 1rem",
  },
  review: {
    color: theme.palette.common.offBlack,
    textTransform: "none",
  },
  detailContainer: {
    padding: "0.5rem 1rem",
  },
  chipContainer: {
    marginTop: "0.3rem",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "3rem",
    },
  },

  stock: {
    color: theme.palette.common.offBlack,
    marginTop: "1rem",
    fontSize: "1.4rem",
    fontWeight: 700,
  },
  sizesAndSwatches: {
    maxWidth: "13rem",
  },
  actionsContainer: {
    padding: "0 1rem",
  },
}))

export const getStockDisplay = (stock, variant) => {
  switch (stock) {
    case undefined:
    case null:
      return "Loading Inventory..."
      break
    case -1:
      return "Error loading inventory"
      break
    default:
      if (stock[variant].qty === 0) {
        return "Out of stock"
      } else {
        return `${stock[variant].qty} Currenttly in stock`
      }
      break
  }
}

export default function ProductInfo({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
  stock,
}) {
  const classes = useStyles()

  const [selectedSize, setSelectedSize] = useState(
    variants[selectedVariant].size
  )
  const [selectedColor, setSelectedColor] = useState(null)

  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const imageIndex = colorIndex(
    { node: { variants } },
    variants[selectedVariant],
    selectedColor
  )

  const sizes = []
  const colors = []

  variants.map(variant => {
    sizes.push(variant.size)

    if (
      !colors.includes(variant.color) &&
      variant.size === selectedSize &&
      variant.style === variants[selectedVariant].style
    ) {
      colors.push(variant.color)
    }
  })

  useEffect(() => {
    setSelectedColor(null)

    const newVariant = variants.find(
      variant =>
        variant.size === selectedSize &&
        variant.style === variants[selectedVariant].style &&
        variant.color === colors[0]
    )

    setSelectedVariant(variants.indexOf(newVariant))
  }, [selectedSize])

  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex)
    }
  }, [imageIndex])

  const stockDisplay = getStockDisplay(stock, selectedVariant)

  console.log(stock)

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="flex-end"
      direction="column"
      lg={6}
    >
      <Grid
        item
        container
        justifyContent="flex-end"
        classes={{ root: classes.background }}
      >
        <Grid item>
          <img
            src={favorite}
            className={classes.icon}
            alt="add item to favorites"
          />
        </Grid>
        <Grid item>
          <img
            src={subscription}
            className={classes.icon}
            alt="add item to subscription"
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        classes={{ root: classes.center }}
      >
        <Grid
          item
          container
          justifyContent="space-between"
          direction={matchesXS ? "column" : "row"}
          classes={{
            root: clsx(classes.sectionContainer, classes.detailContainer),
          }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h2">{name.split(" ")[0]}</Typography>
              </Grid>
              <Grid item>
                <Rating number={4.5} />
              </Grid>
              <Grid item>
                <Button>
                  <Typography
                    variant="body2"
                    classes={{ root: classes.review }}
                  >
                    Leave a review
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item classes={{ root: classes.chipContainer }}>
            <Chip label={`€${variants[selectedVariant].price}`} />
          </Grid>
        </Grid>
        <Grid
          item
          container
          classes={{
            root: clsx(classes.descriptionContainer, classes.sectionContainer),
          }}
        >
          <Grid item>
            <Typography variant="h4">Description</Typography>
            <Typography variant="body2">{description}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction={matchesXS ? "column" : "row"}
          classes={{
            root: clsx(classes.actionsContainer, classes.sectionContainer),
          }}
          justifyContent={matchesXS ? "space-around" : "space-between"}
          alignItems="center"
        >
          <Grid item classes={{ root: classes.sizesAndSwatches }}>
            <Grid item container direction="column">
              <Grid item>
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                <Swatches
                  colors={colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container direction="column" alignItems="center">
              <QtyButton stock={stock} selectedVariant={selectedVariant} />
              <Grid item>
                <Typography variant="h4" classes={{ root: classes.stock }}>
                  {stockDisplay}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
