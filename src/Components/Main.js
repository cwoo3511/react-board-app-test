import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import TopBar from './TopBar';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardDataProc from './BoardDataProc';

const styles = ({
  topBar: {
    marginBottom: '7rem',
  },
  container: {
    marginTop: '7rem',
  },
});

const theme = createMuiTheme({
  palette: {
    background: {
      default: "white"
    }
  }
  //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
})

class Main extends Component {

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
      <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <TopBar />
        
        {/*<Route exact path="/" component={Home} />*/}

        <Container component="main" maxWidth="lg" className={classes.container} >
          
          <Switch>
            <Route exact path="/main/boardList" component={BoardList} />
            <Route path='/main/boardList/detail' component={BoardDetail} />
            
            <Route path="/main/boardDataProc/:type" component={BoardDataProc} />

          </Switch>
          {/*<Route exact path="/main/board/detail" component={BoardDetail} />*/}
        
        </Container>
      </Router>
      </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Main);