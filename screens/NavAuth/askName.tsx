import React from 'react'
import { 
  View, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { 
  Text, 
  TextInput, 
  useTheme 
} from 'react-native-paper'
import { BackIcon } from "../../components/backIcon"
import { Logo } from '../../components/Logo'
import { InputForm } from '../../components/inputForm'
import { ButtonForm } from "../../components/buttonForm"
import FormInput from '../../components/formInput'
import { useUserData } from '../../utils/useUserData'

const { width, height } = Dimensions.get("window")

function FormButton({label, onPress, disabled, width_btn= width / 1.2, ...other}){
  const theme = useTheme()
  return(

    <TouchableOpacity onPress={onPress} style={{marginTop: 30}} disabled={disabled} {...other} activeOpacity={0.9}>
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

function AskName ({navigation}){
  const heightStatusBar = StatusBar?.currentHeight
  const theme = useTheme()
  const [firstname, setFirstname] = React.useState("")
  const [lastname, setLastname] = React.useState("")
  const [errorFirstName, setErrorFirstName] = React.useState("")
  const [errroLastName, setErrorLastName] = React.useState("")
  const updateDatasUser = useUserData(state => state.updateDatasUser)

  function checkDataForm(text, id) {
    if (!text) return `Votre ${id} ne dois pas etre vide`
    else if (text.length < 3) return `Votre ${id} doit contenir au minimum 3 caractères`
    else return ""
  }

  function checkLengthName(texte: string, id: number, length: number=3,) {
    if (texte.length < 3){
      return `Votre ${id} doit comporter au minimum ${length} caractères`
    }else return ""
  }

  const submitForm = () => {
    let error = checkLengthName(firstname.trim(), "nom")
    if (error){
      setErrorFirstName(error)
      return
    }else setErrorFirstName("")

    error = checkLengthName(lastname.trim(), "post-nom ou prénom")
    if (error){
      setErrorLastName(error)
      return
    }
    setErrorLastName("")
    setErrorFirstName("")
    updateDatasUser({
      firstname: firstname.trim(), 
      lastname: lastname.trim()
    })
    navigation.navigate("askImageProfile")

  }


  return (
    <SafeAreaView style={{flex: 1, paddingTop: 10, backgroundColor: theme.colors.background}} >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingTop: 20}}
      >
        <View style={styles.header} >
          <BackIcon />
        </View>
        <View style={styles.body} >
          <Text 
            variant='headlineMedium' 
            style={{textAlign: 'center', fontFamily: 'Poppins-SemiBold', color: theme.colors.secondary}}
          >
            Comment nous vous appelerons?
          </Text>
          <Logo />
          <Text
             style={{
               fontFamily: "Medium",
               textAlign: "center",
               marginBottom: 10,
               marginHorizontal: 5,
               fontSize: 14,
               fontFamily: "Poppins-SemiBold",
               color: theme.colors.outline,
             }}
          >
            Nous y sommes presque
          </Text>
          <FormInput 
            placeholder="Votre nom "
            value={firstname}
            errorText={errorFirstName}
            onChangeText={text => {
              text = text.replace(/[^\w\d\s]|\s/g, "")
              setFirstname(text)
            }}
          />
          <FormInput 
            placeholder="Votre prénom"
            value={lastname}
            errorText={errroLastName}
            onChangeText={text => {
              text = text.replace(/[^\w\d\s]|\s/g, "")
              setLastname(text)
            }}
          />
          <FormButton
            label="Suivant"
            onPress={ () => {
              submitForm()
              // navigation.navigate("askImageProfile")
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
    marginTop: 10,
    marginBottom: 30,
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

export default AskName