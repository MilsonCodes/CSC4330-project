import { createMuiTheme } from "@material-ui/core";

// import React from "react";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Noto Sans JP, sans-serif"   //Removed Yanone Kaffeesatz font is too tight. Name is still here incase
  },
  palette:{
    primary: {
      main: "#302F2F"
    },
    secondary: {
      main: "#302F2F"
    }
  }
})

export default theme;
