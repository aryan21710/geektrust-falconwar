import axios from 'axios';
import { FindFalconeUrl } from '../common/myenv';

export const usePostDataToFetchResult = async (finalData, setBackendResponse, backendResponse,setError, error) => {
	if (Object.keys(backendResponse).length===0 && Object.keys(error).length===0) {
		try {
			const finalResult = await axios(FindFalconeUrl, {
                method: 'POST',
                mode: 'cors',
				cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: finalData,
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
			});
			console.log(`finalResult ${JSON.stringify(finalResult)}`);
			setBackendResponse(finalResult);
		} catch (err) {
			setError(err);
			console.log(`finalResult ${err}`);
		}
	}
};
