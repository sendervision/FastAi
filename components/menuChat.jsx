import { useState, useContext } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import {
  useTheme,
  Menu,
  Button,
  Text,
  Portal,
  Dialog,
} from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { PreferencesContext } from '../context/store'
import { ExportConversation } from "../utils/exportConversation"

function AlertAswer({messages, visible, setVisible, messageAlert, confirmeFunc}) {
  const theme = useTheme()

  return(
    <Portal>
      <Dialog 
        visible={visible} 
        onDismiss={() => setVisible(false)}
        style={{
          backgroundColor: theme.colors.secondary
        }}
      >
        <Dialog.Icon icon="alert" color={"red"} />
        <Dialog.Title style={{ 
          textAlign: "center", 
          fontFamily: "Poppins-SemiBold",
          color: "red",
        }} >
          Attention
        </Dialog.Title>
        <Dialog.Content>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Roboto-Medium",
              textAlign: 'center',
              color: theme.colors.secondaryContainer,
            }}
          >
            {messageAlert}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => setVisible(false)}
            labelStyle={{
              color: theme.colors.secondaryContainer,
              fontFamily: "Roboto-Medium",
              fontSize: 14,
            }}
          >
            Annuler
          </Button>
          <Button 
            mode='contained'
            labelStyle={{
              color: theme.colors.secondary,
              fontFamily: "Roboto-Medium",
              fontSize: 14,
            }}
            style={{
              backgroundColor: theme.colors.secondaryContainer
            }}
            onPress={() => {
              confirmeFunc()
              setVisible(false)
            }}
          >
            Continuer
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}


export function MenuChat({deleteAllConversation, category,tablename}) {
  const theme = useTheme()
  const [isVisibleMenu, setIsVisibleMenu] = useState(null)
  const [messageAlert, setMessageAlert] = useState("")
  const [isAutorise, setIsAutorise] = useState(false)
  const [isViewAlert, setIsViewAlert] = useState(false)
  const navigation = useNavigation()
  const preference = useContext(PreferencesContext)
  const { supportImport } = preference

  return(
    <>
      <AlertAswer 
        visible={isViewAlert} 
        setVisible={setIsViewAlert}
        messageAlert={messageAlert}
        confirmeFunc={deleteAllConversation}
      />
      <Menu
        visible={isVisibleMenu}
        onDismiss={() => setIsVisibleMenu(false)}
        style={{ marginRight: 10, }}
        anchor={
          <Entypo 
            name="dots-three-vertical" 
            size={24} 
            color={theme.colors.secondary} 
            style={{marginRight: 20}}
            onPress={() => setIsVisibleMenu(true)}
          />
        }
      >
        <Menu.Item 
          style={styles.menuItem}
          titleStyle={{ color: theme.colors.secondary, fontFamily: "Roboto-Medium"}}
          onPress={() => {
            setMessageAlert("Toute les messages de cette conversation seront supprimer et seront irrécupérable. Etes-vous sur de vouloir continuer? ")
            setIsVisibleMenu(false)
            setIsViewAlert(true)
          }} 
          leadingIcon='delete'
          title="Tout supprimer"
        />
        {
          category !== "Image Generator"?
          <Menu.Item 
            disabled={!supportImport}
            style={styles.menuItem}
            titleStyle={{ 
              color: supportImport? theme.colors.secondary : theme.colors.outline, 
              fontFamily: "Roboto-Medium"
            }}
            onPress={() => {
              ExportConversation(tablename)
              setIsVisibleMenu(false)
            }} 
            leadingIcon='file-export'
            title="Exporter les messages" 
          />:null
        }
        {
          category === "Image Generator"?(
          <Menu.Item 
            style={styles.menuItem}
            titleStyle={{ color: theme.colors.secondary, fontFamily: "Roboto-Medium"}}
            onPress={() => {
              setIsVisibleMenu(false)
              navigation.navigate("otherPrompt")
            }} 
            leadingIcon='fountain-pen-tip'
            title="Voir plus des prompts" 
          />) : null
        }
      </Menu>
    </>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    marginVertical: 2, 
    marginHorizontal: 10, 
    borderRadius: 5,
  }
})

