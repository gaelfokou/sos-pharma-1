'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';
import Popper from 'popper.js';
import intlTelInput from 'intl-tel-input';
import moment from 'moment';

import logo from '../assets/images/logo-sos-pharma.png';
import { constants } from '../configs/Constants';
import { tokenCheck, orderRetrieve, orderPayment, orderCopy } from '../redux/Actions';

const OrderList = () => {
  const dispatch = useDispatch();
  const { token, orderData } = useSelector(state => state.order);
  const { isLoading } = useSelector(state => state.request);

  const propTokenCheck = (token, callback=null) => dispatch(tokenCheck(token, callback));
  const propOrderRetrieve = (token, data) => dispatch(orderRetrieve(token, data));
  const propOrderPayment = (token, data, callback=null) => dispatch(orderPayment(token, data, callback));
  const propOrderCopy = (token, data, callback=null) => dispatch(orderCopy(token, data, callback));

  const [toastAlert, setToastAlert] = useState(null);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    const toast = $('.toast');
    toast.on('shown.bs.toast', function (event) {
    });
    toast.on('hidden.bs.toast', function (event) {
    });
    setToastAlert(toast);

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
  }, [orderData]);

	const handleClick = (event) => {
		event.preventDefault();

		const name = event.target.attributes.getNamedItem('data-name');
		const data = event.target.attributes.getNamedItem('data-value');
		if (name !== null) {
			if (name.value === "payment") {
				const id = Number.parseInt(data.value);
				const index = orderData.findIndex((o) => o.id === id);
				if (index !== -1) {
					const data = orderData[index];
					propTokenCheck(token, (tokenData) => {
						propOrderPayment(tokenData, data, (isData) => {
              const toast = document.querySelector('.toast-body');
              if (isData.success) {
                toast.textContent = isData.message;
                toastAlert.toast('show');
              } else {
                toast.textContent = isData.message;
                toastAlert.toast('show');
              }
              return { type: '' };
            });
						return { type: '' };
					});
				}
      } else if (name.value === "copy") {
        const id = Number.parseInt(data.value);
        const index = orderData.findIndex((o) => o.id === id);
        if (index !== -1) {
          const data = orderData[index];
          propTokenCheck(token, (tokenData) => {
            propOrderCopy(tokenData, data, (isData) => {
              const toast = document.querySelector('.toast-body');
              if (isData.success) {
                toast.textContent = isData.message;
                toastAlert.toast('show');
              } else {
                toast.textContent = isData.message;
                toastAlert.toast('show');
              }
              return { type: '' };
            });
            return { type: '' };
          });
        }
      }
		}
	};

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
          <div className="d-flex justify-content-between">
            <a className="h6 font-weight-bold text-success" href="/">SOS Pharma</a>
            {orderData.length > 0 ? (<a className="h6 font-weight-bold text-success" href="/order-list">Historique ({`${orderData.length}`})</a>) : (<a className="h6 font-weight-bold text-success" href="/order-list">Historique</a>)}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 py-5">
          <div className="card order">
            <div className="card-header text-center">
              <h6 className="card-title">Historique des commandes</h6>
            </div>
            <div className="card-body px-2 py-2">
              {orderData.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {orderData.slice().sort((a, b) => b.id - a.id).map((order, index1) => (
                    order.payments[order.payments.length - 1].status === constants.PATH_PENDING ? (
                      <>
                        <li key={index1} className="list-group-item list-group-item-action">
                          <p>{`n° ${order.id}. ${moment(order.payments[order.payments.length - 1].created_at).format('DD-MM-YYYY HH:mm:ss')}`}</p>
                          <p>{`${order.name} - ${order.phone.toString().substr(order.phone.toString().length - 9)}`}</p>
                          <p><span>{`${new Intl.NumberFormat('de-DE').format(order.payments[order.payments.length - 1].amount)} CFA`}</span> - <span className="text-warning">{`${order.payments[order.payments.length - 1].reason !== null ? constants[order.payments[order.payments.length - 1].reason] : constants[order.payments[order.payments.length - 1].status]}`}</span> <span className="spinner-grow spinner-grow-sm text-success" role="status" aria-hidden="true"></span></p>
                          <p><a className="text-success pull-right" data-toggle="collapse" href={`#collapseExample${index1 + 1}`} role="button" aria-expanded="false" aria-controls={`collapseExample${index1 + 1}`}>Voir les détails</a></p>
                        </li>
                        <div className="collapse" id={`collapseExample${index1 + 1}`}>
                          <ul className="list-group list-group-flush">
                            {order.orderdrugs.map((drug, index2) => (
                              <li key={`${index1}${index2}`} className="list-group-item">
                                <p>{`${drug.name}`}</p>
                                <p>{`Qté(s) : ${drug.quantity}`}</p>
                                <p>{`Presc : ${drug.prescription}`}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      order.payments[order.payments.length - 1].status === constants.PATH_SUCCESSFUL ? (
                        <>
                          <li key={index1} className="list-group-item list-group-item-action">
                              <p>{`n° ${order.id}. ${moment(order.payments[order.payments.length - 1].created_at).format('DD-MM-YYYY HH:mm:ss')}`}</p>
                              <p>{`${order.name} - ${order.phone.toString().substr(order.phone.toString().length - 9)}`}</p>
                            <p><span>{`${new Intl.NumberFormat('de-DE').format(order.payments[order.payments.length - 1].amount)} CFA`}</span> - <span className="text-success">{`${order.payments[order.payments.length - 1].reason !== null ? constants[order.payments[order.payments.length - 1].reason] : constants[order.payments[order.payments.length - 1].status]}`}</span></p>
                            <p><a className="text-success pull-right" data-toggle="collapse" href={`#collapseExample${index1 + 1}`} role="button" aria-expanded="false" aria-controls={`collapseExample${index1 + 1}`}>Voir les détails</a></p>
                          </li>
                          <div className="collapse" id={`collapseExample${index1 + 1}`}>
                            <ul className="list-group list-group-flush">
                              {order.orderdrugs.map((drug, index2) => (
                                <li key={`${index1}${index2}`} className="list-group-item">
                                  <p>{`${drug.name}`}</p>
                                  <p>{`Qté(s) : ${drug.quantity}`}</p>
                                  <p>{`Presc : ${drug.prescription}`}</p>
                                </li>
                              ))}
                              {isLoading ? (<li className="list-group-item"><p><a className="text-success pull-right" href="#">Traitement en cours...</a></p></li>) : (<li className="list-group-item"><p><a className="text-success pull-right" data-name="copy" data-value={`${order.id}`} href="#" onClick={handleClick}>Payez de nouveau cette commande</a></p></li>)}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <li key={index1} className="list-group-item list-group-item-action">
                            <p>{`n° ${order.id}. ${moment(order.payments[order.payments.length - 1].created_at).format('DD-MM-YYYY HH:mm:ss')}`}</p>
                            <p>{`${order.name} - ${order.phone.toString().substr(order.phone.toString().length - 9)}`}</p>
                            <p><span>{`${new Intl.NumberFormat('de-DE').format(order.payments[order.payments.length - 1].amount)} CFA`}</span> - <span className="text-danger">{`${order.payments[order.payments.length - 1].reason !== null ? constants[order.payments[order.payments.length - 1].reason] : constants[order.payments[order.payments.length - 1].status]}`}</span></p>
                            <p><a className="text-success pull-right" data-toggle="collapse" href={`#collapseExample${index1 + 1}`} role="button" aria-expanded="false" aria-controls={`collapseExample${index1 + 1}`}>Voir les détails</a></p>
                          </li>
                          <div className="collapse" id={`collapseExample${index1 + 1}`}>
                            <ul className="list-group list-group-flush">
                              {order.orderdrugs.map((drug, index2) => (
                                <li key={`${index1}${index2}`} className="list-group-item">
                                  <p>{`${drug.name}`}</p>
                                  <p>{`Qté(s) : ${drug.quantity}`}</p>
                                  <p>{`Presc : ${drug.prescription}`}</p>
                                </li>
                              ))}
                              {isLoading ? (<li className="list-group-item"><p><a className="text-success pull-right" href="#">Traitement en cours...</a></p></li>) : (<li className="list-group-item"><p><a className="text-success pull-right" data-name="payment" data-value={`${order.id}`} href="#" onClick={handleClick}>Réessayez de nouveau le paiement</a></p></li>)}
                            </ul>
                          </div>
                        </>
                      )
                    )
                  ))}
                </ul>
              ) : (
                <ul className="list-group list-group-flush">
                  <li className="list-group-item list-group-item-action text-center">Pas de commandes disponibles...</li>
                </ul>
              )}
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

export default OrderList;
