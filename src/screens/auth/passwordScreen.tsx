import React, { useState, useEffect } from "react";
import { useTheme, Text } from 'react-native-paper';
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native"
import { ButtonAccount } from "@/components/auth/buttonAccount";
import { AppBarAuth } from "../../components/auth/appbarAuth";
import { InputAuth } from "@/components/auth/inputAuth";
import { useUserData } from "../../utils";

export function PasswordScreen({navigation}){
  const theme = useTheme()
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [disabledButonAccount, setDisabledButtonAccount] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const updateUser = useUserData(set => set.updateUser)

  useEffect(() => {
    if (password.length < 5){
      setErrorMessage("Au minimum 5 caractères sont requis")
      return
    }
    if (password.trim() && passwordConfirm.trim()){
      if(password.trim() === passwordConfirm.trim()) {
        setErrorMessage(""); 
        setDisabledButtonAccount(false)
      }else {
        setErrorMessage("Ces mots de passe ne correspondent pas")
        setDisabledButtonAccount(true)
      }
    } else{
      setErrorMessage("Répéter le même mot de passe")
    }
  }, [passwordConfirm, password])

  const goNextPage = () => {
    updateUser({ password })
    navigation.navigate("fullname")
  }
  
  return(
    <View style={{ flex: 1, backgroundColor: theme.colors.background}}>
      <ImageBackground
        source={require("@/images/bg.jpg")}
        style={styles.imageBackground}
      >
        <AppBarAuth 
          title="Inscription" 
          onPressBack={() => navigation.goBack()}
        />
        <View style={styles.containerForm}>
          <Text style={[styles.title, {color: theme.colors.primaryContainer}]} >Sécuriser votre compte</Text>
          <InputAuth
            placeholder="Votre mot passe"
            value={password}
            onChange={text => {setPassword(text.nativeEvent.text)}}
            secureTextEntry
          />
          <InputAuth
            placeholder="Confirmer le mot de passe"
            value={passwordConfirm}
            onChange={text => {setPasswordConfirm(text.nativeEvent.text)}}
            secureTextEntry
          />
          {
            errorMessage &&
            <Text
              style={[styles.textError, {color: theme.colors.error}]}
            >
              {errorMessage}
            </Text>
          }
          
        </View>
        <ButtonAccount
          label="Continuer"
          disabled={disabledButonAccount}
          onPress={goNextPage}
        />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBackground:{
    flex: 1,
  },
  containerForm: {
    padding: 15,
    height: "60%",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "InterBold",
    textTransform: "uppercase",
  },
  textError: {
    fontSize: 12,
    fontFamily: "InterBold",
    marginTop: 10,
    marginLeft: 5,
  }
})
