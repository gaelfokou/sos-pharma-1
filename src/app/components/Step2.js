'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step2 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Step 2 : Quel médicament souhaitez-vous commander ?</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-2" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-2">
            <label className="sr-only" htmlFor="inlineFormInputGroup">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                name="step2"
                className="form-control"
                id="inlineFormInputGroup"
                placeholder="Tapez votre réponse ici..."
                value={formData.step2}
                onChange={handleChange}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">@</div>
              </div>
            </div>
          </div>
          {formData.stepResult2.length > 0 && (<div className="form-group">
            <table className="table table-striped table-hover table-2">
              <tbody>
                {formData.stepResult2.map((drug, index) => (
                  <tr key={index} data-page="step2" data-value={drug.name}>
                    <td>{`${drug.name} : ${drug.price} XAF`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
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

export default Step2;
