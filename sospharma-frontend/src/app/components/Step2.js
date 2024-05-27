'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step2 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData, isLoading}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 2 : Informations du client</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-2" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-label">
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
          <div className="form-group form-group-label">
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
                min={100000000}
                max={999999999}
                minLength={9}
                maxLength={9}
              />
              <div className="input-group-append">
                <div className="input-group-text">@</div>
              </div>
            </div>
          </div>
          <div className="form-group form-group-label">
            <label className="font-weight-bold text-success mx-per-10">Dans quelle ville vous trouvez-vous ?</label>
          </div>
          <div className="form-group form-group-2">
            <label className="sr-only" htmlFor="inlineFormInputGroup23">Tapez votre réponse ici...</label>
            <div className="input-group">
              <select
                name="step7"
                className="form-control"
                id="inlineFormInputGroup23"
                value={formData.step7}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Sélectionnez votre réponse ici...</option>
                {formData.stepResult7.length > 0 && (
                  formData.stepResult7.map((city, index) => (
                    <option key={index} value={`${city.name}`}>{`${city.name}`}</option>
                  ))
                )}
              </select>
              <div className="input-group-append">
                <div className="input-group-text">@</div>
              </div>
            </div>
          </div>
          <div className="form-group form-group-label">
            <label className="font-weight-bold text-success mx-per-10">Dans quel quartier êtes-vous ?</label>
          </div>
          <div className="form-group form-group-2">
            <label className="sr-only" htmlFor="inlineFormInputGroup24">Tapez votre réponse ici...</label>
            <div className="input-group">
              <select
                name="step8"
                className="form-control"
                id="inlineFormInputGroup24"
                value={formData.step8}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Sélectionnez votre réponse ici...</option>
                {formData.stepResult8.length > 0 && (
                  formData.stepResult8.map((quarter, index) => (
                    <option key={index} value={`${quarter.name}`}>{`${quarter.name}`}</option>
                  ))
                )}
              </select>
              <div className="input-group-append">
                <div className="input-group-text">@</div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" name="submit" className="btn btn-success text-truncate rounded-lg rounded-after btn-width-30">Suivant</button>
          </div>
        </form>
      </div>
      <div className="card-footer text-right">
        <div className="d-flex justify-content-end">
          {page > 1 && (
            <button type="button" className="btn btn-success text-truncate rounded-lg" onClick={handlePrevious}>{`<`}</button>
          )}
          {page < 3 && (
            <button type="button" className="btn btn-success text-truncate rounded-lg" onClick={handleClick}>{`>`}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
