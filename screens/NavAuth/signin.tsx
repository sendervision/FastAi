import React from 'react'
import { 
  View, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { 
	Text, 
	TextInput, 
	useTheme 
} from 'react-native-paper'
// import { ref, set, onValue } from 'firebase/database' 
// import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useUserData } from '../../utils/useUserData'
import { BackIcon } from "../../components/backIcon"
import { Logo } from '../../components/Logo'
import FormInput from '../../components/formInput'
import { InputForm } from '../../components/inputForm'
import { ButtonForm } from "../../components/buttonForm"
import { AlertUsername } from '../../components/alertUsername'
import { getUsername } from '../../utils/firebase'

const { width, height } = Dimensions.get("window")

function FormButton({label, onPress, disabled, width_btn= width / 1.2, ...other}){
  const theme = useTheme()
  return(

    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{marginTop: 30}} disabled={disabled} {...other}>
      <Text style={{
        ...styles.button, 
        backgroundColor: disabled? theme.colors.outline : theme.colors.secondary, 
        width: width_btn,
        color: theme.colors.secondaryContainer,
      }}>
        {label}
      </Text>
    </TouchableOpacity>

  )
}

function Signin ({navigation}){
	const heightStatusBar = StatusBar?.currentHeight
	const theme = useTheme()
	const [userName, setUserName] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [errorUserName, setErrorUserName] = React.useState("")
	const [errorPassword, setErrorPassword] = React.useState("")
  	const [isVisibleActivity, setIsVisibleActivity] = React.useState(false)
	const [visibleAlertUsername, setVisibleAlertUsername] = React.useState(false)
	const updateDatasUser = useUserData(state => state.updateDatasUser)

	function replacePunctuation(texte: string) {
		const text = texte.replace(/\s/g, "")
		const newText = texte.trim().replace(/[^\w\s@]|_/g, "").replace(/\s+/g, "")
		return newText
	}

	function checkUserName(texte: string) {
		// Il permet de vérifier si le username a au minimum 5 caractères(soit string or number)
		return /^[a-zA-Z0-9]{0,}[a-zA-Z0-9]{5,}$/.test(texte)
	}

	function formSubmit() {
		const resultChekerUsername = checkUserName(userName)
		if (!resultChekerUsername){
			setErrorUserName("Votre nom d'utilisateur doit contenir au minimum 5 caractères")
			return
		}else setErrorUserName("")

		setIsVisibleActivity(true)

		// Methode permetant de vérifier si le username existe ou pas 
		getUsername(userName)
			.then(dataUid => {
				if (dataUid?.uid){
					setVisibleAlertUsername(true)
					setIsVisibleActivity(false)
				}
				else{
					// updateUser({username: userName.toLowerCase(), password: password})
          setErrorUserName('')
          updateDatasUser({username: userName.toLowerCase()})
					setIsVisibleActivity(false)
					navigation.navigate("askPhoneNumber")
				}

			})
			.catch(error => {
        setIsVisibleActivity(false)
				console.log("ERROR", error)
			})
		
	}



	return (
		<SafeAreaView style={{flex: 1, paddingTop: 10, backgroundColor: theme.colors.background}} >
			<AlertUsername
				visible={visibleAlertUsername}
				changeVisible={setVisibleAlertUsername}
				userName={userName}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{paddingTop: 20, paddingBottom: 30,}}
			>
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
						style={{fontSize: 30, textAlign: 'center', fontFamily: 'Poppins-SemiBold', color: theme.colors.secondary}}
					>
						Crée vos identifiants
					</Text>
					<Logo />
					<Text 
						variant="titleSmall" 
						style={{
							textAlign: "center",
							marginBottom: 10,
							marginHorizontal: 10,
            				fontSize: 14,
							fontFamily: 'Poppins-SemiBold',
							color: theme.colors.outline,
						}}
					>
						Ces identifiants sont cruciaux pour récupérer votre compte en cas de perte ou de 
						réconnexion à votre compte.
					</Text>
        	<FormInput
	            placeholder="Nom d'utilisateur (ex: toto1520)"
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
          <FormButton
            label="Suivant"
            disabled={isVisibleActivity}
            onPress={ () => {
              formSubmit()
              // navigation.navigate("askName")
            }}          
          />
				
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection:  "row",
		paddingHorizontal: 20,
		marginBottom: 40,
		marginTop: 10,
	},
	body: {
		justifyContent:'center',
    alignItems: 'center',
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

export default Signin