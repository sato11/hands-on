import React            from 'react';
import ReactDOM         from 'react-dom';
import createReactClass from 'create-react-class';

const Component = createReactClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  render: function() {
    return React.DOM.span(null, `I am ${this.props.name}.`);
  }
});

const TextAreaCounter = createReactClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      defaultValue: '',
    };
  },

  getInitialState: function() {
    return {
      text: this.props.defaultValue,
    };
  },

  _textChange: function(ev) {
    this.setState({
      text: ev.target.value,
    });
  },

  render: function() {
    let count = null;
    if (this.state.text.length > 0) {
      count = React.DOM.h3(null,
        React.createElement(Counter, {
          count: this.state.text.length,
        })
      );
    }
    return React.DOM.div(null,
      React.DOM.textarea({
        value: this.state.text,
        onChange: this._textChange,
      }),
      count
    );
  },
});

const Counter = createReactClass({
  propTypes: {
    count: React.PropTypes.number.isRequired,
  },

  render: function() {
    return React.DOM.span(null, this.props.count);
  },
});

const myTextAreaCounter = ReactDOM.render(
  React.createElement(TextAreaCounter, {
    defaultValue: 'Hello',
  }),
  document.getElementById('app')
);
