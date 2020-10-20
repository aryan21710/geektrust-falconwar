import axios from 'axios';
import { TokenUrl } from '../common/myenv';

export const usefetchToken = async (planetCfg, setPlanetCfg) => {
	try {
		const response = await axios(TokenUrl, {
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
		
		const token= response?.data?.token;
		console.log(`axios response ${JSON.stringify(response)}`);
		setPlanetCfg({ ...planetCfg, token });
	} catch (err) {
		console.log(`axios error ${JSON.stringify(err)}`);
		setPlanetCfg({ ...planetCfg, apiError: err.response.data });
	}
};
