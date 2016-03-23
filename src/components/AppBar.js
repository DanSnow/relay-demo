import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import MuiAppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
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

  render() {
    return (
      <MuiAppBar title="Relay Demo" iconElementLeft={ this.homeButton } />
    );
  }
}
