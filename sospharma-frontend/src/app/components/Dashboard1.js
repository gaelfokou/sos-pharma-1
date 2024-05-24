'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import $ from 'jquery';
import Popper from 'popper.js';
import moment from 'moment';
import DataTable from 'react-data-table-component';

import { constants } from '../configs/Constants';
import { orderList } from '../redux/Actions';

const Dashboard1 = () => {
	const { push } = useRouter();
	const dispatch = useDispatch();
	const { auth, count, next, previous, results } = useSelector(state => state.order);

	const propOrderList = (token, search='', page=1, page_size=Number.parseInt(constants.PAGE_SIZE)) => dispatch(orderList(token, search, page, page_size));

	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(Number.parseInt(constants.PAGE_SIZE));

	useEffect(() => {
	  require('bootstrap/dist/js/bootstrap.bundle.min.js');
	  propOrderList(auth, search, page, pageSize);
	}, [search, page, pageSize]);

	const columns = [
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
			name: 'Médicaments',
			selector: row => row.orderdrugs,
			format: (row, index) => row.orderdrugs.map((drug, index) => `${drug.name}\nQté : ${drug.quantity}\nPresc : ${drug.prescription}`).join(',\n---\n'),
		},
		{
			name: 'Montant',
			selector: row => row.payment,
			format: (row, index) => `${new Intl.NumberFormat('de-DE').format(row.payment.amount)} CFA`,
		},
		{
			name: 'Statut',
			selector: row => row.payment,
			format: (row, index) => row.payment.reason !== null ? constants[row.payment.reason] : constants[row.payment.status],
		},
		{
			name: 'Date',
			selector: row => row.created_at,
			format: (row, index) => moment(row.created_at).format('DD-MM-YYYY HH:mm:ss'),
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

		if (searchValue === "") {
			setSearch(searchValue);
		} else if (searchValue.length >= 3) {
			setSearch(searchValue);
		}
	};

	return (
		<>
			<div class="d-flex justify-content-end mt-4">
				<form className="form-inline">
					<div className="input-group input-group-sm">
						<input
							type="search"
							className="form-control"
							placeholder="Recherche..."
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