import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import { AddRecordMutation } from './RecordAdd';

class RecordDetail extends Component {
  render() {
    let { record } = this.props;
    return (
      <Card>
        <CardHeader
          title={ record.name }
          avatar={ `https://robohash.org/${record.name}.png?set=set3&size=150x150` }
        />
        <CardText>
          <ul>
            <li> Phone: { record.phone } </li>
            <li> Email: { record.email } </li>
            <li> Country: { record.country } </li>
          </ul>
        </CardText>
        <CardActions>
          <Link to="/">
            <FlatButton> Back to home </FlatButton>
          </Link>
        </CardActions>
      </Card>
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
        phone,
        email,
        country
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
      },
      ${AddRecordMutation.getFragment('list')}
    }
  `
}
