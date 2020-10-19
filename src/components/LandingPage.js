import React, { useState, useEffect } from 'react';
import { Wrapper, BadgeWrapper, ImageWrapper, ButtonWrapper, Heading, Button } from './common/StyledComponent';
import { usefetchToken } from '../customHooks/useFetchToken';
import apple from '../public/images/apple_raw.png';
import google from '../public/images/googleIcon.png';
import { useHistory } from 'react-router';

const LandingPage = () => {
	const [apiToken, setApiToken] = useState('');

	if (apiToken.length === 0) {
		usefetchToken(setApiToken);
	}

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
