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
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
  },
  image: {
    minWidth: 200,
    objectFit: "cover",
  },
  content: {
    padding: 20,
  },
};

class PostCard extends Component {
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
      userHandle === post.userHandle ? <DeletePost postId={post._id} /> : null;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.image}
            image={post.userImage}
            title="Profile Image"
          />
          <CardContent className={classes.content}>
            <Typography
              variant="h6"
              component={Link}
              to={`/user/${post.userHandle}`}
              color="primary"
            >
              {post.userHandle}
            </Typography>
            {deleteButton}
            <Typography variant="body1">{post.content}</Typography>
            <Typography variant="caption" color="textSecondary">
              {dayjs(post.createdAt).fromNow()}
            </Typography>
            <LikeButton postId={post._id} />
            <span>{post.likeCount} Likes</span>
            <Tooltip title="Comments" placement="top">
              <IconButton>
                <ChatIcon color="primary" />
              </IconButton>
            </Tooltip>
            <span>{post.commentCount} Comments</span>
            <PostDialog postId={post._id} userHandle={post.userHandle} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
PostCard.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(PostCard));
