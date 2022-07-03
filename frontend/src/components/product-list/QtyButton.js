import React, { useState, useEffect } from "react"
import clsx from "clsx"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Badge from "@material-ui/core/Badge"
import { makeStyles } from "@material-ui/core/styles"

import Cart from "../../images/CartAdornment"

const useStyles = makeStyles(theme => ({
  qtyText: {
    color: theme.palette.common.white,
    fontSize: "1.2rem",
  },
  mainGroup: {
    height: "3rem",
  },
  editButtons: {
    height: "1.535rem",
    borderRadius: 0,
    backgroundColor: "#708670",
    borderLeft: "2px solid #fff",
    borderRight: "2px solid #fff",
    borderTop: "none",
    borderBottom: "none",
  },
  outerButtons: {
    borderRadius: 50,
    backgroundColor: "#708670",
    border: "none",
  },
  cartButton: {
    marginLeft: "0 !important",
    "&:hover": {
      backgroundColor: "#a6a2a2",
    },
  },
  minusButton: {
    borderTop: "2px solid #fff",
    "&:hover": {
      backgroundColor: "#a6a2a2",
    },
  },
  minus: {
    marginTop: "-0.25rem",
  },
  qtyButton: {
    "&:hover": {
      backgroundColor: "#708670",
    },
  },
  plus: {
    "&:hover": {
      backgroundColor: "#a6a2a2",
    },
  },
  badge: {
    color: "#fff",
    fontSize: "1rem",
    backgroundColor: theme.palette.common.red,
    padding: 0,
    marginTop: "0.1rem",
  },
}))

export default function QtyButton({ stock, selectedVariant }) {
  const classes = useStyles()
  const [qty, setQty] = useState(1)

  const handleChange = direction => {
    if (qty === stock[selectedVariant].qty && direction === "up") {
      return null
    }

    if (qty === 1 && direction === "down") {
      return null
    }

    const newQty = direction === "up" ? qty + 1 : qty - 1

    setQty(newQty)
  }

  useEffect(() => {
    if (stock === null || stock === -1) {
      return undefined
    } else if (qty > stock[selectedVariant].qty) {
      setQty(stock[selectedVariant].qty)
    }
  }, [stock, selectedVariant])

  return (
    <Grid item>
      <ButtonGroup classes={{ root: classes.mainGroup }}>
        <Button
          classes={{ root: clsx(classes.outerButtons, classes.qtyButton) }}
        >
          <Typography variant="h4" classes={{ root: classes.qtyText }}>
            {qty}
          </Typography>
        </Button>
        <ButtonGroup orientation="vertical">
          <Button
            onClick={() => handleChange("up")}
            classes={{ root: clsx(classes.editButtons, classes.plus) }}
          >
            <Typography variant="h4" classes={{ root: classes.qtyText }}>
              +
            </Typography>
          </Button>
          <Button
            onClick={() => handleChange("down")}
            classes={{ root: clsx(classes.editButtons, classes.minusButton) }}
          >
            <Typography
              variant="h4"
              classes={{ root: clsx(classes.qtyText, classes.minus) }}
            >
              -
            </Typography>
          </Button>
        </ButtonGroup>
        <Button
          classes={{ root: clsx(classes.outerButtons, classes.cartButton) }}
        >
          <Badge
            overlap="circular"
            badgeContent="+"
            classes={{ badge: classes.badge }}
          >
            <Cart color={"#fff"} />
          </Badge>
        </Button>
      </ButtonGroup>
    </Grid>
  )
}
