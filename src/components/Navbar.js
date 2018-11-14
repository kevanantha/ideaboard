import React from "react";
import { AppBar, Typography, Toolbar } from "@material-ui/core";

const NavBar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Idea Board
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
