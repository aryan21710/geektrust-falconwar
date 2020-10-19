import axios from 'axios';
import { TokenUrl } from '../common/myenv';

export const usefetchToken = async (setApiToken) => {
	const response=await axios(TokenUrl, {
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
   })
   console.log(`axios response ${JSON.stringify(response)}`)
   setApiToken(response.data.token)
};
