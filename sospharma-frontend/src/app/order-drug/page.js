'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import $ from 'jquery';
import Popper from 'popper.js';
import intlTelInput from 'intl-tel-input';

import logo from '../assets/images/logo-sos-pharma.png';
import { setFormData, tokenCheck, orderCreate } from '../redux/Actions';
import { delay } from '../utils/Helpers';

import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';

const OrderDrug = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { token, formData, drugData, cityData, quarterData, orderData } = useSelector(state => state.order);
  const { isLoading } = useSelector(state => state.request);

  const propFormData = (data) => dispatch(setFormData(data));
  const propTokenCheck = (token, callback=null) => dispatch(tokenCheck(token, callback));
  const propOrderCreate = (token, data, callback=null) => dispatch(orderCreate(token, data, callback));

  const [page, setPage] = useState(1);
  const [phoneInput, setPhoneInput] = useState(null);
  const [toastAlert, setToastAlert] = useState(null);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    /* const telInput = intlTelInput(document.querySelector("#inlineFormInputGroup22"), {
        initialCountry: 'cm',
        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js'
    });
    setPhoneInput(telInput); */

    const toast = $('.toast');
    toast.on('shown.bs.toast', function (event) {
    });
    toast.on('hidden.bs.toast', function (event) {
    });
    setToastAlert(toast);

    const button = $('#v-pills-tab button[data-target="#v-pills-'+page+'"]');
    button.tab('show');
    button.on('click', handleEvent);
    const inputs = document.querySelectorAll('.form-group-'+page);
    inputs.forEach(input => {
      input.addEventListener('click', handleInput);
    });

    const tables = document.querySelectorAll('.table-'+page);
    tables.forEach(table => {
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        row.addEventListener('click', handleRow);
      });
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if (form.classList.contains('was-validated')) {
        form.classList.remove('was-validated');
      }
    });

    return () => {
      button.off('click', handleEvent);
      inputs.forEach(input => {
        input.removeEventListener('click', handleInput);
      });
      tables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
          row.removeEventListener('click', handleRow);
        });
      });
    }
  }, [page, formData]);

  const handleEvent = (event) => {
    event.preventDefault();

    const target = Number.parseInt(event.target.getAttribute('data-target').replace('#v-pills-',''));
    setPage(target);
  };

  const handleInput = (event) => {
    event.preventDefault();

    const input = event.target.parentNode.querySelector('input[type="radio"]');
    if (input !== null) {
      input.checked = true;
      /* const button = document.querySelector('#v-pills-tab button[data-target="#v-pills-'+page+'"]');
      const inputs = document.querySelectorAll('.form-group-'+page);
      if (button.classList.contains('invalid')) {
        button.classList.remove('invalid');
      }
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
      }); */
      propFormData({ ...formData, [input.name]: input.value });
    }
  };

  const handleRow = (event) => {
    event.preventDefault();

    const name = event.target.parentNode.attributes.getNamedItem('data-name');
    const data = event.target.parentNode.attributes.getNamedItem('data-value');
    const result = event.target.parentNode.attributes.getNamedItem('data-result');
    if (name !== null) {
      if (page === 2) {
        if (name.value === "step7") {
          const searchQuarter = handleSearchQuarterByCity(data.value);
          propFormData({ ...formData, [name.value]: data.value, step8: "", stepResult8: searchQuarter });
        } else if (name.value === "step8") {
          propFormData({ ...formData, [name.value]: data.value });
        } else {
          propFormData({ ...formData, [name.value]: data.value, [result.value]: [] });
        }
      } else {
        propFormData({ ...formData, [name.value]: data.value, [result.value]: [] });
      }
    }
  };

  const handleNext = (event) => {
    event.preventDefault();

    setPage((page) => {
      if (page < 3) {
        page = page + 1;
      }
      return page;
    });
  };

  const handlePrevious = (event) => {
    event.preventDefault();

    setPage((page) => {
      if (page > 1) {
        page = page - 1;
      }
      return page;
    });
  };

  const handleClick = (event) => {
    event.preventDefault();

    const name = event.target.parentNode.attributes.getNamedItem('data-name');
    const data = event.target.parentNode.attributes.getNamedItem('data-value');
    if (name !== null) {
      if (page === 3) {
        if (name.value === "delete") {
          const index = Number.parseInt(data.value);
          var stepValue1 = [ ...formData.stepValue1 ];
          var stepValue2 = [ ...formData.stepValue2 ];
          var stepValue3 = [ ...formData.stepValue3 ];
          stepValue1.splice(index, 1);
          stepValue2.splice(index, 1);
          stepValue3.splice(index, 1);
          propFormData({ ...formData, stepValue1: [...stepValue1], stepValue2: [...stepValue2], stepValue3: [...stepValue3] });
        }
      }
    } else {
      const button = document.querySelector('#form-'+page+' button[type="submit"][name="submit"]');
      button.click();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const button = document.querySelector('#v-pills-tab button[data-target="#v-pills-'+page+'"]');
    const inputs = document.querySelectorAll('.form-group-'+page);
    const submitter = event.nativeEvent.submitter.name;
    const form = event.target;
    if (submitter === "cancel") {
      propFormData({ ...formData, step1: "", stepValue1: [], stepResult1: [], step2: "", stepValue2: [], step3: "", stepValue3: [], step4: "" });
      setPage(1);
    } else if (submitter === "pay") {
      propTokenCheck(token, (tokenData) => {
        propOrderCreate(tokenData, formData, (isData) => {
          const toast = document.querySelector('.toast-body');
          if (isData.success) {
            toast.textContent = isData.message;
            toastAlert.toast('show');
            delay(function() {
              push('/order-list');
              propFormData({ ...formData, step1: "", stepValue1: [], stepResult1: [], step2: "", stepValue2: [], step3: "", stepValue3: [], step4: "" });
            }, 2500);
          } else {
            toast.textContent = isData.message;
            toastAlert.toast('show');
          }
          return { type: '' };
        });
        return { type: '' };
      });
    } else {
      var validForm = form.checkValidity();
      if (validForm) {
        if (button.classList.contains('invalid')) {
          button.classList.remove('invalid');
        }
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
        if (!button.classList.contains('invalid')) {
          button.classList.add('invalid');
        }
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
        if (page === 1) {
          const value = formData.step1.split(' : ')[0];
          var stepValue1 = [ ...formData.stepValue1 ];
          var stepValue2 = [ ...formData.stepValue2 ];
          var stepValue3 = [ ...formData.stepValue3 ];
          const indexName = stepValue1.findLastIndex((d) => d.name.toLowerCase() === value.toLowerCase());
          if (indexName !== -1) {
            const index = drugData.findLastIndex((d) => d.name.toLowerCase() === value.toLowerCase());
            if (index !== -1) {
              stepValue1[indexName] = drugData[index];
            }
            stepValue2[indexName] = Number.parseInt(formData.step2);
            stepValue3[indexName] = formData.step3;
          } else {
            const index = drugData.findLastIndex((d) => d.name.toLowerCase() === value.toLowerCase());
            if (index !== -1) {
              stepValue1 = [ ...stepValue1, drugData[index] ];
            }
            stepValue2 = [ ...stepValue2, Number.parseInt(formData.step2) ];
            stepValue3 = [ ...formData.stepValue3, formData.step3 ];
          }
          if (submitter === "add") {
            propFormData({ ...formData, step1: "", stepValue1: [...stepValue1], stepResult1: [], step2: "", stepValue2: [...stepValue2], step3: "", stepValue3: [...stepValue3] });
          } else {
            propFormData({ ...formData, stepValue1: [...stepValue1], stepValue2: [...stepValue2], stepValue3: [...stepValue3] });
            handleNext(event);
          }
        } else if (page === 2) {
          /* propFormData({ ...formData, step6: phoneInput.getNumber(intlTelInput.utils.numberFormat.E164) }); */
          handleNext(event);
        } else {
          handleNext(event);
        }
      }
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { form, name, value, maxLength } = event.target;
    /* const button = document.querySelector('#v-pills-tab button[data-target="#v-pills-'+page+'"]');
    const inputs = document.querySelectorAll('.form-group-'+page);
    var validForm = form.checkValidity();
    if (validForm) {
      if (button.classList.contains('invalid')) {
        button.classList.remove('invalid');
      }
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
      if (!button.classList.contains('invalid')) {
        button.classList.add('invalid');
      }
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
    } */
    if (page === 1) {
      if (name === "step1") {
        const searchDrug = handleSearchDrug(value);
        propFormData({ ...formData, [name]: value, stepResult1: searchDrug });
      } else {
        propFormData({ ...formData, [name]: value });
      }
    } else if (page === 2) {
      if (name === "step6") {
        propFormData({ ...formData, [name]: value.slice(0, maxLength) });
      } else if (name === "step7") {
        // const searchCity = handleSearchCity(value);
        const searchCity = [ ...formData.stepResult7 ];
        const searchQuarter = handleSearchQuarterByCity(value);
        propFormData({ ...formData, [name]: value, stepResult7: searchCity, step8: "", stepResult8: searchQuarter });
      } else if (name === "step8") {
        // const searchQuarter = handleSearchQuarter(value);
        const searchQuarter = [ ...formData.stepResult8 ];
        propFormData({ ...formData, [name]: value, stepResult8: searchQuarter });
      } else {
        propFormData({ ...formData, [name]: value });
      }
    } else {
      propFormData({ ...formData, [name]: value });
    }
  };

  const handleFocus = (event) => {
    event.preventDefault();

    const { value } = event.target;
    if (value.trim() !== "") {
      handleChange(event);
    }
  };

  const handleSearchDrug = (drug) => {
    drug = drug.split(':')[0];
    drug = drug.trim();
    var stepResult1 = [ ...formData.stepResult1 ];
    if (drug === "") {
      stepResult1 = [];
    } else if (drug.length >= 3) {
      stepResult1 = [];
      stepResult1 = drugData.filter((d) => drug.toLowerCase().split(' ').some(dr => d.name.toLowerCase().includes(dr.trim())));
    }
    /* const n = 100;
    if (stepResult1.length > n) {
      stepResult1 = stepResult1.slice(0, n);
    } */
    return stepResult1;
  };

  const handleSearchCity = (city) => {
    city = city.trim();
    var stepResult7 = [ ...formData.stepResult7 ];
    if (city === "") {
      stepResult7 = [];
    } else if (city.length >= 3) {
      stepResult7 = [];
      stepResult7 = cityData.filter((c) => c.name.toLowerCase().includes(city.toLowerCase()));
    }
    /* const n = 100;
    if (stepResult7.length > n) {
      stepResult7 = stepResult7.slice(0, n);
    } */
    return stepResult7;
  };

  const handleSearchQuarter = (quarter) => {
    quarter = quarter.trim();
    var stepResult8 = [ ...formData.stepResult8 ];
    if (quarter === "") {
      stepResult8 = [];
    } else if (quarter.length >= 3) {
      stepResult8 = [];
      const index = quarterData.findLastIndex((q) => q.key.toLowerCase() === formData.step7.toLowerCase());
      if (index !== -1) {
        stepResult8 = quarterData[index].value.filter((q) => q.name.toLowerCase().includes(quarter.toLowerCase()));
      }
    }
    /* const n = 100;
    if (stepResult8.length > n) {
      stepResult8 = stepResult8.slice(0, n);
    } */
    return stepResult8;
  };

  const handleSearchQuarterByCity = (city) => {
    city = city.trim();
    var stepResult8 = [ ...formData.stepResult8 ];
    if (city === "") {
      stepResult8 = [];
    } else if (city.length >= 3) {
      stepResult8 = [];
      const index = quarterData.findLastIndex((q) => q.key.toLowerCase() === city.toLowerCase());
      if (index !== -1) {
        stepResult8 = quarterData[index].value;
      }
    }
    /* const n = 100;
    if (stepResult8.length > n) {
      stepResult8 = stepResult8.slice(0, n);
    } */
    return stepResult8;
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
        <div className="col-md-12 pt-5">
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button type="button" className={`nav-link ${page === 1 ? 'active' : 'd-none'}`} id="v-pills-1-tab" data-toggle="pill" data-target="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected={`${page === 1 ? 'true' : 'false'}`}>Étape 1 / 3</button>
            <button type="button" className={`nav-link ${page === 2 ? '' : 'd-none'}`} id="v-pills-2-tab" data-toggle="pill" data-target="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Étape 2 / 3</button>
            <button type="button" className={`nav-link ${page === 3 ? '' : 'd-none'}`} id="v-pills-3-tab" data-toggle="pill" data-target="#v-pills-3" role="tab" aria-controls="v-pills-3" aria-selected="false">Étape 3 / 3</button>
          </div>
        </div>
        <div className="col-md-12 py-5">
          <div className="tab-content" id="v-pills-tabContent">
            <div className={`tab-pane slide ${page === 1 ? 'show active' : 'd-none'}`} id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-1-tab">
              <Step1
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFocus={handleFocus}
                formData={formData}
                isLoading={isLoading}
              />
            </div>
            <div className={`tab-pane slide ${page === 2 ? '' : 'd-none'}`} id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-2-tab">
              <Step2
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFocus={handleFocus}
                formData={formData}
                isLoading={isLoading}
              />
            </div>
            <div className={`tab-pane slide ${page === 3 ? '' : 'd-none'}`} id="v-pills-3" role="tabpanel" aria-labelledby="v-pills-3-tab">
              <Step3
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFocus={handleFocus}
                formData={formData}
                isLoading={isLoading}
              />
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

export default OrderDrug;
