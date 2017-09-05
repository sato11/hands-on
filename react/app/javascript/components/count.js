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

const logMixin = {
  _log: function(methodName, args) {
    console.log(`${this.name}::${methodName}`, args);
  },

  componentWillUpdate: function() {
    this._log('componentWillUpdate', arguments);
  },

  componentDidUpdate: function(oldProps, oldState) {
    this._log('componentDidUpdate', arguments);
  },

  componentWillMount: function() {
    this._log('componentWillMount', arguments);
  },

  componentDidMount: function() {
    this._log('componentDidMount', arguments);
  },
};

const TextAreaCounter = createReactClass({
  name: 'TextAreaCounter',
  // mixins: [logMixin],
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
      count = (
        <h3>
          <Counter count={ this.state.text.length }></Counter>
        </h3>
      );
    }
    return (
      <div>
        <textarea value={ this.state.text } onChange={ this._textChange }></textarea>
        { count }
      </div>
    )
  },
});

const Counter = createReactClass({
  name: 'Counter',
  // mixins: [logMixin],
  propTypes: {
    count: React.PropTypes.number.isRequired,
  },

  shouldComponentUpdate: function(nextProps, nextState_ignore) {
    return nextProps.count !== this.props.count;
  },

  render: function() {
    return (
      <span>{ this.props.count }</span>
    );
  },
});

const myTextAreaCounter = ReactDOM.render(
  <TextAreaCounter defaultValue={ 'Bob' }></TextAreaCounter>,
  document.getElementById('app')
);
