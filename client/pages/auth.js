import SignIn from '../components/SignIn/SignIn';
import SignUp from '../components/SignUp/SignUp';

const AuthenticationPage = () => {
	return (
		<div className='AuthenticationPage'>
			<div className='row justify-content-around'>
				<SignIn className='col' />
				<SignUp className='col' />
			</div>
			<style jsx>{`
				.AuthenticationPage {
					margin: 30px auto;
					height: 76vh;
				}
			`}</style>
		</div>
	);
};

export default AuthenticationPage;
