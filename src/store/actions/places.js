import {PLACE_ADDED, REMOVE_PLACE, SET_PLACES, START_ADD_PLACE} from "./actionTypes";
import {uiStartLoading, uiStopLoading} from "./index";
import {authGetToken} from "./auth";

export const addPlace = (placeName, location, image) => {
	return dispatch => {
		let authToken;
		dispatch(uiStartLoading());
		dispatch(authGetToken())
			.catch(() => {
				alert('No valid token found!')
			})
			.then(token => {
				authToken = token;
				return fetch('https://us-central1-first-react-nati-1514367405118.cloudfunctions.net/storeImage', {
						method: 'POST',
						body: JSON.stringify({
							image: image.base64
						}),
						headers: {
							'Authorization': 'Bearer ' + token
						}
					}
				);
			})
			.catch(err => {
				console.log(err);
				alert('Something went wrong, please try again!!');
				dispatch(uiStopLoading());
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw(new Error());
				}
			})
			.then(parsedRes => {
				const placeData = {
					name: placeName,
					location: location,
					image: parsedRes.imageURL
				};
				return fetch('https://first-react-nati-1514367405118.firebaseio.com/places.json?auth=' + authToken,
					{
						method: 'POST',
						body: JSON.stringify(placeData)
					}
				);
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw(new Error());
				}
			})
			.then(parsedRes => {
				console.log(parsedRes);
				dispatch(uiStopLoading());
			})
			.catch(err => {
				console.log(err);
				alert('Something went wrong, please try again!!');
				dispatch(uiStopLoading());
				dispatch(placeAdded());
			})
	}
};

export const placeAdded = () => {
	return {
		type: PLACE_ADDED
	}
};

export const startAddPlace = () => {
	return {
		type: START_ADD_PLACE
	}
};

export const getPlaces = () => {
	return dispatch => {
		dispatch(authGetToken())
			.catch(() => {
				alert('No valid token found!')
			})
			.then(token => {
				return fetch('https://first-react-nati-1514367405118.firebaseio.com/places.json?auth=' + token)
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw(new Error());
				}
			})
			.then(parsedRes => {
				const places = [];
				for (let key in parsedRes) {
					places.push({
						...parsedRes[key],
						key: key,
						image: {
							uri: parsedRes[key].image
						}
					})
				}
				dispatch(setPlaces(places))
			})
			.catch(err => {
				alert('Something went wrong.');
				console.log(err);
			})
	}
};

export const setPlaces = places => {
	return {
		type: SET_PLACES,
		places: places
	}
};

export const deletePlace = (key) => {
	return dispatch => {
		dispatch(authGetToken())
			.catch(() => {
				alert('No valid token found!')
			})
			.then(token => {
				dispatch(removePlace(key));
				return fetch('https://first-react-nati-1514367405118.firebaseio.com/places/' + key + '.json?auth=' + token, {
					method: 'DELETE'
				})
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw(new Error());
				}
			})
			.then(parsedRes => {
				console.log("Delete Done");
			})
			.catch(error => {
				alert('Something went wrong.');
				console.log(error);
			})
	}
};

export const removePlace = key => {
	return {
		type: REMOVE_PLACE,
		key: key
	};
};
//
// export const selectPlace = (key) => {
// 	return {
// 		type: SELECT_PLACE,
// 		placeKey: key
// 	}
// };
//
// export const deselectPlace = () => {
// 	return {
// 		type: DESELECT_PLACE
// 	}
// };