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

const SelectBots = () => {
	const { selectedPlanet, planetCfg } = useContext(PlanetDetailsContext);
	const { vehicleData } = planetCfg;
	const [selectedVehicle, setSelectedVehicle] = useState('');
	const onSelectedVehicle = (e) => setSelectedVehicle(e.target.value);

	useEffect(() => {
		selectedVehicle.length > 0 && alert(`${selectedVehicle}`);
	}, [selectedVehicle]);

	return (
		<SelectedPlanetWrapper justifyContent="center">
			<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
				Choose Space Vehicles to Invade the Planets.
			</Heading>
			<SolarSystemWrapper height="60vh" width="100vw" flexDirection="column">
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="25vh">
					{selectedPlanet.map((planetDetails) => (
						<BadgeWrapper justifyContent="center" key={uuid()} height="30vh" flexDirection="column">
							<SelectedPlanetImg imgname={planetDetails.imgname} />
							<Heading color="#FAD107" fontSize="1.2rem">
								{planetDetails.planetname}
							</Heading>
							<Heading
								color="#FAD107"
								fontSize="1rem"
							>{`DISTANCE ${planetDetails.distance} megamiles`}</Heading>
							<Select name="planetName" value={selectedVehicle} onChange={onSelectedVehicle}>
								{vehicleData.map((bot) => {
									return bot.name === 'Choose A Space Vehicle' ? (
										<option key={uuid()} selected value={bot.name}>
											{bot.name}
										</option>
									) : (
										<option key={uuid()} value={bot.name}>
											{bot.name}
										</option>
									);
								})}
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
