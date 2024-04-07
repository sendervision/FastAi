import { useState,useEffect, useCallback } from 'react'
import { 
  Text,
  useTheme,
  Avatar,
  Badge,
  ActivityIndicator,
} from 'react-native-paper'
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import dayjs from 'dayjs'
import { Bar } from '../../components/bar'
import { InputMessage } from '../../components/inputMessage'
import { IconProfil } from '../../components/iconProfil'
import { 
  dbChat,
  dbMessages,
  useUserConversation
} from '../../utils/database'
import { dta as datasBot } from '../../datasAi/data'
import { data as dataOfficialBot } from "../../datasAi/officialBot"
import { useUserData } from '../../utils/useUserData'

const { width, height } = Dimensions.get("window")
// const offset = 

function Head() {
  const theme = useTheme()
  return(
    <View style={styles.containerHead} >
      <Text style={{...styles.title, color: theme.colors.secondary}} >
        Discussions
      </Text>
      <IconProfil/>
    </View>
  )
}

export function Chats() {
  const theme = useTheme()
  const tablename = 'listconversation'
  const [listesConversation, setListesConversation] = useState([])
  const { getParent } = useNavigation()
  const parentNavigation = getParent()
  const listUsersToChat = useUserConversation(state => state.listUsersToChat)
  const toggleListUsersToChat = useUserConversation(state => state.toggleListUsersToChat)

  const RenderItem = ({item, index}) => {

    const onLongPress = () => {
      
    }

    const onPress = () => {
      parentNavigation.navigate('chat', {item: item}) 
    }
    
    const DateTimeMessage = new Date(item.createdAt)
    const hour = dayjs(DateTimeMessage).hour().toString()
    const minute = dayjs(DateTimeMessage).minute().toString()
    const dateMessage = dayjs(DateTimeMessage).locale("en").format("DD.MM.YYYY")

    return (item?
    <TouchableOpacity
      key={index}
      onLongPress={onLongPress}
      activeOpacity={0.9}
      onPress={onPress}
      style={{...styles.containerBot, backgroundColor: theme.colors.secondaryContainer}}
    >
      <View style={{flexDirection: 'row', alignItems: 'row'}} >
        <Avatar.Image source={item.image} size={50}/>
        <View style={{marginLeft: 20, marginRight: 5}} >
          <Text 
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 18,
              color: theme.colors.secondary
            }} 
          >
            {item.first_name.length > 18? item.first_name.slice(0, 17) + "..." : item.first_name}
          </Text>
          <Text style={{color: theme.colors.outline, fontFamily: 'Roboto-Italic'}} >
            {
              item?.text?.length > 30? item?.text.slice(0, 25) + "..." : item?.text
            }
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'space-between', alignSelf: 'center'}} >
        <Text style={{ fontSize: 12, marginBottom: 5, fontFamily: 'Roboto-Italic' }}>
          {dateMessage}
        </Text>
        <Text style={{color: theme.colors.secondary, fontFamily: "Poppins-SemiBold", textAlign: 'right', fontSize: 12 }} >
          {`${hour}:${minute}`}
        </Text>
      </View>
      
    </TouchableOpacity> : null
  )}

  const listeUsers = useCallback((bots) => {
    for (let bot of [...datasBot, ...dataOfficialBot]){
      const TBname = (bot.first_name + bot?.category + 'dethimo').replace(/ /g, "")
      for (let i of bots){
        if (TBname === i.tablename){
          conver.push(bot)
        }
      }
    }
    setListesConversation(conver.reverse())
  },[listUsersToChat])

  const getLastMessage = (tbName) => {
    return new Promise((resolve, reject) => {
      dbMessages.transaction(
        (tx) => {
           tx.executeSql(`SELECT * FROM ${tbName}`,
            [],
            (_, { rows }) => {
              const messages = rows._array
              resolve(messages.slice(-1)[0])
            },
            (_, error) => {
              // console.log("Ils s'est produit une erreur")
              // console.log(error)
            },
          )
        },
        (error) => {},
        (success) => {}
      );
    }) 
  }

  const deleteUser = (tbName) => {
    dbChat.transaction(
      (tx) => {
         tx.executeSql(`DELETE FROM ${tablename} WHERE tablename = ?`,
          [tbName],
          (_, result) => {
            // console.log("Supprimer avec succès")
          },
          (_, error) => {
            // console.log("Ils s'est produit une erreur")
          },
        )
      },
      null,
   );
  }

  const getAllUsers = async () => {
    dbChat.transaction(
      (tx) => {
         tx.executeSql(`SELECT * FROM ${tablename}`,
          [],
          async (_, { rows }) => {
            const bots = rows._array
            const conver = []
            for (let bot of [...datasBot, ...dataOfficialBot]){
              const TBname = (bot.first_name + bot?.category + 'dethimo').replace(/ /g, "")
              for (let i of bots){
                if (TBname === i.tablename){
                  const lastMsg = await getLastMessage(TBname)
                  if (lastMsg){
                    bot = {...bot,text: lastMsg?.text, createdAt: lastMsg?.createdAt}
                    conver.push(bot)
                  }else deleteUser(TBname)
                }
              }
            }
            setListesConversation(conver.reverse())
            // console.log(conver)
          },
          (_, error) => {
            console.log("Ils s'est produit une erreur", error)
            // console.log(error)
          },
        )
      },
      (error) => {},
      (success) => {}
    );
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        getAllUsers()
      })()
    }, [])
  )



  return(
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Head />
      <View style={{height: 20}} />
      <FlatList 
        data={listesConversation}
        ListFooterComponent={() => <View style={{height: 70}}/>}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return(
            <View style={{height, width, alignItems: "center"}} >
              <View style={{marginTop: 150}}>
                <Text 
                  style={{
                    fontFamily: 'Poppins-SemiBold', 
                    fontSize: 18,
                    marginHorizontal: 20,
                    color: theme.colors.outline
                  }} >
                  Vous n'avez aucune discussions pour le moment veuillez vous rendre dans l'onglet accueil et commencer à discuter
                </Text>
              </View>
            </View>
          )
        }}
        renderItem={({item, index}) => {
          return (
            <Animatable.View
              animation="fadeIn"
              delay={(index + 1) * 100}
              useNativeDriver
            >
              <RenderItem 
                item={item} 
                index={index} 
                onLongPress={() => {}}
              />
            </Animatable.View>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android"? StatusBar.currentHeight : 0,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30
  },
  containerHead: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  badge: {
    position: "absolute", 
    bottom: 0, 
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  containerBot: {
    flexDirection: "row", 
    marginHorizontal: 10, 
    marginVertical: 5, 
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 10,
  }
  
})
