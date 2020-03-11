import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, TextField, Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  buttonGroub: {
    marginTop: theme.spacing(1),
  },
});


class BoardDetail extends Component {

  constructor(props) {
    super(props);

    const index = (props.location.state)? props.location.state.index : 0;
    const code = (props.location.state)? props.location.state.code : '';
    const title = (props.location.state)? props.location.state.title : '';
    const writer = (props.location.state)? props.location.state.writer : '';
    const date = (props.location.state)? props.location.state.date : '';
    const content = (props.location.state)? props.location.state.content : '';

    const type = (index === -1)? 'write' : 'update';

    this.state = {
      type: type,
      index: index,
      code: code,
      title: title,
      writer: writer,
      date: date,
      content: content
    };

  }

  titleChange = (event) => {
    this.setState({
      title: event.target.value
    });
  }
  contentChange = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    const history = this.props.history;

    return (
      <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={8} lg={8}>
                <TextField
                  placeholder="제목" helperText="제목을 입력하세요"
                  autoComplete="Title" name="Title"
                  variant="outlined" required fullWidth
                  id="Title" label="Title" autoFocus
                  defaultValue={this.state.title}
                  onChange={this.titleChange}
                />
              </Grid>

              <Grid item xs={10} lg={10}>
                <TextField
                  id="content" fullWidth label="content"
                  name="content" variant="outlined"
                  multiline rows="22"
                  defaultValue={this.state.content}
                  onChange={this.contentChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.buttonGroub} >
              <Grid item xs={1} lg={1}>
                <Button variant="contained" color="primary" size="large"
                  fullWidth component={Link} to="/main/boardDataProc/view"
                >
                  List
                </Button>
              </Grid>

              <Grid item xs={7} lg={7}>
              </Grid>
                
              <Grid item xs={1} lg={1}>
                {
                  (this.state.type === "write") ? 
                  <Button
                    variant="contained" color="secondary" size="large"
                    fullWidth
                  > 
                    reset
                  </Button>
                  :
                  <Button
                    variant="contained" color="secondary" size="large"
                    fullWidth startIcon={<DeleteIcon />}
                    onClick={() => history.push({
                      pathname: '/main/boardDataProc/delete',
                      state: {
                        index: this.state.index,
                      }
                  })}
                  > 
                    Delete
                  </Button>
                }
              </Grid>
              
              <Grid item xs={1} lg={1}>
                <Button
                  variant="contained" color="primary" size="large"
                  fullWidth startIcon={<SaveIcon />}
                    onClick={() => history.push({
                      pathname: '/main/boardDataProc/' + this.state.type,
                      state: {
                        index: this.state.index,
                        code: this.state.code,
                        title: this.state.title,
                        content: this.state.content
                      }
                  })}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
      </div>
    );
  }
}


export default withStyles(styles)(BoardDetail);