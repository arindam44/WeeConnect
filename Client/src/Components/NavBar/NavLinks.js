import React, { Component } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Notifications from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

class NavLinks extends Component {
  constructor() {
    super();
  }
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logoutUser(this.props.history);
  };
  render() {
    return (
      <div>
        <IconButton>
          <Badge badgeContent={4} color='secondary'>
            <Notifications />
          </Badge>
        </IconButton>
      </div>
    );
  }
}

export default connect(null)(NavLinks);
