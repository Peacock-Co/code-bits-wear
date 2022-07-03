import React from "react"

import fullStar from "../../images/full-star.svg"
import halfStar from "../../images/half-star.svg"
import emptyStar from "../../images/empty-star.svg"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(them => ({
  size: {
    height: "2rem",
    width: "2rem",
    marginTop: ".5rem",
  },
}))

export default function Rating({ number }) {
  const classes = useStyles()
  const diff = 5 - Math.ceil(number)

  return (
    <>
      {[...Array(Math.floor(number))].map((e, i) => (
        <img src={fullStar} alt="full star" key={i} className={classes.size} />
      ))}
      {number % 1 !== 0 ? <img src={halfStar} alt="half star" /> : null}
      {[...Array(diff)].map((e, i) => (
        <img src={emptyStar} alt="empty star" key={`${i}-empty`} />
      ))}
    </>
  )
}
