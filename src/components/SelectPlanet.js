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

	const planetCordinates = [
		{
			name: Planet1,
			topPos: "10vh",
			leftPos: "0vw",
			width: "4vw",
		},
		{
			name: Planet2,
			width: "8vw",
			topPos: "15vh",
			leftPos: "10vw",
		},
		{
			name: Planet3,
			topPos: "2vh",
			leftPos: "20vw",
			width: "4vw",
		},
		{
			name: Planet4,
			topPos: "10vh",
			leftPos: "50vw",
			width: "8vw",
		},
		{
			name: Planet5,
			topPos: "20vh",
			leftPos: "40vw",
			width: "4vw",
		},
		{
			name: Planet6,
			width: "4vw",
			topPos: "22vh",
			leftPos: "28vw",
		},
	];

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
						{planetCordinates.map((_, idx) => {
							return (
								<Planet onClick={animateSelectedPlanet} 
								width={_.width} topPos={_.topPos} leftPos={_.leftPos}
								data-planetname={`Planet${idx+1}`} src={_.name} />
							);
						})}
					</SolarSystemImage>
				</SolarSystemWrapper>
				<PlanetWrapper>
					{Array(4)
						.fill('')
						.map(() => {
							return (
								<SelectedPlanet>
									<SelectedPlanetImg style={props} />
								</SelectedPlanet>
							);
						})}
				</PlanetWrapper>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

export default SelectPlanet;
