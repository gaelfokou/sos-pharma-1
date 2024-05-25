'use client';

import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';
import Popper from 'popper.js';
import intlTelInput from 'intl-tel-input';
import moment from 'moment';

import { constants } from '../configs/Constants';
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
    }, 5000);

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
          <div class="d-flex justify-content-between">
            <a className="h6 font-weight-bold text-success" href="/">SOS Pharma</a>
            {orderData.length > 0 ? (<a className="h6 font-weight-bold text-success" href="/order-list">Historique ({`${orderData.length}`})</a>) : (<a className="h6 font-weight-bold text-success" href="/order-list">Historique</a>)}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 py-5">
          <div className="card">
            <div className="card-header text-center">
              <h6 className="card-title">Historique des commandes</h6>
            </div>
            <div className="card-body px-2 py-2">
              {orderData.length > 0 ? (<ul className="list-group list-group-flush">
                {orderData.slice().sort((a, b) => b.id - a.id).map((order, index1) => (
                  order.payment.status === constants.PATH_PENDING ? (
                    <li key={index1} className="list-group-item list-group-item-action">
                      <p>{`n° ${order.id}. ${moment(order.created_at).format('DD-MM-YYYY HH:mm:ss')}`}</p>
                      <p>{`${order.name} - ${order.phone.toString().substr(order.phone.toString().length - 9)}`}</p>
                      <p>{`${new Intl.NumberFormat('de-DE').format(order.payment.amount)} CFA - ${order.payment.reason !== null ? constants[order.payment.reason] : constants[order.payment.status]}`} <span className="spinner-grow spinner-grow-sm text-success" role="status" aria-hidden="true"></span></p>
                      <p><a class="text-success pull-right" data-toggle="collapse" href={`#collapseExample${index1 + 1}`} role="button" aria-expanded="false" aria-controls={`collapseExample${index1 + 1}`}>Voir les détails</a></p>
                    </li>
                  ) : (
                    order.payment.status === constants.PATH_SUCCESSFUL ? (
                      <li key={index1} className="list-group-item list-group-item-action">
                          <p>{`n° ${order.id}. ${moment(order.created_at).format('DD-MM-YYYY HH:mm:ss')}`}</p>
                          <p>{`${order.name} - ${order.phone.toString().substr(order.phone.toString().length - 9)}`}</p>
                        <p>{`${new Intl.NumberFormat('de-DE').format(order.payment.amount)} CFA - ${order.payment.reason !== null ? constants[order.payment.reason] : constants[order.payment.status]}`}</p>
                        <p><a class="text-success pull-right" data-toggle="collapse" href={`#collapseExample${index1 + 1}`} role="button" aria-expanded="false" aria-controls={`collapseExample${index1 + 1}`}>Voir les détails</a></p>
                      </li>
                    ) : (
                      <>
                        <li key={index1} className="list-group-item list-group-item-action">
                          <p>{`n° ${order.id}. ${moment(order.created_at).format('DD-MM-YYYY HH:mm:ss')}`}</p>
                          <p>{`${order.name} - ${order.phone.toString().substr(order.phone.toString().length - 9)}`}</p>
                          <p>{`${new Intl.NumberFormat('de-DE').format(order.payment.amount)} CFA - ${order.payment.reason !== null ? constants[order.payment.reason] : constants[order.payment.status]}`}</p>
                          <p><a class="text-success pull-right" data-toggle="collapse" href={`#collapseExample${index1 + 1}`} role="button" aria-expanded="false" aria-controls={`collapseExample${index1 + 1}`}>Voir les détails</a></p>
                        </li>
                        <div class="collapse" id={`collapseExample${index1 + 1}`}>
                          <ul class="list-group list-group-flush">
                            {order.orderdrugs.map((drug, index2) => (
                              <li key={index2} class="list-group-item">{`${drug.name} * ${drug.quantity} Qté(s)`}</li>
                            ))}
                            <li class="list-group-item"><p><a className="text-success pull-right" href="#">Réessayez de nouveau le paiement</a></p></li>
                          </ul>
                        </div>
                      </>
                    )
                  )
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
