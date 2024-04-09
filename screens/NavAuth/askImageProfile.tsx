import React, { useState, useEffect} from 'react'
import { 
  View, 
  SafeAreaView, 
  StyleSheet, 
  Dimensions, 
  Image, 
  Pressable,
  Platform,
  TouchableOpacity
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { 
  Text, 
  TextInput, 
  useTheme,
  Portal,
  Dialog,
  Button,
  Avatar
} from 'react-native-paper'
import { FontAwesome5, Entypo } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { RenderImageProfile } from '../../components/renderImageProfil'
import { BackIcon } from "../../components/backIcon"
import { Logo } from '../../components/Logo'
import { InputForm } from '../../components/inputForm'
import { ButtonForm } from "../../components/buttonForm"
import { ModalImage } from '../../components/modalImage'
import { useUserData } from '../../utils/useUserData'

const { width, height } = Dimensions.get("window")

type buttonDialog = {
  children: string,
  important: boolean,
  onPress: () => void
}

function FormButton({label, onPress, disabled, width_btn= width / 1.2, ...other}){
  const theme = useTheme()
  return(

    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.9}
      style={{marginTop: 30, alignSelf: 'center'}} 
      disabled={disabled} {...other}
    >
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

function AskImageProfile ({navigation}){
  const heightStatusBar = StatusBar?.currentHeight
  const theme = useTheme()
  const [urlImage, setUrlImage] = React.useState("")
  const [visibleDialogImage, setVisibleDialogImage] = useState(false)
  const [permissionsCamera, setPermissionsCamera] = useState(false)
  const [permissionsMedia, setPermissionsMedia] = useState(false)
  const [viewImage, setViewImage] = useState(false)
  const updateDatasUser = useUserData(state => state.updateDatasUser)


  async function openCameraOrGalerie(type: string) {
    let response;
    setVisibleDialogImage(false)
    if (type.toLowerCase() === "camera"){
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if(status === 'granted'){
        response = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
      })
      }
    }
    if (type.toLowerCase() === "galerie"){
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if(status === 'granted'){
        response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        })
      }
    }
    if (!response.canceled){
      setUrlImage(response.assets[0].uri)
    }
  }

  function ButtonDialog({children, important, onPress}: buttonDialog) {
    return <Button
      style={{
        backgroundColor: important && theme.colors.primary,
        marginHorizontal: 5,
      }}
      textColor={important && theme.colors.primaryContainer}
      onPress={onPress}
    >
      {children}
    </Button>
  }

  function ModalToSelectCameraOrImage() {
    return <Portal>
      <Dialog visible={visibleDialogImage} onDismiss={() => setVisibleDialogImage(false)} >
        <Dialog.Content>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}} >
          <View>
            <Entypo 
              name="images"
              size={40}
              color={theme.colors.secondary}
              onPress={() => openCameraOrGalerie("galerie")}
            />
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                marginTop: 5,
                color: theme.colors.onSurface
              }}
            >
            Photos
            </Text>
          </View>
          <View>
            <Entypo 
              name="camera"
              size={40}
              style={{alignSelf: 'center'}}
              color={theme.colors.secondary}
              onPress={() => openCameraOrGalerie("camera")}
            />
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                marginTop: 5,
                color: theme.colors.onSurface
              }}
            >
            Camera
            </Text>
          </View>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  }

  function IconImageUpload() {
    return(
      <Pressable
      style={{
        height: 200,
        width: 200,
        borderRadius: 200,
        backgroundColor: theme.colors.secondaryContainer,
        marginVertical: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPress={async () => {
        if (Platform.OS !== "web") {
            await ImagePicker.requestCameraPermissionsAsync();
            await ImagePicker.requestMediaLibraryPermissionsAsync()
        }
        setVisibleDialogImage(true)
      }}
      >
        <FontAwesome5 
          name="upload" 
          size={60} 
          color={theme.colors.secondary}
          
        />
        <Text           
          style={{
            color: theme.colors.secondary,
            fontSize: 14,
            marginTop: 10,
            fontFamily: 'Poppins-SemiBold',
            textAlign: 'center'
          }} 
        >
          image
        </Text>
        
      </Pressable>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, paddingTop: 30, backgroundColor: theme.colors.background}} >
      <View style={styles.header} >
        <BackIcon />
      </View>
      {ModalToSelectCameraOrImage()}
      {
        ModalImage({
          visible: viewImage, 
          //hiddenImage: () => setViewImage(false), 
          source: {uri: urlImage},
          change: () => {
            setViewImage(false)
            setVisibleDialogImage(true)
          },
          hiddenImage: () => setViewImage(false),
        })
      }
      <View style={styles.body} >
        <Text 
          variant='headlineMedium' 
          style={{textAlign: 'center', fontFamily: "Poppins-SemiBold", color: theme.colors.secondary}}
        >
          Ajouter votre photo de profile
        </Text>
        <Text 
           style={{
             textAlign: "center", 
             color: theme.colors.outline,
             fontFamily: "Roboto-Medium",
           }} 
        >
           Vous pouver ignorer cette étapes
        </Text>
          
        {
          !urlImage? 
          <IconImageUpload/> : 
          <RenderImageProfile urlImage={urlImage} onPress={() => setVisibleDialogImage(true)} />
        }
        <FormButton
          label="Suivant"
          onPress={() => {
            updateDatasUser({photoURL: urlImage})
            navigation.navigate("termConditions")
          }}          
          />
        
      </View>
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
    alignItems: "cnter",
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

export default AskImageProfile