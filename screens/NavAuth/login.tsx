import React, { useState } from 'react'
import { 
  View, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { 
	Text, 
	TextInput, 
	useTheme,
  Button, 
} from 'react-native-paper'
import { useUserData } from '../../utils/useUserData'
import * as Crypto from 'expo-crypto'
import * as SecureStore from 'expo-secure-store'
import { BackIcon } from "../../components/backIcon"
import { Logo } from '../../components/Logo'
import { InputForm } from '../../components/inputForm'
import FormInput from '../../components/formInput'
import { ButtonForm } from "../../components/buttonForm"
import { AlertAuth } from "../../components/alertAuth"
import { connectUserWithEmailPassword, getUserData } from '../../utils/firebase'

const { width, height } = Dimensions.get("window")

function FormButton({label, onPress, disabled, width_btn= width / 1.2, ...other}){
  const theme = useTheme()
  return(

    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{marginTop: 30}} disabled={disabled} {...other}>
      <Text style={{
        ...styles.button, 
        backgroundColor: theme.colors.secondary, 
        width: width_btn,
        color: theme.colors.secondaryContainer,
      }}>
        {label}
      </Text>
    </TouchableOpacity>

  )
}



function Login (){
	const heightStatusBar = StatusBar?.currentHeight
	const theme = useTheme()
	const [userName, setUserName] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [errorUserName, setErrorUserName] = React.useState("")
	const [errorPassword, setErrorPassword] = React.useState("")
  const [viewPassword, setViewPassword] = useState(false)
	const [loadingButton, setLoadingButton] = React.useState(false)
	const [visibleAlertAuth, setVisibleAlertAuth] = React.useState(false)
  const updateDatasUser = useUserData(state => state.updateDatasUser)
  const [isVisibleActivity, setIsVisibleActivity] = useState(false)


  function log(data) {
    const uid = Crypto.randomUUID()
    try{
      SecureStore.setItem("firstname", data?.firstname)
      SecureStore.setItem("lastname", data?.lastname)
      SecureStore.setItem("photoURL", data?.photoURL)
      SecureStore.setItem("phonenumber", data?.phonenumber)
      SecureStore.setItem("username", data?.username)
      SecureStore.setItem("idUser", uid)

      const photoURL = data.photoURL? data.photoURL : require("../../assets/avatar.png")
      setIsVisibleActivity(false)

      updateDatasUser({firstname: data?.firstname})
      updateDatasUser({lastname: data?.lastname})
      updateDatasUser({phonenumber: data?.phonenumber})
      updateDatasUser({photoURL: photoURL})
      updateDatasUser({username: data?.username})
      updateDatasUser({idUser: uid})

    }catch(e){
      console.log(e)
      alert("Il s'est passé une erreur veillez fermer et réouvrir l'application.")
    }
  }

	function replacePunctuation(texte: string) {
		const text = texte.replace(/\s/g, "")
		const newText = texte.trim().replace(/[^\w\s@]|_/g, "").replace(/\s+/g, "")
		return newText
	}

	function checkUserName(texte: string) {
		// Il permet de vérifier si le username a au minimum 5 caractères(soit string or number)
		return /^[a-zA-Z0-9]{0,}[a-zA-Z0-9]{5,}$/.test(texte)
	}

	async function formSubmit() {
		const resultChekerUsername = checkUserName(userName)
		if (!resultChekerUsername){
			setErrorUserName("Votre nom d'utilisateur doit contenir au minimum 5 caractères")
			return
		}else setErrorUserName("")

		if (password.length < 6){
			setErrorPassword("Votre mot de passe doit comporter au minimum 6 caractères")
			return
		}else setErrorPassword('')
		setLoadingButton(true)

    setIsVisibleActivity(true)
		try{
			result = await connectUserWithEmailPassword(userName, password, setVisibleAlertAuth, setLoadingButton)
			const uid = result.uid
			const username = result.email.split("@")[0]
			const datas = await getUserData(uid)
      log({...datas, username: userName})
		}catch(error){
			// console.log("error: ", error)
			setVisibleAlertAuth(false)
		} 

		setLoadingButton(false)
		
	}


	return (
		<SafeAreaView style={{flex: 1, paddingTop: 50, backgroundColor: theme.colors.background}} >
			{ AlertAuth(visibleAlertAuth, () => setVisibleAlertAuth(false)) }
			<View style={styles.header} >
				<BackIcon />
			</View>
      {
        isVisibleActivity? 
        <ActivityIndicator 
          animating={isVisibleActivity} 
          size="large"
          color={theme.colors.secondary}
        /> : null
      }
			<View style={styles.body} >
				<Text 
					variant='headlineLarge' 
					style={{fontFamily: 'Poppins-SemiBold', textAlign: 'center', color: theme.colors.secondary}}
				>
					Se connecter
				</Text>
				<Logo />
				<Text 
					variant="titleMedium" 
					style={{
						textAlign: "center",
						marginBottom: 10,
            fontSize: 14,
            fontFamily: 'Poppins-SemiBold',
						color: theme.colors.outline,
					}}
				>
					Nous sommes content de vous revoir
				</Text>
        <FormInput
          placeholder="Nom d'utilisateur"
          value={userName}
          left={<TextInput.Icon icon="account" color={theme.colors.secondary}/>}
          onChangeText={
            text => {
              text = text.replace(/[^\w\d\s]|\s/g, "")
              setUserName(text)
            } 
          }
          errorText={errorUserName}
        />
        <FormInput 
          placeholder="Mot de passe"
          value={password}
          onChangeText={text => {
            text = text.replace(/\s/g, "")
            setPassword(text)
          }}
          errorText={errorPassword}
          left={<TextInput.Icon icon="lock" color={theme.colors.secondary}/>}
          right={
            <TextInput.Icon 
              icon={viewPassword? "eye":"eye-off"} 
              onPress={value => setViewPassword(!viewPassword) }
              color={theme.colors.secondary}
            />
          }
          secureTextEntry={!viewPassword}
        />

				<Button
          onPress={formSubmit}
          disabled={isVisibleActivity}
          mode="contained"
          contentStyle={{
            backgroundColor: isVisibleActivity? theme.colors.outline : theme.colors.secondary,
            height: "100%",
          }}
          labelStyle={{fontFamily: 'Poppins-SemiBold', fontSize: 18}}
          style={{width: "60%", height: 50, alignSelf: "center", justifyContent: 'center', marginTop: 20}}
        >
          Se connecter
        </Button>	
			</View>
			<StatusBar backgroundColor={theme.colors.background} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection:  "row",
		paddingHorizontal: 20,
		marginBottom: 30,
    backgroundColor: "transparent",
	},
	body: {
		justifyContent:'center',
    alignItems: "center"
	},
  button: {
    marginTop: height / 12,
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 0,
    alignItems: "center",
    elevation: 30,
  }
})

export default Login