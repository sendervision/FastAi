import React from 'react'
import { useTheme, Portal, Modal, Button, Text } from 'react-native-paper'
import { StyleSheet, View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window")

export function ModalPickCameraImage({ visible, setVisible, selectImage }){
  const theme = useTheme()
  const hideModal = () => setVisible(false)

  return(
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={hideModal} 
        contentContainerStyle={[
          styles.contentContainerStyle,
          { backgroundColor: theme.colors.secondary }
        ]}
      >
        <Text style={[styles.textStyle, { color: theme.colors.secondaryContainer}]} > 
          Voulez-vous ouvrir la camera ou la galerie? 
        </Text>
        <View style={{flexDirection: 'row', justifyContent: "flex-end", margin: 10}}>
          <Button 
            labelStyle={{color: theme.colors.secondaryContainer}} 
            mode="outline"
            onPress={() => selectImage("camera")}
          >
            Camera
          </Button>
          <Button 
            labelStyle={{color: theme.colors.secondary}} 
            style={{
              backgroundColor: theme.colors.secondaryContainer
            }}
            mode="contained"
            onPress={() => selectImage("galerie")}
          >
            Galerie
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: width - 60,
    height: height / 4.5,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign: 'center',
    marginHorizontal: 20,
  }
})
