import { makeStyles } from "@material-ui/core";
import { green, grey, lightBlue } from "@material-ui/core/colors";

export default makeStyles({
  avatar: {
    backgroundColor: ({ role }) => {
      if (role === "admin") {
        return green[700];
      }
      if (role === "user") {
        return lightBlue[700];
      }
      return grey[700];
    },
  },
});
