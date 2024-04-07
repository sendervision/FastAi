import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window")

export const Logo = (props) => {
	const sizeLogo = props.size? props.size : width / 2.5
	return (
		<Image 
			source={require("./logo.png")}
			style={{
				width: sizeLogo,
				height: sizeLogo,
				alignSelf: 'center'
			}}
		/>
	)
}

