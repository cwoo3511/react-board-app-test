import React, { Component } from 'react';
import {
  AppBar, Tabs, Tab
} from '@material-ui/core';
import { Link } from 'react-router-dom';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }
  

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Board List" component={Link} to="/main/boardDataProc/view" />
            {/*<Tab label="Item Two"  {...this.a11yProps(1)} />
            <Tab label="Item Three"  {...this.a11yProps(2)} />*/}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default TopBar;