import FormInput from './formInput';
import Rating from './rating';
import React, { Component, PropTypes } from 'react';

class Form extends Component {
  getData() {
    let data = {};
    this.props.fiels.forEach( field =>
      data[field.id] = this.refs[field.id].getValue()
    );
    return data;
  }

  render() {
    return(
      <form className="Form">{ this.props.fields.map( field => {
        const preFilled = this.props.initialData && this.props.initialData[field.id];
        if (!this.props.readonly) {
          return (
            <div className="FormRow" key={ field.id } >
              <label className="FormLabel" htmlFor={ field.label }>{ field.label }:</label>
              <FormInput { ...field } ref={ field.id } defaultValue={ preFilled }/>
            </div>
          );
        }
        if (!preFilled) {
          return null
        }
        return (
          <div className="FormRow" key={ field.id }>
            <span className="FormLabel">{ field.label }</span>
            {
              field.type === 'rating'
                ? <Rating readonly={ true } defaultValue={ parseInt(preFilled, 10) } />
                : <div>{ preFilled }</div>
            }
          </div>
        )
      }, this)}</form>
    )
  }
}

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  initialData: PropTypes.object,
  readonly: PropTypes.bool,
}

export default Form
