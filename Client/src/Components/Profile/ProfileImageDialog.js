import React, { Component } from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";

class ProfileImageDialog extends Component {
  state = {
    open: true,
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.setState({ open: true });
    }
  }
  render() {
    return <Dialog open={this.state.open}></Dialog>;
  }
}

export default ProfileImageDialog;
