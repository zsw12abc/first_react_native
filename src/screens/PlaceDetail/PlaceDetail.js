import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {deletePlace} from "../../store/actions/index";

class PlaceDetail extends Component {
	state = {
		isPortrait: Dimensions.get('window').height > 500,
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);
	}


	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	updateStyles = () => {
		this.setState({
			isPortrait: Dimensions.get('window').height > 500
		});
	};


	placeDeletedHandler = () => {
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.navigator.pop({});
	};

	render() {
		return (
			//onRequestClose is used for android
			<View style={this.state.isPortrait ? styles.portraitContainer : styles.landscapeContainer}>
				<View style={styles.subContainer}>
					<Image
						source={this.props.selectedPlace.image}
						style={styles.placeImage}/>
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
		height: 200,
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
	}
});

const mapDispatchToProps = dispatch => {
	return {
		onDeletePlace: (key) => dispatch(deletePlace(key))
	};
};
export default connect(null, mapDispatchToProps)(PlaceDetail);
