import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import CreateProductForm from '../components/CreateProductForm';

export default function Products() {
	const [products, setProducts] = useState([]);
	const [show, setShow] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const loadProducts = async (pageToLoad = 1) => {
		const response = await axios.get(
			`/api/v1/products?page=${pageToLoad}&limit=10`
		);
		setTotalPages(Math.ceil(response.data.total / 10));

		setProducts(response.data.data);
	};

	const deleteProduct = async (ProductId) => {
		await axios.delete(`/api/v1/products/${ProductId}`);
		loadProducts();
	};

	const handleSave = async () => {
		setShow(false);
		loadProducts();
	};

	const handlePage = (index) => {
		setPage(index);
		loadProducts(index);
	};

	const paginationComponent = () => {
		const items = [];
		for (let index = 1; index <= totalPages; index++) {
			items.push(
				<Pagination.Item
					key={index}
					active={index === page}
					onClick={() => handlePage(index)}
				>
					{index}
				</Pagination.Item>
			);
		}
		return items;
	};

	useEffect(() => {
		loadProducts();
	}, []);
	return (
		<div>
			<Header />
			<div className='mt-5'>
				<h1 className='display-1 mb-3'>Products</h1>
				<Button variant='primary' size='large' onClick={handleShow}>
					Create Product
				</Button>
				<Table striped bordered hover className='mt-3'>
					<thead>
						<tr>
							<th>ID</th>
							<th>SKU</th>
							<th>Name</th>
							<th>Quantity Available</th>
							<th>Product Collection</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<ProductItem
								key={product._id}
								product={product}
								handleDelete={() => deleteProduct(product._id)}
								reload={loadProducts}
							/>
						))}
					</tbody>
				</Table>
				{totalPages > 1 && <Pagination>{paginationComponent()}</Pagination>}

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Update Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<CreateProductForm toggleShow={() => handleSave()} />
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
}
