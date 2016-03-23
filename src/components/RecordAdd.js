import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

class RecordAdd extends Component {
  render() {
    return (
      <Paper>
        <Card>
          <CardHeader title="New" />
          <CardActions>
            <TextField
              floatingLabelText="Name"
            />
          </CardActions>
          <CardActions>
            <TextField
              floatingLabelText="Phone"
            />
          </CardActions>
          <CardActions>
            <TextField
              floatingLabelText="Email"
            />
          </CardActions>
          <CardActions>
            <TextField
              floatingLabelText="Country"
            />
          </CardActions>
          <CardActions>
            <FlatButton primary> Add </FlatButton>
          </CardActions>
        </Card>
      </Paper>
    )
  }
}

RecordAdd = Relay.createContainer(RecordAdd, {
  fragments: {
    list: () => Relay.QL`
      fragment on RecordList {
        ${AddRecordMutation.getFragment('list')}
      }
    `
  }
});

export default RecordAdd;

export const AddRecordQuery = {
  list: (Component) => Relay.QL`
    query {
      recordList {
        ${Component.getFragment('list')}
      }
    }
  `
};

export class AddRecordMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        add_record
      }
    `
  }
  getVariables() {
    let { name, phone, email, country } = this.props;
    return { name, phone, email, country };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddRecordPayload {
        new_record {
          id,
          name,
          country,
          email,
          phone
        },
        record_list {
          id,
          count
        }
      }
    `
  }
  getConfigs() {
    return[{
      type: 'RANGE_ADD',
      parentID: this.props.list.id,
      connectionName: 'records',
      edgeName: 'new_record',
      rangeBehaviors: {
        '': 'append'
      }
    }, {
      type: 'FIELD_CHANGE',
      fieldIDs: {
        list: this.props.list.id
      }
    }];
  }
  getOptimisticResponse() {
    let { list, name, phone, email, country } = this.props;
    return {
      new_record: {
        id: list.count + 1,
        name,
        phone,
        email,
        country
      },
      record_list: {
        count: list.count + 1
      }
    }
  }
}

AddRecordMutation.fragments = {
  list: () => Relay.QL`
    fragment on RecordList {
      id,
      count,
      records {
        id,
        name
      }
    }
  `
}
