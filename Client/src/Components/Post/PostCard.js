import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./Likebutton";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";

import ChatIcon from "@material-ui/icons/Chat";

const styles = (theme) => ({
  ...theme.spreadThis,
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
    padding: 10,
  },
  userImage: {
    minWidth: 120,
    height: 120,
    padding: "20, 20, 10, 0",
    borderRadius: "50%",
    objectFit: "cover",
  },
  content: {
    padding: 20,
  },
  image: {
    maxWidth: "90%",
    maxHeight: "300px",
    marginLeft: "10px",
    objectFit: "cover",
  },
  imageDialog: {
    position: "absolute",
  },
  fullImage: {
    position: "relative",
    maxHeight: 650,
  },
});

class PostCard extends Component {
  state = { open: false };
  handleImageOpen = () => {
    this.setState({ open: true });
  };
  handleImageClose = () => {
    this.setState({ open: false });
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post,
      user: {
        credentials: { userHandle },
      },
    } = this.props;
    const deleteButton =
      userHandle === post.userHandle ? (
        <DeletePost postId={post._id} className={classes.deleteButton} />
      ) : null;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.userImage}
            image={post.userImage}
            title="Profile Image"
          />
          <CardContent className={classes.content}>
            {deleteButton}
            <Typography
              variant="h6"
              component={Link}
              to={`/user/${post.userHandle}`}
              color="primary"
            >
              @{post.userHandle}
            </Typography>
            <br />
            <Typography variant="caption" color="textSecondary">
              {dayjs(post.createdAt).fromNow()}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">{post.content}</Typography>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="image"
                className={classes.image}
                onClick={this.handleImageOpen}
              />
            )}
            <br />
            <LikeButton postId={post._id} />
            <span>{post.likeCount} Likes</span>
            <Tooltip title="Comments" placement="top">
              <IconButton>
                <ChatIcon color="primary" />
              </IconButton>
            </Tooltip>
            <span>{post.commentCount} Comments</span>
            <PostDialog
              postId={post._id}
              userHandle={post.userHandle}
              openDialog={this.props.openDialog}
            />
          </CardContent>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleImageClose}
          maxWidth="l"
          maxHeight={window.innerHeight}
          className={classes.imageDialog}
        >
          <img src={post.imageUrl} alt="image" className={classes.fullImage} />
        </Dialog>
      </div>
    );
  }
}
PostCard.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(PostCard));
