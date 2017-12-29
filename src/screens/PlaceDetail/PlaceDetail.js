import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {deletePlace} from "../../store/actions/index";
import MapView from 'react-native-maps';

class PlaceDetail extends Component {
	state = {
		isPortrait: Dimensions.get('window').height > 500,
	};
	updateStyles = () => {
		this.setState({
			isPortrait: Dimensions.get('window').height > 500
		});
	};
	placeDeletedHandler = () => {
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.navigator.pop({});
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);
	}

	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	render() {
		return (
			//onRequestClose is used for android
			<View
				style={[styles.container, this.state.isPortrait ? styles.portraitContainer : styles.landscapeContainer]}>
				<View style={styles.placeDetailContainer}>
					<View style={styles.subContainer}>
						<Image
							source={this.props.selectedPlace.image}
							style={styles.placeImage}/>
					</View>
					<View style={styles.subContainer}>
						<MapView style={styles.map} initialRegion={{
							...props.selectedPlace.location,
							latitudeDelta: 0.012,
							longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.012
						}}>
							<MapView.Marker coordinate={this.props.selectedPlace.location}/>
						</MapView>
					</View>
				</View>
				<View style={styles.subContainer}>
					<View>
						<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
					</View>
					<View>
						<TouchableOpacity onPress={this.placeDeletedHandler}>
							<View style={styles.deleteButton}>
								<Icon size={30}
								      name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
								      color={'red'}/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 22,
		flex: 1
	},
	portraitContainer: {
		flexDirection: 'column'
	},
	landscapeContainer: {
		flexDirection: 'row'
	},
	placeImage: {
		width: '100%',
		height: '100%',
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 28
	},
	deleteButton: {
		alignItems: 'center'
	},
	subContainer: {
		flex: 1
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	placeDetailContainer: {
		flex: 2,
	}
});

const mapDispatchToProps = dispatch => {
	return {
		onDeletePlace: (key) => dispatch(deletePlace(key))
	};
};
export default connect(null, mapDispatchToProps)(PlaceDetail);
