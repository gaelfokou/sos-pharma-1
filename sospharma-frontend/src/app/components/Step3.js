'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step3 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData, isLoading}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 3 : Récapitulatif de la commande</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-31" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Détails</th>
                    <th scope="col">Coût (CFA)</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.stepValue1.length > 0 ? (
                    formData.stepValue1.slice().reverse().map((drug, index) => (
                      <tr key={index}>
                        <td>{`n° ${formData.stepValue1.length - (index)}.`}</td>
                        <td>{`${drug.name}`} - {`${new Intl.NumberFormat('de-DE').format(drug.price)} CFA`} * {`${formData.stepValue2.slice().reverse()[index]}`} Qté(s)</td>
                        <td>{`${new Intl.NumberFormat('de-DE').format(drug.price * formData.stepValue2.slice().reverse()[index])} CFA`}</td>
                        <td>
                          <a className="btn btn-outline-dark text-body btn-delete" data-name="delete" data-value={`${index}`} href="#" onClick={handleClick}>
                            <i className="fa fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <th scope="col"></th>
                      <td colspan="2">Pas de médicaments disponibles...</td>
                      <th scope="col"></th>
                    </tr>
                  )}
                </tbody>
                <tbody>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" colspan="2">Total de la commande</th>
                    <td>{`${new Intl.NumberFormat('de-DE').format(formData.stepValue1.reduce((n, { price }, index) => n + price * formData.stepValue2[index], 0))} CFA`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" name="cancel" className="btn btn-outline-success text-truncate rounded-btn btn-width-30">Annulez</button>
            {formData.stepValue1.reduce((n, { price }, index) => n + price * formData.stepValue2[index], 0) > 0 && (
              isLoading ? (<button type="submit" name="load" className="btn btn-success text-truncate rounded-btn btn-width-30" disabled><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Traitement en cours...</button>) : (
                <>
                  <button type="submit" name="pay" className="btn btn-success text-truncate rounded-btn btn-width-30 d-none">Payez</button>
                  <button type="button" name="confirm-pay" className="btn btn-success text-truncate rounded-btn btn-width-30" data-name="confirm-pay" onClick={handleClick}>Payez</button>
                </>
              )
            )}
          </div>
        </form>
        <div className="modal fade" id="confirmPayModal" tabIndex="-1" aria-labelledby="confirmPayModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-modal">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmPayModalLabel">Total de la commande : {`${new Intl.NumberFormat('de-DE').format(formData.stepValue1.reduce((n, { price }, index) => n + price * formData.stepValue2[index], 0))} CFA`}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="form-32" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <div className="form-group form-group-label">
                    <label className="font-weight-bold text-success mx-per-10">Confirmez votre numéro de téléphone pour le paiement ?</label>
                  </div>
                  <div className="form-group form-group-3">
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
                  <div className="form-group">
                    <button type="submit" name="close-confirm-pay" className="btn btn-success text-truncate rounded-btn btn-width-30">Payez</button>
                  </div>
                </form>
              </div>
              <div className="modal-footer p-4">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer text-right">
        <div className="d-flex justify-content-end">
          {page > 1 && (
            <button type="button" className="btn btn-success text-truncate rounded-btn" onClick={handlePrevious}>{`<`}</button>
          )}
          {page < 3 && (
            <button type="button" className="btn btn-success text-truncate rounded-btn" onClick={handleClick}>{`>`}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3;
