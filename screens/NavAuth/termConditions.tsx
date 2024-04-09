import React from 'react'
import { useState } from 'react'
import { 
	View, 
	SafeAreaView, 
	StyleSheet, 
	StatusBar, 
	Dimensions,
	SectionList,
	ActivityIndicator
} from 'react-native'
import {
	Text,
	useTheme,
	Button,
	Checkbox,
	Divider,
} from 'react-native-paper'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import { BackIcon } from "../components/backIcon"
import { Terms } from '../../TextTerms/terms'
import { Cond } from '../../TextTerms/cond'
import { useUserAuth } from '../../utils/useUserAuth'
import { setUsername, createUserEmailPassword } from '../../utils/firebase'
import { useUserData } from '../../utils/useUserData'

const { width, height } = Dimensions.get('window')

function TermConditions({navigation}) {
	const theme = useTheme()
	const DataCondTerms = [...Terms, ...Cond]
	const [acceptTerms, setAcceptTerms] = useState("unchecked")
	const userData = useUserData()
	const updateDatasUser = useUserData(state => state.updateDatasUser)
	const [isVisibleIndicator, setIsVisibleIndicator] = useState(false)
	const { getParent } = useNavigation()
  
  function saveDatasUserInDB(uid) {
    try{
      SecureStore.setItem("firstname", userData?.firstname)
      SecureStore.setItem("lastname", userData?.lastname)
      SecureStore.setItem("photoURL", userData?.photoURL)
      SecureStore.setItem("phonenumber", userData?.phonenumber)
      SecureStore.setItem("username", userData?.username)
      SecureStore.setItem("idUser", uid)

      const photoURL = userData?.photoURL? {uri: userData?.photoURL} : require("../../assets/avatar.png")
      setIsVisibleIndicator(false)
      updateDatasUser({firstname: userData?.firstname})
      updateDatasUser({lastname: userData?.lastname})
      updateDatasUser({phonenumber: userData?.phonenumber})
      updateDatasUser({photoURL: photoURL})
      updateDatasUser({username: userData?.username})
      updateDatasUser({idUser: uid})
      updateDatasUser({password: "none"})

    }catch(e){
      alert("Il s'est passé une erreur veillez fermer et réouvrir l'application.")
    }
    
  }

	async function submitForm() {
	    setIsVisibleIndicator(true)
	    setAcceptTerms(false)
	    
	    const { uid } = await createUserEmailPassword(userData)
	    setIsVisibleIndicator(false)
	    saveDatasUserInDB(uid)
			// setUsername(uid, userData)
	}

	function RenderItem({item}) {
		return(
			<View
				style={{
					flexDirection: 'row',
					marginVertical: 3,
				}}
			>
				<Text
					style={{
						fontSize: 18,
            fontFamily: 'Poppins-Black'
					}}
				>
				{item.id + 1}.  
				</Text>
				<Text
					style={{
						fontSize: 15,
						paddingRight: 10,
            marginLeft: 10,
            color: theme.colors.onSurface,
						fontFamily: "Poppins-SemiBold",
            width: "95%",
					}}
				>
				{item.text}
				</Text>
			</View>
		)
	}

	function RenderSectionHeader({section}) {
		return (
			<View
				style={{
					marginTop: 3,
					backgroundColor: theme.colors.secondaryContainer,
					paddingHorizontal: 10,
					borderRadius: 10,
				}}
			>
				<Text
					style={{
						fontSize: 25,
						marginVertical: 5,
						color: theme.colors.secondary,
						fontFamily: "Poppins-SemiBold",
					}}
				>
					{section.title}
				</Text>
			</View>
		)
	}

	return (
		<SafeAreaView style={{flex: 1, paddingTop: 10, backgroundColor: theme.colors.background}}>
			<View
				style={{
					width: width - 30,
					alignSelf: 'center',
					paddingTop: 30
				}}
			>
				<Text style={[styles.title, {color: theme.colors.secondary}]} >
					Terms et conditions d'utilisation
				</Text>
				{
					isVisibleIndicator? 
					<ActivityIndicator 
						animating={isVisibleIndicator} 
						size="large"
						color={theme.colors.secondary} 
					/> : null
				}
				<Text style={{color: theme.colors.outline, textAlign: "center", marginVertical: 10, fontFamily: "Roboto-Medium"}} >
					Dernière mise à jour 02.01.2024
				</Text>
			</View>
			<Divider horizontalInset bold />
			<SectionList
				sections={DataCondTerms}
				renderItem={RenderItem}
				renderSectionHeader={RenderSectionHeader}
				keyExtractor={item => item.id}
				stickySectionHeadersEnabled
				ListFooterComponent={() => <View style={{height: height / 5.8, marginBottom: 10,}} />}
				showsVerticalScrollIndicator={false}
				style={{
					paddingHorizontal: 10,
				}}
			/>

			<View
				style={{
					position: "absolute",
					bottom: 10,
					alignItems: "center",
					alignSelf: "center",
					backgroundColor: theme.colors.secondaryContainer,
					paddingHorizontal: 5,
					paddingVertical: 5,
					width: width / 1.1,
					borderRadius: 10,
					height: height / 5.8,
				}}
			>
				<Checkbox.Item
					label="J'accepte les termes et les conditions d'utilisations."
					style={{
						flexDirection: 'row-reverse',
						width: width / 1.1,
						marginBottom: 5,
					}}
					rippleColor={theme.colors.secondaryContainer}
					status={acceptTerms}
					onPress={(e) => {
						setAcceptTerms( value => (
							value === 'unchecked'? "checked" : "unchecked"
						))
					}}
					uncheckedColor={"#fff"}
					color={theme.colors.secondary}
					rippleColor={theme.colors.secondaryContainer}
					labelStyle={{
						fontSize: 16,
						lineHeight: 20,
						fontFamily: "Poppins-SemiBold",
						color: acceptTerms === "checked"? theme.colors.secondary : theme.colors.outline
					}}
				/>
				<Button
					style={{
						height: 50,
						justifyContent: 'center',
						alignSelf: "center",
						width: "100%",
						backgroundColor: acceptTerms === "checked"? theme.colors.secondary : theme.colors.outline
					}}
					labelStyle={{
						fontSize: 20,
						fontWeight: "bold",
						color: theme.colors.secondaryContainer
					}}
					mode="contained"
					disabled={acceptTerms === "unchecked"? true : false}
					onPress={submitForm}
        			rippleColor={theme.colors.secondary}
				>
					Accepter
				</Button>
			</View>

		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection:  "row",
		paddingHorizontal: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 28,
		textAlign: 'center',
		marginHorizontal: 10,
		fontFamily: "Poppins-SemiBold",
	},
	scrollView: {
		width: width,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	termsCond: {
		fontSize: 14,
		marginHorizontal: 10,
		marginVertical: 5
	}
})

export default TermConditions