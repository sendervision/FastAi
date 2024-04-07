import {
	useTheme,
	Portal,
	Button,
	Dialog,
	IconButton
} from 'react-native-paper'

import { Dimensions, StyleSheet, Image, View } from 'react-native'

const { width, height } = Dimensions.get("window")

export function ModalImage(props) {
	const theme = useTheme()
	return(
		<Portal>
			<Dialog visible={props.visible} onDismiss={props?.hiddenImage} style={styles.container} >
				<Dialog.Content>
					<View style={styles.containerHead} >
						<IconButton
							icon="alpha-x-circle"
							size={40}
							onPress={props.hiddenImage}
							iconColor={theme.colors.primary}
						/>
						<Button
 							mode="contained"
 							onPress={props.change}
 							rippleColor={theme.colors.primary}
 							style={{
 								justifyContent: "center",
 								height: 40
 							}}
						>
							Changer
						</Button>
						
					</View>
					<Image
						source={props.source}
						resizeMode="cover"
						style={{ 
							width: width - 70, 
							height: height - 270,
							marginTop: 10,
						}}
					/>
				</Dialog.Content>
			</Dialog>
		</Portal>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: width - 20,
		height: height - 230,
		alignSelf: 'center',
	},
	containerHead: {
		marginHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: "center",
	},
})




