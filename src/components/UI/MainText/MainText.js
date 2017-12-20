import React from 'react';
import {StyleSheet, Text} from 'react-native';

const MainText = (props) => {
	return (
		<Text style={styles.mainText}>
			{props.children}
		</Text>
	);
};

const styles = StyleSheet.create({
	mainText: {
		color: 'black'
	}
});

export default MainText;
