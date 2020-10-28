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
	TestWrapper,
} from './common/StyledComponent';
import { CustomButton } from '../components/common/CustomButton';
import uuid from 'react-uuid';
import { PlanetDetailsContext } from '../context/appContext';

const SelectBots = () => {
	const { selectedPlanet } = useContext(PlanetDetailsContext);
	const [dropDownIndex, setDropDownIndex] = useState([]);
	const [selectedVehicle, setSelectedVehicle] = useState('');
	const [error, setError] = useState('');
	const [planetsData, setPlanetsData] = useState(() => {
		return JSON.parse(localStorage.getItem('selectedPlanet')).map((data) => ({
			...data,
			vehicleNamesArray: JSON.parse(localStorage.getItem('planetCfg')).map((data) => ({
				name: data.name,
				imgName: data.imgName,
				distance: data.distance,
				speed: data.speed,
				travelTime: 0,
				totalUnits: data.totalUnits,
			})),
		}));
	});
	const [botsData, setBotsData] = useState(() => {
		return JSON.parse(localStorage.getItem('planetCfg')).map((data) => ({
			name: data.name,
			distance: data.distance,
			speed: data.speed,
			travelTime: 0,
			totalUnits: data.totalUnits,
			imgName: data.imgName,
		}));
	});

	useEffect(() => {
		if (selectedVehicle.length > 0 && dropDownIndex.length > 0) {
			calcTimeTravelAndBotsLeft();
		} else {
			setSelectedVehicle('');
		}
	}, [selectedVehicle, dropDownIndex]);
	useEffect(() => {
		// updatePlanetDataWithBotsData();
	}, [botsData]);

	const calcTimeTravelAndBotsLeft = () => {
		const updatedBotsData = [];
		const _ = [];
		const a=[];
		planetsData.forEach((planetData, idx) => {
			if (dropDownIndex.includes(idx)) {
				const distanceToPlanet = parseInt(planetData.distance);
				botsData.forEach((botData) => {
					if (botData.name === selectedVehicle && distanceToPlanet <= botData.distance) {
						_.push(planetData.planetname);
						updatedBotsData.push({
							...botData,
							totalUnits: botData.totalUnits > 0 ? botData.totalUnits - 1 : botData.totalUnits,
							travelTime: Math.round(distanceToPlanet / parseInt(botData.speed)),
							canTravelTo: _,
						})
					} 
				});
			}			 
		});

	

		const botIndex = updatedBotsData.findIndex((botData) => botData.name === selectedVehicle);
		let sortedBotsData = updatedBotsData.splice(botIndex, 1);
		sortedBotsData = sortedBotsData.concat(updatedBotsData);
		setBotsData(sortedBotsData);
	};

	// const updatePlanetDataWithBotsData = () => {
	// 	const _ = planetsData.map((planetData, idx) => {
	// 		const { vehicleNamesArray } = planetData;
	// 		const distanceToPlanet = parseInt(planetData.distance);
	// 		if (idx === dropDownIndex) {
	// 			const temp = vehicleNamesArray.map((vehicleData, idx) => {
	// 				if (vehicleData.name===selectedVehicle) {
	// 					if (distanceToPlanet > vehicleData.distance) {

	// 					} else {
	// 						return {
	// 							...vehicleData,
	// 							totalUnits: vehicleData.totalUnits > 0 ? vehicleData.totalUnits - 1 : vehicleData.totalUnits,
	// 							travelTime: Math.round(distanceToPlanet / parseInt(vehicleData.speed)),
	// 						};
	// 					}
	// 				}

	// 			});
	// 		}
	// 	});
	// 	setPlanetsData(_);
	// };

	// const calcTimeTravelAndBotsLeft = (botsData) => {
	// 	const updatedBotsData = botsData
	// 		.map((botData, idx) => {
	// 			const distanceToPlanet = parseInt(botData.distance);
	// 			if (botsData.name===selectedVehicle) {
	// return {
	// 									...vehicleData,
	// 									totalUnits:
	// 										vehicleData.name === selectedVehicle && vehicleData.totalUnits > 0
	// 											? vehicleData.totalUnits - 1
	// 											: vehicleData.totalUnits,
	// 								};
	// }
	// 			if (idx === dropDownIndex) {
	// 				const temp = vehicleNamesArray.map((vehicleData, idx) => {
	// 					if (vehicleData.name === selectedVehicle) {
	// 						if (distanceToPlanet > vehicleData.distance) {
	// 							alert(
	// 								`OOPS!! YOU CANNOT TRAVEL TO ${botData.planetname} USING ${vehicleData.name}`
	// 							);
	// 							return { ...vehicleData };
	// 						} else {
	// 							if (vehicleData.totalUnits === 0) {
	// 								alert(
	// 									`OOPS!! YOU RAN OUT OF ${vehicleData.name}. PLEASE USE SOME OTHER BOT FOR INVASION.`
	// 								);
	// 								return { ...vehicleData };
	// 							} else {
	// 								return {
	// 									...vehicleData,
	// 									travelTime: Math.round(distanceToPlanet / parseInt(vehicleData.speed)),
	// 								};
	// 							}
	// 						}
	// 					} else {
	// 						return { ...vehicleData };
	// 					}
	// 				});
	// 				return { ...botData, vehicleNamesArray: temp };
	// 			} else {
	// 				return {
	// 					...botData,
	// 				};
	// 			}
	// 		})
	// 		.map((overallData, idx) => {
	// 			const { vehicleNamesArray } = overallData;
	// 			const distanceToPlanet = parseInt(overallData.distance);

	// 			return {
	// 				...overallData,
	// 				vehicleNamesArray: vehicleNamesArray.map((vehicleData) => {
	// 					if (idx === dropDownIndex) {
	// 						if (vehicleData.name === selectedVehicle) {
	// 							if (distanceToPlanet > vehicleData.distance) {
	// 								return {
	// 									...vehicleData,
	// 									totalUnits: vehicleData.totalUnits,
	// 								};
	// 							} else {
	// 								return {
	// 									...vehicleData,
	// 									totalUnits:
	// 										vehicleData.name === selectedVehicle && vehicleData.totalUnits > 0
	// 											? vehicleData.totalUnits - 1
	// 											: vehicleData.totalUnits,
	// 								};
	// 							}
	// 						} else {
	// 							return {
	// 								...vehicleData,
	// 								totalUnits: vehicleData.totalUnits,
	// 							};
	// 						}
	// 					} else {
	// 						if (vehicleData.name === selectedVehicle) {
	// 							return {
	// 								...vehicleData,
	// 								totalUnits:
	// 									vehicleData.name === selectedVehicle && vehicleData.totalUnits > 0
	// 										? vehicleData.totalUnits - 1
	// 										: vehicleData.totalUnits,
	// 							};
	// 						} else {
	// 							return {
	// 								...vehicleData,
	// 								totalUnits: vehicleData.totalUnits,
	// 							};
	// 						}
	// 					}
	// 				}),
	// 			};
	// 		});
	// 	console.log(`updatedPlanetAndBotsData ${JSON.stringify(updatedPlanetAndBotsData, null, 4)}`);
	// 	// setPlanetAndBotsData(updatedPlanetAndBotsData);
	// };

	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		const dropDownSelIndex = parseInt(e.target.options[e.target.selectedIndex].dataset.index);
		setDropDownIndex([...dropDownIndex, dropDownSelIndex]);
		setSelectedVehicle(e.target.value);
	};

	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" width="100vw" flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Choose Space Vehicles to Invade the Planets.
				</Heading>
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="30vh">
					{planetsData.map(({ planetname, imgname, distance }, idx) => (
						<BadgeWrapper justifyContent="flex-start" key={uuid()} height="30vh" flexDirection="column">
							<SelectedPlanetImg margin="1vh 0vw" imgname={imgname} />
							<Heading color="#FAD107" fontSize="1.2rem">
								{planetname}
							</Heading>
							<Heading color="#FAD107" fontSize="1rem">{`DISTANCE ${distance} megamiles`}</Heading>
							<Select name="planetName" onChange={onSelectedVehicleIdx}>
								{!dropDownIndex.includes(idx) && (
									<option key={uuid()} defaultValue="Choose A Space Vehicle">
										Choose A Space Vehicle
									</option>
								)}
								{botsData.map((bot) => (
									<option key={uuid()} data-index={idx} value={bot.name}>
										{`${bot.name} (${bot.totalUnits})`}
									</option>
								))}
							</Select>
						</BadgeWrapper>
					))}
				</PlanetWrapper>
				<PlanetWrapper flexDirection="row" height="35vh">
					{planetsData.map((planetData, idx) => (
						<BadgeWrapper key={uuid()} height="35vh" flexDirection="row">
							{dropDownIndex.includes(idx) &&
								botsData.map((bot, botIndex) => {
									return (
										bot.travelTime > 0 && (
											<TestWrapper key={uuid()}>
												<ImageWrapper
													rotateBy="25deg"
													objectFit="contain"
													borderRad="0px"
													width="20vw"
													height="20vh"
													marginBottom="3vh"
													src={bot.imgName}
												/>
												<Heading fontSize="1rem" color="#FAD107">
													{`Time Taken:- ${bot.travelTime}`}
												</Heading>
											</TestWrapper>
										)
									);
								})}
						</BadgeWrapper>
					))}
				</PlanetWrapper>
			</SolarSystemWrapper>
			<CustomButton redirectPath="/selectbots" leftpos="0vh" width="15vw" TextForButton="Mission Find Falcone" />
		</SelectedPlanetWrapper>
	);
};

export default SelectBots;
