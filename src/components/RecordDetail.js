import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class RecordDetail extends Component {
  render() {
    let { record } = this.props;
    return (
      <div>
        <h3>Detail for: { record.name }</h3>
        <ul>
          <li> Phone: { record.phone } </li>
        </ul>
        <Link to="/"> Back to home </Link>
      </div>
    );
  }
}

RecordDetail.propTypes = {
  record: PropTypes.object.isRequired
};

RecordDetail = Relay.createContainer(RecordDetail, {
  fragments: {
    record: () => Relay.QL`
      fragment on Record {
        name,
        phone
      }
    `
  }
});

export default RecordDetail;

export const RecordQuery = {
  record: (Component) => Relay.QL`
    query {
      record(id: $id) {
        ${Component.getFragment('record')}
      }
    }
  `
}
