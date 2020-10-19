import React, { useState, useEffect } from 'react';
import { Wrapper, Heading } from './common/StyledComponent';
import { usefetchToken } from '../customHooks/useFetchToken';

const LandingPage = () => {
	const [apiToken, setApiToken] = useState('');

	if (apiToken.length === 0) {
		usefetchToken(setApiToken)
	}

	return (
		<Wrapper>
			<Heading fontSize="2rem">{apiToken}</Heading>
		</Wrapper>
	);
};

export default LandingPage;
