import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ListItem = (props) => {
	return (
		<TouchableOpacity onPress={props.onItemPressed}>
			<View style={styles.listItem}>
				<Image resizeMode={'contain'} style={styles.listImage} source={props.placeImage}/>
				<Text>{props.placeName}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	listItem: {
		width: '100%',
		padding: 10,
		backgroundColor: '#eee',
		marginBottom: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	listImage: {
		marginRight: 8,
		height: 30,
		width: 30,
	}
});

export default ListItem;
