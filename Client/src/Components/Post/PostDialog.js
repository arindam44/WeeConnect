import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { getPost, clearErrors } from "../../Redux/Actions/dataActions";
import image from "../../Images/no-image.png";
import Likebutton from "./Likebutton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

const styles = (theme) => ({
  ...theme.spreadThis,
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "3.5%",
  },
  profileImage: {
    maxWidth: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

class PostDialog extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getPost(this.props.postId);
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      post,
      UI: { loading },
    } = this.props;
    console.log(post.postData);
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={100} thickness={2} />
      </div>
    ) : (
      post.postData && (
        <Grid container spacing={12}>
          <Grid item xs={4}>
            <img
              src={post.postData.userImage}
              alt={image}
              className={classes.profileImage}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography
              component={Link}
              color="primary"
              variant="h5"
              to={`/users/${this.props.userHandle}`}
            >
              @{this.props.userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body2" color="textSecondary">
              {dayjs(post.postData.createdAt).format("h:mm a, MMMM DD YYYY")}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">{post.postData.content}</Typography>
            <Likebutton postId={post.postData._id} />
            <span>{post.postData.likeCount} Likes</span>
            <Tooltip title="Comments" placement="top">
              <IconButton>
                <ChatIcon color="primary" />
              </IconButton>
            </Tooltip>
            <span>{post.postData.commentCount} Comments</span>
          </Grid>
          <hr className={classes.visibleSeperator} />
          <CommentForm postId={post.postData._id} />
          <Comments comments={post.comments} />
        </Grid>
      )
    );
    return (
      <Fragment>
        <Tooltip title="Expand Post" className={classes.expandButton}>
          <IconButton onClick={this.handleOpen}>
            <UnfoldMoreIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="xs"
        >
          <Tooltip
            title="Close"
            onClick={this.handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </Tooltip>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

export default connect(mapStateToProps, { getPost, clearErrors })(
  withStyles(styles)(PostDialog)
);
