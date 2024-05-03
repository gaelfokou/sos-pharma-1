'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step3 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 3 : Ce médicament est-il une prescription médicale ?</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-3" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-3">
            <label className="sr-only" htmlFor="inlineFormInputGroup31">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Oui"
                readOnly
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <input
                    type="radio"
                    name="step3"
                    id="inlineFormInputGroup31"
                    value="Oui"
                    checked={formData.step3 === "Oui"}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group form-group-3">
            <label className="sr-only" htmlFor="inlineFormInputGroup32">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Non"
                readOnly
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <input
                    type="radio"
                    name="step3"
                    id="inlineFormInputGroup32"
                    value="Non"
                    checked={formData.step3 === "Non"}
                    onChange={handleChange}
                    required
                  />
                </div>
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

export default Step3;
