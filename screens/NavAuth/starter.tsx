import React from 'react'
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { 
	Text, 
	TextInput, 
	useTheme 
} from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import { Logo } from '../../components/Logo'
import { ButtonForm } from "../../components/buttonForm"

const { width, height } = Dimensions.get("window")

function Starter ({navigation}){
	const heightStatusBar = StatusBar?.currentHeight
	const [loadingButton, setLoadingButton] = React.useState(false)
	const theme = useTheme()

	return (
		<SafeAreaView style={{flex: 1, paddingTop: 10, backgroundColor: theme.colors.background}} >
			<View style={styles.header} >
			</View>
			<View style={styles.body} >
				<Text 
					style={{
						textAlign: 'center', 
						fontFamily: "Poppins-SemiBold",
            fontSize: 40,
						color: theme.colors.secondary,
						marginTop: 30,
					}}
				>
					Moon
				</Text>
				<Logo size={width / 1.2} />
				<View
					style={{
						marginTop: 20,
					}}
				>
					<ButtonForm
						title="Se connecter"
						mode="contained"
						bold
            color={theme.colors.secondaryContainer}
						style={{
							marginTop: 30,
							marginHorizontal: 30,
							height: 60,
							justifyContent: "center",
							fontFamily: "Roboto-Regular",
              backgroundColor: theme.colors.secondary
						}}
						fontSize={20}
						onPress={() => {
              navigation.navigate("login")
            }}
						rippleColor={theme.colors.secondary}
					/>
					<ButtonForm
						title="Crée mon compte"
						mode="contained"
						bold
            color={theme.colors.secondary}
						style={{
							marginTop: 30,
							marginHorizontal: 30,
							height: 60,
							justifyContent: "center",
              backgroundColor: theme.colors.secondaryContainer
						}}
						fontSize={20}
						loading={loadingButton}
						onPress={() => {
							setLoadingButton(true)
							setTimeout(function() {
								setLoadingButton(false)
								navigation.navigate("signin")
							}, 400);
						}}
						rippleColor={theme.colors.secondaryContainer}
					/>
				</View>

			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection:  "row",
		paddingHorizontal: 20,
	},
	body: {
		justifyContent:'center',
		marginTop: 20
	}
})

export default Starter