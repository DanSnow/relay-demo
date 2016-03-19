import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class RecordList extends Component {
  static propTypes = {
    records: PropTypes.object.isRequired
  }

  render() {
    let { records } = this.props;
    return (
      <div>
        <h3> Total count: { records.count } </h3>
        <ul>
          {
            records.records.map((record) => {
              return (
                <li key={ record.id }>
                  <Link to={`/${record.id}`}>
                    <span> {record.name} </span>
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    )
  }
}

RecordList = Relay.createContainer(RecordList, {
  fragments: {
    records: () => Relay.QL`
      fragment on RecordList {
        count,
        records {
          id,
          name
        }
      }
    `
  }
});

export default RecordList;

export const RecordsQuery = {
  records: (Component) => Relay.QL`
    query {
      recordList {
        ${Component.getFragment('records')}
      }
    }
  `
}
