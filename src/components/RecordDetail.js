import React, { Component, PropTypes } from 'react';

export default class RecordDetail extends Component {
  render() {
    return (
      <h3>detail for: {this.props.params.id}</h3>
    );
  }
}

RecordDetail.propTypes = {
  params: PropTypes.object.isRequired
};
