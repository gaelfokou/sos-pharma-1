'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step2 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 2 : Informations du client</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-2" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="font-weight-bold text-success mx-per-10">Quel est votre nom ?</label>
          </div>
          <div className="form-group form-group-2">
            <label className="sr-only" htmlFor="inlineFormInputGroup21">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                name="step5"
                className="form-control"
                id="inlineFormInputGroup21"
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
            <label className="font-weight-bold text-success mx-per-10">Quel est votre numéro de téléphone ?</label>
          </div>
          <div className="form-group form-group-2">
            <label className="sr-only" htmlFor="inlineFormInputGroup22">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="number"
                name="step6"
                className="form-control"
                id="inlineFormInputGroup22"
                placeholder="Tapez votre réponse ici..."
                value={formData.step6}
                onChange={handleChange}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">@</div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="font-weight-bold text-success mx-per-10">Dans quelle ville vous trouvez-vous ?</label>
          </div>
          <div className="form-group form-group-2">
            <label className="sr-only" htmlFor="inlineFormInputGroup23">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                name="step7"
                className="form-control"
                id="inlineFormInputGroup23"
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
            <table className="table table-striped table-hover table-2">
              <tbody>
                {formData.stepResult7.map((city, index) => (
                  <tr key={index} className={`${city.name.toLowerCase() === formData.step7.trim().toLowerCase() ? 'active' : ''}`} data-name="step7" data-value={city.name} data-result="stepResult7">
                    <td>{`${city.name}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
          <div className="form-group">
            <label className="font-weight-bold text-success mx-per-10">Dans quel quartier êtes-vous ?</label>
          </div>
          <div className="form-group form-group-2">
            <label className="sr-only" htmlFor="inlineFormInputGroup24">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                name="step8"
                className="form-control"
                id="inlineFormInputGroup24"
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
            <table className="table table-striped table-hover table-2">
              <tbody>
                {formData.stepResult8.map((quarter, index) => (
                  <tr key={index} className={`${quarter.name.toLowerCase() === formData.step8.trim().toLowerCase() ? 'active' : ''}`} data-name="step8" data-value={quarter.name} data-result="stepResult8">
                    <td>{`${quarter.name}`}</td>
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
          {page < 3 && (
            <button type="button" className="btn btn-success rounded-lg" onClick={handleClick}>{`>`}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
