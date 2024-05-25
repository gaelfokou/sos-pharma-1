'use client';

import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

const Sidebar = ({ handleClick }) => {
	const { auth, count, next, previous, results } = useSelector(state => state.order);

  useEffect(() => {
    const buttons = document.querySelectorAll('.btn-sidebar');
    buttons.forEach(button => {
      button.addEventListener('click', handleEvent);
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', handleEvent);
      });
    }
  }, []);

  const handleEvent = (event) => {
    event.preventDefault();

    const sidebar = document.querySelector('#sidebar');
    var button = event.target;
    if (button.classList.contains('close-sidebar')) {
      if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }
    } else if (button.classList.contains('show-sidebar')) {
      if (!sidebar.classList.contains('active')) {
        sidebar.classList.add('active');
      }
    } else {
      button = event.target.parentNode;
      if (button.classList.contains('close-sidebar')) {
        if (sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');
        }
      } else if (button.classList.contains('show-sidebar')) {
        if (!sidebar.classList.contains('active')) {
          sidebar.classList.add('active');
        }
      }
    }
  };

  return (
    <sidebar id="sidebar">
      <div className="container">
        <div className="row">
          <div className="col pt-5">
            <a class="btn btn-outline-dark text-body btn-sidebar show-sidebar" href="#">
              <i class="fa fa-reorder"></i>
            </a>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <span className="font-weight-bold">{`${auth !== null ? auth.email : ''}`}</span>
                <a className="text-body btn-sidebar close-sidebar" href="#">
                  <i class="fa fa-times"></i>
                </a>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {results.length > 0 ? (<a className="list-group-item list-group-item-action" data-action="order" href="#" onClick={handleClick}>Liste des commandes <span className="badge badge-pill badge-success">{`${results.length}`}</span></a>) : (<a className="list-group-item list-group-item-action" data-action="order" href="#" onClick={handleClick}>Liste des commandes</a>)}
                  <a className="list-group-item list-group-item-action" data-action="logout" href="#" onClick={handleClick}>Déconnexion</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </sidebar>
  );
};

export default Sidebar;