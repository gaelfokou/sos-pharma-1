'use client';

import React, { useState, useEffect, useRef } from 'react';

import logo from '../assets/images/logo-sos-pharma.png';
import $ from 'jquery';
import Popper from 'popper.js';
import intlTelInput from 'intl-tel-input';
import moment from 'moment';

import { constants } from '../configs/Constants';

import { useDispatch, useSelector } from 'react-redux';
import { tokenCheck, orderRetrieve } from '../redux/Actions';

const OrderList = () => {
  const dispatch = useDispatch();
  const { token, orderData } = useSelector(state => state.order);

  const propTokenCheck = (token, callback=null) => dispatch(tokenCheck(token, callback));
  const propOrderRetrieve = (token, data) => dispatch(orderRetrieve(token, data));

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    const interval = setInterval(() => {
      propTokenCheck(token, (tokenData) => {
        propOrderRetrieve(tokenData, orderData);
        return { type: '' };
      });
    }, 10000);

    const buttons = document.querySelectorAll('.list-group-item');
    buttons.forEach(button => {
      button.addEventListener('click', handleInput);
    });

    return () => {
      clearInterval(interval);
      buttons.forEach(button => {
        button.removeEventListener('click', handleInput);
      });
    }
  }, []);

  const handleInput = (event) => {
    event.preventDefault();

    const buttons = event.target.parentNode.querySelectorAll('.list-group-item');
    buttons.forEach(button => {
      if (button.classList.contains('active')) {
        button.classList.remove('active');
      }
    });
    if (!event.target.classList.contains('active')) {
      event.target.classList.add('active');
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
              <h6 className="card-title">Commandes</h6>
            </div>
            <div className="card-body px-2 py-2">
              {orderData.length > 0 ? (<ul className="list-group list-group-flush">
                {orderData.reverse().map((order, index) => (
                  <li key={index} className="list-group-item list-group-item-action">{`${index+1}. ${moment(order.created_at).format('DD-MM-YYYY HH:mm:ss')} - ${new Intl.NumberFormat('de-DE').format(order.payment.amount)} CFA - ${order.payment.reason !== null ? constants[order.payment.reason] : constants[order.payment.status]}`}</li>
                ))}
              </ul>) : (<ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-action">Pas de commandes disponibles...</li>
              </ul>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
