import React, { useState, useEffect } from 'react';
import { Wrapper, Heading } from './common/StyledComponent';
import { useFetchToken } from '../customHooks/useFetchToken';

const LandingPage = () => {
    const [apiToken, setApiToken] = useState('DEFAULT TOKEN');
	useFetchToken(apiToken, setApiToken);
	return (
		<Wrapper>
			<Heading fontSize="2rem">{apiToken}</Heading>
		</Wrapper>
	);
};

export default LandingPage;
