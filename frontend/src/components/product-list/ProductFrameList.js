import React from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"

import Rating from "../home/Rating"
import Sizes from "./Sizes"
import Swatches from "./Swatches"
import QtyButton from "./QtyButton"
import { colorIndex } from "./ProductFrameGrid"
import { getStockDisplay } from "../product-detail/ProductInfo"

const useStyles = makeStyles(theme => ({
  frame: {
    height: "25rem",
    backgroundColor: theme.palette.common.blue,
  },
  info: {
    backgroundColor: "#f0efeb",
    height: "100%",
    width: "100%",
    padding: "1rem",
    [theme.breakpoints.down("md")]: {
      height: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "25rem",
    },
  },
  productImage: {
    height: "18rem",
    width: "18rem",
  },
  productName: {
    color: theme.palette.common.black,
    fontSize: "1.5rem",
  },
  sizesAndSwatches: {
    maxWidth: "13rem",
  },
  chip: {
    margin: "1rem 0",
    "&:hover": {
      cursor: "pointer",
    },
  },
}))

export default function ProductFrameList({
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
  hasStyles,
  stock,
}) {
  const classes = useStyles()
  const imageIndex = colorIndex(product, variant, selectedColor)

  const images =
    imageIndex !== -1
      ? product.node.variants[imageIndex].images
      : variant.images

  const selectedVariant =
    imageIndex === -1 ? product.node.variants.indexOf(variant) : imageIndex

  const stockDisplay = getStockDisplay(stock, selectedVariant)

  return (
    <Grid item container>
      <Grid
        item
        lg={9}
        container
        alignItems="center"
        justifyContent="space-around"
        classes={{ root: classes.frame }}
      >
        {images.map(image => (
          <Grid
            item
            key={image.url}
            component={Link}
            to={`/${product.node.category.name.toLowerCase()}/${product.node.name
              .split(" ")[0]
              .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`}
          >
            <img
              src={process.env.GATSBY_STRAPI_URL + image.url}
              alt={image.url}
              className={classes.productImage}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        lg={3}
        container
        direction="column"
        justifyContent="space-between"
        classes={{ root: classes.info }}
      >
        <Grid
          item
          container
          direction="column"
          component={Link}
          to={`/${product.node.category.name.toLowerCase()}/${product.node.name
            .split(" ")[0]
            .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`}
        >
          <Grid item>
            <Typography variant="h3" classes={{ root: classes.productName }}>
              {product.node.name}
            </Typography>
          </Grid>
          <Grid item>
            <Rating number={3.5} />
          </Grid>
          <Grid item>
            <Chip
              label={`€ ${variant.price}`}
              classes={{ root: classes.chip }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" classes={{ root: classes.productName }}>
              {stockDisplay}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          classes={{ root: classes.sizesAndSwatches }}
        >
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
        <QtyButton stock={stock} selectedVariant={selectedVariant} />
      </Grid>
    </Grid>
  )
}
