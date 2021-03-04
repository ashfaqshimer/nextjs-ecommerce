import { PageTransition } from 'next-page-transitions';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; //styles of nprogress
import { Provider as AuthProvider } from 'next-auth/client';

import Loader from '../components/Loader/Loader';
import Layout from '../components/_App/Layout';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { useStore } from '../store';

// Loading indicator upon page load
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Set a timer for page transitions
const TIMEOUT = 400;

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);

	return (
		<>
			<Provider store={store}>
				<AuthProvider
					options={{ keepAlive: 0, clienMaxAge: 0 }}
					session={pageProps.session}
				>
					<Layout>
						<PageTransition
							timeout={TIMEOUT}
							classNames='page-transition'
							loadingComponent={<Loader />}
							loadingDelay={500}
							loadingTimeout={{
								enter: TIMEOUT,
								exit: 0,
							}}
							loadingClassNames='loading-indicator'
						>
							<Component {...pageProps} />
						</PageTransition>
					</Layout>
				</AuthProvider>
			</Provider>

			<style jsx global>{`
				.page-transition-enter {
					opacity: 0;
					transform: translate3d(0, 20px, 0);
				}
				.page-transition-enter-active {
					opacity: 1;
					transform: translate3d(0, 0, 0);
					transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
				}
				.page-transition-exit {
					opacity: 1;
				}
				.page-transition-exit-active {
					opacity: 0;
					transition: opacity ${TIMEOUT}ms;
				}
				.loading-indicator-appear,
				.loading-indicator-enter {
					opacity: 0;
				}
				.loading-indicator-appear-active,
				.loading-indicator-enter-active {
					opacity: 1;
					transition: opacity ${TIMEOUT}ms;
				}
			`}</style>
		</>
	);
}

export default MyApp;
