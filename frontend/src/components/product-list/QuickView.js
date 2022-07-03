import React from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import DialogContent from "@material-ui/core/DialogContent"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import { makeStyles } from "@material-ui/core/styles"
import { Dialog } from "@material-ui/core"
import { Link } from "gatsby"

import Rating from "../home/Rating"
import Sizes from "./Sizes"
import Swatches from "./Swatches"
import QtyButton from "./QtyButton"
import { getStockDisplay } from "../product-detail/ProductInfo"

import ExploreIcon from "../../images/ExploreAdornment"

const useStyles = makeStyles(theme => ({
  selectedFrame: {
    backgroundColor: "#f0efeb",
    borderRadius: 1,
    boxShadow: theme.shadows[5],
    zIndex: 1,
    height: "50.4rem",
    width: "50.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 !important",
  },
  dialog: {
    maxWidth: "100%",
  },
  productImage: {
    height: "25rem",
    width: "25rem",
    position: "relative",
    top: 20,
    left: 10,
  },
  toolbar: {
    backgroundColor: "#f0efeb",
    height: "13rem",
    marginTop: "2rem",
    padding: "0.5rem 0.5rem",
    position: "relative",
  },
  productName: {
    color: theme.palette.common.black,
    fontSize: "1.5rem",
  },
  productDetailsTypo: {
    color: theme.palette.common.black,
    fontSize: "1.2rem",
  },
  details: {
    textTransform: "none",
  },
  exploreIcon: {
    height: "1.5re",
    width: "2rem",
    marginLeft: "0.5rem",
    display: "flex",
    alignContent: "center",
  },
  detailButton: {
    padding: 0,
    marginTop: "0.5rem",
  },
  ProductDetails: {
    marginBottom: "1rem",
  },
  infoContainer: {
    height: "100%",
  },
  chipContainer: {
    display: "flex",
    alignItems: "center",
  },
  qtyContainer: {
    marginTop: "1.25rem",
  },
  infoItem: {
    position: "absolute",
    left: "1rem",
    height: "calc(100% - 1rem)",
  },
  actionsItem: {
    position: "absolute",
    right: "1rem",
  },
}))

export default function QuickView({
  open,
  setOpen,
  url,
  name,
  price,
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
  imageIndex,
}) {
  const classes = useStyles()

  const selectedVariant =
    imageIndex === -1 ? product.node.variants.indexOf(variant) : imageIndex

  const stockDisplay = getStockDisplay(stock, selectedVariant)

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent classes={{ root: classes.selectedFrame }}>
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            component={Link}
            to={`/${product.node.category.name.toLowerCase()}/${product.node.name
              .split(" ")[0]
              .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`}
          >
            <img
              src={url}
              alt="product image"
              className={classes.productImage}
            />
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            classes={{ root: classes.toolbar }}
          >
            <Grid item classes={{ root: classes.infoItem }}>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                classes={{ root: classes.infoContainer }}
                component={Link}
                to={`/${product.node.category.name.toLowerCase()}/${product.node.name
                  .split(" ")[0]
                  .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ""}`}
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    classes={{ root: classes.productName }}
                  >
                    {name}
                  </Typography>
                  <Rating number={4} />
                </Grid>
                <Grid item classes={{ root: classes.ProductDetails }}>
                  <Typography
                    variant="h4"
                    classes={{ root: classes.productDetailsTypo }}
                  >
                    {stockDisplay}
                  </Typography>
                  <Button classes={{ root: classes.detailButton }}>
                    <Typography
                      variant="h4"
                      classes={{ root: classes.productDetailsTypo }}
                    >
                      Details
                    </Typography>
                    <div className={classes.exploreIcon}>
                      <ExploreIcon color="#000000" />
                    </div>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item classes={{ root: classes.chipContainer }}>
              <Chip label={`€ ${price}`} />
            </Grid>
            <Grid item classes={{ root: classes.actionsItem }}>
              <Grid container direction="column" alignItems="center">
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
                <span className={classes.qtyContainer}>
                  <QtyButton stock={stock} selectedVariant={selectedVariant} />
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
