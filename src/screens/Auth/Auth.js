import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';

class AuthScreen extends Component {
	loginHandler = () => {
		startMainTabs();
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Please Log In</Text>
				<Button title={"Switch to Login"}/>
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} placeholder={"Your Email Address"}/>
					<TextInput style={styles.input} placeholder={"Password"}/>
					<TextInput style={styles.input} placeholder={"Confirm Password"}/>
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
		width: '100%',
	}
});

export default AuthScreen;