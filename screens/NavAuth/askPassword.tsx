import { useState, useRef } from 'react'
import {
  Title,
  Text, 
  TextInput,
  Button,
  useTheme
} from 'react-native-paper'
import { Dimensions, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'

import { BackIcon } from "../../components/backIcon"
import { Logo } from '../../components/Logo'
import FormInput from '../../components/formInput'
import { TranslateX } from '../../components/animateInput'
import { useUserData } from '../../utils/useUserData'

const { width, height } = Dimensions.get("screen")

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

export default function AskPassword({navigation}){

  const theme = useTheme()
  const emoji = String.fromCodePoint(parseInt("1F642", 16))
  const [password, setPassword] = useState("")
  const [viewPassword, setViewPassword] = useState(false)
  const [errorTextPassword, setErrorTextPassword] = useState("")
  const [animateInputPassword, setAnimateInputPassword] = useState(false)
  const updateDatasUser = useUserData(state => state.updateDatasUser)

  const submitForm = () => {
    if(password.trim().length < 6){
      setAnimateInputPassword(true)
      setErrorTextPassword("Votre mot de passe doit avoir au minimum 6 caractères")
      return
    }
    setErrorTextPassword("")
    updateDatasUser({password: password})
    navigation.navigate("askName")
  }

  
  return(
    <SafeAreaView style={{flex: 1, paddingTop: 10, backgroundColor: theme.colors.background}} >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingTop: 20, paddingBottom: 30,}}
      >
        <View style={styles.header} >
          <BackIcon />
        </View>
        <View style={{justifyContent:'center', alignItems: 'center'}} >
          <Text 
            style={{fontSize: 30, textAlign: 'center', fontFamily: 'Poppins-SemiBold', color: theme.colors.secondary}}
          >
            Mot de passe
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
            Veuillez entrer un mot de passe fort d'au minimum 6 caractères
          </Text>
          <TranslateX animate={animateInputPassword} onChangeValueAnimate={setAnimateInputPassword}>
            <FormInput 
              placeholder="Mot de passe"
              value={password}
              onChangeText={text => {
                text = text.replace(/\s/g, "")
                setPassword(text)
              }}
              errorText={errorTextPassword}
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
          </TranslateX>
          
          <FormButton
            label="Suivant"
            onPress={() => {
              if (password) { 
                submitForm() 
              } else { 
                setAnimateInputPassword(true)
                setErrorTextPassword("Vous n'avez pas mis de mot de passe")
              }
            }}          
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height / 5
  },
  header: {
    flexDirection:  "row",
    paddingHorizontal: 20,
    marginBottom: 40,
    marginTop: 10,
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
