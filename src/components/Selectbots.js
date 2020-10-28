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
	const [dropDownIndex, setDropDownIndex] = useState(-1);
	const [selectedVehicle, setSelectedVehicle] = useState('');
	const [error, setError] = useState('');
	const [planetAndBotsData, setPlanetAndBotsData] = useState([]);

	useEffect(() => {
		setPlanetAndBotsData(populatePlanetAndBotsData());
	}, []);

	const populatePlanetAndBotsData = () => {
		const filteredArrOfSelectedPlanet =
			selectedPlanet.length === 6 ? JSON.parse(localStorage.getItem('selectedPlanet')) : selectedPlanet;
		const mydata = filteredArrOfSelectedPlanet.map((data, idx) => ({
			...data,
			vehicleNamesArray: JSON.parse(localStorage.getItem('planetCfg')).reduce((acc, data) => {
				return {
					...acc,
					[data.name]: {
						name: data.name,
						imgName: 'data.imgName',
						distance: data.distance,
						speed: data.speed,
						travelTime: 0,
						totalUnits: data.totalUnits,
					},
				};
			}, {}),
		}));
		console.log(`mydata ${JSON.stringify(mydata, null, 4)}`);
		return mydata;
	};

	useEffect(() => {
		if (selectedVehicle.length > 0 && dropDownIndex > -1) {
			calcTimeTravelAndBotsLeft(planetAndBotsData, dropDownIndex, selectedVehicle);
		} else {
			setSelectedVehicle('');
		}
	}, [selectedVehicle, dropDownIndex]);

	const calcTimeTravelAndBotsLeft = (planetAndBotsData) => {
		let temp={};
		const updatedPlanetAndBotsData = planetAndBotsData
			.map((overallData, idx) => {
				const { vehicleNamesArray } = overallData;
				const distanceToPlanet = parseInt(overallData.distance);
				if (idx === dropDownIndex) {
					for (let vehicleData in vehicleNamesArray) {
						if (vehicleNamesArray[vehicleData] === selectedVehicle) {
							if (distanceToPlanet > vehicleNamesArray[vehicleData].distance) {
								alert(
									`OOPS!! YOU CANNOT TRAVEL TO ${overallData.planetname} USING ${vehicleNamesArray[vehicleData]}`
								);
								temp[selectedVehicle]= { ...vehicleNamesArray[vehicleData] };
							} else {
								if (vehicleNamesArray[vehicleData].totalUnits === 0) {
									alert(
										`OOPS!! YOU RAN OUT OF ${vehicleNamesArray[vehicleData]}. PLEASE USE SOME OTHER BOT FOR INVASION.`
									);
									temp[selectedVehicle]= { ...vehicleNamesArray[vehicleData] };
								} else {
									temp[selectedVehicle]= {
										...vehicleNamesArray[vehicleData],
										travelTime: Math.round(distanceToPlanet / parseInt(vehicleNamesArray[vehicleData].speed)),
									};
								}
							}
						} else {
							temp[selectedVehicle]= { ...vehicleNamesArray[vehicleData] };
						}
					};
					return { ...overallData, vehicleNamesArray: temp };
				} else {
					return {
						...overallData,
					};
				}
				return temp
			})
			// .map((overallData, idx) => {
			// 	const { vehicleNamesArray } = overallData;
			// 	return {
			// 		...overallData,
			// 		vehicleNamesArray: Object.keys(vehicleNamesArray).map((vehicleData) => {
			// 			return {
			// 				...vehicleNamesArray[vehicleData],
			// 				totalUnits:
			// 					vehicleNamesArray[vehicleData].name === selectedVehicle && vehicleNamesArray[vehicleData].totalUnits > 0
			// 						? vehicleNamesArray[vehicleData].totalUnits - 1
			// 						: vehicleNamesArray[vehicleData].totalUnits,
			// 			};
			// 		}),
			// 	};
			// });
		console.log(`updatedPlanetAndBotsData ${JSON.stringify(updatedPlanetAndBotsData, null, 4)}`);
		setPlanetAndBotsData(updatedPlanetAndBotsData);
	};


	const test=(vehicleNamesArray)=>{
		for (let i in vehicleNamesArray) {
			console.log(`test ${vehicleNamesArray[i].name} ::: ${selectedVehicle}`)
			if (vehicleNamesArray[i].name === selectedVehicle) {
				console.log(`test ${vehicleNamesArray[i].imgName}`)
				return i
			};
		}
	}

	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		const dropDownSelIndex = parseInt(e.target.options[e.target.selectedIndex].dataset.index);
		setDropDownIndex(dropDownSelIndex);
		setSelectedVehicle(e.target.value);
	};

	const hasBotTravelled = (vehicleNamesArray) => {
		for (let i in vehicleNamesArray) {
			if (vehicleNamesArray[i].travelTime === 0) return true;
			return false;
		}
	};

	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" width="100vw" flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Choose Space Vehicles to Invade the Planets.
				</Heading>
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="60vh">
					{planetAndBotsData.map(({ planetname, imgname, vehicleNamesArray, distance }, idx) => (
						<BadgeWrapper justifyContent="flex-start" key={uuid()} height="60vh" flexDirection="column">
							<SelectedPlanetImg margin="1vh 0vw" imgname={imgname} />
							<Heading color="#FAD107" fontSize="1.2rem">
								{planetname}
							</Heading>
							<Heading color="#FAD107" fontSize="1rem">{`DISTANCE ${distance} megamiles`}</Heading>
							<Select name="planetName" onChange={onSelectedVehicleIdx}>
								{dropDownIndex !== idx && hasBotTravelled(vehicleNamesArray) && (
									<option key={uuid()} defaultValue="Choose A Space Vehicle">
										Choose A Space Vehicle
									</option>
								)}
								{Object.keys(vehicleNamesArray).map((bot) => (
									<option key={uuid()} data-index={idx} value={vehicleNamesArray[bot].name}>
										{vehicleNamesArray[bot].name}
									</option>
								))}
							</Select>
							{!hasBotTravelled(vehicleNamesArray) && (
								<React.Fragment>
									<ImageWrapper
										rotateBy="25deg"
										objectFit="contain"
										borderRad="0px"
										width="20vw"
										height="20vh"
										marginBottom="3vh"
										src={`${test(vehicleNamesArray).imgName}`}
									/>
									<Heading fontSize="1rem" color="#FAD107">
										{`Time Taken:- ${test(vehicleNamesArray)}`}
									</Heading>
									<Heading fontSize="1rem" color="#FAD107">
										{`${vehicleNamesArray.selectedVehicle} UNITS LEFT:- ${vehicleNamesArray.selectedVehicle.totalUnits}`}
									</Heading>
								</React.Fragment>
							)}
						</BadgeWrapper>
					))}
				</PlanetWrapper>
			</SolarSystemWrapper>
			<CustomButton redirectPath="/selectbots" leftpos="0vh" width="15vw" TextForButton="Mission Find Falcone" />
		</SelectedPlanetWrapper>
	);
};

export default SelectBots;
