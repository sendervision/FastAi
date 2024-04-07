import React, { useState } from 'react'
import { View, Dimensions, TextInput, StyleSheet } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTheme, Text, Button } from 'react-native-paper'
import Modal from 'react-native-modal'
import NetInfo from '@react-native-community/netinfo'
import { pickImageAsync } from '../utils/mediaUtils'
import { ModalPickCameraImage } from "./modalPickCameraImage"

const { width, height } = Dimensions.get("window")

export function RenderInputToolbar({props}) {
  const theme = useTheme()
  const navigation = useNavigation()
  const [typing, setTyping] = React.useState(false)
  const [uriPickImage, setUriPickImage] = React.useState("")
  const [isVisiblePickModal, setIsVisibleModal] = React.useState(false)
  const [valueTextInput, setValueTextInput] = useState("")
  const [isVisibleModalNetwork, setIsVisibleModalNetwork] = useState(false)
  const [isConnected, setIsConnected] = useState(null)

  const checkIsConnected = async() => {
    const isConn = await NetInfo.fetch().then(state => state.isConnected)
    return isConn
  }

  const onChangeText = (text) => {
    setValueTextInput(text)
  }

  const ModalNetwork = () => {
    return(
      <Modal visible={isVisibleModalNetwork} avoidKeyboard>
        <View style={{
          backgroundColor: theme.colors.errorContainer,
          height: height / 3.5,
          width: width - 30,
          borderRadius: 20,
          padding: 20,
        }} >
          <MaterialCommunityIcons
            name="wifi-off"
            color={theme.colors.error}
            size={50}
            style={{alignSelf: "center"}}
          />
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              color: theme.colors.onSurface,
            }}
          >
            Veillez activer votre donner donnée mobile ou vous connectez sur un wifi
          </Text>
          <Button
            mode="contained"
            onPress={() => setIsVisibleModalNetwork(false)}
            style={{
              width: 100, 
              borderRadius: 10, 
              backgroundColor: theme.colors.error,
              alignSelf: "flex-end",
              marginTop: 30,
            }}
          >
            Okay
          </Button>
        </View>
      </Modal>
    )
  }

  const selectImage = async (choice) => {
    setIsVisibleModal(false)
    const result = await pickImageAsync(choice)
    if (result?.uri){
      props.sendImageMessage(result?.uri)
    }
  }

  const toggleSend = async () => {
    const isConn = await checkIsConnected()
    if (isConn){
      props.checkedMessage(valueTextInput)
      setValueTextInput("")
    }else{
      setIsVisibleModalNetwork()
    }
  }

  
  return(
    <>
      <View style={[styles.separator, {backgroundColor: theme.colors.outline}]}/>
      <ModalPickCameraImage
        visible={isVisiblePickModal}
        setVisible={setIsVisibleModal}
        selectImage={selectImage}
      />
      {<ModalNetwork />}
      <View style={{...styles.container, backgroundColor: theme.colors.background}}>
        {
          valueTextInput === "" && props.model === "gemini-pro-vision"?
          <FontAwesome
            name="camera"
            size={27}
            color={theme.colors.secondary}
            style={styles.icon}
            onPress={() => setIsVisibleModal(true)}
          />: null
        }

        <TextInput 
          placeholder="Entrer votre question"
          multiline
          value={valueTextInput}
          onChangeText={onChangeText}
          cursorColor={theme.colors.secondaryContainer}
          style={[styles.textInput,{
            minWidth: props.model !== "gemini-pro-vision"? "90%" : valueTextInput !== ""? "90%" : "70%",
            maxWidth: "85%",
            backgroundColor: theme.colors.secondary,
            color: theme.colors.secondaryContainer,
            fontFamily: "Roboto-Medium",
          }]}

        />
        <FontAwesome
          name="send"
          size={27}
          color={theme.colors.secondary}
          style={styles.icon}
          onPress={() => toggleSend()}
        />
        
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{ 
    flexDirection: "row", 
    width: "100%", 
    justifyContent: "space-between",
    alignItems: 'center', 
    maxHeight: 120,
    paddingHorizontal: 10,
  },
  separator: {
    width: width / 1.1,
    height: 1, 
    marginBottom: 5,
    alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
    padding: 0,
  },
  textInput: {
    minHeight: 45,
    maxHeight: 70,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    marginRight: 5,
  }
})