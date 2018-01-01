import {uiStartLoading, uiStopLoading} from './index'
import startMainTabs from '../../screens/MainTabs/startMainTabs'

export const tryAuth = (authData, authMode) => {
	return dispatch => {
		dispatch(uiStartLoading());
		const apiKey = 'AIzaSyDPJWC318j4l8MtrWCNTOG2LCt3XmjX3uk';
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey;
		if (authMode === 'signup') {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey;
		}
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: authData.email,
				password: authData.password,
				returnSecureToken: true,
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch(err => {
			console.log('error');
			alert('Authentication failed, please try again!');
			dispatch(uiStopLoading());
		}).then(res => res.json())
			.then(parsedRes => {
				dispatch(uiStopLoading());
				if (parsedRes.error) {
					alert('Authentication failed, please try again!');
				} else {
					console.log(parsedRes);
					startMainTabs();
				}
			})
	}
};