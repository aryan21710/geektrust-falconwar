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
} from './common/StyledComponent';
import uuid from 'react-uuid';
import { StarGrid } from './common/StarGrid';
import Planet1 from '../public/images/1.png';
import Planet2 from '../public/images/2.png';
import Planet3 from '../public/images/3.png';
import Planet4 from '../public/images/4.png';
import Planet5 from '../public/images/5.png';
import Planet6 from '../public/images/6.png';
import { useFetchDataFromBackend } from '../customHooks/useFetchDataFromBackend';
import { PlanetDetailsContext } from '../context/appContext';

const SelectPlanet = () => {
	const { planetCfg, setPlanetCfg } = useContext(PlanetDetailsContext);
	useFetchDataFromBackend(planetCfg, setPlanetCfg);
	const { planetData } = planetCfg;
	const [count, setCount] = useState(0);

	const [planetindex, setPlanetIndex] = useState(-1);
	const [imgname, setImgname] = useState('');
	const [planetname, setPlanetName] = useState('');
	const [distance, setDistance] = useState(0);

	const [selectedPlanet, setSelectedPlanet] = useState(() =>
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

	useEffect(() => {
		if (planetindex > -1 && count <= 4) {
			const _ = selectedPlanet.map((_, idx) => {
				if (idx === count - 1) {
					return {
						animated: true,
						imgname: imgname,
						index: count - 1,
						planetname,
						distance,
					};
				} else if (_.animated && idx !== count - 1) {
					return {
						animated: false,
						imgname: _.imgname,
						index: _.index,
						planetname: _.planetname,
						distance: _.distance,
					};
				} else {
					return {
						animated: false,
						imgname: _.imgname,
						index: _.index,
						planetname: _.planetname,
						distance: _.distance,
					};
				}
			});
			console.log(`updated is ${JSON.stringify(_)}`);

			setSelectedPlanet(_);
		} else {
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
			setCount(0);
		}
	}, [planetindex]);

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

	let updatedPlanetData = planetData
		.map((_) => {
			return {
				distance: _.distance,
				planetname: _.name,
			};
		})
		.map((_, idx) => {
			switch (idx) {
				case 0: {
					return { ..._, imgName: Planet1, topPos: '10vh', leftPos: '0vw' };
				}
				case 1: {
					return { ..._, imgName: Planet2, topPos: '2vh', leftPos: '10vw' };
				}
				case 2: {
					return { ..._, imgName: Planet3, topPos: '18vh', leftPos: '10vw' };
				}
				case 3: {
					return { ..._, imgName: Planet4, topPos: '20vh', leftPos: '25vw' };
				}
				case 4: {
					return { ..._, imgName: Planet5, topPos: '15vh', leftPos: '40vw' };
				}
				case 5: {
					return { ..._, imgName: Planet6, topPos: '8vh', leftPos: '50vw' };
				}
				default:
					return {};
			}
		});

	console.log(`updatedPlanetData ${planetData.length} :: ${JSON.stringify(updatedPlanetData)}`);

	const conditionForAnimation = (_) => _.index >= 0;

	return (
		<React.Fragment>
			<aside className="starGridWrapper">
				<StarGrid />
			</aside>
			<SelectedPlanetWrapper>
				<SolarSystemWrapper>
					<Heading fontFamily="Avenir" fontSize="1.2rem" color="#FAD107">
						King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets -
						DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor. Choose 4 planets you’d like to Invade.
					</Heading>
					<SolarSystemImage>
						{updatedPlanetData.map((_, idx) => {
							return (
								<Planet
									key={uuid()}
									onClick={animateSelectedPlanet}
									toppos={_.topPos}
									leftpos={_.leftPos}
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
									<StaticWrapper width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
										<AnimatedWrapper>
											<Heading>{`Selected Planet - ${idx + 1}`}</Heading>
											<SelectedPlanetImg imgname={_.imgname} />
											<Heading fontSize="1rem">{_.planetname}</Heading>
											<Heading fontSize="1rem">{`DISTANCE ${_.distance} megamiles`}</Heading>
										</AnimatedWrapper>
									</StaticWrapper>
								);
							} else if (!_.animated && conditionForAnimation(_)) {
								return (
									<StaticWrapper width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
										<UnAnimatedWrapper leftPos="0vw">
											<Heading>{`Selected Planet - ${idx + 1}`}</Heading>
											<SelectedPlanetImg imgname={_.imgname} />
											<Heading fontSize="1rem">{_.planetname}</Heading>
											<Heading fontSize="1rem">{`DISTANCE ${_.distance} megamiles`}</Heading>
										</UnAnimatedWrapper>
									</StaticWrapper>
								);
							} else {
								return (
									<StaticWrapper width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
										<UnAnimatedWrapper>
											<Heading>{`Selected Planet - ${idx + 1}`}</Heading>
											<SelectedPlanetImg imgname={_.imgname} />
											<Heading fontSize="1rem">{_.planetname}</Heading>
											<Heading fontSize="1rem">{`DISTANCE ${_.distance} megamiles`}</Heading>
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
