'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step3 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Step 3 : Quelle quantité de ce médicament souhaitez-vous commander ?</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-3" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-3">
            <label className="sr-only" htmlFor="inlineFormInputGroup">Tapez votre réponse ici...</label>
            <div className="input-group">
              <select
                name="step3"
                className="form-control"
                id="inlineFormInputGroup"
                value={formData.step3}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Sélectionnez votre réponse ici...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
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
          {page < 10 && (
            <button type="button" className="btn btn-success rounded-lg" onClick={handleClick}>{`>`}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3;
