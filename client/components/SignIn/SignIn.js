import { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import { Button, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { getCart } from '../../actions';
import { loginUser, oAuthLogin } from '../../actions/auth';
import { handleLogin } from '../../utils/auth';

import { useSession, signin, signout } from 'next-auth/client';

const SignIn = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({ email: '', password: '' });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = inputs;
		try {
			const response = await loginUser({ email, password });
			handleLogin(response.token, response.user);
			dispatch(getCart());
			setInputs({ email: '', password: '' });
			router.push('/shop');
		} catch (error) {
			console.log(error);
		}
	};

	const handleOAuth = async () => {
		try {
			const response = await oAuthLogin();
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	return (
		<div className='SignIn'>
			<h2 className='text-center'>I Already Have An Account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					name='email'
					type='email'
					handleChange={handleChange}
					value={inputs.email}
					label='email'
					required
				/>
				<FormInput
					name='password'
					type='password'
					handleChange={handleChange}
					value={inputs.password}
					label='password'
					required
				/>

				<Button fluid secondary size='large' animated type='submit'>
					<Button.Content visible>Sign In</Button.Content>
					<Button.Content hidden>
						<Icon name='sign in' />
					</Button.Content>
				</Button>
			</form>
			<Button
				className='mt-3'
				primary
				size='large'
				fluid
				animated
				onClick={signin}
			>
				<Button.Content visible>Sign In With Google</Button.Content>
				<Button.Content hidden>
					<Icon name='google' />
				</Button.Content>
			</Button>
			<style jsx>{`
				.SignIn {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				.title {
					margin: 10px 0;
				}
				.buttons {
					display: flex;
					justify-content: space-between;
				}
			`}</style>
		</div>
	);
};

export default SignIn;
