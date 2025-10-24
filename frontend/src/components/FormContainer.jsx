import React from 'react';
import '../styles/Form.css';

const FormContainer = ({ title, children }) => {
  return (
    <div className="form-page">
      <div className="form-container">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;