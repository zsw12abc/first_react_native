/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
	'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
	'Shake or press menu button for dev menu',
});

class App extends Component<{}> {
	state = {
		places: [],
		selectedPlace: null
	};

	placeAddedHandler = (placeName) => {
		this.setState(prevState => {
			return {
				places: prevState.places.concat({
						key: Math.random(),
						name: placeName,
						image: {
							uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
						}
					}
				),
			};
		})
	};

	placeDeletedHandler = () => {
		this.setState(prevState => {
			return {
				places: prevState.places.filter(place => {
					return place.key !== prevState.selectedPlace.key;
				}),
				selectedPlace: null
			}
		})
	};

	placeSelectedHandler = (key) => {
		this.setState(prevState => {
				return {
					selectedPlace: prevState.places.find(place => {
						return place.key === key;
					})
				}
			}
		)
	};

	modalClosedHandler = () => {
		this.setState({
			selectedPlace: null
		})
	};

	render() {
		return (
			<View style={styles.container}>
				<PlaceDetail
					selectedPlace={this.state.selectedPlace}
					onItemDeleted={this.placeDeletedHandler}
					onModalClosed={this.modalClosedHandler}/>
				<PlaceInput onPlaceAdded={this.placeAddedHandler}/>
				<PlaceList
					places={this.state.places}
					onItemDeleted={this.placeSelectedHandler}
				/>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	inputContainer: {
		// flex: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	placeInput: {
		width: "70%"
	},
	placeButton: {
		width: "30%"
	},
	listContainer: {
		width: '100%'
	}
});

export default App;