import React from 'react';
import Relay from 'react-relay';

export default function createRelayContainer(Component, props) {
  if(Relay.isContainer(Component)) {
    let { name, queries } = props.route;
    let { params } = props;
    return (
      <Relay.RootContainer
        Component={ Component }
        renderFetched={ (data) => <Component { ...props }  { ...data } /> }
        route={ { name, params, queries } }
      />
    );
  } else {
    return (
      <Component { ...props } />
    );
  }
}
