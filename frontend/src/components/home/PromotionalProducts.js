import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Carousel from "react-spring-3d-carousel"
import clsx from "clsx"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"

import promoAdornment from "../../images/wallpaper-white.svg"
import explore from "../../images/explore.svg"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundImage: `url(${promoAdornment})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "50rem",
    padding: "5rem",
    marginTop: "3rem",
    [theme.breakpoints.down("md")]: {
      padding: "5rem 2rem 3rem 2rem",
    },
    [theme.breakpoints.down("xs")]: {
      overflow: "hidden",
    },
  },
  descriptionContainer: {
    textAlign: "right",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      marginTop: "3rem",
    },
    marginTop: "5rem",
  },
  productName: {
    color: theme.palette.common.black,
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  carouselImage: {
    height: "30rem",
    width: "25rem",
    backgroundColor: "#F7D649",
    borderRadius: 1,
    boxShadow: theme.shadows[1],
    [theme.breakpoints.down("xs")]: {
      height: "17rem",
      width: "12rem",
    },
  },
  carouselContainer: {
    marginLeft: "20rem",
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      height: "30rem",
    },
  },
  space: {
    margin: "0 15rem 10rem 15rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0 10rem 10rem 10rem",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0 6rem 5rem 6rem",
    },
  },
  explore: {
    textTransform: "none",
    marginRight: "1rem",
    color: theme.palette.common.black,
  },
  exploreButton: {
    backgroundColor: "#E7E7E7",
  },
}))

export default function PromotionalProducts() {
  const classes = useStyles()
  const [selectedSlide, setSelectedSlide] = useState(0)
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const data = useStaticQuery(graphql`
    query GetPromo {
      allStrapiProduct(filter: { promo: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            description
            variants {
              images {
                url
              }
            }
          }
        }
      }
    }
  `)

  var slides = []

  data.allStrapiProduct.edges.map(({ node }, i) =>
    slides.push({
      key: i,
      content: (
        <Grid
          container
          direction="column"
          alignItems="center"
          classes={{ root: classes.promoContainer }}
        >
          <Grid item>
            <IconButton
              disableRipple
              onClick={() => setSelectedSlide(i)}
              classes={{
                root: clsx(classes.iconButton, {
                  [classes.space]: selectedSlide !== i,
                }),
              }}
            >
              <img
                src={
                  process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url
                }
                alt={`image-${i}`}
                className={classes.carouselImage}
              />
            </IconButton>
          </Grid>
          <Grid item>
            {selectedSlide === i ? (
              <Typography variant="h3" classes={{ root: classes.productName }}>
                {node.name.split(" ")[0]}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      ),
      description: node.description,
    })
  )

  return (
    <Grid
      container
      justifyContent={matchesMD ? "space-around" : "space-between"}
      alignItems="center"
      classes={{ root: classes.mainContainer }}
      direction={matchesMD ? "column" : "row"}
    >
      <Grid item classes={{ root: classes.carouselContainer }}>
        <Carousel slides={slides} goToSlide={selectedSlide} />
      </Grid>
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography variant="h2" paragraph>
          {slides[selectedSlide].description}
        </Typography>
        <Button classes={{ root: classes.exploreButton }}>
          <Typography variant="h6" classes={{ root: classes.explore }}>
            Explore
          </Typography>
          <img src={explore} />
        </Button>
      </Grid>
    </Grid>
  )
}
