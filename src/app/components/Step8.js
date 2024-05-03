'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step8 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 8 : Dans quel quartier êtes-vous ?</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-8" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-8">
            <label className="sr-only" htmlFor="inlineFormInputGroup8">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                name="step8"
                className="form-control"
                id="inlineFormInputGroup8"
                placeholder="Tapez votre réponse ici..."
                value={formData.step8}
                onChange={handleChange}
                onFocus={handleFocus}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">@</div>
              </div>
            </div>
          </div>
          {formData.stepResult8.length > 0 && (<div className="form-group scroll-table">
            <table className="table table-striped table-hover table-8">
              <tbody>
                {formData.stepResult8.map((drug, index) => (
                  <tr key={index} data-value={drug.name}>
                    <td>{`${drug.name}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
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

export default Step8;
