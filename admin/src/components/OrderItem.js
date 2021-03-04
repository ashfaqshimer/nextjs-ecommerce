import React, { useState } from 'react';
import axios from 'axios';

export default function OrderItem({ order, handleDelete }) {
	const [status, setStatus] = useState(order.status);
	const handleChange = (evt) => {
		setStatus(evt.target.value);
	};
	const handleUpdate = (evt) => {
		axios.put(`/api/v1/order/${order._id}`, { status: status });
	};

	return (
		<>
			<tr>
				<td>{order._id}</td>
				<td>{order.amount}</td>
				<td>{order.createdAt || '21/9/2020'}</td>
				<td>{order.user._id}</td>
				<td>{order.user.name}</td>
				<td>
					<select class='form-control' value={status} onChange={handleChange}>
						<option value='paid'>paid</option>
						<option value='shipped'>shipped</option>
						<option value='delivered'>delivered</option>
					</select>
				</td>
				<td>
					<button class='btn btn-secondary' onClick={handleUpdate}>
						Update Status
					</button>
				</td>
				<td>
					<button className='btn btn-danger' onClick={handleDelete}>
						X
					</button>
				</td>
			</tr>
		</>
	);
}
