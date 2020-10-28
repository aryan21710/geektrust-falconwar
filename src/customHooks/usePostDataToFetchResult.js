import axios from 'axios';
import { FindFalconeUrl } from '../common/myenv';

export const usePostDataToFetchResult = async (finalData, setBackendResponse, backendResponse) => {
	if (Object.keys(backendResponse).length===0) {
		try {
			const finalResult = await axios(FindFalconeUrl, {
				method: 'POST',
				body: finalData,
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
			});
			console.log(`finalResult ${JSON.stringify(finalResult)}`);
			setBackendResponse(finalResult);
		} catch (err) {
			setBackendResponse(err);
			console.log(`finalResult ${err}`);
		}
	}
};
