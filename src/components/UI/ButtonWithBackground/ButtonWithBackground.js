import React from 'react';
import {Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';

const ButtonWithBackground = (props) => {
	const content = (
		<View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disable : null]}>
			<Text style={props.disabled ? styles.disableText : null}>{props.children}</Text>
		</View>
	);
	if (props.disable) {
		return content;
	}
	if (Platform.OS === 'android') {
		return (
			<TouchableNativeFeedback onPress={props.onPress}>
				{content}
			</TouchableNativeFeedback>
		);
	}
	return (
		<TouchableOpacity onPress={props.onPress}>
			{content}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		margin: 5,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'black',
	},
	disable: {
		backgroundColor: '#eee',
		borderColor: '#aaa'
	},
	disableText: {
		color: '#aaa',
	}
});

export default ButtonWithBackground;
