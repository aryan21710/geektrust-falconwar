import React, { useState, useEffect } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	PlanetWrapper,
	SelectedPlanet,
	SelectedPlanetImg,
	SolarSystemImage,
	Heading,
	Planet,
} from './common/StyledComponent';
import { StarGrid } from './common/StarGrid';
import { useSpring, config } from 'react-spring';
import Planet1 from '../public/images/1.png';
import Planet2 from '../public/images/2.png';
import Planet3 from '../public/images/3.png';
import Planet4 from '../public/images/4.png';
import Planet5 from '../public/images/5.png';
import Planet6 from '../public/images/6.png';

const SelectPlanet = () => {
	const [isClicked, setIsClicked] = useState(false);
	const props = useSpring({
		transform: isClicked ? 'translateX(0vh)' : 'translateX(-50vh)',
		config: config.slow,
	});

	const animateSelectedPlanet = (e) => {
		alert(e.target.dataset.planetname);
		setIsClicked(!isClicked);
	};

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
						<Planet
							onClick={animateSelectedPlanet}
							data-planetname="Planet1"
							topPos="10vh"
							leftPos="0vw"
							src={Planet1}
						/>
						<Planet
							onClick={animateSelectedPlanet}
							data-planetname="Planet2"
							width="8vw"
							topPos="15vh"
							leftPos="10vw"
							src={Planet2}
						/>
						<Planet
							onClick={animateSelectedPlanet}
							data-planetname="Planet3"
							topPos="2vh"
							leftPos="20vw"
							src={Planet3}
						/>
						<Planet
							onClick={animateSelectedPlanet}
							data-planetname="Planet4"
							topPos="22vh"
							leftPos="26vw"
							src={Planet6}
						/>
						<Planet
							onClick={animateSelectedPlanet}
							data-planetname="Planet5"
							topPos="20vh"
							leftPos="40vw"
							src={Planet5}
						/>
						<Planet
							onClick={animateSelectedPlanet}
							data-planetname="Planet6"
							width="8vw"
							topPos="10vh"
							leftPos="50vw"
							src={Planet4}
						/>
					</SolarSystemImage>
				</SolarSystemWrapper>
				<PlanetWrapper>
					<SelectedPlanet>
						<SelectedPlanetImg style={props} />
					</SelectedPlanet>
					<SelectedPlanet>
						<SelectedPlanetImg style={props} />
					</SelectedPlanet>
					<SelectedPlanet>
						<SelectedPlanetImg style={props} />
					</SelectedPlanet>
					<SelectedPlanet>
						<SelectedPlanetImg style={props} />
					</SelectedPlanet>
				</PlanetWrapper>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

export default SelectPlanet;
