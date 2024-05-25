'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import $ from 'jquery';
import Popper from 'popper.js';

import { authLogout } from '../redux/Actions';

import Sidebar from "../components/Sidebar";
import Dashboard1 from "../components/Dashboard1";

const Dashboard = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state.order);

  const propAuthLogout = (callback=null) => dispatch(authLogout(callback));

  const [page, setPage] = useState('order');

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    const action = event.target.attributes.getNamedItem('data-action');
    if (action !== null) {
      const button = document.querySelector('.btn-sidebar.close-sidebar');
      button.click();
      if (action.value === "logout") {
        propAuthLogout(() => {
          push('/');
          return { type: '' };
        });
      } else {
        setPage(action.value);
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-column">
        <Sidebar
          handleClick={handleClick}
        />
      </div>
      <div className="d-flex flex-column flex-grow-1">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5">
              {page === "order" && (<Dashboard1 />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
