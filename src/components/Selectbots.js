import React, { useContext, useState, useEffect } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	BadgeWrapper,
	SelectedPlanetImg,
	Heading,
	Select,
	PlanetWrapper,
} from './common/StyledComponent';
import { CustomButton } from '../components/common/CustomButton';
import uuid from 'react-uuid';
import { PlanetDetailsContext } from '../context/appContext';
import { ThemeProvider } from 'styled-components';

const SelectBots = () => {
	const { selectedPlanet } = useContext(PlanetDetailsContext);
	const vehicleData = JSON.parse(localStorage.getItem('planetCfg'));

	const [isChanged, setIsChanged] = useState(false);

	const [vehicleToPlanetMap, setVehicleToPlanetMap] = useState(() => {
		const _ = selectedPlanet.length === 6 ? JSON.parse(localStorage.getItem('selectedPlanet')) : selectedPlanet;
		return _.map((data, idx) => ({
			...data,
			vehicleNamesArray: vehicleData.map((data) => data.name),
		}));
	});



	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		const dropDownIndex = parseInt(e.target.options[e.target.selectedIndex].dataset.index);
		const sortedVehicleNamesArray = vehicleToPlanetMap.map((data, idx) => {
			if (idx === dropDownIndex) {
				const { vehicleNamesArray } = data;
				let _ = vehicleNamesArray.splice(vehicleNamesArray.indexOf(e.target.value), 1);
				_ = _.concat(vehicleNamesArray);
				return { ...data, vehicleNamesArray: _ };
			} else {
				return data;
			}
		});

		setVehicleToPlanetMap(sortedVehicleNamesArray);
	};

	return (
		<SelectedPlanetWrapper justifyContent="center">
			<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
				Choose Space Vehicles to Invade the Planets.
			</Heading>
			<SolarSystemWrapper height="60vh" width="100vw" flexDirection="column">
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="25vh">
					{vehicleToPlanetMap.map((planetDetails, idx) => (
						<BadgeWrapper justifyContent="center" key={uuid()} height="30vh" flexDirection="column">
							<SelectedPlanetImg imgname={planetDetails.imgname} />
							<Heading color="#FAD107" fontSize="1.2rem">
								{planetDetails.planetname}
							</Heading>
							<Heading
								color="#FAD107"
								fontSize="1rem"
							>{`DISTANCE ${planetDetails.distance} megamiles`}</Heading>
							<Select name="planetName" onChange={onSelectedVehicleIdx}>
								<option key={uuid()} selected value="Choose A Space Vehicle">
									Choose A Space Vehicle
								</option>
								{planetDetails.vehicleNamesArray.map((bot) => (
									<option key={uuid()} data-index={idx} value={bot}>
										{bot}
									</option>
								))}
							</Select>
						</BadgeWrapper>
					))}
				</PlanetWrapper>
				<PlanetWrapper height="45vh" justifyContent="flex-start" flexDirection="row"></PlanetWrapper>
			</SolarSystemWrapper>
			<CustomButton redirectPath="/selectbots" leftPos="0vh" width="15vw" TextForButton="Mission Find Falcone" />
		</SelectedPlanetWrapper>
	);
};

export default SelectBots;
