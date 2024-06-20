import React, { useState, useEffect } from "react";
import { useTheme, Text } from 'react-native-paper';
import { View, StyleSheet, ImageBackground } from "react-native"
import { ButtonAccount } from "@/components/auth/buttonAccount";
import { SecondaryLoginButton } from "@/components/auth/loginButton";
import { AppBarAuth } from "../../components/auth/appbarAuth";
import { InputAuth } from "@/components/auth/inputAuth";
import { useUserData } from "../../utils";

export function FullnameScreen({navigation}){
  const theme = useTheme()
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [disabledButonAccount, setDisabledButtonAccount] = useState(true)
  const updateUser = useUserData(set => set.updateUser)

  useEffect(() => {
    if(firstname.trim() && lastname.trim() && firstname.length >= 3 && lastname.length >= 3){
      setDisabledButtonAccount(false)
    }
    else setDisabledButtonAccount(true)
  }, [firstname, lastname])

  const goNextPage = () => {
    updateUser({ firstname, lastname })
    navigation.navigate("confirm")
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
          <Text style={[styles.title, {color: theme.colors.primaryContainer}]} >Comment nous vous appelerons</Text>
          <InputAuth
            placeholder="Votre nom"
            value={firstname}
            onChange={text => {setFirstname(text.nativeEvent.text)}}
          />
          <InputAuth
            placeholder="Votre prénom"
            value={lastname}
            onChange={text => {setLastname(text.nativeEvent.text)}}
          />

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
    marginTop: 20,
    marginLeft: 5,
  }
})
