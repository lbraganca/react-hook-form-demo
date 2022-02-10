import { createTheme } from "@material-ui/core";
import { lightBlue, teal } from "@material-ui/core/colors";

export default createTheme({
  palette: {
    primary: teal,
    secondary: lightBlue,
  },
  typography: {
    fontFamily: "Lato",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
