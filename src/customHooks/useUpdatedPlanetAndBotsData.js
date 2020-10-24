import React, { useEffect } from 'react';

export const useUpdatedPlanetAndBotsData = (selecPlanetCnt, selectedPlanet, setSelectedPlanet) => {
	useEffect(() => {
		if (selecPlanetCnt === 4) {
			const filteredSelPlanetData = selectedPlanet.filter(
				(planetDetails) => planetDetails.planetname !== '' && planetDetails.distance !== ''
			);
			console.log(`selectedPlanet:- ${JSON.stringify(filteredSelPlanetData)}`)
			setSelectedPlanet(filteredSelPlanetData);
			localStorage.setItem('selectedPlanet', JSON.stringify(filteredSelPlanetData));
		}
	}, [selecPlanetCnt]);
};
