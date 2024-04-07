import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export function BackIcon(props) {
	const theme = useTheme()
	const navigation = useNavigation()
	return (
		<TouchableOpacity
			{...props}
			onPress={() => navigation.goBack()}
		>
			<Icon 
				source="arrow-left-bold"
				size={30}
				color={theme.colors.secondary}
				style={{
					marginLeft: 20,
				}}
			/>
		</TouchableOpacity>
	)
}
