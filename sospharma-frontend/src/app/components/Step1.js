'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step1 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData, isLoading}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 1 : Médicament</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-1" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-group-label">
            <label className="font-weight-bold text-success mx-per-10">Quel médicament souhaitez-vous commander ?</label>
          </div>
          <div className="form-group form-group-1">
            <label className="sr-only" htmlFor="inlineFormInputGroup11">Tapez votre réponse ici...</label>
            <div className="input-group">
              <input
                type="text"
                name="step1"
                className="form-control"
                id="inlineFormInputGroup11"
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
                  <tr key={index} className={`${drug.name.toLowerCase() === formData.step1.split(':')[0].trim().toLowerCase() ? 'active' : ''}`} data-name="step1" data-value={`${drug.name} : ${new Intl.NumberFormat('de-DE').format(drug.price)} CFA`} data-result="stepResult1">
                    <td>{`${drug.name} : ${new Intl.NumberFormat('de-DE').format(drug.price)} CFA`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
          <div className="form-group form-group-label">
            <label className="font-weight-bold text-success mx-per-10">Quelle quantité de ce médicament souhaitez-vous commander ?</label>
          </div>
          <div className="form-group form-group-1">
            <label className="sr-only" htmlFor="inlineFormInputGroup12">Tapez votre réponse ici...</label>
            <div className="input-group">
              <select
                name="step2"
                className="form-control"
                id="inlineFormInputGroup12"
                value={formData.step2}
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
          <div className="form-group form-group-label">
            <label className="font-weight-bold text-success mx-per-10">Ce médicament est-il une prescription médicale ?</label>
          </div>
          <div className="form-group form-group-1 form-group-radio form-group-radio-none">
            <label className="sr-only" htmlFor="inlineFormInputGroup13">Tapez votre réponse ici...</label>
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
                    id="inlineFormInputGroup13"
                    value="Oui"
                    checked={formData.step3 === "Oui"}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group form-group-1 form-group-radio">
            <label className="sr-only" htmlFor="inlineFormInputGroup14">Tapez votre réponse ici...</label>
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
                    id="inlineFormInputGroup14"
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
            <button type="submit" name="add" className="btn btn-outline-success text-truncate rounded-lg btn-width-30">Ajoutez un autre médicament</button>
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

export default Step1;
