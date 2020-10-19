import React from 'react';
import { Wrapper, PlanetWrapper, SelectedPlanetWrapper, SelectedPlanet, ImageWrapper } from './common/StyledComponent';

const SelectPlanet = () => {
	return (
		<Wrapper flexDirection="column">
			<PlanetWrapper></PlanetWrapper>
			<SelectedPlanetWrapper>
				<SelectedPlanet>
					<ImageWrapper height="15vh" />
				</SelectedPlanet>
				<SelectedPlanet>
					<ImageWrapper height="15vh" />
				</SelectedPlanet>
				<SelectedPlanet>
					<ImageWrapper height="15vh" />
				</SelectedPlanet>
				<SelectedPlanet>
					<ImageWrapper height="15vh" />
				</SelectedPlanet>
			</SelectedPlanetWrapper>
		</Wrapper>
	);
};

export default SelectPlanet;
