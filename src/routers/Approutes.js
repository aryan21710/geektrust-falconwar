import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PlanetDetailsContext } from '../context/appContext';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import ErrorBoundary from '../components/common/ErrorBoundaryComp';
import { PlanetImageArr, SpaceBotImgArr } from '../customHooks/useDefineConstants';

import { StarGrid } from '../components/common/StarGrid';

// *** LAZY LOAD ALL COMPONENTS STARTS ***
const LandingPage = lazy(() => import('../components/LandingPage'));
const Header = lazy(() => import('../components/common/Header'));
const Footer = lazy(() => import('../components/common/Footer'));
const SelectPlanet = lazy(() => import('../components/SelectPlanet'));
const SelectBots = lazy(() => import('../components/SelectBots'));
const DisplayAllSpaceVehicles = lazy(() => import('../components/DisplayAllSpaceVehicles'));

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
		token: '',
		apiError: '',
		planetData: [],
		vehicleData: [],
	});
	const [selecPlanetCnt, setSelecPlanetCount] = useState(0);
	const [selectedPlanet, setSelectedPlanet] = useState(() =>
		PlanetImageArr.map((planetImg) => ({
			imgname: planetImg,
			planetname: '',
			distance: '',
			vehicleForInvasion: '',
			animated: false,
			index: -1,
		}))
	);

	const { token, vehicleData } = planetCfg;

	useEffect(() => {
		if (token.length > 0) {
			const updatedVehData = vehicleData.map((vehicleData, idx) => ({
				imgName: SpaceBotImgArr[idx],
				name: vehicleData.name.toUpperCase(),
				distance: vehicleData.distance,
			}));
			console.log(`vehicleData ${vehicleData}`);
			setPlanetCfg({ ...planetCfg, vehicleData: updatedVehData });
		}
	}, [token]);

	useEffect(() => {
		if (selecPlanetCnt === 4) {
			const filteredSelPlanetData = selectedPlanet.filter(
				(planetDetails) => planetDetails.planetname !== '' && planetDetails.distance !== ''
			);

			console.log(`filteredSelPlanetData ${filteredSelPlanetData}`);

			setSelectedPlanet(filteredSelPlanetData);
		}
	}, [selecPlanetCnt]);

	return (
		<DebugRouter>
			<Switch>
				<Suspense fallback={<div>Loading</div>}>
					<PlanetDetailsContext.Provider
						value={{
							planetCfg,
							setPlanetCfg,
							setSelectedPlanet,
							selectedPlanet,
							selecPlanetCnt,
							setSelecPlanetCount,
						}}
					>
						<React.Fragment>
							<aside className="starGridWrapper">
								<StarGrid />
							</aside>
							<Header />
							<Route path={`/`} exact={true} strict component={LandingPage} />
							<Route path={`/selectplanets`} exact={true} strict component={SelectPlanet} />
							<Route path={`/selectbots`} exact={true} strict component={SelectBots} />
							<Route
								path={`/displayallspacevehicles`}
								exact={true}
								strict
								component={DisplayAllSpaceVehicles}
							/>
							<Footer />
						</React.Fragment>
					</PlanetDetailsContext.Provider>
				</Suspense>
			</Switch>
		</DebugRouter>
	);
};

Approutes.propTypes = {};

export default Approutes;
