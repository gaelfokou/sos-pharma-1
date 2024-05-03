'use client';

import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo-sos-pharma.png';
import drug from '../assets/data/drugs.json';
import geolocation from '../assets/data/geolocation.json';
import $ from 'jquery';
import Popper from 'popper.js';
import intlTelInput from 'intl-tel-input';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import Step5 from '../components/Step5';
import Step6 from '../components/Step6';
import Step7 from '../components/Step7';
import Step8 from '../components/Step8';
import Step9 from '../components/Step9';

const drugs = drug.map((drug, i) => ({
  name: drug.name,
  price: drug.price,
}));

const cities = geolocation.cities.map((city, i) => ({
  name: city.name,
}));

const quarters = geolocation.cities.map((city, i) => ({
  key: city.name,
  value: city.quarters.map((quarter, j) => ({
    name: quarter.name,
  })),
}));

const OrderDrug = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    step1: "",
    stepValue1: [],
    stepResult1: [],
    step2: "",
    stepValue2: [],
    step3: "",
    stepValue3: [],
    step4: "",
    step5: "",
    step6: "",
    step7: "",
    stepResult7: [],
    step8: "",
    stepResult8: [],
  });
  const [drugData, setDrugData] = useState(drugs);
  const [cityData, setCityData] = useState(cities);
  const [quarterData, setQuarterData] = useState(quarters);
  const [phoneInput, setPhoneInput] = useState(null);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    /* const telInput = intlTelInput(document.querySelector("#inlineFormInputGroup6"), {
        initialCountry: 'cm',
        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js'
    });
    setPhoneInput(telInput); */

    const button = $('#v-pills-tab button[data-target="#v-pills-'+page+'"]');
    button.tab('show');
    button.on('click', handleEvent);
    const inputs = document.querySelectorAll('.form-group-'+page);
    inputs.forEach(input => {
      input.addEventListener('click', handleInput);
    });

    const table = document.querySelector('.table-'+page);
    if (table !== null) {
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        row.addEventListener('click', handleInput);
      });
    }

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
      if (table !== null) {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
          row.removeEventListener('click', handleInput);
        });
      }
    }
  }, [page, formData]);

  const handleEvent = (event) => {
    event.preventDefault();

    const target = parseInt(event.target.getAttribute('data-target').replace('#v-pills-',''));
    setPage(target);
  };

  const handleInput = (event) => {
    event.preventDefault();

    const input = event.target.parentNode.querySelector('input[type="radio"]');
    if (input !== null) {
      input.checked = true;
      const button = document.querySelector('#v-pills-tab button[data-target="#v-pills-'+page+'"]');
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
      });
      if (page === 3) {
        if (formData.stepValue2.length > formData.stepValue3.length) {
          setFormData({ ...formData, ['step'+page]: input.value, ['stepValue'+page]: [...formData.stepValue3, input.value] });
        } else {
          var stepValue3 = [...formData.stepValue3];
          stepValue3[stepValue3.length - 1] = input.value;
          setFormData({ ...formData, ['step'+page]: input.value, ['stepValue'+page]: [...stepValue3] });
        }
      } else {
        setFormData({ ...formData, [input.name]: input.value });
      }
    } else {
      const data = event.target.parentNode.attributes.getNamedItem('data-value');
      if (data !== null) {
        if (page === 1) {
          const value = data.value.split(' : ')[0];
          if (formData.stepValue1.length > formData.stepValue2.length) {
            var stepValue1 = [...formData.stepValue1];
            const index = drugData.findLastIndex((d) => d.name.toLowerCase() === value.toLowerCase());
            if (index !== -1) {
              stepValue1[stepValue1.length - 1] = drugData[index];
            }
            setFormData({ ...formData, ['step'+page]: data.value, ['stepValue'+page]: [...stepValue1], ['stepResult'+page]: [] });
          } else {
            var stepValue1 = [...formData.stepValue1];
            const index = drugData.findLastIndex((d) => d.name.toLowerCase() === value.toLowerCase());
            if (index !== -1) {
              stepValue1 = [...stepValue1, drugData[index]];
            }
            setFormData({ ...formData, ['step'+page]: data.value, ['stepValue'+page]: [...stepValue1], ['stepResult'+page]: [] });
          }
        } else {
          setFormData({ ...formData, ['step'+page]: data.value, ['stepResult'+page]: [] });
        }
      }
    }
  };

  const handleNext = (event) => {
    event.preventDefault();

    setPage((page) => {
      if (page < 9) {
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

    const button = document.querySelector('#form-'+page+' button[type="submit"]');
    button.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const button = document.querySelector('#v-pills-tab button[data-target="#v-pills-'+page+'"]');
    const inputs = document.querySelectorAll('.form-group-'+page);
    const form = event.target;
    if (form.checkValidity() === false) {
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
    } else {
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
      if (page === 4) {
        if (formData.step4 === "Oui") {
          setFormData({ ...formData, step1: "", stepResult1: [], step2: "", step3: "", step4: "" });
          setPage(1);
        } else {
          handleNext(event);
        }
      /* } else if (page === 6) {
        setFormData({ ...formData, step6: phoneInput.getNumber(intlTelInput.utils.numberFormat.E164) });
        handleNext(event); */
      } else {
        const submitter = event.nativeEvent.submitter.name;
        if (submitter === "cancel") {
          setFormData({ ...formData, step1: "", stepValue1: [], stepResult1: [], step2: "", stepValue2: [], step3: "", stepValue3: [], step4: "" });
          setPage(1);
        } else {
          handleNext(event);
        }
      }
    }
    form.classList.add('was-validated');
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { form, name, value } = event.target;
    const button = document.querySelector('#v-pills-tab button[data-target="#v-pills-'+page+'"]');
    const inputs = document.querySelectorAll('.form-group-'+page);
    if (form.checkValidity() === false) {
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
    } else {
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
    }
    form.classList.add('was-validated');

    if (page === 1) {
      var search = handleSearchDrug(value);
      setFormData({ ...formData, [name]: value, stepResult1: search });
    } else if (page === 2) {
      if (formData.stepValue1.length > formData.stepValue2.length) {
        setFormData({ ...formData, ['step'+page]: value, ['stepValue'+page]: [...formData.stepValue2, parseInt(value)] });
      } else {
        var stepValue2 = [...formData.stepValue2];
        stepValue2[stepValue2.length - 1] = parseInt(value);
        setFormData({ ...formData, ['step'+page]: value, ['stepValue'+page]: [...stepValue2] });
      }
    } else if (page === 7) {
      var search = handleSearchCity(value);
      setFormData({ ...formData, [name]: value, stepResult7: search });
    } else if (page === 8) {
      var search = handleSearchQuarter(value);
      setFormData({ ...formData, [name]: value, stepResult8: search });
    } else {
      setFormData({ ...formData, [name]: value });
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
    var stepResult1 = [...formData.stepResult1];
    if (drug === "") {
      stepResult1 = [];
    } else if (drug.length >= 3) {
      stepResult1 = [];
      stepResult1 = drugData.filter((d) => d.name.toLowerCase().includes(drug.toLowerCase()));
    }
    const n = 10;
    if (stepResult1.length > n) {
      stepResult1 = stepResult1.slice(0, n);
    }
    return stepResult1;
  };

  const handleSearchCity = (city) => {
    city = city.trim();
    var stepResult7 = [...formData.stepResult7];
    if (city === "") {
      stepResult7 = [];
    } else if (city.length >= 3) {
      stepResult7 = [];
      stepResult7 = cityData.filter((c) => c.name.toLowerCase().includes(city.toLowerCase()));
    }
    const n = 10;
    if (stepResult7.length > n) {
      stepResult7 = stepResult7.slice(0, n);
    }
    return stepResult7;
  };

  const handleSearchQuarter = (quarter) => {
    quarter = quarter.trim();
    var stepResult8 = [...formData.stepResult8];
    if (quarter === "") {
      stepResult8 = [];
    } else if (quarter.length >= 3) {
      stepResult8 = [];
      const index = quarterData.findLastIndex((q) => q.key.toLowerCase() === formData.step7.toLowerCase());
      if (index !== -1) {
        stepResult8 = quarterData[index].value.filter((q) => q.name.toLowerCase().includes(quarter.toLowerCase()));
      }
    }
    const n = 10;
    if (stepResult8.length > n) {
      stepResult8 = stepResult8.slice(0, n);
    }
    return stepResult8;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col pt-5">
          <a className="h6 text-success" href="/">SOS Pharma</a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 pt-5">
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button type="button" className={`nav-link ${page === 1 ? 'active' : 'd-none'}`} id="v-pills-1-tab" data-toggle="pill" data-target="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected={`${page === 1 ? 'true' : 'false'}`}>Étape 1 / 9</button>
            <button type="button" className={`nav-link ${page === 2 ? '' : 'd-none'}`} id="v-pills-2-tab" data-toggle="pill" data-target="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Étape 2 / 9</button>
            <button type="button" className={`nav-link ${page === 3 ? '' : 'd-none'}`} id="v-pills-3-tab" data-toggle="pill" data-target="#v-pills-3" role="tab" aria-controls="v-pills-3" aria-selected="false">Étape 3 / 9</button>
            <button type="button" className={`nav-link ${page === 4 ? '' : 'd-none'}`} id="v-pills-4-tab" data-toggle="pill" data-target="#v-pills-4" role="tab" aria-controls="v-pills-4" aria-selected="false">Étape 4 / 9</button>
            <button type="button" className={`nav-link ${page === 5 ? '' : 'd-none'}`} id="v-pills-5-tab" data-toggle="pill" data-target="#v-pills-5" role="tab" aria-controls="v-pills-5" aria-selected="false">Étape 5 / 9</button>
            <button type="button" className={`nav-link ${page === 6 ? '' : 'd-none'}`} id="v-pills-6-tab" data-toggle="pill" data-target="#v-pills-6" role="tab" aria-controls="v-pills-6" aria-selected="false">Étape 6 / 9</button>
            <button type="button" className={`nav-link ${page === 7 ? '' : 'd-none'}`} id="v-pills-7-tab" data-toggle="pill" data-target="#v-pills-7" role="tab" aria-controls="v-pills-7" aria-selected="false">Étape 7 / 9</button>
            <button type="button" className={`nav-link ${page === 8 ? '' : 'd-none'}`} id="v-pills-8-tab" data-toggle="pill" data-target="#v-pills-8" role="tab" aria-controls="v-pills-8" aria-selected="false">Étape 8 / 9</button>
            <button type="button" className={`nav-link ${page === 9 ? '' : 'd-none'}`} id="v-pills-9-tab" data-toggle="pill" data-target="#v-pills-9" role="tab" aria-controls="v-pills-9" aria-selected="false">Étape 9 / 9</button>
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
              />
            </div>
            <div className={`tab-pane slide ${page === 4 ? '' : 'd-none'}`} id="v-pills-4" role="tabpanel" aria-labelledby="v-pills-4-tab">
              <Step4
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFocus={handleFocus}
                formData={formData}
              />
            </div>
            <div className={`tab-pane slide ${page === 5 ? '' : 'd-none'}`} id="v-pills-5" role="tabpanel" aria-labelledby="v-pills-5-tab">
              <Step5
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFocus={handleFocus}
                formData={formData}
              />
            </div>
            <div className={`tab-pane slide ${page === 6 ? '' : 'd-none'}`} id="v-pills-6" role="tabpanel" aria-labelledby="v-pills-6-tab">
              <Step6
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFocus={handleFocus}
                formData={formData}
              />
            </div>
            <div className={`tab-pane slide ${page === 7 ? '' : 'd-none'}`} id="v-pills-7" role="tabpanel" aria-labelledby="v-pills-7-tab">
              <Step7
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFocus={handleFocus}
                formData={formData}
              />
            </div>
            <div className={`tab-pane slide ${page === 8 ? '' : 'd-none'}`} id="v-pills-8" role="tabpanel" aria-labelledby="v-pills-8-tab">
              <Step8
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFocus={handleFocus}
                formData={formData}
              />
            </div>
            <div className={`tab-pane slide ${page === 9 ? '' : 'd-none'}`} id="v-pills-9" role="tabpanel" aria-labelledby="v-pills-9-tab">
              <Step9
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFocus={handleFocus}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDrug;
