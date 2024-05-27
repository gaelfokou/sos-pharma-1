'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import $ from 'jquery';
import Popper from 'popper.js';
import moment from 'moment';
import DataTable from 'react-data-table-component';

import { constants } from '../configs/Constants';
import { setSearchData, orderDelivery, orderList } from '../redux/Actions';

const Dashboard1 = () => {
	const { push } = useRouter();
	const dispatch = useDispatch();
	const { auth, searchData, count, next, previous, results } = useSelector(state => state.order);

	const propSetSearchData = (search) => dispatch(setSearchData(search));
	const propOrderDelivery = (token, data, callback=null) => dispatch(orderDelivery(token, data, callback));
	const propOrderList = (token, search='', page=1, page_size=Number.parseInt(constants.PAGE_SIZE)) => dispatch(orderList(token, search, page, page_size));

	const [search, setSearch] = useState(searchData);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(Number.parseInt(constants.PAGE_SIZE));

	useEffect(() => {
	  require('bootstrap/dist/js/bootstrap.bundle.min.js');

		propSetSearchData(search);
		if (search === "") {
			propOrderList(auth, search, page, pageSize);
		} else if (search.length >= 3) {
			propOrderList(auth, search, page, pageSize);
		}
	}, [search, page, pageSize]);

	const handleClick = (event) => {
		event.preventDefault();

		const name = event.target.attributes.getNamedItem('data-name');
		const data = event.target.attributes.getNamedItem('data-value');
		if (name !== null) {
			if (name.value === "delivery") {
				const id = Number.parseInt(data.value);
				const index = results.findIndex((o) => o.id === id);
				if (index !== -1) {
					const data = results[index];
					propOrderDelivery(auth, data, () => {
						propOrderList(auth, search, page, pageSize);
					});
				}
			}
		}
	};
	
	const columns = [
		{
			name: 'ID',
			selector: row => row.id,
			format: (row, index) => `n° ${row.id}.`,
		},
		{
			name: 'Nom',
			selector: row => row.name,
		},
		{
			name: 'Téléphone',
			selector: row => row.phone,
			format: (row, index) => row.phone.toString().substr(row.phone.toString().length - 9),
		},
		{
			name: 'Lieu',
			selector: row => row.city,
			format: (row, index) => `${row.city} - ${row.quarter}`,
		},
		{
			name: 'Détails',
			selector: row => row.orderdrugs,
			format: (row, index) => row.orderdrugs.map((drug, index) => `${drug.name}\nQté(s) : ${drug.quantity}\nPresc : ${drug.prescription}`).join(',\n---\n'),
		},
		{
			name: 'Coût (CFA)',
			selector: row => row.payments,
			format: (row, index) => `${new Intl.NumberFormat('de-DE').format(row.payments[row.payments.length - 1].amount)} CFA`,
		},
		{
			name: 'Statut',
			selector: row => row.payments,
			format: (row, index) => row.payments[row.payments.length - 1].reason !== null ? constants[row.payments[row.payments.length - 1].reason] : constants[row.payments[row.payments.length - 1].status],
		},
		{
			name: 'Date',
			selector: row => row.created_at,
			format: (row, index) => moment(row.created_at).format('DD-MM-YYYY HH:mm:ss'),
		},
		{
			name: '#',
			selector: row => row.delivery,
			cell: (row, index, column, id) => row.payments[row.payments.length - 1].status === constants.PATH_SUCCESSFUL ? (row.delivery === 'Oui' ? 'Livraison effectuée' : (<a className="btn-outline-dark text-body btn-delivery" data-name="delivery" data-value={`${row.id}`} href="#" onClick={handleClick}>Confirmez la livraison</a>)) : '---'
		},
	];

	const paginationComponentOptions = {
		rowsPerPageText: 'Lignes par page :',
		rangeSeparatorText: 'sur',
	};
	const handlePageChange = page => {
		setPage(page);
	};

	const handlePerRowsChange = (newPerPage, page) => {
		setPageSize(newPerPage);
	};

	const handleSearch = (event) => {
		event.preventDefault();

		const { value } = event.target;
		const searchValue = value.trim();
		setSearch(searchValue);
	};

	return (
		<>
			<div className="d-flex justify-content-end mt-4">
				<form className="form-inline">
					<div className="input-group input-group-sm">
						<input
							type="search"
							className="form-control"
							placeholder="Recherche..."
							value={search}
							onChange={handleSearch}
						/>
						<div className="input-group-append">
							<div className="input-group-text">@</div>
						</div>
					</div>
				</form>
			</div>
			<DataTable
				title="Liste des commandes"
				columns={columns}
				data={results}
				noDataComponent="Il n'y a pas de commandes à afficher..."
				pagination
				paginationComponentOptions={paginationComponentOptions}
				paginationServer
				paginationTotalRows={count}
				onChangeRowsPerPage={handlePerRowsChange}
				onChangePage={handlePageChange}
			/>
		</>
	);
};

export default Dashboard1;