import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import OrderItem from '../components/OrderItem';

export default function Dashboard() {
	const [orders, setOrders] = useState([]);

	const loadOrders = async () => {
		const response = await axios.get('/api/v1/order');
		setOrders(response.data.data);
	};

	const deleteOrder = async (orderId) => {
		await axios.delete(`/api/v1/order/${orderId}`);
		loadOrders();
	};

	useEffect(() => {
		loadOrders();
	}, []);

	return (
		<div>
			<Header />
			<div className='mt-5'>
				<h1 className='display-1'>Orders</h1>
				<Table striped bordered hover className='mt-3'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Order Amount</th>
							<th>Created At</th>
							<th>User Id</th>
							<th>User Name</th>
							<th>Status</th>
							<th>Update Status</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<OrderItem
								key={order._id}
								order={order}
								handleDelete={() => deleteOrder(order._id)}
							/>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
}
