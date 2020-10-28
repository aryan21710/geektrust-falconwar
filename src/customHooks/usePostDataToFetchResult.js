import axios from 'axios';
import { FindFalconeUrl } from '../common/myenv';

export const usePostDataToFetchResult = async (finalData, setResult, result) => {
	if (result.length === 0) {
		try {
			const finalResult = await axios(FindFalconeUrl, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				body: finalData,
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
			});
			console.log(`finalResult ${JSON.stringify(finalResult)}`);
			setResult(finalResult);
		} catch (err) {
			setResult(err);
			console.log(`finalResult ${err}`);
		}
	}
};
