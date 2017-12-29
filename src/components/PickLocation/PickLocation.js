import React, {Component} from 'react';
import {Button, Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {
	state = {
		focusedLocation: {
			latitude: -37.8146489,
			longitude: 145.1205072,
			latitudeDelta: 0.012,
			longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.012,
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<MapView style={styles.map} initialRegion={this.state.focusedLocation}/>
				<View style={styles.button}>
					<Button title={"Locate me"} onPress={() => alert('pick location')}/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center'
	},
	map: {
		width: '100%',
		height: 250,
	},
	button: {
		margin: 8
	}
});

export default PickLocation;