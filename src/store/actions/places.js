import {DELETE_PLACE, REMOVE_PLACE, SET_PLACES} from "./actionTypes";
import {uiStartLoading, uiStopLoading} from "./index";

export const addPlace = (placeName, location, image) => {
	return dispatch => {
		dispatch(uiStartLoading());
		fetch('https://us-central1-first-react-nati-1514367405118.cloudfunctions.net/storeImage', {
			method: 'POST',
			body: JSON.stringify({
				image: image.base64
			})
		}).catch(err => {
			console.log(err);
			alert('Something went wrong, please try again!!');
			dispatch(uiStopLoading());
		})
			.then(res => res.json())
			.then(parsedRes => {
				const placeData = {
					name: placeName,
					location: location,
					image: parsedRes.imageURL
				};
				return fetch('https://first-react-nati-1514367405118.firebaseio.com/places.json', {
					method: 'POST',
					body: JSON.stringify(placeData)
				})
			}).catch(err => {
			console.log(err);
			alert('Something went wrong, please try again!!');
			dispatch(uiStopLoading());
		})
			.then(res => res.json())
			.then(parsedRes => {
				console.log(parsedRes);
				dispatch(uiStopLoading());
			});
	}
};

export const getPlaces = () => {
	return dispatch => {
		fetch('https://first-react-nati-1514367405118.firebaseio.com/places.json')
			.catch(error => {
				alert('Something went wrong.');
				console.log(err);
			})
			.then(res => res.json())
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
		dispatch(removePlace(key));
		fetch('https://first-react-nati-1514367405118.firebaseio.com/places/' + key + '.json', {
			method: 'DELETE'
		}).catch(error => {
			alert('Something went wrong.');
			console.log(err);
		})
			.then(res => res.json())
			.then(parsedRes => {
				console.log("Delete Done");
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