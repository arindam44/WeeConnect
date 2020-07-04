import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost, clearErrors } from "../../Redux/Actions/dataActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Picker from "emoji-picker-react";

//ICONS
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Emoji from "@material-ui/icons/InsertEmoticonSharp";

const styles = (theme) => ({
  ...theme.spreadThis,
  textField: {
    width: "90%",
  },
  notchedOutline: {
    borderColor: "white !important",
  },
  emojiPicker: {
    position: "relative",
    left: "50%",
    height: "300px",
    marginBottom: "20px",
  },
  submitButton: {
    position: "relative",
    left: "84%",
    marginTop: "10px",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    top: "20px",
    left: "93%",
  },
});

class AddPost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
    emojiOpen: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    console.log(event.target.value);
    if (event.target.value === "\n") {
      this.setState({ [event.target.name]: "<br />" });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addPost({ body: this.state.body });
  };
  openPicker = () => {
    this.setState({ emojiOpen: !this.state.emojiOpen });
  };
  handleEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    this.setState({ body: this.state.body + emojiObject.emoji });
  };
  closeEmojiPicket = () => {
    this.setState({ emojiOpen: false });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        open: false,
        errors: {},
      });
    }
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <Tooltip title="Create New Post" placement="top">
          <IconButton onClick={this.handleOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <div>
              <Typography variant="h6">Create Post</Typography>
              <Tooltip
                title="Close"
                onClick={this.handleClose}
                className={classes.closeButton}
              >
                <CloseIcon />
              </Tooltip>
            </div>
            <form>
              <TextField
                name="body"
                type="text"
                variant="outlined"
                placeholder="Write something..."
                multiline
                autoFocus="true"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.body}
                onClick={this.closeEmojiPicket}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              <Tooltip title="Insert Emoji" placement="top">
                <IconButton onClick={this.openPicker}>
                  <Emoji />
                </IconButton>
              </Tooltip>
              {this.state.emojiOpen && (
                <div className={classes.emojiPicker}>
                  <Picker
                    disableSkinTonePicker="true"
                    disableSearchBar="true"
                    onEmojiClick={this.handleEmojiClick}
                  />
                </div>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
                onClick={this.handleSubmit}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
});
export default connect(mapStateToProps, { addPost, clearErrors })(
  withStyles(styles)(AddPost)
);
