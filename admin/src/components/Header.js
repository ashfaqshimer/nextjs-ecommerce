import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

export default function Header() {
	return (
		<div>
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand href='#home'>Royal Clothing Admin</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav '>
					<Nav className='inline ml-auto'>
						<Link className='option nav-link' to='/dashboard'>
							Dashboard
						</Link>
						<Link className='option nav-link' to='/collections'>
							Collections
						</Link>
						<Link className='option nav-link' to='/products'>
							Products
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
