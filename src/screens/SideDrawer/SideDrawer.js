import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';


class SideDrawer extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>SideDrawer</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 22,
		backgroundColor: 'white',
		flex: 1,
		width: Dimensions.get('window').width * 0.8
	}
});

export default SideDrawer;