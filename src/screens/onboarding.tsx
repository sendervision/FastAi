import React, { useState } from "react";
import { useTheme, Text, Button } from 'react-native-paper';
import { View, StyleSheet, ImageBackground } from "react-native"
import { TitleAnime } from "@/components/animations/title";
import { OnboadingDescription } from "@/components/onboarding/description";
import { ButtonAccount } from "@/components/auth/buttonAccount";
import { SecondaryLoginButton } from "@/components/auth/loginButton";

export function OnboardingScreen({navigation}){
  const theme = useTheme()
  
  return(
    <View style={{ flex: 1, backgroundColor: theme.colors.background}}>
      <ImageBackground
        source={require("@/images/bg.jpg")}
        style={styles.imageBackground}
      >
        <TitleAnime />
        <View>
          <OnboadingDescription />
          <ButtonAccount
            label="Crée un compte"
            onPress={() => navigation.navigate("phonenumber")}
          />
          <SecondaryLoginButton />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBackground:{
    flex: 1,
  }
})
