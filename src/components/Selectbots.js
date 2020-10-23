import React, { useContext, useState } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	BadgeWrapper,
	SelectedPlanetImg,
	Heading,
	Select,
} from './common/StyledComponent';
import { CustomButton } from '../components/common/CustomButton';
import uuid from 'react-uuid';
import { PlanetDetailsContext } from '../context/appContext';

const SelectBots = () => {
	const { selectedPlanet, planetCfg  } = useContext(PlanetDetailsContext);
    const {vehicleData}=planetCfg

	return (
		<SelectedPlanetWrapper justifyContent="center">
			<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
				Choose Space Vehicles to Invade the Planets.
			</Heading>
			<SolarSystemWrapper height="70vh" width="100vw" flexDirection="row">
				{selectedPlanet.map((planetDetails) => (
					<BadgeWrapper key={uuid()} height="50vh" flexDirection="column">
						<SelectedPlanetImg imgname={planetDetails.imgname} />
						<Heading color="#FAD107" fontSize="1.2rem">
							{planetDetails.planetname}
						</Heading>
						<Heading color="#FAD107" fontSize="1rem">{`DISTANCE ${planetDetails.distance}`}</Heading>
						<Select
							name="planetName"
							value={''}
							// onChange={}
						>
							{vehicleData.map((bot, idx) => {
								return idx === 0 ? (
									<option key={uuid()} selected value="planetName">
										{bot.name}
									</option>
								) : (
									<option key={uuid()} value="planetName">
										{bot.name}
									</option>
								);
							})}
						</Select>
					</BadgeWrapper>
				))}
			</SolarSystemWrapper>
			<CustomButton redirectPath="/selectbots" leftPos="0vh" width="15vw" TextForButton="Mission Find Falcone" />
		</SelectedPlanetWrapper>
	);
};

export default SelectBots;
