import React, { useState, useContext, useEffect, useCallback } from 'react'
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TextInput,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import {
  useTheme,
  Appbar,
  Avatar,
  Text,
  Menu
} from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'
import * as Crypto from 'expo-crypto'
import { GiftedChat } from 'react-native-gifted-chat'
import { isSameDay } from "react-native-gifted-chat/lib/utils";
import dayjs from "dayjs"
import * as MediaLibrary from 'expo-media-library'
import { InputMessage } from '../../components/inputMessage'
import { RenderSystemMessage } from '../../components/renderSystemMessage'
import { RenderInputToolbar } from '../../components/renderInputToolbar'
import { RenderBubble } from "../../components/renderBubble"
import { MenuChat } from '../../components/menuChat'
import { PreferencesContext, useMessageToImageScreen } from '../../context/store'
import { useUserData } from '../../utils/useUserData'
import { ChatEmptyImage, ChatEmptyText } from '../../components/chatEmpty'
import { 
  dbMessages as db,
  dbChat,
  useUserConversation,
} from '../../utils/database'
import { getResponse, getResponseGemini, generateImage } from '../../models'

const { width, height } = Dimensions.get("window")

export function Chat({navigation, route}) {
  const theme = useTheme()
  const item = route?.params?.item
  const other = route?.params?.other
  const name = item?.first_name
  const imageProfil = item?.image
  const first_message = item?.desc

  const firstnameUser = useUserData(state => state.firstname)
  const lastnameUser = useUserData(state => state.lastname)
  const fullname = firstnameUser + " " + lastnameUser
  const myID = 1
  const tablename = (name + item?.category + 'dethimo').replace(/ /g, "")

  const [messages, setMessages] = React.useState([])
  const preferences = useContext(PreferencesContext)
  const listUsersToChat = useUserConversation(state => listUsersToChat)
  const toggleListUsersToChat = useUserConversation(state => state.toggleListUsersToChat)
  const [isTyping, setIsTyping] = useState(false)

  const {
    theme: { dark: isDarkTheme }
  }  = preferences
  const fontSize = 16

  const loadMessages = useCallback(() => {
    let MSG = []
    db.transaction(
      tx => {
        tx.executeSql(`SELECT * FROM ${tablename};`,
          [],
          (_, { rows }) => {
            for (let i of rows._array){
              const message = {
                _id: i["_id"],
                text: i["text"],
                createdAt: new Date(i["createdAt"]),
                image: i["image"],
                received: parseInt(i['user_id']) === 1? false : true,
                system: preferences.viewMessageWithSystem,
                user: {
                  _id: parseInt(i['user_id']), 
                  name: parseInt(i['user_id']) === 1? fullname : name,
                }

              }
              MSG.push(message)
            }
            setMessages(MSG.reverse())
          },
          (_, error) => {
            // console.log("Error: ", error)
          }
        )
      },
      error => {
        console.log("ERROR", error)
      },
      success => {
        // console.log("SUCCESS", success)
      }
    )
  }, []);

  const saveMessage  = useCallback(async (message, tbName) =>{
    db.transaction(
      (tx) => {
         tx.executeSql(`INSERT INTO ${tbName} (_id, text, createdAt, image, user_id, name) VALUES (?, ?, ?, ?, ?, ?);`,
          [...message],
          (_, result) => {
            // console.log("Sauvegarder avec succès")
          },
          (_, error) => {
            // console.log("Ils s'est produit une erreur")
          },
        )
      },
      null,
      loadMessages
   );
  }, []);

  const deleteOneMessage = useCallback((_id) =>{
    db.transaction(
      (tx) => {
         tx.executeSql(`DELETE FROM ${tablename} WHERE _id = ?`,
          [_id],
          (_, result) => {
            // console.log("Supprimer avec succès")
          },
          (_, error) => {
            // console.log("Ils s'est produit une erreur")
          },
        )
      },
      null,
      loadMessages
   );
  }, [])

  const deleteAllConversation = useCallback(() =>{
    db.transaction(
      (tx) => {
         tx.executeSql(`DELETE FROM ${tablename}`,
          [],
          (_, result) => {
            // console.log("Supprimer avec succès")
          },
          (_, error) => {
            // console.log("Ils s'est produit une erreur")
          },
        )
      },
      null,
      loadMessages
   );
  }, [])

  const insertDataToDBMessage = useCallback(() => {
    dbChat.transaction(
      (tx) => {
         tx.executeSql(`INSERT INTO listconversation (tablename) VALUES (?);`,
          [tablename],
          (_, result) => {
            // console.log("insert")
          },
          (_, error) => {
            console.log("Ils s'est produit une erreur")
          },
        )
      },
      (error) => {console.log("error insert: ", error)},
      // (success) => {console.log("success", success)}
    );
  }, [])

  const checkBotAndInsertBotInDB = useCallback(() => {
    let add;
    dbChat.transaction(
      (tx) => {
         tx.executeSql(`SELECT * FROM listconversation WHERE tablename = ?`,
          [tablename],
          (_, result) => {
            for (let i of result.rows._array){
              if (tablename === i.tablename){
                add = true
              }
              else add = false
            }
            if (!add){
              insertDataToDBMessage()
            }
          },
          (_, error) => {
            console.log("Ils s'est produit une erreur")
            console.log(error)
          },
        )
      },
      null,
    );
  }, [])

  const checkAndSendMessageToGemini = useCallback(() => {
    if (other){
      sendImageMessage(other?.image, other?.question)
    }
  }, [])

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync()
    })()
  }, [])

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tablename} (_id VARCHAR, text TEXT, createdAt VARCHAR, image TEXT, user_id VARCHAR, name VARCHAR);`,
        [],
        (_, result) => {
          // console.log("Table créé avec succès")
        },
        (_, error) => {
          // console.log(`La création de la table conversation a été une echec`)
          // console.log("ERROR: ", error)
        }
      )},
      (error) => {},
      (success) => {}
    );
    checkAndSendMessageToGemini()
    loadMessages()
  }, [])

  const checkedMessage = (valueTextInput) => {
    if (!valueTextInput.trim()){
      alert('Votre message ne doit pas etre vider')
      return
    }
    sendMessage(valueTextInput)
  }

  const sendImageMessage = (uri, text="") => {
    const uuid = Crypto.randomUUID()
    const date = new Date()
    const msg = {
      _id: uuid, 
      text: "",
      createdAt: date, 
      received: true,
      system: preferences.viewMessageWithSystem,
      image: uri,
      user: {
        _id: myID, 
        name: fullname,
      }
    }
    saveMessage([
      uuid,
      text, 
      date.toString(), 
      uri, 
      String(myID), 
      fullname
    ], tablename)
    setIsTyping(true)
    getResponseGemini(text, uri, tablename, item, setIsTyping, saveMessage)
    checkBotAndInsertBotInDB()
  }

  const sendMessage = async (valueTextInput) => {
    setIsTyping(true)
    const uuid = Crypto.randomUUID()
    const date = new Date()
    const image = ""
    const messageSaved = [uuid, valueTextInput, date.toString(), image, String(myID), fullname]
    const msg = {
      _id: uuid, 
      text: valueTextInput,
      createdAt: date, 
      received: true,
      system: preferences.viewMessageWithSystem,
      user: {
        _id: myID, 
        name: fullname,
      }
    }
    if (item.category === "Image Generator"){
      saveMessage(messageSaved, tablename)
      generateImage(valueTextInput, tablename, item, setIsTyping, saveMessage)
      return
    }

    saveMessage(messageSaved, tablename)
    getResponse(
      valueTextInput, 
      tablename, 
      item,
      setIsTyping,
      saveMessage
    )
    checkBotAndInsertBotInDB()
  }

  const renderDay = (props) => {
    const { createdAt } = props.currentMessage
    if (
      props.currentMessage === null ||
      isSameDay(props.currentMessage, props.previousMessage)
    ) {
      return null
    }

    return (
      <View style={{width: "100%", alignItems: 'center'}}>
        <Text style={{fontFamily: "Poppins-SemiBold"}} >
          {dayjs(createdAt).locale("en").format("DD.MM.YYYY")}
        </Text>
      </View>
    )
  };

  const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages => 
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Avatar.Image source={imageProfil} size={50} style={{marginHorizontal: 10}} />
        <Appbar.Content 
          titleStyle={{fontFamily: "Poppins-SemiBold", color: theme.colors.secondary}} 
          title={name}
        />
        <MenuChat 
          deleteAllConversation={deleteAllConversation}
          category={item?.category}
          tablename={tablename}
        />
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: myID
        }}
        alwaysShowSend={true}
        loadEarlier={false} // affiche le bouton pour recharger les messages antérieur
        onLoadEarlier={() => {}} // fonction appeler lors du chargement de loadEarlier
        showUserAvatar={false}
        timeFormat='LT'
        dateFormat='ll'
        isTyping={isTyping}
        renderAvatarOntop={true}
        renderBubble={props => <RenderBubble props={props}/>}
        renderChatFooter={props => props}
        bottomOffset={5}
        renderDay={renderDay}
        renderLoading={() => (
            <ActivityIndicator size={30} color={theme.colors.secondary} />
          )}
        renderInputToolbar={props => {
          const newProps = {
            ...props,
            checkedMessage: checkedMessage,
            sendMessage: sendMessage,
            userItem: item,
            sendImageMessage: sendImageMessage,
            model: item?.model,
            user: {_id: myID}
          }
          return(
            <RenderInputToolbar props={newProps} />
           )
        }}
        renderChatEmpty={props => {
          return(
            <>
              {
                item?.category === "Image Generator"?
                <ChatEmptyImage desc={item?.desc} sendMessage={sendMessage} />:
                <ChatEmptyText />
              }
            </>
          )
        }}
        renderSystemMessage={props => {
          const newProps= {
            props: props,
            deleteOneMessage
            // onLongPress: onLongPressMessageText,
          }
          return <RenderSystemMessage newProps={newProps}/>
        }}
        messagesContainerStyle={{ backgroundColor: theme.colors.background }}

      />
      <View style={{height: 40 }}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  chatEmpty: {
    height: height - 100,
    width: width - 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: "180deg"}],
  },
  containerChatEmpty: {
    borderWidth: 2,
    padding: 20,
    borderRadius: 10,
  }
})
