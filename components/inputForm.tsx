import { useState } from 'react'
import { View } from "react-native"
import { TextInput, useTheme, HelperText } from 'react-native-paper'

export function InputForm(props) {
	const theme = useTheme()
	const [eyeIcon, setEyeIcon] = useState('eye-off')
	const [SecureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry)

	function toggleViewPassword() {
		if (eyeIcon === "eye-off"){
			setEyeIcon("eye")
			setSecureTextEntry(false)
		}else{
			setEyeIcon("eye-off")
			setSecureTextEntry(true)
		}
	}

	return(
		<View style={{marginBottom: 10, paddingHorizontal: 30}} >
			<TextInput
				label={props.label}
				style={{
					marginTop: 10,
					width: "100%",
					fontFamily: "Poppins-SemiBold",
					fontSize: 18,
				}}
        cursorColor={theme.colors.secondary}
				value={props.value}
				onChangeText={props.onChangeText}
				secureTextEntry={SecureTextEntry}
				error={props.textError? true: false}
				right={
					props.secureTextEntry? <TextInput.Icon 
						icon={eyeIcon} 
						onPress={toggleViewPassword} 
						forceTextInputFocus={false}
						/> : null
				}
				autoComplete={props.autoComplete}
				autoCapitalize={props.autoCapitalize}
			/>
			<HelperText type='error'>
				{props.textError}
			</HelperText>
		</View>
	)
}



