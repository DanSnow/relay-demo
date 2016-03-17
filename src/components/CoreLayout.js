import React from 'react';

export default class CoreLayout extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
