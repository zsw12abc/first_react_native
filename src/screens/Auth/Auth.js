import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';

class AuthScreen extends Component {
	loginHandler = () => {
		startMainTabs();
	};

	render() {
		return (
			<View style={styles.container}>
				<MainText>
					<HeadingText>Please Log In</HeadingText>
				</MainText>
				<Button title={"Switch to Login"}/>
				<View style={styles.inputContainer}>
					<DefaultInput style={styles.input}
					              placeholder={"Your Email Address"}/>
					<DefaultInput style={styles.input}
					              placeholder={"Password"}/>
					<DefaultInput style={styles.input}
					              placeholder={"Confirm Password"}/>
				</View>
				<Button title={"Submit"} onPress={this.loginHandler}/>
			</View>
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
	}
});
export default AuthScreen;