import React, { useState, useRef, useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Fab from "@material-ui/core/Fab"
import Pagination from "@material-ui/lab/Pagination"
import { makeStyles } from "@material-ui/core"

import { graphql } from "gatsby"

import DynamicTollbar from "../components/product-list/DynamicToolbar"
import ListOfProducts from "../components/product-list/ListOfProducts"
import {
  alphabetic,
  time,
  price,
} from "../components/product-list/SortFunctions"

import Layout from "../components/ui/layout"

const useStyles = makeStyles(theme => ({
  fab: {
    alignSelf: "flex-end",
    marginRight: "2rem",
    marginBottom: "2rem",
    backgroundColor: theme.palette.common.yellow,
    fontFamily: "Montserrat",
    fontSize: "4rem",
    width: "5rem",
    height: "5rem",
    "&:hover": {
      backgroundColor: "#BFDBF7",
    },
  },
  "@global": {
    ".MuiPaginationItem-root": {
      fontFamily: "Hurme Geometric Sans No 3",
      fontSize: "1.6rem",
      color: theme.palette.common.black,
    },
  },
  pagination: {
    alignSelf: "center",
    marginRight: "2%",
    marginTop: "-3rem",
    marginBottom: "3rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "0.1rem",
    },
  },
}))

export default function ProductList({
  pageContext: { filterOptions: options, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) {
  const classes = useStyles()
  const [buttonLayout, setButtonLayout] = useState("grid")
  const [page, setPage] = useState(1)
  const [filterOptions, setFilterOptions] = useState(options)
  const [sortOptions, setSortOptions] = useState([
    { label: "A-Z", active: true, function: data => alphabetic(data, "asc") },
    { label: "Z-A", active: false, function: data => alphabetic(data, "desc") },
    { label: "NEWEST", active: false, function: data => time(data, "asc") },
    { label: "OLDEST", active: false, function: data => time(data, "desc") },
    { label: "PRICE ↑", active: false, function: data => price(data, "asc") },
    { label: "PRICE ↓", active: false, function: data => price(data, "desc") },
    { label: "REVIEWS", active: false, function: data => data },
  ])
  const scrollRef = useRef(null)

  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setPage(1)
  }, [filterOptions, buttonLayout])

  const productsPerPage = buttonLayout === "grid" ? 16 : 6

  var content = []

  const selectedSort = sortOptions.filter(option => option.active)[0]
  const sortedProducts = selectedSort.function(products)

  sortedProducts.map((product, i) =>
    product.node.variants.map(variant => content.push({ product: i, variant }))
  )

  var isFiltered = false
  var filters = {}
  var filteredProducts = []

  Object.keys(filterOptions)
    .filter(option => filterOptions[option] !== null)
    .map(option => {
      filterOptions[option].forEach(value => {
        if (value.checked) {
          isFiltered = true

          if (filters[option] === undefined) {
            filters[option] = []
          }

          if (!filters[option].includes(value)) {
            filters[option].push(value)
          }

          content.forEach(item => {
            if (option === "Color") {
              if (
                item.variant.colorLabel === value.label &&
                !filteredProducts.includes(item)
              ) {
                filteredProducts.push(item)
              }
              // Style => variant.style that is why we are using tolowercase
            } else if (
              item.variant[option.toLowerCase()] === value.label &&
              !filteredProducts.includes(item)
            ) {
              filteredProducts.push(item)
            }
          })
        }
      })
    })

  Object.keys(filters).forEach(filter => {
    filteredProducts = filteredProducts.filter(item => {
      let valid

      filters[filter].some(value => {
        if (filter === "Color") {
          if (item.variant.colorLabel === value.label) {
            valid = item
          }
        } else if (item.variant[filter.toLowerCase()] === value.label) {
          valid = item
        }
      })
      return valid
    })
  })

  if (isFiltered) {
    content = filteredProducts
  }

  const numPages = Math.ceil(content.length / productsPerPage)

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <div ref={scrollRef} />
        <DynamicTollbar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
          name={name}
          description={description}
          buttonLayout={buttonLayout}
          setButtonLayout={setButtonLayout}
        />
        <ListOfProducts
          page={page}
          filterOptions={filterOptions}
          productsPerPage={productsPerPage}
          buttonLayout={buttonLayout}
          products={products}
          content={content}
        />
        <Pagination
          count={numPages}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          color="secondary"
          classes={{ root: classes.pagination }}
        />
        <Fab classes={{ root: classes.fab }} onClick={scroll}>
          ^
        </Fab>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetCategoryProducts($id: String!) {
    allStrapiProduct(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          createdAt
          name
          category {
            name
          }
          variants {
            color
            id
            price
            size
            style
            colorLabel
            images {
              url
            }
          }
        }
      }
    }
  }
`
