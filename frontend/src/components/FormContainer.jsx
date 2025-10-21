// frontend/src/components/FormContainer.jsx

import React from 'react';
import '../styles/Form.css'; // Vamos criar este arquivo

// Este componente apenas envolve o formulário em um layout centralizado
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