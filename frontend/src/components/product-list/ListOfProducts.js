import React, { useState, useEffect } from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles } from "@material-ui/core/styles"

import { useQuery } from "@apollo/client"
import { GET_DETAILS } from "../../apollo/queries"

import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./ProductFrameList"

const useStyles = makeStyles(theme => ({
  productContainer: {
    width: "95%",
    [theme.breakpoints.only("xl")]: {
      "& > *": {
        marginRight: ({ buttonLayout }) =>
          buttonLayout === "grid" ? "calc((100% - (20rem * 4))/3)" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(4n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only("lg")]: {
      "& > *": {
        marginRight: ({ buttonLayout }) =>
          buttonLayout === "grid" ? "calc((100% - (20rem * 3))/2)" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(3n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only("md")]: {
      "& > *": {
        marginRight: ({ buttonLayout }) =>
          buttonLayout === "grid" ? "calc((100% - (20rem * 2)))" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(2n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& > *": {
        marginBottom: "3rem",
      },
    },
  },
}))

export default function ListOfProducts({
  products,
  content,
  buttonLayout,
  page,
  productsPerPage,
  filterOptions,
}) {
  const classes = useStyles({ buttonLayout })
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const FrameHelper = ({ Frame, product, variant }) => {
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [stock, setStock] = useState(null)

    const { loading, error, data } = useQuery(GET_DETAILS, {
      variables: { id: product.node.strapiId },
    })

    // Piece that fetches and shows quantity of the stock of product
    useEffect(() => {
      if (error) {
        setStock(-1)
      } else if (data) {
        setStock(data.product.variants)
      }
    }, [error, data])

    useEffect(() => {
      if (selectedSize === null) return undefined

      setSelectedColor(null)

      const newVariant = product.node.variants.find(
        item =>
          item.size === selectedSize &&
          item.style === variant.style &&
          item.color === colors[0]
      )

      setSelectedVariant(newVariant)
    }, [selectedSize])

    var sizes = []
    var colors = []

    product.node.variants.map(item => {
      sizes.push(item.size)
      if (
        !colors.includes(item.color) &&
        item.size === (selectedSize || variant.size) &&
        item.style === variant.style
      ) {
        colors.push(item.color)
      }
    })

    const hasStyles = product.node.variants.some(
      variant => variant.style !== null
    )

    return (
      <Frame
        sizes={sizes}
        colors={colors}
        selectedSize={selectedSize || variant.size}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        setSelectedSize={setSelectedSize}
        variant={selectedVariant || variant}
        product={product}
        hasStyles={hasStyles}
        stock={stock}
      />
    )
  }

  return (
    <Grid
      item
      container
      direction={matchesSM ? "column" : "row"}
      alignItems={matchesSM ? "center" : undefined}
      classes={{ root: classes.productContainer }}
    >
      {content
        .slice((page - 1) * productsPerPage, page * productsPerPage)
        .map(item => (
          <FrameHelper
            key={item.variant.id}
            variant={item.variant}
            product={products[item.product]}
            Frame={
              buttonLayout === "grid" ? ProductFrameGrid : ProductFrameList
            }
          />
        ))}
    </Grid>
  )
}
