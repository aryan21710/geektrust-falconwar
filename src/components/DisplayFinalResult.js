import React, { useContext, useState, useEffect } from 'react';
import { SelectedPlanetWrapper, Heading } from './common/StyledComponent';
import { PlanetDetailsContext } from '../context/appContext';
import { usePostDataToFetchResult } from '../customHooks/usePostDataToFetchResult';

const DisplayFinalResult = () => {
	const { finalData } = useContext(PlanetDetailsContext);
	const [backendResponse, setBackendResponse] = useState({});
    const [status, setStatus] = useState(false);
    const [error, setError] = useState({});
    const [displayMessage, setDisplayMessage] = useState("");



	usePostDataToFetchResult(finalData, setBackendResponse, backendResponse,setError,error);

	useEffect(() => {
		if (Object.keys(backendResponse).length > 0) {
            const { status } = backendResponse;
            status ? setDisplayMessage('PASSED') :  setDisplayMessage('FAILED')
			setStatus(status);
		} else if (Object.keys(error).length > 0) {
            setDisplayMessage(error.response.statusText)
        }
	}, [backendResponse,error]);

	return (
		<React.Fragment>
			<SelectedPlanetWrapper>
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					{displayMessage.length > 0 ? displayMessage : 'SOMETHING WRONG'}
				</Heading>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

export default DisplayFinalResult;
