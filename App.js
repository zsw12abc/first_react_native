/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import {addPlace} from "./src/store/actions/index";
import {deletePlace, deselectPlace, selectPlace} from "./src/store/actions";

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
	'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
	'Shake or press menu button for dev menu',
});

class App extends Component<{}> {
	// state = {
	// 	places: [],
	// 	selectedPlace: null
	// };

	placeAddedHandler = (placeName) => {
		this.props.onAddPlace(placeName);
		console.log('[AddPlace] ' + placeName);
	};

	placeDeletedHandler = () => {
		this.props.onDeletePlace();
		console.log('[DeletePlace]');
	};

	placeSelectedHandler = (key) => {
		this.props.onSelectPlace(key);
		console.log('[SelectPlace] ' + key);
	};

	placeDeSelectedHandler = () => {
		this.props.onDeSelectPlace();
		console.log('[DeSelectPlace]');
	};

	render() {
		return (
			<View style={styles.container}>
				<PlaceDetail
					selectedPlace={this.props.selectedPlace}
					onItemDeleted={this.placeDeletedHandler}
					onModalClosed={this.placeDeSelectedHandler}/>
				<PlaceInput onPlaceAdded={this.placeAddedHandler}/>
				<PlaceList
					places={this.props.places}
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

const mapStateToProps = (state) => {
	return {
		places: state.places.places,
		selectedPlace: state.places.selectedPlace,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddPlace: (name) => dispatch(addPlace(name)),
		onDeletePlace: () => dispatch(deletePlace()),
		onSelectPlace: (key) => dispatch(selectPlace(key)),
		onDeSelectPlace: () => dispatch(deselectPlace()),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(App);