'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step4 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Step 4 : Ce médicament est-il une prescription médicale ?</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-4" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-4">
            <label className="sr-only" htmlFor="inlineFormInputGroup41">Tapez votre réponse ici...</label>
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
                    name="step4"
                    id="inlineFormInputGroup41"
                    value="Oui"
                    checked={formData.step4 === "Oui"}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group form-group-4">
            <label className="sr-only" htmlFor="inlineFormInputGroup42">Tapez votre réponse ici...</label>
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
                    name="step4"
                    id="inlineFormInputGroup42"
                    value="Non"
                    checked={formData.step4 === "Non"}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
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

export default Step4;
