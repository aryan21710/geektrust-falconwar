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
	const [planetAndBotsData, setPlanetAndBotsData] = useState([]);

	useEffect(() => {
		setPlanetAndBotsData(populatePlanetAndBotsData());
	}, []);

	const populatePlanetAndBotsData = () => {
		const filteredArrOfSelectedPlanet =
			selectedPlanet.length === 6 ? JSON.parse(localStorage.getItem('selectedPlanet')) : selectedPlanet;
		return filteredArrOfSelectedPlanet.map((data, idx) => ({
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
	};

	useEffect(() => {
		if (selectedVehicle.length > 0 && dropDownIndex > -1) {
			calcTimeTravelAndBotsLeft(planetAndBotsData, dropDownIndex, selectedVehicle);
		} else {
			setSelectedVehicle('');
		}
	}, [selectedVehicle, dropDownIndex]);

	const calcTimeTravelAndBotsLeft = (planetAndBotsData) => {
		let error=false;
		const updatedPlanetAndBotsData = planetAndBotsData
			.map((overallData, idx) => {
				if (idx === dropDownIndex) {
					const { vehicleNamesArray } = overallData;
					const vehicleIndex = vehicleNamesArray.findIndex(
						(vehicleData) => vehicleData.name === selectedVehicle
					);
					let sortedBotsAndPlanetData = vehicleNamesArray.splice(vehicleIndex, 1);
					sortedBotsAndPlanetData = sortedBotsAndPlanetData.concat(vehicleNamesArray);
					return { ...overallData, vehicleNamesArray: sortedBotsAndPlanetData };
				} else {
					return { ...overallData };
				}
			}).map((overallData, idx) => {
				const { vehicleNamesArray } = overallData;
				const distanceToPlanet = parseInt(overallData.distance);
				if (idx === dropDownIndex) {
					const temp = vehicleNamesArray.map((vehicleData, idx) => {
						if (vehicleData.name === selectedVehicle) {
							if (distanceToPlanet > vehicleData.distance) {
								alert(
									`OOPS!! YOU CANNOT TRAVEL TO ${overallData.planetname} USING ${vehicleData.name}`
								);
								error=true;
								return { ...vehicleData };
							} else {
								if (vehicleData.totalUnits === 0) {
									error=true;
									alert(
										`OOPS!! YOU RAN OUT OF ${vehicleData.name}. PLEASE USE SOME OTHER BOT FOR INVASION.`
									);
									return {...vehicleData}
								} else {
									return {
										...vehicleData,
										travelTime: Math.round(distanceToPlanet / parseInt(vehicleData.speed)),
									};
								}
							}
						} else {
							return { ...vehicleData };
						}
					});
					return { ...overallData, vehicleNamesArray: temp };
				} else {
					return {
						...overallData,
					};
				}
			}).map((overallData) => {
				const { vehicleNamesArray } = overallData;
				return {...overallData, vehicleNamesArray: vehicleNamesArray.map((vehicleData) => {
					return {
						...vehicleData,
						totalUnits: vehicleData.name === selectedVehicle && vehicleData.totalUnits > 0 && !error
						? vehicleData.totalUnits - 1
						: vehicleData.totalUnits
					}
				})}
			})
		setPlanetAndBotsData(updatedPlanetAndBotsData);
	};

	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		const dropDownSelIndex = parseInt(e.target.options[e.target.selectedIndex].dataset.index);
		setDropDownIndex(dropDownSelIndex);
		setSelectedVehicle(e.target.value);
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
								{dropDownIndex !== idx && vehicleNamesArray[0].travelTime === 0 && (
									<option key={uuid()} defaultValue="Choose A Space Vehicle">
										Choose A Space Vehicle
									</option>
								)}
								{vehicleNamesArray.map((bot) => (
									<option key={uuid()} data-index={idx} value={bot.name}>
										{`${bot.name} (${bot.totalUnits})`} 
									</option>
								))}
							</Select>
							{vehicleNamesArray[0].travelTime > 0 && (
								<React.Fragment>
									<ImageWrapper
										rotateBy="25deg"
										objectFit="contain"
										borderRad="0px"
										width="20vw"
										height="20vh"
										marginBottom="3vh"
										src={vehicleNamesArray[0].imgName}
									/>
									<Heading fontSize="1rem" color="#FAD107">
										{`Time Taken:- ${vehicleNamesArray[0].travelTime}`}
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
