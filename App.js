import {Navigation} from 'react-native-navigation';
import AuthScreen from "./src/screens/Auth/Auth";

//Register Screens
Navigation.registerComponent("awesome_places.AuthScreen", () => AuthScreen);

//Start App
Navigation.startSingleScreenApp({
	screen: {
		screen: "awesome_places.AuthScreen",
		title: "Login"
	}
});