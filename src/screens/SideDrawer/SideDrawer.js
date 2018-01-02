import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'
import {authLogout} from "../../store/actions/index";


class SideDrawer extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.props.onLogout()}>
					<View style={styles.drawerItem}>
						<Icon
							style={styles.drawerItemIcon}
							name={Platform.OS === 'android' ? "md-log-out" : 'ios-log-out'}
							size={30}
							color={'#bbb'}/>
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
	drawerItemIcon: {
		marginRight: 10,
	}
});

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(authLogout())
	}
};

export default connect(null, mapDispatchToProps)(SideDrawer);