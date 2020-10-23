import React, { useContext, useState } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	BadgeWrapper,
	SelectedPlanetImg,
	Heading,
	Select,
} from './common/StyledComponent';
import { PlanetImageArr } from '../customHooks/useDefineConstants';
import { CustomButton } from '../components/common/CustomButton';
import uuid from 'react-uuid';
import { PlanetDetailsContext } from '../context/appContext';

const SelectBots = () => {
	const [Planet1, Planet2, Planet3, Planet4] = PlanetImageArr;
	const { selectedPlanet } = useContext(PlanetDetailsContext);


	const botDetails = [
		{
			imgName: '',
			name: 'Choose Space Vehicle',
			distance: '',
		},
		{
			imgName: Planet1,
			name: 'SPACE-BOT',
			distance: '100megamiles',
		},
		{
			imgName: Planet2,
			name: 'SPACE-ROCKET',
			distance: '100megamiles',
		},
		{
			imgName: Planet3,
			name: 'SPACE-SHIP',
			distance: '100megamiles',
		},
		{
			imgName: Planet4,
			name: 'SPACE-SHUTTLE',
			distance: '100megamiles',
		},
	];

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
							{botDetails.map((bot, idx) => {
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
