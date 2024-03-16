import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import memoriesLogo from "./../../images/memoriesLogo.png";
import memoriesText from "./../../images/memoriesText.png";

const Navbar = ({ onLogout }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
  
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        onLogout(); // Call the onLogout function provided by parent
      }
    }
  }, [onLogout, user]);

  const handleLogout = () => {
    // Perform logout actions here, such as clearing localStorage or resetting state
    localStorage.removeItem("profile"); // Clear user data from localStorage
    setUser(null); // Clear user state
    onLogout(); // Call the onLogout function provided by parent
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="memories" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleLogout} // Call the handleLogout function
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
