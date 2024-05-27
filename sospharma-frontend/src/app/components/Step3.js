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
        <form id="form-6" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                  {formData.stepValue1.slice().reverse().map((drug, index) => (
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
                ))}
                </tbody>
                <tbody>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Total de la commande</th>
                    <td>{`${new Intl.NumberFormat('de-DE').format(formData.stepValue1.reduce((n, { price }, index) => n + price * formData.stepValue2[index], 0))} CFA`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" name="cancel" className="btn btn-outline-success text-truncate rounded-lg btn-width-30">Annulez</button>
            {isLoading ? (<button type="submit" name="load" className="btn btn-success text-truncate rounded-lg btn-width-30" disabled><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Traitement en cours...</button>) : (<button type="submit" name="pay" className="btn btn-success text-truncate rounded-lg btn-width-30">Payez</button>)}
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

export default Step3;
