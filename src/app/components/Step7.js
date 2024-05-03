'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step7 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 7 : Dans quelle ville vous trouvez-vous ?</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-7" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-7">
            <label className="sr-only" htmlFor="inlineFormInputGroup7">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                name="step7"
                className="form-control"
                id="inlineFormInputGroup7"
                placeholder="Tapez votre réponse ici..."
                value={formData.step7}
                onChange={handleChange}
                onFocus={handleFocus}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">@</div>
              </div>
            </div>
          </div>
          {formData.stepResult7.length > 0 && (<div className="form-group scroll-table">
            <table className="table table-striped table-hover table-7">
              <tbody>
                {formData.stepResult7.map((drug, index) => (
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

export default Step7;
