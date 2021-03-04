import React from 'react';
import Container from 'react-bootstrap/Container';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Collections from './pages/Collections';
import Index from './pages/Index';
import Products from './pages/Products';

function App() {
	return (
		<div className='App'>
			<Container>
				<Switch>
					<Route exact path='/' render={() => <Index />} />
					<Route exact path='/dashboard' render={() => <Dashboard />} />
					<Route exact path='/collections' render={() => <Collections />} />
					<Route exact path='/products' render={() => <Products />} />
				</Switch>
			</Container>
		</div>
	);
}

export default App;
