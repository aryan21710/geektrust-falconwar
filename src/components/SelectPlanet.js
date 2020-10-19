import React, { useState, useEffect } from 'react';
import {
	Wrapper,
	PlanetWrapper,
	SelectedPlanetWrapper,
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
		<Wrapper flexDirection="column">
			<PlanetWrapper>
				<Button onClick={animateSelectedPlanet}>Select Planet</Button>
			</PlanetWrapper>
			<SelectedPlanetWrapper>
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
			</SelectedPlanetWrapper>
		</Wrapper>
	);
};

export default SelectPlanet;
