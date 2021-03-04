import React, { useState } from 'react';
import { useRouter } from 'next/router';

import FormInput from '../FormInput/FormInput';
import { Button, Icon } from 'semantic-ui-react';

import { createUser } from '../../actions/auth';
import { handleLogin } from '../../utils/auth';

const SignUp = () => {
	const router = useRouter();

	const [formInputs, setformInputs] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setformInputs({ ...formInputs, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { displayName, email, password, confirmPassword } = formInputs;

		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		try {
			const payload = { ...formInputs };
			delete payload.displayName;

			payload.name = displayName;

			const response = await createUser(payload);
			handleLogin(response.token, response.user);
			router.push('/shop');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='SignUp'>
			<h2 className='title'>I do not have an account</h2>
			<span>Sign up with your email and password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput
					type='text'
					name='displayName'
					value={formInputs.displayName}
					onChange={handleChange}
					label='Display Name'
					required
				/>
				<FormInput
					type='email'
					name='email'
					value={formInputs.email}
					onChange={handleChange}
					label='Email'
					required
				/>
				<FormInput
					type='password'
					name='password'
					value={formInputs.password}
					onChange={handleChange}
					label='Password'
					required
				/>
				<FormInput
					type='password'
					name='confirmPassword'
					value={formInputs.confirmPassword}
					onChange={handleChange}
					label='Confirm Password'
					required
				/>
				<Button secondary size='large' animated fluid onClick={handleSubmit}>
					<Button.Content visible>Sign Up</Button.Content>
					<Button.Content hidden>
						<Icon name='signup' />
					</Button.Content>
				</Button>
			</form>

			<style jsx>{`
				.SignUp {
					display: flex;
					flex-direction: column;
				}
				.title {
					margin: 10px 0;
				}
			`}</style>
		</div>
	);
};

export default SignUp;
