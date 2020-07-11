import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllUserNames } from "../Redux/Actions/chatActions";
import io from "socket.io-client";

import withStyles from "@material-ui/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    width: "100%",
  },
  containers: {
    width: "100%",
    margin: "0 5px 0 5px",
    cursor: "pointer",
  },
});

class UserList extends Component {
  componentDidMount() {
    this.props.getAllUserNames();
  }
  // handleConnect = (event) => {
  //   const to = event.target.id;
  //   socket.emit("join", { from: this.props.user.userHandle, to: to });
  // };
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const to = document.getElementById("userHandle").value;
  //   socket.emit("join", { from: this.props.user.userHandle, to: to });
  // };
  render() {
    const { users, user, classes } = this.props;
    if (user) {
      const socket = io("localhost:5000", { query: `id: ${user._id}` });
    }
    return (
      <Paper className={classes.paper}>
        {users.map((user) => {
          return (
            <>
              <div
                id={user._id}
                className={classes.containers}
                onClick={this.handleConnect}
                value={user.userHandle}
              >
                @{user.userHandle}
                <hr className={classes.visibleSeparator} />
              </div>
            </>
          );
        })}
        <TextField id="userHandle" />
        <Button onClick={this.handleSubmit}>SEND</Button>
      </Paper>
    );
  }
}
UserList.propTypes = {
  getAllUserNames: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.chat.users,
  user: state.user.credentials,
});

export default connect(mapStateToProps, { getAllUserNames })(
  withStyles(styles)(UserList)
);
