import axios from 'axios';
import { TokenUrl, PlanetUrl,VehicleUrl } from '../common/myenv';

export const usefetchToken = async (planetCfg, setPlanetCfg) => {
	try {
		const planetApiResponse = await axios(PlanetUrl, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		});

		const planetData = planetApiResponse?.data;
		console.log(`axios planetApiResponse ${JSON.stringify(planetData)}`);

		const vehicleApiResponse = await axios(VehicleUrl, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		});

		const vehicleData = vehicleApiResponse?.data;
		console.log(`axios vehicleApiResponse ${JSON.stringify(vehicleData)}`);

		const tokenApiResponse = await axios(TokenUrl, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			body: {},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			headers: {
				Accept: 'application/json',
			},
		});

		const token = tokenApiResponse?.data?.token;
		console.log(`axios tokenApiResponse ${JSON.stringify(tokenApiResponse)}`);
		setPlanetCfg({ ...planetCfg, token, planetData, vehicleData });

	} catch (err) {
		console.log(`axios error ${JSON.stringify(err)}`);
		setPlanetCfg({ ...planetCfg, apiError: err.response.data });
	}
};
