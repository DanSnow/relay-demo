import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import Subheader from 'material-ui/Subheader';
import ListItem from 'material-ui/List/ListItem';
import ContentForward from 'material-ui/svg-icons/content/forward';
import { AddRecordMutation } from './RecordAdd';

class RecordList extends Component {
  render() {
    let { list } = this.props;
    return (
      <List>
        <Subheader>{ `Total count: ${ list.count }` }</Subheader>
          {
            list.records.map((record) => {
              return (
                <Link to={`/${record.id}`} key={ record.id }>
                  <ListItem primaryText={ record.name }
                    leftAvatar={ <Avatar src={ `https://robohash.org/${record.name}.png?set=set3&size=150x150` } /> }
                    rightIcon={ <ContentForward /> }
                  />
                </Link>
              );
            })
          }
      </List>
    )
  }
}

RecordList.propTypes = {
  list: PropTypes.object.isRequired
};

RecordList = Relay.createContainer(RecordList, {
  fragments: {
    list: () => Relay.QL`
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
  list: (Component) => Relay.QL`
    query {
      recordList {
        ${Component.getFragment('list')}
      },
      ${AddRecordMutation.getFragment('list')}
    }
  `
}
