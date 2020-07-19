import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../Redux/Store";
import { socket } from "../../Util/Socket";
import { SET_ONLINE_USERS } from "../../Redux/Types";
import { createChat } from "../../Redux/Actions/chatActions";

import withStyles from "@material-ui/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

import green from "@material-ui/core/colors/green";
import { grey } from "@material-ui/core/colors";

const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    width: "100%",
    height: "630px",
    overflow: "auto",
  },
  listItem: {
    cursor: "pointer",
  },
});

socket.on("online_users", (userList) => {
  console.log(userList);
  store.dispatch({ type: SET_ONLINE_USERS, payload: userList });
});

const UsersPanel = (props) => {
  const { users, currentUser, classes } = props;

  console.log(users);
  return (
    <>
      <Typography
        variant="h5"
        style={{
          marginLeft: 20,
          fontFamily: "Cooper Black",
        }}
        color="textSecondary"
      >
        Contacts
      </Typography>
      <List component="nav">
        {users.map((user) => {
          if (user.userHandle !== currentUser.userHandle) {
            console.log(user);
            return (
              <ListItem
                className={classes.listItem}
                onClick={() => {
                  props.createChat(user.userHandle, user.imageUrl);
                }}
              >
                <ListItemAvatar>
                  <Badge
                    variant="dot"
                    color={green[100]}
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar src={user.imageUrl} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText>@{user.userHandle}</ListItemText>
              </ListItem>
            );
          }
        })}
      </List>
    </>
  );
};
UsersPanel.propTypes = {
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  createChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.chat.users,
  currentUser: state.user.credentials,
});
export default connect(mapStateToProps, { createChat })(
  withStyles(styles)(UsersPanel)
);
