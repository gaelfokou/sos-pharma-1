'use client';

import React, { useState, useEffect, useRef } from 'react';

const Step9 = ({page, handleNext, handlePrevious, handleClick, handleSubmit, handleChange, handleFocus, formData}) => {
  useEffect(() => {
  }, [page, formData]);

  return (
    <div className="card text-center">
      <div className="card-header">
        <h6 className="card-title">Étape 9 : Récapitulatif de la commande</h6>
      </div>
      <div className="card-body px-2 py-2">
        <form id="form-9" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Médicament</th>
                    <th scope="col">Prescription</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Qté</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.stepValue1.map((drug, index) => (
                    <tr key={index}>
                      <th scope="row">{`${index + 1}`}</th>
                      <td>{`${drug.name}`}</td>
                      <td>{`${formData.stepValue3[index]}`}</td>
                      <td>{`${new Intl.NumberFormat('de-DE').format(drug.price)} CFA`}</td>
                      <td>{`${formData.stepValue2[index]}`}</td>
                      <td>{`${new Intl.NumberFormat('de-DE').format(drug.price * formData.stepValue2[index])} CFA`}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <th scope="row"></th>
                    <td colSpan="4">Total</td>
                    <td>{`${new Intl.NumberFormat('de-DE').format(formData.stepValue1.reduce((n, { price }, index) => n + price * formData.stepValue2[index], 0))} CFA`}</td>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" colSpan="5" className="text-left">Informations du client</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"></th>
                    <td colSpan="5" className="text-left">Nom : {`${formData.step5}`}</td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td colSpan="5" className="text-left">Numéro de téléphone : <a className="text-success" href={`tel:${formData.step6}`}>{`${formData.step6}`}</a></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td colSpan="5" className="text-left">Ville : {`${formData.step7}`}</td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td colSpan="5" className="text-left">Quartier : {`${formData.step8}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" name="cancel" className="btn btn-outline-success rounded-lg">Annulez</button>
            <button type="submit" name="submit" className="btn btn-success rounded-lg">Payez</button>
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

export default Step9;
