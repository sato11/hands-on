import Button from './button';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

class Dialog extends Component {
  componentWillUnmount() {
    document.body.classList.remove('DialogModalOpen');
  }

  componentDidMount() {
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen');
    }
  }

  render() {
    return (
      <div className={ classNames({
        'Dialog': true,
        'DialogModal': this.props.modal }) }>
        <div className={ this.props.modal ? 'DialogModalWrap' : null }>
          <div className="DialogHeader">{ this.props.header }</div>
          <div className="DialogBody">{ this.props.children }</div>
          <div className="DialogFooter">{ this.props.children }
            {
              this.props.hasCancel
                ? <span
                    className="DialogDismiss"
                    onClick={ this.props.onAction.bind(this, 'dismiss') }>
                    Cancel
                    </span>
                : null
            }
            <Button onClick={ this.props.onAction.bind(this,
              this.props.hasCancel ? 'confirm' : 'dismiss')}>
              { this.props.confirmLabel }
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

Dialog.propTypes = {
  header: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  modal: PropTypes.bool,
  onAction: PropTypes.func,
  hasCancel: PropTypes.bool,
}

Dialog.defaultProps = {
  confirmLabel: 'OK',
  modal: false,
  onAction: () => {},
  hasCancel: true,
}

export default Dialog
