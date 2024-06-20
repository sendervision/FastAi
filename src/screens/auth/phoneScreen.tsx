import React, { useState, useEffect } from "react";
import { useTheme, Text } from 'react-native-paper';
import { View, StyleSheet, ImageBackground } from "react-native"
import { ButtonAccount } from "@/components/auth/buttonAccount";
import { SecondaryLoginButton } from "@/components/auth/loginButton";
import { AppBarAuth } from "../../components/auth/appbarAuth";
import { InputAuth } from "../../components/auth/inputAuth";
import { useUserData } from "../../utils";

export function PhoneScreen({navigation}){
  const theme = useTheme()
  const [phonenumber, setPhonenumber] = useState("")
  const [phonenumberConfirm, setPhonenumberConfirm] = useState("")
  const [disabledButonAccount, setDisabledButtonAccount] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const updateUser = useUserData(set => set.updateUser)

  useEffect(() => {
    if (phonenumber.trim() && phonenumberConfirm.trim()){
      if(phonenumber.trim() === phonenumberConfirm.trim()){
        setDisabledButtonAccount(false)
        setErrorMessage("")
        return
      }else {
        setErrorMessage("Les 2 numéros ne correpondent pas")
        setDisabledButtonAccount(true)
      }
    } else setErrorMessage("Entrer le même numéro de téléphone")
    

  }, [phonenumberConfirm])

  const goNextPage = () => {
    updateUser({ phonenumber })
    navigation.navigate("password")
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
          <Text style={[styles.title, {color: theme.colors.primaryContainer}]} >Commencer par vous inscrire</Text>
          <InputAuth
            placeholder="Votre numéro de téléphone"
            value={phonenumber}
            onChange={text => {setPhonenumber(text.nativeEvent.text)}}
            keyboardType="phone-pad"
          />
          <InputAuth
            placeholder="Confirmer numéro de téléphone"
            value={phonenumberConfirm}
            onChange={text => {setPhonenumberConfirm(text.nativeEvent.text)}}
            keyboardType="phone-pad"
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
        <SecondaryLoginButton />
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
    marginTop: 20,
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
    marginTop: 20,
    marginLeft: 5,
  }
})
