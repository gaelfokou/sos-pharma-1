'use client';

import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/images/logo-sos-pharma.png';
import drug from './assets/data/drugs.json';
import geolocation from './assets/data/geolocation.json';
import $ from 'jquery';
import Popper from 'popper.js';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import Step7 from './components/Step7';
import Step8 from './components/Step8';
import Step9 from './components/Step9';
import Step10 from './components/Step10';

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

const App = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    step1: "",
    step2: "",
    stepResult2: [],
    step3: "",
    step4: "",
    step5: "",
    step6: "",
    step7: "",
    step8: "",
    stepResult8: [],
    step9: "",
    stepResult9: [],
    step10: "",
  });
  const [drugData, setDrugData] = useState(drugs);
  const [cityData, setCityData] = useState(cities);
  const [quarterData, setQuarterData] = useState(quarters);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    const button = $('#pills-tab button[data-target="#pills-'+page+'"]');
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

    const target = parseInt(event.target.getAttribute('data-target').replace('#pills-',''));
    setPage(target);
  };

  const handleInput = (event) => {
    event.preventDefault();

    const input = event.target.parentNode.querySelector('input[type="radio"]');
    if (input !== null) {
      input.checked = true;
      const button = document.querySelector('#pills-tab button[data-target="#pills-'+page+'"]');
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
      setFormData({ ...formData, [input.name]: input.value });
    } else {
      const pag = event.target.parentNode.attributes.getNamedItem('data-page');
      const val = event.target.parentNode.attributes.getNamedItem('data-value');
      if (pag !== null) {
        setFormData({ ...formData, [pag.value]: val.value });
      }
    }
  };

  const handleNext = (event) => {
    event.preventDefault();

    setPage((page) => {
      if (page < 10) {
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

    const button = document.querySelector('#pills-tab button[data-target="#pills-'+page+'"]');
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
      handleNext(event);
    }
    form.classList.add('was-validated');
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { form, name, value } = event.target;
    const button = document.querySelector('#pills-tab button[data-target="#pills-'+page+'"]');
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

    if (page === 2) {
      var stepResult2 = handleSearchDrug(value);
      setFormData({ ...formData, [name]: value, stepResult2 });
    } else if (page === 8) {
      var stepResult8 = handleSearchCity(value);
      setFormData({ ...formData, [name]: value, stepResult8 });
    } else if (page === 9) {
      var stepResult9 = handleSearchQuarter(value);
      setFormData({ ...formData, [name]: value, stepResult9 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSearchDrug = (drug) => {
    drug = drug.trim();
    var stepResult2 = formData.stepResult2;
    if (drug === "") {
      stepResult2 = [];
    } else if (drug.length >= 3) {
      stepResult2 = [];
      stepResult2 = drugData.filter((m) => m.name.toLowerCase().includes(drug.toLowerCase()));
    }
    const n = 10;
    if (stepResult2.length > n) {
      stepResult2 = stepResult2.slice(0, n);
    }
    return stepResult2;
  };

  const handleSearchCity = (city) => {
    city = city.trim();
    var stepResult8 = formData.stepResult8;
    if (city === "") {
      stepResult8 = [];
    } else if (city.length >= 3) {
      stepResult8 = [];
      stepResult8 = cityData.filter((m) => m.name.toLowerCase().includes(city.toLowerCase()));
    }
    const n = 10;
    if (stepResult8.length > n) {
      stepResult8 = stepResult8.slice(0, n);
    }
    return stepResult8;
  };

  const handleSearchQuarter = (quarter) => {
    quarter = quarter.trim();
    var stepResult9 = formData.stepResult9;
    if (quarter === "") {
      stepResult9 = [];
    } else if (quarter.length >= 3) {
      stepResult9 = [];
      const index = quarterData.findLastIndex((m) => m.key.toLowerCase() === formData.step8.toLowerCase());
      if (index !== -1) {
        stepResult9 = quarterData[index].value.filter((m) => m.name.toLowerCase().includes(quarter.toLowerCase()));
      }
    }
    const n = 10;
    if (stepResult9.length > n) {
      stepResult9 = stepResult9.slice(0, n);
    }
    return stepResult9;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col pt-5">
          <h6 className="text-success">SOS Pharma</h6>
          <h2 className="mt-4">Livraison de médicaments à domicile</h2>
          <p className="mt-4 text-muted">Commandez vos médicaments en toute confiance et recevez-les rapidement chez vous avec SOS Pharma. Fini les longues files d'attente à la pharmacie! Avec SOS Pharma, commandez vos médicaments en ligne et recevez-les directement chez vous, en toute confiance et rapidement.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 pt-5">
          <div className="nav flex-column nav-pills" id="pills-tab" role="tablist" aria-orientation="vertical">
            <button className={`nav-link ${page === 1 ? '' : 'd-none'}`} id="pills-1-tab" data-toggle="pill" data-target="#pills-1" type="button" role="tab" aria-controls="pills-1" aria-selected="false">Step 1 / 10</button>
            <button className={`nav-link ${page === 2 ? '' : 'd-none'}`} id="pills-2-tab" data-toggle="pill" data-target="#pills-2" type="button" role="tab" aria-controls="pills-2" aria-selected="false">Step 2 / 10</button>
            <button className={`nav-link ${page === 3 ? '' : 'd-none'}`} id="pills-3-tab" data-toggle="pill" data-target="#pills-3" type="button" role="tab" aria-controls="pills-3" aria-selected="false">Step 3 / 10</button>
            <button className={`nav-link ${page === 4 ? '' : 'd-none'}`} id="pills-4-tab" data-toggle="pill" data-target="#pills-4" type="button" role="tab" aria-controls="pills-4" aria-selected="false">Step 4 / 10</button>
            <button className={`nav-link ${page === 5 ? '' : 'd-none'}`} id="pills-5-tab" data-toggle="pill" data-target="#pills-5" type="button" role="tab" aria-controls="pills-5" aria-selected="false">Step 5 / 10</button>
            <button className={`nav-link ${page === 6 ? '' : 'd-none'}`} id="pills-6-tab" data-toggle="pill" data-target="#pills-6" type="button" role="tab" aria-controls="pills-6" aria-selected="false">Step 6 / 10</button>
            <button className={`nav-link ${page === 7 ? '' : 'd-none'}`} id="pills-7-tab" data-toggle="pill" data-target="#pills-7" type="button" role="tab" aria-controls="pills-7" aria-selected="false">Step 7 / 10</button>
            <button className={`nav-link ${page === 8 ? '' : 'd-none'}`} id="pills-8-tab" data-toggle="pill" data-target="#pills-8" type="button" role="tab" aria-controls="pills-8" aria-selected="false">Step 8 / 10</button>
            <button className={`nav-link ${page === 9 ? '' : 'd-none'}`} id="pills-9-tab" data-toggle="pill" data-target="#pills-9" type="button" role="tab" aria-controls="pills-9" aria-selected="false">Step 9 / 10</button>
            <button className={`nav-link ${page === 10 ? '' : 'd-none'}`} id="pills-10-tab" data-toggle="pill" data-target="#pills-10" type="button" role="tab" aria-controls="pills-10" aria-selected="false">Step 10 / 10</button>
          </div>
        </div>
        <div className="col-md-12 py-5">
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane slide" id="pills-1" role="tabpanel" aria-labelledby="pills-1-tab">
              <Step1
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
            <div className="tab-pane slide" id="pills-2" role="tabpanel" aria-labelledby="pills-2-tab">
              <Step2
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
            <div className="tab-pane slide" id="pills-3" role="tabpanel" aria-labelledby="pills-3-tab">
              <Step3
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
            <div className="tab-pane slide" id="pills-4" role="tabpanel" aria-labelledby="pills-4-tab">
              <Step4
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
            <div className="tab-pane slide" id="pills-5" role="tabpanel" aria-labelledby="pills-5-tab">
              <Step5
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
            <div className="tab-pane slide" id="pills-6" role="tabpanel" aria-labelledby="pills-6-tab">
              <Step6
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
            <div className="tab-pane slide" id="pills-7" role="tabpanel" aria-labelledby="pills-7-tab">
              <Step7
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
            <div className="tab-pane slide" id="pills-8" role="tabpanel" aria-labelledby="pills-8-tab">
              <Step8
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
            <div className="tab-pane slide" id="pills-9" role="tabpanel" aria-labelledby="pills-9-tab">
              <Step9
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
            <div className="tab-pane slide" id="pills-10" role="tabpanel" aria-labelledby="pills-10-tab">
              <Step10
                page={page}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
