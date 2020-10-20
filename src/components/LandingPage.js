import React, { useContext } from 'react';
import { Wrapper, BadgeWrapper, ImageWrapper, ButtonWrapper, Heading, Button } from './common/StyledComponent';
import { useFetchDataFromBackend } from '../customHooks/useFetchDataFromBackend';
import apple from '../public/images/apple_raw.png';
import google from '../public/images/googleIcon.png';
import { useHistory } from 'react-router';
import { PlanetDetailsContext } from '../context/appContext';

const LandingPage = () => {
	const { planetCfg, setPlanetCfg } = useContext(PlanetDetailsContext);
	useFetchDataFromBackend(planetCfg, setPlanetCfg);
	const history = useHistory();

	const changePageOnClick = () => history.push('/selectplanets');
	return (
		<Wrapper>
			<BadgeWrapper>
				<ImageWrapper src={apple} />
			</BadgeWrapper>
			<BadgeWrapper>
				<ImageWrapper src={google} />
			</BadgeWrapper>
			<ButtonWrapper>
				<Heading color="black" fontSize="1.4rem">
					Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she will
					be exiled for another 15 years…
				</Heading>
				<Button onClick={changePageOnClick}>Find Falcone</Button>
			</ButtonWrapper>
		</Wrapper>
	);
};

export default LandingPage;
