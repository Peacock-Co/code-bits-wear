import React, { useState } from "react"
import clsx from "clsx"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useStaticQuery, graphql } from "gatsby"

import featuredAdornment from "../../images/featured-adornment.svg"
import explore from "../../images/explore.svg"

import Rating from "./Rating"

const useStyles = makeStyles(theme => ({
  backgroundImage: {
    backgroundImage: `url(${featuredAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "150rem",
    padding: "0 2.5rem",
    [theme.breakpoints.down("sm")]: {
      height: "180rem",
    },
  },
  iconBackground: {
    backgroundColor: "#BFDBF7",
    borderRadius: 1,
    boxShadow: theme.shadows[5],
    position: "absolute",
    zIndex: 1,
    "&:hover": {
      backgroundColor: "#BFDBF7",
    },
  },
  featuredImage: {
    height: "18rem",
    width: "18rem",
    [theme.breakpoints.down("sm")]: {
      height: "14rem",
      width: "14rem",
    },
  },
  slide: {
    backgroundColor: "#BAC1B8",
    height: "18rem",
    width: "18.5rem",
    marginTop: "0.8rem",
    [theme.breakpoints.down("sm")]: {
      height: "14rem",
      width: "14.5rem",
    },
    zIndex: 0,
    transition: "transform 0.5s ease",
    padding: "1rem 2rem",
  },
  slideLeft: {
    transform: "translate(-18.5rem, 0px )",
  },
  slideRight: {
    transform: "translate(18.5rem, 0px )",
  },
  slideDown: {
    transform: "translate(0px, 14rem )",
  },
  producContainer: {
    margin: "2rem 0",
  },
  productName: {
    color: theme.palette.common.black,
    fontSize: "2rem",
  },
  exploreContainer: {
    marginTop: "4rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: ".5rem",
    },
  },
  exploreButton: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  exploreIcon: {
    height: "1.5rem",
    marginLeft: "1rem",
  },
  chiplabel: {
    color: "#fff",
  },
  chipRoot: {
    backgroundColor: theme.palette.common.grey,
    marginTop: "1rem",
  },
  details: {
    color: theme.palette.common.black,
    fontSize: "1.3rem",
  },
}))

export default function FeaturedProducts() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(null)
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const data = useStaticQuery(graphql`
    query GetFeatured {
      allStrapiProduct(filter: { featured: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            variants {
              price
              images {
                url
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Grid
      container
      direction="column"
      classes={{ root: classes.backgroundImage }}
      justifyContent={matchesSM ? "space-between" : "center"}
    >
      {data.allStrapiProduct.edges.map(({ node }, i) => {
        const alignment = matchesSM
          ? "center"
          : i === 0 || i === 3
          ? "flex-start"
          : i === 1 || i === 4
          ? "center"
          : "flex-end"

        return (
          <Grid
            item
            container
            justifyContent={alignment}
            key={node.strapiId}
            classes={{ root: classes.producContainer }}
          >
            <IconButton
              disableRipple
              classes={{ root: classes.iconBackground }}
              onClick={() =>
                expanded === i ? setExpanded(null) : setExpanded(i)
              }
            >
              <img
                src={
                  process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url
                }
                alt={node.name}
                className={classes.featuredImage}
              />
            </IconButton>
            <Grid
              container
              direction="column"
              classes={{
                root: clsx(classes.slide, {
                  [classes.slideLeft]:
                    !matchesSM && expanded === i && alignment === "flex-end",
                  [classes.slideRight]:
                    !matchesSM &&
                    expanded === i &&
                    (alignment === "flex-start" || alignment === "center"),
                  [classes.slideDown]: matchesSM && expanded === i,
                }),
              }}
            >
              <Grid item variant="body1">
                <Typography classes={{ root: classes.productName }}>
                  {node.name.split(" ")[0]}
                </Typography>
                <Grid item>
                  <Rating number={5} />
                  <Chip
                    classes={{
                      root: classes.chipRoot,
                      label: classes.chiplabel,
                    }}
                    label={`€${node.variants[0].price}`}
                  />
                </Grid>
                <Grid item classes={{ root: classes.exploreContainer }}>
                  <Button classes={{ root: classes.exploreButton }}>
                    <Typography
                      variants="h4"
                      classes={{ root: classes.details }}
                    >
                      Details
                    </Typography>
                    <img
                      src={explore}
                      alt="got to product details"
                      className={classes.exploreIcon}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}
