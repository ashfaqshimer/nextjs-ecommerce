import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import CartIcon from '../CartIcon/CartIcon';
import CartDropdown from '../CartDropdown/CartDropdown';

import { handleLogout } from '../../utils/auth';

import { useDispatch, useSelector } from 'react-redux';

import { checkAuth } from '../../utils/auth';
import { toggleCart } from '../../actions';
import { useSession, signin, signout } from 'next-auth/client';

const Header = () => {
	const [session, loading] = useSession();
	const router = useRouter();
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.cart.showCart);

	// const [showCart, setShowCart] = useState(false);

	const handleSignout = async () => {
		if (session) {
			signout();
		} else {
			handleLogout();
		}
		router.push('/');
	};

	const authStatus = () => {
		return checkAuth() || session;
	};

	return (
		<Navbar className='Navigation' sticky='top' bg='light' expand='md'>
			<Link href='/'>
				<a>
					<Navbar.Brand>
						<Image src='/crown.svg' />
						<span className='brandName'>Royal Clothing</span>
					</Navbar.Brand>
				</a>
			</Link>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto options'>
					<Link href='/shop'>
						<a className='option nav-link'>SHOP</a>
					</Link>
					<Link href='/contact'>
						<a className='option nav-link'>CONTACT</a>
					</Link>
					{authStatus() ? (
						<div className='option nav-link' onClick={handleSignout}>
							SIGN OUT
						</div>
					) : (
						<Link href='/auth'>
							<a className='option nav-link'>SIGN IN</a>
						</Link>
					)}
					{authStatus() && (
						<div onClick={() => dispatch(toggleCart())}>
							<CartIcon />
						</div>
					)}
				</Nav>
				{showCart && <CartDropdown />}
			</Navbar.Collapse>

			<style jsx>{`
				.Navigation {
					margin-bottom: 25px;
				}
				.brandName {
					text-transform: uppercase;
					padding: 0 1rem;
				}
				.options {
				}
				.option {
					padding: 10px 15px;
					cursor: pointer;
				}
			`}</style>
		</Navbar>
	);
};

export default Header;
