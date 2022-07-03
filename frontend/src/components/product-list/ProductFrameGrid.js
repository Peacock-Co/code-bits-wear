import React, { useState } from "react"
import clsx from "clsx"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles } from "@material-ui/core/styles"
import { navigate } from "gatsby"
import QuickView from "./QuickView"

const useStyles = makeStyles(theme => ({
  frame: {
    backgroundColor: theme.palette.common.orange,
    borderRadius: 1,
    boxShadow: theme.shadows[5],
    zIndex: 1,
    "&:hover": {
      backgroundColor: "#BFDBF7",
    },
    height: "20rem",
    width: "20rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      width: "20rem",
    },
    [theme.breakpoints.up("xs")]: {
      height: ({ small }) => (small ? "15rem" : undefined),
      width: ({ small }) => (small ? "15rem" : undefined),
    },
  },
  product: {
    height: "18rem",
    width: "18rem",
    [theme.breakpoints.up("xs")]: {
      height: ({ small }) => (small ? "12rem" : undefined),
      width: ({ small }) => (small ? "12rem" : undefined),
    },
  },
  title: {
    height: "4rem",
    width: "18rem",
    color: theme.palette.common.black,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    [theme.breakpoints.up("xs")]: {
      width: ({ small }) => (small ? "15rem" : undefined),
      fontSize: "1.2rem",
    },
  },
  invisibility: {
    visibility: "hidden",
  },
  frameContainer: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}))

export const colorIndex = (product, variant, color) => {
  return product.node.variants.indexOf(
    product.node.variants.filter(
      item =>
        item.color === color &&
        variant.style === item.style &&
        item.size === variant.size
    )[0]
  )
}

export default function ProductFrameGrid({
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
  hasStyles,
  disableQuickView,
  small,
  stock,
}) {
  const classes = useStyles({ small })
  const [open, setOpen] = useState(false)

  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const imageIndex = colorIndex(product, variant, selectedColor)

  const imgURL =
    process.env.GATSBY_STRAPI_URL +
    (imageIndex !== -1
      ? product.node.variants[imageIndex].images[0].url
      : variant.images[0].url)

  const productName = product.node.name

  return (
    <Grid
      item
      classes={{
        root: clsx(classes.frameContainer, {
          [classes.invisibility]: open === true,
        }),
      }}
    >
      <Grid
        container
        direction="column"
        onClick={() =>
          matchesSM || disableQuickView
            ? navigate(
                `/${product.node.category.name.toLowerCase()}/${product.node.name
                  .split(" ")[0]
                  .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`
              )
            : setOpen(true)
        }
      >
        <Grid item classes={{ root: classes.frame }}>
          <img
            src={imgURL}
            alt={product.node.name}
            className={classes.product}
          />
        </Grid>
        <Grid item>
          <Typography variant="h4" classes={{ root: classes.title }}>
            {productName}
          </Typography>
        </Grid>
      </Grid>
      <QuickView
        open={open}
        setOpen={setOpen}
        url={imgURL}
        name={productName}
        price={variant.price}
        product={product}
        variant={variant}
        sizes={sizes}
        colors={colors}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
        hasStyles={hasStyles}
        stock={stock}
        imageIndex={imageIndex}
      />
    </Grid>
  )
}
