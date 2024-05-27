'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import $ from 'jquery';
import Popper from 'popper.js';

import logo from '../assets/images/logo-sos-pharma.png';
import { authLogin } from '../redux/Actions';
import { delay } from '../utils/Helpers';

const Login = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { orderData, isLoading } = useSelector(state => state.order);

  const propAuthLogin = (email, password, callback=null) => dispatch(authLogin(email, password, callback));

  const [toastAlert, setToastAlert] = useState(null);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    const toast = $('.toast');
    toast.on('shown.bs.toast', function (event) {
    });
    toast.on('hidden.bs.toast', function (event) {
    });
    setToastAlert(toast);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputs = document.querySelectorAll('.form-group');
    const form = event.target;
    var validForm = form.checkValidity();
    if (validForm) {
      inputs.forEach(input => {
        if (input.classList.contains('invalid')) {
          input.classList.remove('invalid');
        }
      });
      inputs.forEach(input => {
        if (input.classList.contains('valid')) {
          input.classList.remove('valid');
        }
      });
      inputs.forEach(input => {
        if (!input.classList.contains('valid')) {
          input.classList.add('valid');
        }
      });
    } else {
      inputs.forEach(input => {
        if (!input.classList.contains('invalid')) {
          input.classList.add('invalid');
        }
      });
      inputs.forEach(input => {
        if (input.classList.contains('valid')) {
          input.classList.remove('valid');
        }
      });
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    if (validForm) {
      propAuthLogin(authData.email, authData.password, (isData) => {
        const toast = document.querySelector('.toast-body');
        if (isData.success) {
          toast.textContent = isData.message;
          toastAlert.toast('show');
          delay(function(){
            push('/dashboard');
            setAuthData({ ...authData, email: "", password: "" });
          }, 2500);
        } else {
          toast.textContent = isData.message;
          toastAlert.toast('show');
        }
      });
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { form, name, value } = event.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleFocus = (event) => {
    event.preventDefault();

    const { value } = event.target;
    if (value.trim() !== "") {
      handleChange(event);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col pt-5">
          <div className="d-flex justify-content-between">
            <a className="h6 font-weight-bold text-success" href="/">SOS Pharma</a>
            {orderData.length > 0 ? (<a className="h6 font-weight-bold text-success" href="/order-list">Historique ({`${orderData.length}`})</a>) : (<a className="h6 font-weight-bold text-success" href="/order-list">Historique</a>)}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 py-5">
          <div className="card form-slide active">
            <div className="card-header text-center">
              <h6 className="card-title">Connexion</h6>
            </div>
            <div className="card-body px-2 py-2">
              <form id="form-1" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="email" className="col-md-4 col-form-label text-center text-md-right">Adresse e-mail</label>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Adresse e-mail..."
                        value={authData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        required
                      />
                    </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="password" className="col-md-4 col-form-label text-center text-md-right">Mot de passe</label>
                  <div className="col-md-6">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="Mot de passe..."
                      value={authData.password}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col text-center">
                    {isLoading ? (<button type="submit" name="load" className="btn btn-success text-truncate rounded-lg btn-width-30" disabled><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Traitement en cours...</button>) : (<button type="submit" name="submit" className="btn btn-success text-truncate rounded-lg btn-width-30">Connexion</button>)}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="toast-alert position-fixed bottom-0 right-0 p-3">
            <div className="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
              <div className="toast-header">
                <img src={logo.src} className="rounded mr-2" width="30" alt="" />
                <strong className="mr-auto">SOS Pharma</strong>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="toast-body"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
