import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import MuiAppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import ActionHome from 'material-ui/lib/svg-icons/action/home';

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
