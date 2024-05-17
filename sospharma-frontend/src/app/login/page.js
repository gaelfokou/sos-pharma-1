'use client';

import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo-sos-pharma.png';
import $ from 'jquery';
import Popper from 'popper.js';
import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { useLogin } from '../redux/Actions';

const Login = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { orderData } = useSelector(state => state.order);

  const [toastAlert, setToastAlert] = useState(null);
  const [formData, setFormData] = useState({
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
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputs = document.querySelectorAll('.form-group');
    const submitter = event.nativeEvent.submitter.name;
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
      dispatch(useLogin(formData.email, formData.password, (isLogin) => {
        const toast = document.querySelector('.toast-body');
        if (isLogin) {
          toast.textContent = "Connexion effectuée avec succès.";
          toastAlert.toast('show');
          setFormData({ ...formData, email: "", password: "" });
          push('/dashboard');
        } else {
          toast.textContent = "Adresse e-mail ou mot de passe incorrect.";
          toastAlert.toast('show');
        }

        return {
          type: '',
        };
      }));
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { form, name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
          {orderData.length > 0 ? (<a className="h6 font-weight-bold text-success" href="/order-list">SOS Pharma ({`${orderData.length}`})</a>) : (<a className="h6 font-weight-bold text-success" href="/order-list">SOS Pharma</a>)}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 py-5">
          <div className="card">
            <div className="card-header text-center">
              <h6 className="card-title">Connexion</h6>
            </div>
            <div className="card-body px-2 py-2">
              <form id="form-1" className="needs-validation" autoComplete="off" noValidate onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Adresse e-mail</label>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Adresse e-mail..."
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        required
                      />
                    </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Mot de passe</label>
                  <div className="col-md-6">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="Mot de passe..."
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col text-center">
                    <button type="submit" name="submit" className="btn btn-success rounded-lg">Connexion</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="position-fixed bottom-0 right-0 p-3" style={{ zIndex: 5, right: 0, bottom: 0 }}>
            <div className="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3500">
              <div className="toast-header">
                <img src={logo.src} className="rounded mr-2" width="30" alt="" />
                <strong className="mr-auto">SOS Pharma</strong>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="toast-body">
                Connexion effectuée avec succès.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
