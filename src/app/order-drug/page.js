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

const drugs = drug.sort((a, b) => a.name.localeCompare(b.name)).map((drug, i) => ({
  name: drug.name,
  price: drug.price,
}));

const cities = geolocation.cities.sort((a, b) => a.name.localeCompare(b.name)).map((city, i) => ({
  name: city.name,
}));

const quarters = geolocation.cities.sort((a, b) => a.name.localeCompare(b.name)).map((city, i) => ({
  key: city.name,
  value: city.quarters.sort((a, b) => a.name.localeCompare(b.name)).map((quarter, j) => ({
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
    stepResult7: cities,
    step8: "",
    stepResult8: [],
  });
  const [drugData, setDrugData] = useState(drugs);
  const [cityData, setCityData] = useState(cities);
  const [quarterData, setQuarterData] = useState(quarters);
  const [phoneInput, setPhoneInput] = useState(null);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    /* const telInput = intlTelInput(document.querySelector("#inlineFormInputGroup22"), {
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

    const target = parseInt(event.target.getAttribute('data-target').replace('#v-pills-',''));
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
      setFormData({ ...formData, [input.name]: input.value });
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
          setFormData({ ...formData, [name.value]: data.value, step8: "", stepResult8: searchQuarter });
        } else if (name.value === "step8") {
          setFormData({ ...formData, [name.value]: data.value });
        } else {
          setFormData({ ...formData, [name.value]: data.value, [result.value]: [] });
        }
      } else {
        setFormData({ ...formData, [name.value]: data.value, [result.value]: [] });
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

    const button = document.querySelector('#form-'+page+' button[type="submit"][name="submit"]');
    button.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const button = document.querySelector('#v-pills-tab button[data-target="#v-pills-'+page+'"]');
    const inputs = document.querySelectorAll('.form-group-'+page);
    const submitter = event.nativeEvent.submitter.name;
    const form = event.target;
    if (submitter === "cancel") {
      setFormData({ ...formData, step1: "", stepValue1: [], stepResult1: [], step2: "", stepValue2: [], step3: "", stepValue3: [], step4: "" });
      setPage(1);
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
          var stepValue1 = [...formData.stepValue1];
          const index = drugData.findLastIndex((d) => d.name.toLowerCase() === value.toLowerCase());
          if (index !== -1) {
            stepValue1 = [...stepValue1, drugData[index]];
          }
          var stepValue2 = [...formData.stepValue2];
          stepValue2 = [...stepValue2, parseInt(formData.step2)];
          if (submitter === "add") {
            setFormData({ ...formData, step1: "", stepValue1: [...stepValue1], stepResult1: [], step2: "", stepValue2: [...stepValue2], step3: "", stepValue3: [...formData.stepValue3, formData.step3] });
          } else {
            setFormData({ ...formData, stepValue1: [...stepValue1], stepValue2: [...stepValue2], stepValue3: [...formData.stepValue3, formData.step3] });
            handleNext(event);
          }
        } else if (page === 2) {
          /* setFormData({ ...formData, step6: phoneInput.getNumber(intlTelInput.utils.numberFormat.E164) }); */
          handleNext(event);
        } else {
          handleNext(event);
        }
      }
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { form, name, value } = event.target;
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
        setFormData({ ...formData, [name]: value, stepResult1: searchDrug });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else if (page === 2) {
      if (name === "step7") {
        // const searchCity = handleSearchCity(value);
        const searchCity = [...formData.stepResult7];
        const searchQuarter = handleSearchQuarterByCity(value);
        setFormData({ ...formData, [name]: value, stepResult7: searchCity, step8: "", stepResult8: searchQuarter });
      } else if (name === "step8") {
        // const searchQuarter = handleSearchQuarter(value);
        const searchQuarter = [...formData.stepResult8];
        setFormData({ ...formData, [name]: value, stepResult8: searchQuarter });
      } else {
        setFormData({ ...formData, [name]: value });
      }
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
    /* const n = 100;
    if (stepResult1.length > n) {
      stepResult1 = stepResult1.slice(0, n);
    } */
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
    /* const n = 100;
    if (stepResult7.length > n) {
      stepResult7 = stepResult7.slice(0, n);
    } */
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
    /* const n = 100;
    if (stepResult8.length > n) {
      stepResult8 = stepResult8.slice(0, n);
    } */
    return stepResult8;
  };

  const handleSearchQuarterByCity = (city) => {
    city = city.trim();
    var stepResult8 = [...formData.stepResult8];
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
          <a className="h6 font-weight-bold text-success" href="/">SOS Pharma</a>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDrug;
