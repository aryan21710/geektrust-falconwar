import React, { useContext, useState, useEffect } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	BadgeWrapper,
	SelectedPlanetImg,
	Heading,
	Select,
	PlanetWrapper,
	ImageWrapper,
} from './common/StyledComponent';
import { CustomButton } from '../components/common/CustomButton';
import uuid from 'react-uuid';
import { PlanetDetailsContext } from '../context/appContext';

const SelectBots = () => {
	const { selectedPlanet } = useContext(PlanetDetailsContext);
	const vehicleData = JSON.parse(localStorage.getItem('planetCfg'));
	const [dropDownIndex, setDropDownIndex] = useState([]);
	const [vehicleToPlanetMap, setVehicleToPlanetMap] = useState(() => {
		const _ = selectedPlanet.length === 6 ? JSON.parse(localStorage.getItem('selectedPlanet')) : selectedPlanet;
		return _.map((data, idx) => ({
			...data,
			vehicleNamesArray: vehicleData.map((data) => ({
				name: data.name,
				imgName: data.imgName,
			})),
		}));
	});

	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		const dropDownSelIndex = parseInt(e.target.options[e.target.selectedIndex].dataset.index);
		const sortedVehicleNamesArray = vehicleToPlanetMap.map((data, idx) => {
			if (idx === dropDownSelIndex) {
				const { vehicleNamesArray } = data;
				const index = vehicleNamesArray.findIndex((_) => _.name === e.target.value);
				let _ = vehicleNamesArray.splice(index, 1);
				_ = _.concat(vehicleNamesArray);
				return { ...data, vehicleNamesArray: _ };
			} else {
				return data;
			}
		});
		setDropDownIndex([...dropDownIndex, dropDownSelIndex]);
		setVehicleToPlanetMap(sortedVehicleNamesArray);
	};

	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" width="100vw" flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Choose Space Vehicles to Invade the Planets.
				</Heading>
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="60vh">
					{vehicleToPlanetMap.map((planetDetails, idx) => (
						<BadgeWrapper justifyContent="flex-start" key={uuid()} height="60vh" flexDirection="column">
							<SelectedPlanetImg imgname={planetDetails.imgname} />
							<Heading color="#FAD107" fontSize="1.2rem">
								{planetDetails.planetname}
							</Heading>
							<Heading
								color="#FAD107"
								fontSize="1rem"
							>{`DISTANCE ${planetDetails.distance} megamiles`}</Heading>
							<Select name="planetName" onChange={onSelectedVehicleIdx}>
								{!dropDownIndex.includes(idx) && (
									<option key={uuid()} selected value="Choose A Space Vehicle">
										Choose A Space Vehicle
									</option>
								)}
								{planetDetails.vehicleNamesArray.map((bot) => (
									<option key={uuid()} data-index={idx} value={bot.name}>
										{bot.name}
									</option>
								))}
							</Select>
							{dropDownIndex.includes(idx) && (
								<React.Fragment>
									<ImageWrapper
										rotateBy="25deg"
										objectFit="contain"
										borderRad="0px"
										width="20vw"
										height="20vh"
										marginBottom="3vh"
										src={planetDetails.vehicleNamesArray[0].imgName}
									/>
									<Heading fontSize="1rem" color="#FAD107">
										{planetDetails.vehicleNamesArray[0].name}
									</Heading>
								</React.Fragment>
							)}
						</BadgeWrapper>
					))}
				</PlanetWrapper>
			</SolarSystemWrapper>
			<CustomButton redirectPath="/selectbots" leftPos="0vh" width="15vw" TextForButton="Mission Find Falcone" />
		</SelectedPlanetWrapper>
	);
};

export default SelectBots;

/*


{dropDownIndex.includes(idx) && (
	<React.Fragment>
		<SelectedPlanetImg imgname={planetDetails.vehicleNamesArray[idx].imgName} />
		<Heading color="#FAD107" fontSize="1.2rem">
			{planetDetails.vehicleNamesArray[idx].name}
		</Heading>
	</React.Fragment>
)}

*/
