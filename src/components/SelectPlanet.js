import React, { useState, useEffect } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	PlanetWrapper,
	SelectedPlanet,
	SelectedPlanetImg,
	Button,
} from './common/StyledComponent';
import { useSpring, config } from 'react-spring';

const SelectPlanet = () => {
	const [isClicked, setIsClicked] = useState(false);
	const props = useSpring({
		transform: isClicked ? 'translateX(0vh)' : 'translateX(-50vh)',
		config: config.slow,
	});

	const animateSelectedPlanet = () => setIsClicked(!isClicked);

	return (
		<SelectedPlanetWrapper>
			<SolarSystemWrapper>
				<Button onClick={animateSelectedPlanet}>Select Planet</Button>
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
	);
};

export default SelectPlanet;
