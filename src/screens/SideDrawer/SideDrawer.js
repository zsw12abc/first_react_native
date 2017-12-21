import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


class SideDrawer extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity>
					<View style={styles.drawerItem}>
						<Icon style={styles.drawerItemIcon} name={'ios-log-out'} size={30} color={'#bbb'}/>
						<Text>Sign Out</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		backgroundColor: 'white',
		flex: 1,
		width: Dimensions.get('window').width * 0.8
	},
	drawerItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#eee'
	},
	drawerItemIcon:{
		marginRight: 10,
	}
});

export default SideDrawer;