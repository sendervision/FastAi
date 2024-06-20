import { View, ImageBackground, StyleSheet } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { useUserData } from "../../utils"
import { ContainerProfile } from "../../components/ContainerProfile"
import { CardProfile } from "../../components/cardProfile"
import { ButtonAccount } from "../../components/auth/buttonAccount"
import { useRef } from "react"
import { BottomSheetLoading } from "../../components/bottomSheetLoading"

export function ConfirmScreen(){
  const theme = useTheme()
  const bottomSheetModalRef = useRef(null)
  const { phonenumber, firstname, lastname } = useUserData()

  const openBottomSheetModal = () => {
    bottomSheetModalRef.current?.present()
  }
  
  return(
    <View style={{ flex: 1, backgroundColor: theme.colors.background}}>
      <BottomSheetLoading bottomSheetModalRef={bottomSheetModalRef} />
      <ContainerProfile />
      <CardProfile />
      <ButtonAccount
        label="Confirmer"
        onPress={openBottomSheetModal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imageBackground:{
    flex: 1,
  },

})
