import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PlanetDetailsContext } from '../context/appContext';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import ErrorBoundary from '../components/common/ErrorBoundaryComp';

// *** LAZY LOAD ALL COMPONENTS STARTS ***
const LandingPage = lazy(() => import('../components/LandingPage'));
const Header = lazy(() => import('../components/common/Header'));
const Footer = lazy(() => import('../components/common/Footer'));
const SelectPlanet = lazy(() => import('../components/SelectPlanet'));
const SelectBot = lazy(() => import('../components/SelectBot'));

class DebugRouter extends Router {
	constructor(props) {
		super(props);
		console.log('initial history is: ', JSON.stringify(this.history, null, 2));
		this.history.listen((location, action) => {
			console.log(`The current URL is ${location.pathname}`);
			console.log(
				`The last navigation action was ${action} with state as ${location.state}`,
				JSON.stringify(this.history, null, 2)
			);
		});
	}
}

const Approutes = () => {
	const [planetCfg, setPlanetCfg] = useState({
		token: "",
		apiError: "",
	});

	const {token}=planetCfg;

	useEffect(()=>{
		token.length > 0 && console.log(`API TOKEN ${token}`)
	},[token])

	return (
		<DebugRouter>
			<Switch>
				<Suspense fallback={<div>Loading</div>}>
					<PlanetDetailsContext.Provider value={{ planetCfg, setPlanetCfg }}>
						<Header />
						<Route path={`/`} exact={true} strict component={LandingPage} />
						<Route path={`/selectplanets`} exact={true} strict component={SelectPlanet} />
						<Route path={`/selectbots`} exact={true} strict component={SelectBot} />
						<Footer />
					</PlanetDetailsContext.Provider>
				</Suspense>
			</Switch>
		</DebugRouter>
	);
};

Approutes.propTypes = {};

export default Approutes;
