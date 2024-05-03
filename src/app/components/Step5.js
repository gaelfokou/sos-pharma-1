'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step5 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 5 : Quel est votre nom ?</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-5" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-5">
            <label className="sr-only" htmlFor="inlineFormInputGroup5">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                name="step5"
                className="form-control"
                id="inlineFormInputGroup5"
                placeholder="Tapez votre réponse ici..."
                value={formData.step5}
                onChange={handleChange}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">@</div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" name="submit" className="btn btn-success rounded-lg rounded-after">Suivant</button>
          </div>
        </form>
      </div>
      <div className="card-footer text-right">
        <div className="d-flex justify-content-end">
          {page > 1 && (
            <button type="button" className="btn btn-success rounded-lg" onClick={handlePrevious}>{`<`}</button>
          )}
          {page < 9 && (
            <button type="button" className="btn btn-success rounded-lg" onClick={handleClick}>{`>`}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step5;
