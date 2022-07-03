import React, { useState } from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"

import filter from "../../images/filter.svg"
import sort from "../../images/sort.svg"

import { makeStyles } from "@material-ui/core/styles"

import Sort from "./Sort"
import Filter from "./Filter"

const useStyles = makeStyles(theme => ({
  funcionContainer: {
    backgroundColor: theme.palette.common.grey,
    minHeight: "6rem",
    height: "auto",
    borderRadius: ({ option }) =>
      option !== null ? "16px" : "16px 16px 0px 0px",
  },
}))

export default function FunctionContainer({
  filterOptions,
  setFilterOptions,
  option,
  setOption,
  sortOptions,
  setSortOptions,
}) {
  const classes = useStyles({ option })

  const content = () => {
    switch (option) {
      case "sort":
        return (
          <Sort
            setOption={setOption}
            setSortOptions={setSortOptions}
            sortOptions={sortOptions}
          />
        )
      case "filter":
        return (
          <Filter
            setOption={setOption}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        )
      default:
        const items = [
          {
            icon: filter,
            alt: "filter",
          },
          { icon: sort, alt: "sort" },
        ]
        return (
          <Grid
            item
            container
            justifyContent="space-around"
            alignItems="center"
          >
            {items.map(item => (
              <Grid item key={item.alt}>
                <IconButton onClick={() => setOption(item.alt)}>
                  <img src={item.icon} alt={item.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )
    }
  }

  return (
    <Grid item container classes={{ root: classes.funcionContainer }}>
      <Grid item container>
        {content()}
      </Grid>
    </Grid>
  )
}
