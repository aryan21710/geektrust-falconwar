import React, { useContext, useState, useEffect } from 'react';
import { SelectedPlanetWrapper, Heading } from './common/StyledComponent';
import { PlanetDetailsContext } from '../context/appContext';
import { usePostDataToFetchResult } from '../customHooks/usePostDataToFetchResult';

const DisplayFinalResult = () => {
	const { finalData } = useContext(PlanetDetailsContext);
	const [backendResponse, setBackendResponse] = useState({});
	const [status, setStatus] = useState(false);

	usePostDataToFetchResult(finalData, setBackendResponse, backendResponse);

	useEffect(() => {
		if (Object.keys(backendResponse).length > 0) {
			const { status } = backendResponse;
			setStatus(status);
		}
	}, [backendResponse]);

	return (
		<React.Fragment>
			<SelectedPlanetWrapper>
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					{status ? status : 'NO RESULT YET'}
				</Heading>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

export default DisplayFinalResult;
