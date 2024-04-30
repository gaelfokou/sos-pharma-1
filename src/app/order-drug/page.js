'use client';

import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo-sos-pharma.png';
import drug from '../assets/data/drugs.json';
import geolocation from '../assets/data/geolocation.json';
import $ from 'jquery';
import Popper from 'popper.js';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import Step5 from '../components/Step5';
import Step6 from '../components/Step6';
import Step7 from '../components/Step7';
import Step8 from '../components/Step8';
import Step9 from '../components/Step9';
import Step10 from '../components/Step10';

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
    step2: "",
    stepValue2: [],
    stepResult2: [],
    step3: "",
    stepValue3: [],
    step4: "",
    stepValue4: [],
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
      if (page === 4) {
        if (formData.stepValue3.length > formData.stepValue4.length) {
          setFormData({ ...formData, ['step'+page]: input.value, ['stepValue'+page]: [...formData.stepValue4, input.value] });
        } else {
          var stepValue4 = [...formData.stepValue4];
          stepValue4[stepValue4.length - 1] = input.value;
          setFormData({ ...formData, ['step'+page]: input.value, ['stepValue'+page]: [...stepValue4] });
        }
      } else {
        setFormData({ ...formData, [input.name]: input.value });
      }
    } else {
      const data = event.target.parentNode.attributes.getNamedItem('data-value');
      if (data !== null) {
        if (page === 2) {
          const value = data.value.split(' : ')[0];
          if (formData.stepValue2.length > formData.stepValue3.length) {
            var stepValue2 = [...formData.stepValue2];
            const index = drugData.findLastIndex((d) => d.name.toLowerCase() === value.toLowerCase());
            if (index !== -1) {
              stepValue2[stepValue2.length - 1] = drugData[index];
            }
            setFormData({ ...formData, ['step'+page]: data.value, ['stepValue'+page]: [...stepValue2], ['stepResult'+page]: [] });
          } else {
            var stepValue2 = [...formData.stepValue2];
            const index = drugData.findLastIndex((d) => d.name.toLowerCase() === value.toLowerCase());
            if (index !== -1) {
              stepValue2 = [...stepValue2, drugData[index]];
            }
            setFormData({ ...formData, ['step'+page]: data.value, ['stepValue'+page]: [...stepValue2], ['stepResult'+page]: [] });
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
      if (page === 5) {
        if (formData.step5 === "Oui") {
          setFormData({ ...formData, step2: "", stepResult2: [], step3: "", step4: "", step5: "" });
          setPage(2);
        } else {
          handleNext(event);
        }
      } else {
        const submitter = event.nativeEvent.submitter.name;
        if (submitter === "cancel") {
          setFormData({ ...formData, step1: "", step2: "", stepValue2: [], stepResult2: [], step3: "", stepValue3: [], step4: "", stepValue4: [], step5: "", step10: "" });
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
      var search = handleSearchDrug(value);
      setFormData({ ...formData, [name]: value, stepResult2: search });
    } else if (page === 3) {
      if (formData.stepValue2.length > formData.stepValue3.length) {
        setFormData({ ...formData, ['step'+page]: value, ['stepValue'+page]: [...formData.stepValue3, parseInt(value)] });
      } else {
        var stepValue3 = [...formData.stepValue3];
        stepValue3[stepValue3.length - 1] = parseInt(value);
        setFormData({ ...formData, ['step'+page]: value, ['stepValue'+page]: [...stepValue3] });
      }
    } else if (page === 8) {
      var search = handleSearchCity(value);
      setFormData({ ...formData, [name]: value, stepResult8: search });
    } else if (page === 9) {
      var search = handleSearchQuarter(value);
      setFormData({ ...formData, [name]: value, stepResult9: search });
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
    var stepResult2 = [...formData.stepResult2];
    if (drug === "") {
      stepResult2 = [];
    } else if (drug.length >= 3) {
      stepResult2 = [];
      stepResult2 = drugData.filter((d) => d.name.toLowerCase().includes(drug.toLowerCase()));
    }
    const n = 10;
    if (stepResult2.length > n) {
      stepResult2 = stepResult2.slice(0, n);
    }
    return stepResult2;
  };

  const handleSearchCity = (city) => {
    city = city.trim();
    var stepResult8 = [...formData.stepResult8];
    if (city === "") {
      stepResult8 = [];
    } else if (city.length >= 3) {
      stepResult8 = [];
      stepResult8 = cityData.filter((c) => c.name.toLowerCase().includes(city.toLowerCase()));
    }
    const n = 10;
    if (stepResult8.length > n) {
      stepResult8 = stepResult8.slice(0, n);
    }
    return stepResult8;
  };

  const handleSearchQuarter = (quarter) => {
    quarter = quarter.trim();
    var stepResult9 = [...formData.stepResult9];
    if (quarter === "") {
      stepResult9 = [];
    } else if (quarter.length >= 3) {
      stepResult9 = [];
      const index = quarterData.findLastIndex((q) => q.key.toLowerCase() === formData.step8.toLowerCase());
      if (index !== -1) {
        stepResult9 = quarterData[index].value.filter((q) => q.name.toLowerCase().includes(quarter.toLowerCase()));
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
          <a className="h6 text-success" href="/">SOS Pharma</a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 pt-5">
          <div className="nav flex-column nav-pills" id="pills-tab" role="tablist" aria-orientation="vertical">
            <button type="button" className={`nav-link ${page === 0 ? '' : 'd-none'}`} id="pills-1-tab" data-toggle="pill" data-target="#pills-1" role="tab" aria-controls="pills-1" aria-selected="false">Étape 1 / 9</button>
            <button type="button" className={`nav-link ${page === 2 ? '' : 'd-none'}`} id="pills-2-tab" data-toggle="pill" data-target="#pills-2" role="tab" aria-controls="pills-2" aria-selected="false">Étape 1 / 9</button>
            <button type="button" className={`nav-link ${page === 3 ? '' : 'd-none'}`} id="pills-3-tab" data-toggle="pill" data-target="#pills-3" role="tab" aria-controls="pills-3" aria-selected="false">Étape 2 / 9</button>
            <button type="button" className={`nav-link ${page === 4 ? '' : 'd-none'}`} id="pills-4-tab" data-toggle="pill" data-target="#pills-4" role="tab" aria-controls="pills-4" aria-selected="false">Étape 3 / 9</button>
            <button type="button" className={`nav-link ${page === 5 ? '' : 'd-none'}`} id="pills-5-tab" data-toggle="pill" data-target="#pills-5" role="tab" aria-controls="pills-5" aria-selected="false">Étape 4 / 9</button>
            <button type="button" className={`nav-link ${page === 6 ? '' : 'd-none'}`} id="pills-6-tab" data-toggle="pill" data-target="#pills-6" role="tab" aria-controls="pills-6" aria-selected="false">Étape 5 / 9</button>
            <button type="button" className={`nav-link ${page === 7 ? '' : 'd-none'}`} id="pills-7-tab" data-toggle="pill" data-target="#pills-7" role="tab" aria-controls="pills-7" aria-selected="false">Étape 6 / 9</button>
            <button type="button" className={`nav-link ${page === 8 ? '' : 'd-none'}`} id="pills-8-tab" data-toggle="pill" data-target="#pills-8" role="tab" aria-controls="pills-8" aria-selected="false">Étape 7 / 9</button>
            <button type="button" className={`nav-link ${page === 9 ? '' : 'd-none'}`} id="pills-9-tab" data-toggle="pill" data-target="#pills-9" role="tab" aria-controls="pills-9" aria-selected="false">Étape 8 / 9</button>
            <button type="button" className={`nav-link ${page === 10 ? '' : 'd-none'}`} id="pills-10-tab" data-toggle="pill" data-target="#pills-10" role="tab" aria-controls="pills-10" aria-selected="false">Étape 9 / 9</button>
          </div>
        </div>
        <div className={`col-md-12 ${page === 1 ? 'pb-5' : 'py-5'}`}>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane slide" id="pills-1" role="tabpanel" aria-labelledby="pills-1-tab">
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
            <div className="tab-pane slide" id="pills-2" role="tabpanel" aria-labelledby="pills-2-tab">
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
            <div className="tab-pane slide" id="pills-3" role="tabpanel" aria-labelledby="pills-3-tab">
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
            <div className="tab-pane slide" id="pills-4" role="tabpanel" aria-labelledby="pills-4-tab">
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
            <div className="tab-pane slide" id="pills-5" role="tabpanel" aria-labelledby="pills-5-tab">
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
            <div className="tab-pane slide" id="pills-6" role="tabpanel" aria-labelledby="pills-6-tab">
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
            <div className="tab-pane slide" id="pills-7" role="tabpanel" aria-labelledby="pills-7-tab">
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
            <div className="tab-pane slide" id="pills-8" role="tabpanel" aria-labelledby="pills-8-tab">
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
            <div className="tab-pane slide" id="pills-9" role="tabpanel" aria-labelledby="pills-9-tab">
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
            <div className="tab-pane slide" id="pills-10" role="tabpanel" aria-labelledby="pills-10-tab">
              <Step10
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
