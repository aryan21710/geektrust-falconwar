import React, { useState, useEffect } from 'react';
import { Wrapper, BadgeWrapper, ImageWrapper } from './common/StyledComponent';
import { usefetchToken } from '../customHooks/useFetchToken';
import apple from '../public/images/apple_raw.png';
import google from '../public/images/googleIcon.png';

const LandingPage = () => {
	const [apiToken, setApiToken] = useState('');

	if (apiToken.length === 0) {
		usefetchToken(setApiToken);
	}

	return (
		<Wrapper>
			<BadgeWrapper>
				<ImageWrapper src={apple}/>
			</BadgeWrapper>
			<BadgeWrapper>
				<ImageWrapper src={google}/>
			</BadgeWrapper>
		</Wrapper>
	);
};

export default LandingPage;
