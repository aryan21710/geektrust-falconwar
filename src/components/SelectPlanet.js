import React, { useState, useContext, useEffect } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	PlanetWrapper,
	SelectedPlanet,
	SelectedPlanetImg,
	SolarSystemImage,
	Heading,
	Planet,
	AnimatedWrapper,
	UnAnimatedWrapper,
	StaticWrapper,
	AnimatedMiniJet,
	AnimatedJetWrapper,
} from './common/StyledComponent';
import uuid from 'react-uuid';
import { useSpring } from 'react-spring';
import { useFetchDataFromBackend } from '../customHooks/useFetchDataFromBackend';
import { PlanetDetailsContext } from '../context/appContext';
import { useHistory } from 'react-router';
import { createPlanetCordToDisplay } from '../common/util.js';
import { PlanetImageArr, MinijetImage } from '../customHooks/useDefineConstants';

const SelectPlanet = () => {
	const { planetCfg, setPlanetCfg, selectedPlanet, setSelectedPlanet, setSelecPlanetCount } = useContext(
		PlanetDetailsContext
	);
	const history = useHistory();
	useFetchDataFromBackend(planetCfg, setPlanetCfg);
	const { Minijet } = MinijetImage;
	const { planetData } = planetCfg;
	const [count, setCount] = useState(0);
	const [updatedPlanetData, setUpdatedPlanetData] = useState([]);
	const jetAnimatedProp = useSpring({
		transform: count === 4 ? 'translateX(104vw)' : 'translateX(0vw)',
		delay: 700,
		config: { mass: 1, tension: 280, friction: 50 },
	});

	useEffect(() => {
		planetData.length > 0 && setUpdatedPlanetData([...createPlanetCordToDisplay(planetData, PlanetImageArr)]);
	}, [planetData]);

	const [planetindex, setPlanetIndex] = useState(-1);
	const [imgname, setImgname] = useState('');
	const [planetname, setPlanetName] = useState('');
	const [distance, setDistance] = useState(0);

	const updateSelecPlanetData = () => {
		if (planetindex > -1 && count <= 4) {
			const updatedSelectedPlanet = selectedPlanet.map((planetData, idx) => {
				if (idx === count - 1) {
					return {
						animated: true,
						imgname,
						index: count - 1,
						planetname,
						distance,
					};
				} else if (planetData.animated && idx !== count - 1) {
					return {
						animated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
					};
				} else {
					return {
						animated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
					};
				}
			});
			setSelectedPlanet(updatedSelectedPlanet);
		} else {
			setSelectedPlanet([]);
			setCount(0);
			setSelecPlanetCount(0);
		}
	};

	useEffect(() => {
		planetindex > -1 && updateSelecPlanetData();
	}, [planetindex]);

	useEffect(() => {
		if (count === 0) {
			setPlanetIndex('');
			setImgname('');
			setDistance('');
			setPlanetName('');
			setSelectedPlanet(
				Array(6)
					.fill('')
					.map(() => ({
						animated: false,
						imgname: '',
						index: -1,
						planetname: '',
						distance: '',
					}))
			);
		} else if (count === 4) {
			setSelecPlanetCount(count);
		}
	}, [count]);

	const isPlanetAlreadySelected = (planetname) =>
		selectedPlanet.some((planetData) => planetData.planetname === planetname);

	const animateSelectedPlanet = (e) => {
		const { planetname, planetindex, imgname, distance } = e.target.dataset;
		if (isPlanetAlreadySelected(planetname)) {
			alert('PLANET ALREADY SELECTED.. PLEASE SELECT SOME OTHER PLANET');
		} else {
			setCount(count + 1);
			setPlanetIndex(planetindex);
			setImgname(imgname);
			setDistance(distance);
			setPlanetName(planetname);
		}
	};


	const conditionForAnimation = (_) => _.index >= 0;

	const moveToDisplayVehiclePage = () => history.push(`/displayallspacevehicles`);

	return (
		<React.Fragment>
			<SelectedPlanetWrapper justifyContent="space-evenly">
				<AnimatedJetWrapper style={jetAnimatedProp}>
					<Heading color="#FAD107" fontSize="1rem">
						Select Space Vehicle
					</Heading>
					<AnimatedMiniJet onClick={moveToDisplayVehiclePage} src={Minijet} />
				</AnimatedJetWrapper>
				<SolarSystemWrapper height="45vh">
					<Heading fontFamily="Avenir" fontSize="1.2rem" color="#FAD107">
						King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets -
						DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor. <b>Choose 4 planets you’d like to Invade.</b>
					</Heading>
					<SolarSystemImage>
						{updatedPlanetData.map((_, idx) => {
							return (
								<Planet
									key={uuid()}
									onClick={animateSelectedPlanet}
									toppos={_.topPos}
									leftpos={_.leftpos}
									data-imgname={_.imgName}
									data-planetname={_.planetname}
									data-distance={_.distance}
									data-planetindex={idx}
									src={_.imgName}
								/>
							);
						})}
					</SolarSystemImage>
				</SolarSystemWrapper>
				<PlanetWrapper>
					<SelectedPlanet>
						{selectedPlanet.map((_, idx) => {
							if (conditionForAnimation(_) && _.animated) {
								return (
									<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
										<AnimatedWrapper>
											<Heading fontSize="1.3rem">{`Selected Planet - ${idx + 1}`}</Heading>
											<SelectedPlanetImg imgname={_.imgname} />
											<Heading color="#FAD107" fontSize="1.2rem">
												{_.planetname}
											</Heading>
											<Heading
												color="#FAD107"
												fontSize="1rem"
											>{`DISTANCE ${_.distance} megamiles`}</Heading>
										</AnimatedWrapper>
									</StaticWrapper>
								);
							} else if (!_.animated && conditionForAnimation(_)) {
								return (
									<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
										<UnAnimatedWrapper leftpos="0vw">
											<Heading fontSize="1.3rem">{`Selected Planet - ${idx + 1}`}</Heading>
											<SelectedPlanetImg imgname={_.imgname} />
											<Heading color="#FAD107" fontSize="1.2rem">
												{_.planetname}
											</Heading>
											<Heading
												color="#FAD107"
												fontSize="1rem"
											>{`DISTANCE ${_.distance} megamiles`}</Heading>
										</UnAnimatedWrapper>
									</StaticWrapper>
								);
							} else {
								return (
									<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
										<UnAnimatedWrapper>
											<Heading fontSize="1.3rem">{`Selected Planet - ${idx + 1}`}</Heading>
											<SelectedPlanetImg imgname={_.imgname} />
											<Heading color="#FAD107" fontSize="1.2rem">
												{_.planetname}
											</Heading>
											<Heading
												color="#FAD107"
												fontSize="1rem"
											>{`DISTANCE ${_.distance} megamiles`}</Heading>
										</UnAnimatedWrapper>
									</StaticWrapper>
								);
							}
						})}
					</SelectedPlanet>
				</PlanetWrapper>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

export default SelectPlanet;
