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
	const [selectedVehicle, setSelectedVehicle] = useState('');
	const [travelTime, setTravelTime] = useState(0);
	const [vehicleToPlanetMap, setVehicleToPlanetMap] = useState(() => {
		const _ = selectedPlanet.length === 6 ? JSON.parse(localStorage.getItem('selectedPlanet')) : selectedPlanet;
		console.log(`vehicleData ${JSON.stringify(vehicleData)}`);
		return _.map((data, idx) => ({
			...data,
			vehicleNamesArray: vehicleData.map((data) => ({
				name: data.name,
				imgName: data.imgName,
				distance: data.distance,
				speed: data.speed,
			})),
		}));
	});

	const calculateTimeTravel = (dropDownIndex) => {
		for (let overallData of vehicleToPlanetMap) {
			if (dropDownIndex.includes(vehicleToPlanetMap.indexOf(overallData))) {
				const distanceToPlanet = parseInt(overallData.distance);
				for (let vehicleData of overallData.vehicleNamesArray) {
					if (vehicleData.name === selectedVehicle) {
						if (distanceToPlanet > vehicleData.distance) {
							alert(`OOPS ${vehicleData.name} CANNOT TRAVEL TO ${overallData.planetname.toUpperCase()} `);
							break;
						} else {
							setTravelTime(Math.round(distanceToPlanet / parseInt(vehicleData.speed)));
						}
					}
				}
			}
		}
	};


	

	useEffect(() => {
		if (selectedVehicle.length > 0)  {
			calculateTimeTravel(dropDownIndex);
		} else {
			setTravelTime(0);
			setSelectedVehicle("")
		}
	}, [selectedVehicle]);



	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		setTravelTime(0);
		const dropDownSelIndex = parseInt(e.target.options[e.target.selectedIndex].dataset.index);
		const sortedVehicleNamesArray = vehicleToPlanetMap.map((data, idx) => {
			if (idx === dropDownSelIndex) {
				const { vehicleNamesArray } = data;
				const vehicleIndex = vehicleNamesArray.findIndex((_) => _.name === e.target.value);
				let _ = vehicleNamesArray.splice(vehicleIndex, 1);
				_ = _.concat(vehicleNamesArray);
				return { ...data, vehicleNamesArray: _ };
			} else {
				return { ...data };
			}
		});
		setSelectedVehicle(e.target.value);
		setVehicleToPlanetMap(sortedVehicleNamesArray);
		!dropDownIndex.includes(dropDownSelIndex) && setDropDownIndex([...dropDownIndex, dropDownSelIndex]);
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
							<SelectedPlanetImg margin="1vh 0vw" imgname={planetDetails.imgname} />
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
							{dropDownIndex.includes(idx) && travelTime > 0 && (
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
										{`Time Taken:- ${travelTime}`}
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
