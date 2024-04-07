import React from 'react'
import { Text, Button, useTheme } from 'react-native-paper'

export const ButtonForm = (props, {style}) => {
	const theme = useTheme()
	return (
		<Button  
			onPress={props.onPress}
			loading={props.loading}
			disabled={props.disabled}
			style={{
				height: 50,
				marginHorizontal: 30,
				justifyContent: "center",
				...style
			}} 
			labelStyle={{
				fontSize: props.fontSize && 18,
				fontWeight: props.bold? "bold" : "400",
        fontFamily: "Poppins-SemiBold",
        color: props?.color
			}}

			{...props}
		>
			{props.title}
		</Button>
	)
}
