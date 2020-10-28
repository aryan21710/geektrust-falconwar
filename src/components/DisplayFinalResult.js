import React, { useContext, useState, useEffect } from 'react';
import { SelectedPlanetWrapper, Heading } from './common/StyledComponent';
import { PlanetDetailsContext } from '../context/appContext';
import { usePostDataToFetchResult } from '../customHooks/usePostDataToFetchResult';

const DisplayFinalResult = () => {
	const { finalData } = useContext(PlanetDetailsContext);
	const [result, setResult] = useState("");
    usePostDataToFetchResult(finalData, setResult, result);

	return (
		<React.Fragment>
			<SelectedPlanetWrapper>
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					result
				</Heading>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

export default DisplayFinalResult;
