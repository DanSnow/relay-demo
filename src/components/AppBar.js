import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import MuiAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';

export default class AppBar extends Component {
  get homeButton() {
    return (
      <IndexLink to="/">
        <IconButton>
          <ActionHome />
        </IconButton>
      </IndexLink>
    );
  }

  get addButton() {
    return (
      <Link to="/new">
        <FlatButton> Add </FlatButton>
      </Link>
    )
  }

  render() {
    return (
      <MuiAppBar title="Relay Demo" iconElementLeft={ this.homeButton } iconElementRight={ this.addButton } />
    );
  }
}
