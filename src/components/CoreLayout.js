import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../themes/light';

import AppBar from './AppBar';

export default class CoreLayout extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ theme }>
        <div>
          <AppBar />
          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}
