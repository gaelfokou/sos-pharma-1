'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step1 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 1 : Quel médicament souhaitez-vous commander ?</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-1" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-1">
            <label className="sr-only" htmlFor="inlineFormInputGroup1">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                name="step1"
                className="form-control"
                id="inlineFormInputGroup1"
                placeholder="Tapez votre réponse ici..."
                value={formData.step1}
                onChange={handleChange}
                onFocus={handleFocus}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">@</div>
              </div>
            </div>
          </div>
          {formData.stepResult1.length > 0 && (<div className="form-group scroll-table">
            <table className="table table-striped table-hover table-1">
              <tbody>
                {formData.stepResult1.map((drug, index) => (
                  <tr key={index} data-value={`${drug.name} : ${new Intl.NumberFormat('de-DE').format(drug.price)} CFA`}>
                    <td>{`${drug.name} : ${new Intl.NumberFormat('de-DE').format(drug.price)} CFA`}</td>
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

export default Step1;
