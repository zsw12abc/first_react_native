import React from 'react';
import DefaultInput from '../UI/DefaultInput/DefaultInput';


const PlaceInput = props => (
	<DefaultInput
		placeholder={"Place Name"}
		value={props.placeData.placeName}
		onChangeText={props.onChangeText}
		valid={props.placeData.value}
		touched={props.placeData.touched}/>
);


export default PlaceInput;