import React from "react"
import Grid from "@material-ui/core/Grid"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"

import facebook from "../../images/facebook-f.svg"
import twitter from "../../images/twitter-brands.svg"
import instagram from "../../images/instagram-brands.svg"
import footerbg from "../../images/footerbg.png"

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundImage: `url(${footerbg})`,
    padding: "2rem",
  },
  "@global": {
    body: {
      margin: 0,
    },
    a: {
      textDecoration: "none",
    },
  },
  category: {
    marginBottom: "0.5rem",
  },
  linkColumm: {
    width: "20rem",
    marginTop: "2rem",
  },
  linkName: {
    fontSize: ".8rem",
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  linkContainer: {
    [theme.breakpoints.down("md")]: {
      marginBottom: "3rem",
    },
  },
  icon: {
    height: "1.3rem",
    width: "1.3rem",
  },
  iconButton: {
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}))

export default function Footer() {
  const classes = useStyles()

  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const socialMedia = [
    {
      icon: facebook,
      alt: "facebook",
      link: "https://facebook.com",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: twitter,
      alt: "twitter",
      link: "https://twitter.com",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: instagram,
      alt: "intagram",
      link: "https://instagram.com",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ]

  const routes = {
    "Contact us": [
      { label: "(34) 699161552", href: "tel:(34)699161552" },
      {
        label: "pavaoleonardo@hotmail.com",
        href: "mailto:pavaoleonardo@hormail.com",
      },
    ],
    "Customer Service": [
      { label: "Contact us", link: "/contact" },
      { label: "My account", link: "/account" },
    ],
    Information: [
      { label: "Privacy policy", link: "/privacy-policy" },
      { label: "Terms and conditions", link: "/terms-conditions" },
    ],
  }

  return (
    <footer className={classes.footer}>
      <Grid container justifyContent="space-between">
        <Grid item classes={{ root: classes.linkContainer }}>
          <Grid container>
            {Object.keys(routes).map(category => (
              <Grid
                item
                key={category}
                container
                direction="column"
                classes={{ root: classes.linkColumm }}
              >
                <Grid item>
                  <Typography variant="h4" classes={{ root: classes.category }}>
                    {category}
                  </Typography>
                </Grid>
                {routes[category].map(route => (
                  <Grid item key={route.label}>
                    <Typography
                      component={route.link ? Link : "a"}
                      to={route.link ? route.link : undefined}
                      href={route.href ? route.href : undefined}
                      variant="body1"
                      classes={{
                        body1: classes.linkName,
                      }}
                    >
                      {route.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item classes={{ root: classes.socialContainer }}>
          <Grid
            container
            direction={matchesXS ? "row" : "column"}
            alignItems="center"
          >
            {socialMedia.map(platform => (
              <Grid item key={platform.link}>
                <IconButton
                  classes={{ root: classes.iconButton }}
                  component="a"
                  href={platform.link}
                >
                  <img
                    src={platform.icon}
                    alt={platform.alt}
                    className={classes.icon}
                  />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}
