import React, { useContext } from 'react';
import {
	Wrapper,
	BadgeWrapper,
	ImageWrapper,
	ButtonWrapper,
	Heading,
} from './common/StyledComponent';
import { useFetchDataFromBackend } from '../customHooks/useFetchDataFromBackend';
import { Images } from '../customHooks/useDefineConstants';
import { PlanetDetailsContext } from '../context/appContext';
import { CustomButton } from '../components/common/CustomButton';

const LandingPage = () => {
	const { planetCfg, setPlanetCfg } = useContext(PlanetDetailsContext);
	const { KingShan, Queen } = Images;
	useFetchDataFromBackend(planetCfg, setPlanetCfg);
	return (
		<React.Fragment>
			<Wrapper>
				<BadgeWrapper flexDirection="column">
					<ImageWrapper marginBottom="3vh" src={KingShan} />
					<Heading fontSize="1.5rem" color="#FAD107">
						King Shan
					</Heading>
				</BadgeWrapper>
				<BadgeWrapper flexDirection="column">
					<ImageWrapper marginBottom="3vh" src={Queen} />
					<Heading fontSize="1.5rem" color="#FAD107">
						Queen Falcornia
					</Heading>
				</BadgeWrapper>
				<ButtonWrapper>
					<Heading color="white" fontSize="1.2rem" fontFamily="Avenir">
						Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she
						will be exiled for another 15 years…
					</Heading>
					<CustomButton redirectPath="/selectplanets" leftpos="0vh" TextForButton="Lets Find Falcone" />
				</ButtonWrapper>
			</Wrapper>
		</React.Fragment>
	);
};

export default LandingPage;
