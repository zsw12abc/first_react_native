import React, {Component} from 'react';
import {
	Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback,
	View
} from 'react-native';
import {connect} from 'react-redux';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg';
import validation from '../../utility/validation';
import {tryAuth} from '../../store/actions/index';

class AuthScreen extends Component {
	state = {
		isPortrait: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
		authMode: 'login',
		controls: {
			email: {
				value: '',
				valid: false,
				validationRules: {
					isEmail: true,
				},
				touched: false
			},
			password: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 6,
				},
				touched: false
			},
			confirmPassword: {
				value: '',
				valid: false,
				validationRules: {
					equalTo: 'password',
				},
				touched: false
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
		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value,
		};
		this.props.onLogin(authData);
		startMainTabs();
	};

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				authMode: prevState.authMode === 'login' ? 'signup' : 'login'
			};
		});
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
						),
						touched: true
					}
				}
			};
		});
	};

	render() {
		let headingText = null;
		let confirmPasswordControl = null;
		if (this.state.isPortrait === 'portrait') {
			headingText = (
				<MainText>
					<HeadingText>Please Log In</HeadingText>
				</MainText>
			);
		}
		if (this.state.authMode === 'signup') {
			confirmPasswordControl = (
				<View style={this.state.isPortrait === 'portrait' ?
					styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
					<DefaultInput
						style={styles.input}
						placeholder={"Confirm Password"}
						value={this.state.controls.confirmPassword.value}
						valid={this.state.controls.confirmPassword.valid}
						touched={this.state.controls.confirmPassword.touched}
						onChangeText={(val) => this.updateInputState('confirmPassword', val)}
						secureTextEntry/>
				</View>);
		}
		return (
			<ImageBackground source={backgroundImage} style={styles.backgroundImage}>
				<KeyboardAvoidingView style={styles.container} behavior={'padding'}>
					{headingText}
					<ButtonWithBackground
						color={'#29aaf4'}
						onPress={this.switchAuthModeHandler}>
						Switch To {this.state.authMode === 'login' ? 'Sign up' : 'Login'}
					</ButtonWithBackground>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.inputContainer}>
							<DefaultInput
								style={styles.input}
								value={this.state.controls.email.value}
								onChangeText={(val) => this.updateInputState('email', val)}
								valid={this.state.controls.email.valid}
								touched={this.state.controls.email.touched}
								placeholder={"Your Email Address"}
								autoCapitalize={'none'}
								autoCorrect={false}
								keyboardType={'email-address'}/>
							<View style={this.state.isPortrait === 'portrait' || this.state.authMode === 'login' ?
								styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
								<View style={this.state.isPortrait === 'portrait' || this.state.authMode === 'login' ?
									styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
									<DefaultInput
										style={styles.input}
										placeholder={"Password"}
										value={this.state.controls.password.value}
										valid={this.state.controls.password.valid}
										touched={this.state.controls.password.touched}
										onChangeText={(val) => this.updateInputState('password', val)}
										secureTextEntry/>
								</View>
								{confirmPasswordControl}
							</View>
						</View>
					</TouchableWithoutFeedback>
					<ButtonWithBackground
						color={'#29aaf4'}
						onPress={this.loginHandler}
						disabled={!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' || !this.state.controls.email.valid || !this.state.controls.password.valid}>
						Submit
					</ButtonWithBackground>
				</KeyboardAvoidingView>
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


const mapDispatchToProps = dispatch => {
	return {
		onLogin: (authData) => dispatch(tryAuth(authData))
	};
};

export default connect(null, mapDispatchToProps)(AuthScreen);