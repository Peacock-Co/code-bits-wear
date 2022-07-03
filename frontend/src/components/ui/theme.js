import { createTheme } from "@material-ui/core/styles"

const lightGray = "#DEDFDC"
const gray = "#E8E8E8"
const yellow = "#F4D148"
const black = "#111111"
const green = "#99B898"
const darkGreen = "#708670"
const tan = "#FECEA8"
const lightRed = "#FF847C"
const red = "#E84A5F"
const offBlack = "#2A363B"
const grey = "#747474"
const white = "#fff"
const orange = "#F7D649"
const blue = "#BFDBF7"
const greySpacial = "#F8F9FA"

const theme = createTheme({
  palette: {
    primary: {
      main: lightGray,
    },
    secondary: {
      main: gray,
    },
    common: {
      yellow,
      black,
      green,
      tan,
      lightRed,
      red,
      offBlack,
      grey,
      white,
      orange,
      blue,
      greySpacial,
    },
  },
  typography: {
    h1: {
      fontSize: "3.5rem",
      fontFamily: "Roboto Mono",
      fontWeight: 700,
      color: black,
    },
    h2: {
      fontSize: "2rem",
      fontFamily: "Roboto Mono",
      fontWeight: 400,
      color: black,
    },
    h3: {
      fontSize: "1.6rem",
      fontFamily: "Roboto Mono",
      fontWeight: 300,
      color: "#fff",
    },
    h4: {
      fontSize: "1rem",
      fontFamily: "Roboto Mono",
      fontWeight: 300,
      color: "#fff",
    },
    h5: {
      fontSize: "3.5rem",
      fontFamily: "Philosopher",
      fontWeight: 700,
      color: black,
    },
    h6: {
      fontSize: "1.5rem",
      fontFamily: "Roboto Mono",
      fontWeight: 300,
      color: grey,
    },
    body1: {
      fontFamily: "Roboto Mono",
      fontSize: "1rem",
      color: grey,
    },
    body2: {
      fontFamily: "Roboto Mono",
      fontSize: "1rem",
      color: "#fff",
      fontWeight: 700,
    },
    subtitle1: {},
    subtitle2: {},
  },

  overrides: {
    MuiChip: {
      root: {
        backgroundColor: darkGreen,
      },
      label: {
        fontFamily: "Hurme Geometric Sans No 3",
        fontSize: "1.5rem",
        color: "#fff",
        fontWeight: 400,
      },
    },
  },
})

export default theme
