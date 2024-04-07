import { useState, useRef, useCallback,useMemo, useEffect } from 'react'
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native'
import { 
  Text,
  useTheme,
  Buttom,
  TextInput,
  Appbar,
} from 'react-native-paper'
import Entypo from '@expo/vector-icons/Entypo'
import BottomSheet, { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useModalProfil } from "../context/storeProfil"
import { useUserData } from '../utils/useUserData'

const { width, height } = Dimensions.get("window")

export function Profil() {
  const theme = useTheme()
  const bottomSheetRef = useModalProfil(state => state.bottomSheetRef)
  const isOpen = useModalProfil(state => state.isOpen)
  const toggleModal = useModalProfil(state => state.toggleModal)
  const snapPoints = useMemo(() => ["95%", "95%"], [])
  const {firstname, lastname, photoURL, username, phonenumber} = useUserData()
  const name = `${firstname} ${lastname}`

  // console.log(useUserData())

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1){
      useModalProfil.getState().isOpen = false
    }
  }, [])

  const Item = ({labelTop, labelBottom}) => {
    return(
      <View style={{marginHorizontal: 30, marginBottom: 10}} >
        <Text style={[styles.textIndicatorInfo, {color: theme.colors.surface}]} >
          {labelTop}
        </Text>
        <Text style={[styles.textInfo, {color: "#fff"}]} >
          {labelBottom? " " + labelBottom : "Aucun " + labelTop}
        </Text>
        <View style={{width: width - 50, backgroundColor: "#fff"}} />
      </View>
    )
  }

  return(
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{backgroundColor: "transparent", opacity: 0.8}}
      handleStyle={[styles.handleStyle]}
      handleIndicatorStyle={[styles.handleIndicatorStyle, {backgroundColor: theme.colors.secondary}]}
    >
      <ImageBackground
        source={photoURL}
        resizeMode="cover"
        blurRadius={20}
        style={{flex: 1}}
      >
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 30,
          color: "#fff",
          textAlign: 'center',
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        Profile
      </Text>
      <Image 
        source={photoURL}
        style={{
          alignSelf: 'center', 
          width: width - 200,
          height: width - 200,
          borderRadius: width - 200,
          marginTop: 10,
          backgroundColor: theme.colors.secondary
        }}

      />
      <Text style={[styles.name, {color: "#fff"}]} >
        {name.length > 15? name.slice(0, 13) + "..." : name}
      </Text>
      <ScrollView>
        <Item labelTop={"Nom"} labelBottom={firstname} />
        <Item labelTop={"Prénom"} labelBottom={lastname} />
        <Item labelTop={"Username"} labelBottom={"@"+username} />
        <Item labelTop={"Numéro de téléphone"} labelBottom={phonenumber} />
      </ScrollView>
      
      </ImageBackground>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  handleStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 30,
    opacity: 0.8,
  },
  handleIndicatorStyle: {
    width: 50,
    opacity:0.8,
  },
  container: {
    width: "100%",
    height: "100%",
    alignSelf: 'center',
    padding: 10,
    opacity: 0.5
  },
  name: {
    fontFamily: "Poppins-Black",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
  },
  closeIcon: {
    marginLeft: 30,
    marginTop: 10,
  },
  containerInfos: {
    width: "90%",
    height: "27%",
    borderRadius: 20,
    alignSelf: 'center',
    opacity: 1
  },
  containerInfo: {
    width: "90%",
    height: "25%",
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    opacity: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  textIndicatorInfo:{
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: "Roboto-Medium",
  },
  textInfo: {
    fontSize: 25,
    fontFamily: "Poppins-SemiBold"
  }
})