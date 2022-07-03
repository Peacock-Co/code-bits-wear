import React, { useState } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"

import logo from "../../images/varxlogo.svg"
import search from "../../images/search.svg"
import cart from "../../images/shopping-cart.svg"
import account from "../../images/account-header.svg"
import menu from "../../images/bars.svg"

const useStyles = makeStyles(theme => ({
  logo: {
    maxWidth: "5rem",
    marginTop: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "3.5rem",
      marginTop: "0.3rem",
    },
  },
  colorIndicator: {
    backgroundColor: "#ffgh",
  },
  tabs: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  tab: {
    ...theme.typography.body1,
    fontWeight: 500,
    color: theme.palette.common.black,
  },
  icon: {
    height: "1.6rem",
    width: "1.6rem",
    color: theme.palette.common.black,
    [theme.breakpoints.down("xs")]: {
      height: "1.3rem",
      width: "1.3rem",
    },
  },
  drawer: {
    backgroundColor: "#fff",
  },
  logoContainer: {
    [theme.breakpoints.down("md")]: {
      marginRight: "auto",
    },
    padding: 0,
  },
}))

export default function Header({ categories }) {
  const classes = useStyles()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  const [drawerOpen, setDrawerOpen] = useState(false)

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  const activeIndex = () => {
    const pathname =
      typeof window !== "undefined"
        ? window.location.pathname.split("/")[1]
        : null

    const found = routes.indexOf(
      routes.filter(
        ({ node: { name, link } }) =>
          (link || `/${name.toLowerCase()}`) === `/${pathname}`
      )[0]
    )

    return found === -1 ? false : found
  }

  const routes = [
    ...categories,
    { node: { name: "Contact Us", strapiId: "contact", link: "/contact" } },
  ]

  const tabs = (
    <Tabs
      value={activeIndex()}
      classes={{ indicator: classes.colorIndicator, root: classes.tabs }}
    >
      {routes.map(route => (
        <Tab
          component={Link}
          to={route.node.link || `/${route.node.name.toLowerCase()}`}
          classes={{ root: classes.tab }}
          label={route.node.name}
          key={route.node.strapiId}
        />
      ))}
    </Tabs>
  )

  const drawer = (
    <SwipeableDrawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        {[
          ...routes,
          { node: { name: "Account", strapiId: "account", link: "/account" } },
        ].map((route, i) => (
          <ListItem
            selected={activeIndex() === i}
            component={Link}
            to={route.node.link || `/${route.node.name.toLowerCase()}`}
            divider
            button
            key={route.node.strapiId}
          >
            <ListItemText primary={route.node.name} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )

  const actions = [
    {
      icon: search,
      alt: "search",
      visible: true,
      onClick: () => console.log("search"),
    },
    { icon: cart, alt: "cart", visible: true, link: "/cart" },
    {
      icon: account,
      alt: "account",
      visible: !matchesMD,
      link: "/account",
    },
    {
      icon: menu,
      alt: "menu",
      visible: matchesMD,
      onClick: () => setDrawerOpen(true),
    },
  ]

  return (
    <AppBar color="transparent" elevation={0} position="static">
      <Toolbar>
        <IconButton
          component={Link}
          to="/"
          classes={{ root: classes.logoContainer }}
        >
          <img src={logo} alt="logo" className={classes.logo} />
        </IconButton>
        {matchesMD ? drawer : tabs}
        {actions.map(action => {
          if (action.visible) {
            return (
              <IconButton
                onClick={action.onClick}
                key={action.alt}
                component={action.onClick ? undefined : Link}
                to={action.onClick ? undefined : action.link}
              >
                <img
                  className={classes.icon}
                  src={action.icon}
                  alt={action.alt}
                />
              </IconButton>
            )
          }
        })}
      </Toolbar>
    </AppBar>
  )
}
