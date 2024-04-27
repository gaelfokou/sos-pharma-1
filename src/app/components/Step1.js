'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step1 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Step 1 : Bienvenue sur SOS Pharma !</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-1" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <button type="submit" className="btn btn-success rounded-lg">Suivant</button>
          </div>
        </form>
      </div>
      <div className="card-footer text-right">
        <div className="d-flex justify-content-end">
          {page > 1 && (
            <button className="btn btn-success rounded-lg" onClick={handlePrevious}>{`<`}</button>
          )}
          {page < 10 && (
            <button className="btn btn-success rounded-lg" onClick={handleClick}>{`>`}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1;
