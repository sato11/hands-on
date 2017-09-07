import React, { PropTypes } from 'react';

const Actions = props =>
  <div className="Actions">
    <span
      tabIndex="0"
      className="ActionsInfo"
      title="Detail"
      onClick={ props.onAction.bind(null, 'info') }>&#8505;</span>
    <span
      tabIndex="0"
      className="ActionsEdit"
      title="Edit"
      onClick={ props.onAction.bind(null, 'edit') }>&#10000;</span>
    <span
      tabIndex="0"
      className="ActionsDelete"
      title="Delete"
      onClick={ props.onAction.bind(null, 'delete') }>x</span>
  </div>

Actions.propTypes = {
  inACtion: PropTypes.func,
};

Actions.defaultProps = {
  onAction: () => {}
};

export default Actions
