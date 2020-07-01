import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Avatar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import logo from "../../Images/logo.png";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import AddPost from "../Post/AddPost";
//ICONS
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles((theme) => ({
  nav: {
    color: theme.palette.primary.main,
  },
}));
const showNotifications = () => {};
const Navbar = (props) => {
  const { authenticated } = props;
  return (
    <div>
      <AppBar>
        <Toolbar className="nav-container">
          <Grid container spacing={2}>
            <Grid xs={1} sm={1} item>
              <Link to="/">
                <Avatar variant="rounded" src={logo} alt="WeConnect" />
              </Link>
            </Grid>
            <Grid xs={4} sm={10} item alignContent="center" justify="center">
              {authenticated ? (
                <Box display="flex" justifyContent="center">
                  <AddPost />
                  <Link to="/">
                    <Tooltip title="Home" placement="top">
                      <IconButton>
                        <HomeIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip title="Notifications" placement="top">
                    <IconButton onClick={showNotifications}>
                      <NotificationsIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={1} sm={1} />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  authenticated: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
