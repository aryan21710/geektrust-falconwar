import axios from 'axios';
import { TokenUrl,delMeLater } from '../common/myenv';
import { dataHeaders } from '../common/axiosHeader';

export const useFetchToken = async (apiToken, setApiToken) => {
	const fetchToken = async () => {
		try {
			const response = await axios.post(
				TokenUrl,
				{},
				{
					headers: dataHeaders,
				}
			);
			const { token } = response;
			setApiToken(token);
			console.log(`axios response ${JSON.stringify(response)}`);
		} catch (err) {
			console.log(`err ${err}`);
		}
	};

	fetchToken();
};
