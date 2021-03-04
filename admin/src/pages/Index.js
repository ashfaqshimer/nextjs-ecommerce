import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Index.css';
import { Link } from 'react-router-dom';

export default function Index() {
	const handleClick = (evt) => {};
	return (
		<div className='fullpage'>
			<Form className='border border-dark rounded p-5'>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control type='email' placeholder='Enter email' />
				</Form.Group>

				<Form.Group controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Password' />
				</Form.Group>

				<Link className='option nav-link' to='/dashboard'>
					<Button block>LOGIN</Button>
				</Link>
			</Form>
		</div>
	);
}
