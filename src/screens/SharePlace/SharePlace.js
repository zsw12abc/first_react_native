import React, {Component} from 'react';
import {Button, KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from "../../store/actions/index";
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import validation from '../../utility/validation';

class SharePlaceScreen extends Component {
	static navigatorStyle = {
		navBarButtonColor: 'orange'
	};

	state = {
		controls: {
			placeName: {
				value: '',
				valid: false,
				touched: false,
				validationRules: {
					notEmpty: true
				}
			}
		}
	};

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	onNavigatorEvent = (event) => {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'sideDrawerToggle') {
				this.props.navigator.toggleDrawer({
					side: 'left'
				});
			}
		}
	};

	placeNameChangedHandler = (val) => {
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					placeName: {
						...prevState.controls.placeName,
						value: val,
						valid: validation(val, prevState.controls.placeName.validationRules),
						touched: true
					}
				}
			};
		});
	};

	placeAddedHandler = () => {
		if (this.state.controls.placeName.value.trim() !== "") {
			this.props.onAddPlace(this.state.controls.placeName.value);
		}
	};

	render() {
		return (
			<ScrollView>
				<KeyboardAvoidingView behavior={'padding'} style={styles.container}>
					<MainText>
						<HeadingText>Share a place with us!</HeadingText>
					</MainText>
					<PickImage/>
					<PickLocation/>
					<PlaceInput
						placeData={this.state.controls.placeName}
						onChangeText={this.placeNameChangedHandler}/>
					<View style={styles.button}>
						<Button
							title={"Share the Place!"}
							onPress={this.placeAddedHandler}
							disabled={!this.state.controls.placeName.valid}/>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	placeholder: {
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#eee',
		width: '80%',
		height: 150,
	},
	button: {
		margin: 8
	},
	previewImage: {
		width: '100%',
		height: '100%'
	}
});

const mapDispatchToProps = dispatch => {
	return {
		onAddPlace: (placeName) => dispatch(addPlace(placeName)),
	};
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);