import React, { useState, useContext } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	PlanetWrapper,
	SelectedPlanet,
	SelectedPlanetImg,
	SolarSystemImage,
	Heading,
	Planet,
	AnimatedDiv,
} from './common/StyledComponent';
import { PlanetDetailsContext } from '../context/appContext';
import uuid from 'react-uuid';
import { StarGrid } from './common/StarGrid';
import { useSprings, config, animated } from 'react-spring';
import Planet1 from '../public/images/1.png';
import Planet2 from '../public/images/2.png';
import Planet3 from '../public/images/3.png';
import Planet4 from '../public/images/4.png';
import Planet5 from '../public/images/5.png';
import Planet6 from '../public/images/6.png';
import { useFetchDataFromBackend } from '../customHooks/useFetchDataFromBackend';

const SelectPlanet1 = () => {
	// distance , name
	const { planetCfg, setPlanetCfg } = useContext(PlanetDetailsContext);
	useFetchDataFromBackend(planetCfg, setPlanetCfg);

	const [planetClicked, setPlanetClicked] = useState({
		planetname: '',
		imgname: '',
		distance: '',
		planetindex: -1,
	});

	const { planetname, imgname, distance, planetindex } = planetClicked;

	const { planetData } = planetCfg;

	const selectedPlanet=Array(4).fill('');

	const springs = useSprings(
		selectedPlanet.length,
		selectedPlanet.map((planet) => ({
			transform: planetindex>-1 ? 'translateX(0vh)' : 'translateX(-50vh)',
			config: config.slow,
		}))
	);

	const animateSelectedPlanet = (e) => {
		const { imgname, planetname, distance, planetindex } = e.target.dataset;
		setPlanetClicked({ ...planetClicked, imgname, planetname, distance, planetindex });
	};

	let updatedPlanetData = planetData
		.map((_) => {
			return {
				distance: _.distance,
				width: '6vw',
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


	return (
		<React.Fragment>
			<aside className="starGridWrapper">
				<StarGrid />
			</aside>
			<SelectedPlanetWrapper>
				<SolarSystemWrapper>
					<Heading fontSize="1.2rem" color="#FAD107">
						King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets -
						DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor. Choose 4 planets you’d like to Invade.
					</Heading>
					<SolarSystemImage>
						{updatedPlanetData.map((_, idx) => {
							return (
								<Planet
									key={uuid()}
									onClick={animateSelectedPlanet}
									width={_.width}
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
					{springs.map((spring, idx) => {
						if (idx === planetindex) {
							return (
								<SelectedPlanet>
									<AnimatedDiv style={spring}>
										<SelectedPlanetImg src={imgname} />
										<Heading fontSize="1rem">{planetname}</Heading>
										<Heading fontSize="1rem">{`DISTANCE ${distance}`}</Heading>
									</AnimatedDiv>
								</SelectedPlanet>
							);
						} else {
                           return (
                            <SelectedPlanet>
                            </SelectedPlanet>
                           )

                        }
					})}
				</PlanetWrapper>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

export default SelectPlanet1;
