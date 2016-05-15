import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link, withRouter } from 'react-router';
import { autobind } from 'core-decorators';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

@withRouter
class RecordAdd extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      name: '',
      email: '',
      country: '',
      phone: ''
    };
  }

  @autobind
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  @autobind
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  @autobind
  handlePhoneChange(event) {
    this.setState({ phone: event.target.value });
  }

  @autobind
  handleCountryChange(event) {
    this.setState({ country: event.target.value });
  }

  @autobind
  handleSubmit(event) {
    event.preventDefault();
    Relay.Store.commitUpdate(new AddRecordMutation({ list: this.props.list, ...this.state }));
    this.props.router.push('/');
  }

  render() {
    return (
      <Paper>
        <Card>
          <CardHeader title="New" />
          <CardActions>
            <TextField
              floatingLabelText="Name"
              onChange={ this.handleNameChange }
            />
          </CardActions>
          <CardActions>
            <TextField
              floatingLabelText="Phone"
              onChange={ this.handlePhoneChange }
            />
          </CardActions>
          <CardActions>
            <TextField
              floatingLabelText="Email"
              onChange={ this.handleEmailChange }
            />
          </CardActions>
          <CardActions>
            <TextField
              floatingLabelText="Country"
              onChange={ this.handleCountryChange }
            />
          </CardActions>
          <CardActions>
            <FlatButton
              primary
              onTouchTap={ this.handleSubmit }
            >
              Add
            </FlatButton>
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
        id,
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
        list {
          id,
          count,
          records {
            id,
            name
          }
        }
      }
    `
  }
  getConfigs() {
    return[{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        list: this.props.list.id
      }
    }];
  }
  getOptimisticResponse() {
    let { list, name, phone, email, country } = this.props;
    return {
      list: {
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
        id
      }
    }
  `
}
