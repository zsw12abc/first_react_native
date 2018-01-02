import {AsyncStorage} from 'react-native';
import {uiStartLoading, uiStopLoading} from './index'
import startMainTabs from '../../screens/MainTabs/startMainTabs'
import {AUTH_SET_TOKEN} from "./actionTypes";

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
				if (!parsedRes.idToken) {
					alert('Authentication failed, please try again!');
				} else {
					console.log(parsedRes);
					dispatch(authStoreToken(parsedRes.idToken))
					startMainTabs();
				}
			})
	}
};

export const authStoreToken = token => {
	return dispatch => {
		dispatch(authSetToken(token));
		AsyncStorage.setItem('ap:auth:token', token);
	}
};

export const authSetToken = token => {
	return {
		type: AUTH_SET_TOKEN,
		token: token
	}
};

export const authGetToken = () => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			const token = getState().auth.token;
			if (!token) {
				AsyncStorage.getItem('ap:auth:token')
					.catch(err => reject())
					.then(tokenFromStorage => {
						if (!tokenFromStorage) {
							reject();
							return;
						}
						dispatch(authStoreToken(tokenFromStorage));
						resolve(tokenFromStorage);
					});
			} else {
				resolve(token);
			}
		});
		return promise;
	}
};

export const authAutoSignIn = () => {
	return dispatch => {
		dispatch(authGetToken())
			.then(token => {
				startMainTabs()
			})
			.catch(err => console.log('Failed to fetch token!'))
	}
};