import {
	Dialog,
	Portal,
	Button,
	Text,
	useTheme
} from "react-native-paper"
import { Pressable, View } from 'react-native'

type AlertUsernameParams= {
	visible: boolean,
	changeVisible: (visible: boolean) => void,
	userName: string
}

export function AlertUsername({visible, changeVisible, userName}: AlertUsernameParams) {
	const theme = useTheme()

	const getRandomNumber = () => {
		const number = Math.floor(Math.random() * 100)
		return number
	}

	return(
		<Portal>
			<Dialog visible={visible} onDismiss={() => changeVisible(false)}>
				<Dialog.Icon icon="alert" color={theme.colors.error} size={40} />
				<Dialog.Title
					style={{
						color: theme.colors.error,
						textAlign: "center",
						fontFamily: "Poppins-SemiBold",
					}}
				>
					Username occupé
				</Dialog.Title>
				<Dialog.Content>
					<Text variant="bodyMedium" style={{fontFamily: 'Roboto-Italic'}}>
					  Le username que vous venez de choisir a déjà été utilisé par une autre personne.
					  Veuillez essaie une autre
					</Text>
					<Text style={{fontFamily: "Poppins-SemiBold", color: theme.colors.onSurface, marginTop: 20, fontSize: 18}} >
					  Essaye avec:
					</Text>
					<View style={{paddingLeft: 10}} >
						<Text style={{fontFamily: "Roboto-Medium", marginBottom: 5, color: theme.colors.secondary}} >
							{userName + getRandomNumber()}
						</Text>
						<Text style={{fontFamily: "Roboto-Medium", marginBottom: 5, color: theme.colors.secondary}} >
							{userName + getRandomNumber()}
						</Text>
						<Text style={{fontFamily: "Roboto-Medium", marginBottom: 5, color: theme.colors.secondary}} >
							{userName + getRandomNumber()}
						</Text>
					</View>
				</Dialog.Content>
				<Dialog.Actions>
					<Button 
						mode='contained'
						style={{
							borderRadius: 10,
							backgroundColor: theme.colors.secondary
						}}
						labelStyle={{
							fontFamily: "Poppins-SemiBold"
						}}
						onPress={() => changeVisible(false)}
					>
						Okay
					</Button>
				</Dialog.Actions>

			</Dialog>
		</Portal>
	)
}