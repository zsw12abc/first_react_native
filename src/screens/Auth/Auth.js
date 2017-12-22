import React, {Component} from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener('change',
			this.updateStyles);
	}


	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	updateStyles = () => {
		this.setState({
			isPortrait: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
		});
	};


	loginHandler = () => {
		startMainTabs();
	};

	render() {
		let headingText = null;
		if (this.state.isPortrait === 'portrait') {
			headingText = (
				<MainText>
					<HeadingText>Please Log In</HeadingText>
				</MainText>
			);
		}
		return (
			<ImageBackground source={backgroundImage} style={styles.backgroundImage}>
				<View style={styles.container}>
					{headingText}
					<ButtonWithBackground
						color={'#29aaf4'}
						onPress={() => alert("Hello")}>
						Switch To Login
					</ButtonWithBackground>
					<View style={styles.inputContainer}>
						<DefaultInput style={styles.input}
						              placeholder={"Your Email Address"}/>
						<View style={this.state.isPortrait === 'portrait' ?
							styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
							<View style={this.state.isPortrait === 'portrait' ?
								styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
								<DefaultInput style={styles.input}
								              placeholder={"Password"}/>
							</View>
							<View style={this.state.isPortrait === 'portrait' ?
								styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
								<DefaultInput style={styles.input}
								              placeholder={"Confirm Password"}/>
							</View>
						</View>
					</View>
					<ButtonWithBackground
						color={'#29aaf4'}
						onPress={this.loginHandler}>Submit</ButtonWithBackground>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputContainer: {
		width: '80%'
	},
	input: {
		backgroundColor: '#eee',
		borderColor: '#bbb'
	},
	backgroundImage: {
		width: '100%',
		flex: 1
	},
	landscapePasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	portraitPasswordContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	landscapePasswordWrapper: {
		width: '45%'
	},
	portraitPasswordWrapper: {
		width: '100%'
	}
});
export default AuthScreen;