import { useState, useRef } from 'react'
import {
  Title,
  Text, 
  useTheme
} from 'react-native-paper'

import { Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

const { width, height } = Dimensions.get("screen")

export default function ModalConfirmationPhoneNumber({isVisibleModal, setIsVisibleModal, phonenumber, validatePhoneNumber}){
  const theme = useTheme()

  return(
    <Modal 
        isVisible={isVisibleModal} 
        backdropOpacity={0.6}
        animationInTiming={400}
        swipeDirection="left"
      >
        <View 
          style={[styles.container, {backgroundColor: theme.colors.secondary}]}
        >

          <Text style={[styles.texte_info, {color: theme.colors.secondaryContainer}]} >
            Etes-vous sur de vouloir utiliser le numéro  
            <Text style={{fontWeight: 'bold', fontSize: 20, color: theme.colors.surface}}>
              {"  " + phonenumber}
            </Text> ?
          </Text>
          <View style={styles.box_button}>
            <TouchableOpacity onPress={() => setIsVisibleModal(false)} style={{marginTop: 10}} >
              <Text style={styles.button} >Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                setIsVisibleModal(false)
                validatePhoneNumber()
                }
              } style={{marginTop: 10, color: theme.colors.secondaryContainer, fontFamily: 'Poppins-SemiBold'}} >
              <Text style={styles.button} >Continuer</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'center',
    height:height / 6,
    borderRadius: 10,
    elevation: 20,
  },
  texte_info: {
    color: "#fff",
    fontSize: 18,
    textAlign: 'center',
    fontFamily: "Poppins-SemiBold",
    marginHorizontal: 10,
  },
  box_button: {
    flexDirection: 'row',
    width: "100%",
    marginTop: 10,
    Horizontal: 10,
    justifyContent: "space-between"
  },
  button: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    fontFamily: 'Poppins-SemiBold'
  }
})


