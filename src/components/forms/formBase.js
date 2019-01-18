import React, { Component } from 'react';

const handlePasswordField = ( name ) => {
  return name.includes( 'password' ) ? 'password' : 'text';
}

const FieldError = ( { error, name } ) => {
  if ( error ) {
    return( <span className="error">{ name } is a required field</span> );
  } else {
    return null;
  }
}

const FormFields = ( { model, fields, errors, handleChange } ) => {
  if ( fields ) {
    return fields.map(
      field => {
        const fieldValue = model[ field.value ];

        return(
          <div key={ fields.indexOf( field ) } className="form-field">
            <label htmlFor={ field.value }>{ field.labelName }</label>
            <input type={ handlePasswordField( field.value ) } value={ fieldValue } name={ field.value } onChange={ handleChange }/>
            <FieldError error={ errors[ field.value ] } name={ field.labelName }/>
          </div>
        );
      }
    );
  }
  else {
    return null;
  }
};

const FormBase = ( { name, label, model, errors, values, handleSubmit, handleChange } ) => {
  return(
    <form className="form" name={ name } onSubmit={ handleSubmit }>
      <label>{ label }</label>
      <FormFields model={ model } fields={ values } errors={ errors } handleChange={ handleChange } />
      <div className="form-field">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
};

export default FormBase;
