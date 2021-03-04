import cookie from 'js-cookie';

import { logout } from '../actions/auth';

export function handleLogin(token, user) {
	cookie.set('token', token);
	window.localStorage.setItem('user', JSON.stringify(user));
}

export function checkAuth() {
	if (process.browser) {
		if (window.localStorage.getItem('user')) {
			return JSON.parse(window.localStorage.getItem('user'));
		} else {
			return false;
		}
	}
}

export async function handleLogout() {
	cookie.remove('token');
	window.localStorage.removeItem('user');
	await logout();
}
