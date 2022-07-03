import React, { useState } from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import FunctionContainer from "./FunctionContainer"
import DescriptionContainer from "./DescriptionContainer"

const useStyles = makeStyles(theme => ({
  toolbar: {
    border: `1px solid ${theme.palette.common.grey}`,
    borderRadius: 20,
    width: "95%",
    height: "auto",
    marginBottom: "3rem",
  },
}))

export default function DynamicTollbar({
  filterOptions,
  setFilterOptions,
  name,
  description,
  buttonLayout,
  setButtonLayout,
  sortOptions,
  setSortOptions,
}) {
  const classes = useStyles()

  const [option, setOption] = useState(null)

  return (
    <Grid item container direction="column" classes={{ root: classes.toolbar }}>
      <FunctionContainer
        filterOptions={filterOptions}
        option={option}
        setOption={setOption}
        setFilterOptions={setFilterOptions}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
      />
      {option === null && (
        <DescriptionContainer
          buttonLayout={buttonLayout}
          setButtonLayout={setButtonLayout}
          name={name}
          description={description}
        />
      )}
    </Grid>
  )
}
