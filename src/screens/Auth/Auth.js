import React, {Component} from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg';
import validation from '../../utility/validation';

class AuthScreen extends Component {
	state = {
		isPortrait: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
		controls: {
			email: {
				value: '',
				valid: false,
				validationRules: {
					isEmail: true,
				}
			},
			password: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 6,
				}
			},
			confirmPassword: {
				value: '',
				valid: false,
				validationRules: {
					equalTo: 'password',
				}
			},
		}
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

	updateInputState = (key, value) => {
		let connectedValue = {};
		if (this.state.controls[key].validationRules.equalTo) {
			const equalControl = this.state.controls[key].validationRules.equalTo;
			const equalValue = this.state.controls[equalControl].value;
			connectedValue = {
				...connectedValue,
				equalTo: equalValue
			};
		}
		if (key === "password") {
			connectedValue = {
				...connectedValue,
				equalTo: value
			};
		}
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					confirmPassword: {
						...prevState.controls.confirmPassword,
						valid:
							key === "password"
								? validation(
								prevState.controls.confirmPassword.value,
								prevState.controls.confirmPassword.validationRules,
								connectedValue
								)
								: prevState.controls.confirmPassword.valid
					},
					[key]: {
						...prevState.controls[key],
						value: value,
						valid: validation(
							value,
							prevState.controls[key].validationRules,
							connectedValue
						)
					}
				}
			};
		});
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
						<DefaultInput
							style={styles.input}
							value={this.state.controls.email.value}
							onChangeText={(val) => this.updateInputState('email', val)}
							placeholder={"Your Email Address"}/>
						<View style={this.state.isPortrait === 'portrait' ?
							styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
							<View style={this.state.isPortrait === 'portrait' ?
								styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
								<DefaultInput
									style={styles.input}
									placeholder={"Password"}
									value={this.state.controls.password.value}
									onChangeText={(val) => this.updateInputState('password', val)}/>
							</View>
							<View style={this.state.isPortrait === 'portrait' ?
								styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
								<DefaultInput
									style={styles.input}
									placeholder={"Confirm Password"}
									value={this.state.controls.confirmPassword.value}
									onChangeText={(val) => this.updateInputState('confirmPassword', val)}/>
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