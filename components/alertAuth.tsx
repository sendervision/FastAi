import React from 'react'
import {
	Portal,
	Dialog,
	Text,
	useTheme,
	Button
} from 'react-native-paper'


function AlertAuth(visible:boolean, toggleVisible: () => void) {
	return(
		<Portal>
			<Dialog visible={visible} onDismiss={toggleVisible} >
				<Dialog.Title>Compte non trouvé</Dialog.Title>
				<Dialog.Content>
					<Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 16
            }}
          >
					Votre compte n'a pas été touvé. Veuillez vérifier vos identifiant ou crée un nouveau compte
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button
					 	mode="contained"
					 	onPress={toggleVisible}
					>
						Okay
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	)
}


export { AlertAuth }
