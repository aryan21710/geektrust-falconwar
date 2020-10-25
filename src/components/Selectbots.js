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
	const [dropDownIndex, setDropDownIndex] = useState(-1);
	const [selectedVehicle, setSelectedVehicle] = useState('');
	const [error,setError]=useState("");
	const [planetAndBotsData, setPlanetAndBotsData] = useState(() => {
		const filteredArrOfSelectedPlanet = selectedPlanet.length === 6 ? JSON.parse(localStorage.getItem('selectedPlanet')) : selectedPlanet;
		console.log(`vehicleData ${JSON.stringify(vehicleData)}`);
		return filteredArrOfSelectedPlanet.map((data, idx) => ({
			...data,
			vehicleNamesArray: vehicleData.map((data) => ({
				name: data.name,
				imgName: data.imgName,
				distance: data.distance,
				speed: data.speed,
				travelTime: 0
			})),
		}));
	});

	const calculateTimeTravel = (dropDownIndex) => {
		const updatedPlanetAndBotsData=[];
		const _=[];
		for (let overallData of planetAndBotsData) {
			if (planetAndBotsData.indexOf(overallData)===dropDownIndex) {
				const distanceToPlanet = parseInt(overallData.distance);
				for (let vehicleData of overallData.vehicleNamesArray) {
					if (vehicleData.name === selectedVehicle) {
						if (distanceToPlanet > vehicleData.distance) {
							_.push({...vehicleData});
							alert(`OOPS ${vehicleData.name} CANNOT TRAVEL TO ${overallData.planetname.toUpperCase()} `)
						} else {
							_.push({...vehicleData,travelTime: Math.round(distanceToPlanet / parseInt(vehicleData.speed))});
						}
					} else {
						_.push({...vehicleData});
					}
				}
				updatedPlanetAndBotsData.push({...overallData,vehicleNamesArray: _});
			} else {
				updatedPlanetAndBotsData.push(overallData)
			}
		}
		console.log(`updatedPlanetAndBotsData ${JSON.stringify(updatedPlanetAndBotsData,null,4)}`)
		setPlanetAndBotsData(updatedPlanetAndBotsData)
	};


	useEffect(() => {
		if (selectedVehicle.length > 0 && dropDownIndex > -1)  {
			calculateTimeTravel(dropDownIndex);
		} else {
			setSelectedVehicle("")
		}
	}, [selectedVehicle,dropDownIndex]);


	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		const dropDownSelIndex = parseInt(e.target.options[e.target.selectedIndex].dataset.index);
		const filteredPlanetAndBotsData = planetAndBotsData.map((data, idx) => {
			if (idx === dropDownSelIndex) {
				const { vehicleNamesArray } = data;
				const vehicleIndex = vehicleNamesArray.findIndex((vehicleData) => vehicleData.name === e.target.value);
				let sortedBotsAndPlanetData = vehicleNamesArray.splice(vehicleIndex, 1);
				sortedBotsAndPlanetData = sortedBotsAndPlanetData.concat(vehicleNamesArray);
				return { ...data, vehicleNamesArray: sortedBotsAndPlanetData };
			} else {
				return { ...data };
			}
		});
		setSelectedVehicle(e.target.value);
		setPlanetAndBotsData(filteredPlanetAndBotsData);
		setDropDownIndex(dropDownSelIndex);
	};

	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" width="100vw" flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Choose Space Vehicles to Invade the Planets.
				</Heading>
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="60vh">
					{planetAndBotsData.map(({planetname,imgname,vehicleNamesArray, distance}, idx) => (
						<BadgeWrapper justifyContent="flex-start" key={uuid()} height="60vh" flexDirection="column">
							<SelectedPlanetImg margin="1vh 0vw" imgname={imgname} />
							<Heading color="#FAD107" fontSize="1.2rem">
								{planetname}
							</Heading>
							<Heading
								color="#FAD107"
								fontSize="1rem"
							>{`DISTANCE ${distance} megamiles`}</Heading>
							<Select name="planetName" onChange={onSelectedVehicleIdx}>
								{dropDownIndex!==idx && vehicleNamesArray[0].travelTime === 0 && (
									<option key={uuid()} selected value="Choose A Space Vehicle">
										Choose A Space Vehicle
									</option>
								)}
								{vehicleNamesArray.map((bot) => (
									<option key={uuid()} data-index={idx} value={bot.name}>
										{bot.name}
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
			<CustomButton redirectPath="/selectbots" leftPos="0vh" width="15vw" TextForButton="Mission Find Falcone" />
		</SelectedPlanetWrapper>
	);
};

export default SelectBots;
