import { useState, useEffect } from 'react'
import { 
  TouchableOpacity, 
  Dimensions, 
  StyleSheet, 
  ToastAndroid, 
  Platform, 
  View,
  Image,
} from 'react-native'
import { Text, useTheme, } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import * as Sharing from 'expo-sharing'
import { isSameDay } from "react-native-gifted-chat/lib/utils";
import dayjs from "dayjs"
import { createNotifications } from 'react-native-notificated'
import { useSettings } from '../utils/params'
import { useMedia } from '../utils/mediaUtils'
import { TextMessage } from './textMessage'


const { width } = Dimensions.get("window")

function IconSystemMessage({onPress, icon, name, color}) {
  const theme = useTheme()
  return(
    <TouchableOpacity 
      style={[
        styles.containerIconMessage,
        {borderColor: color? color : theme.colors.secondary}
      ]}
      onPress={onPress}
    >
      <MaterialIcons 
        name={icon} 
        size={16} 
        color={color? color : theme.colors.secondary}
      />
      <Text style={[styles.textCopy, {color: color? color : theme.colors.secondary}]} >{name}</Text>
    </TouchableOpacity>
  )
}

export function RenderSystemMessage({
  newProps, 
}) {
  const theme = useTheme()
  const props = newProps.props
  const idUser = props.currentMessage.user._id
  const myName = props.currentMessage.user.name
  const fontSize = useSettings((state) => state.fontSize)
  const clipboard = useMedia(state => state.clipboard)
  const { useNotifications } = createNotifications()
  const { notify } = useNotifications()
  const [isAvailableToShare, setIsAvailableToShare] = useState();


  useEffect(() => {
    (async () => {
      if (await Sharing.isAvailableAsync()){
        setIsAvailableToShare(true)
      }
    })()
  }, [])

  const showNotificationToCopy = () => {
    if (Platform.OS === "android"){
      ToastAndroid.show("Le text à été copier avec succès", ToastAndroid.SHORT)
    }else{
      notify("success", {
        params: {
          title: "Copier",
          description: "Le text à été copier avec succès"
        }
      })
    }
  }

  const RenderTime = ({props}) => {
    const { createdAt } = props.currentMessage
    let hour = dayjs(createdAt).hour().toString()
    let minute = dayjs(createdAt).minute().toString()
    hour = hour.length === 1? "0" + hour : hour
    minute = minute.length === 1? "0" + minute : minute

    return (
      <Text style={{
        fontFamily: "Poppins-SemiBold", 
        fontSize: 12,
        textAlignVertical: 'center',
        color: idUser !== 1? theme.colors.primary : theme.colors.primaryContainer
      }} >
        {`${hour}:${minute}`}
      </Text>
    )
  };

  return(
    <>
      <TouchableOpacity 
        activeOpacity={1}
        // onLongPress={() => newProps.onLongPress("", props.currentMessage)}
        style={[styles.containerMessage, {
          backgroundColor: idUser !== 1? theme.colors.secondaryContainer : theme.colors.secondary,
          }
        ]}
      >
        {
          props.currentMessage.image?
          <Image
            source={{uri: props.currentMessage.image}}
            style={{
              width: width - 70,
              height: width - 100,
              borderRadius: 10,
              marginBottom: 10,
            }}
          /> : null
        }
        <TextMessage
          selectable={true}
          style={{
            ...styles.message, 
            color: idUser !== 1? theme.colors.secondary : theme.colors.secondaryContainer, 
            fontSize: fontSize,
          }}
        >
          {props?.currentMessage?.text}
        </TextMessage>
        <View style={styles.containerFooter} >
          <Text 
            style={{
              color: idUser !== 1? theme.colors.primary : theme.colors.primaryContainer, 
              ...styles.name
              
            }}
          >
            {
              idUser !== 1? myName : props.currentMessage.user.name
            }
          </Text>
          <RenderTime props={props} />
        </View>
      </TouchableOpacity >
      <View style={{flexDirection: 'row', justifyContent:  "flex-end", marginRight: 20}} >
        {
          props.currentMessage.text?
            <IconSystemMessage
              onPress={() => {
                clipboard(newProps.props.currentMessage.text)
                showNotificationToCopy()
              }}
              icon='content-copy'
              name='Copier'
            />: 
            null
        }
        {
          isAvailableToShare && props.currentMessage?.image?
          <IconSystemMessage
            onPress={async () => {
              await Sharing.shareAsync(props.currentMessage?.image)
            }}
            icon='share'
            name='Partager'
          /> : null

        }
        <IconSystemMessage
          onPress={() => {
            newProps.deleteOneMessage(newProps.props.currentMessage._id, newProps.tablename)
          }}
          icon='delete'
          name='Supprimer'
          color="red"
        />
        
      </View>
    </>
  ) 

}

const styles = StyleSheet.create({
  containerMessage: {
    width: width - 50,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 3,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10
  },
  containerIconMessage: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginHorizontal: 3,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginTop: 3,
    marginBottom: 15
  },
  textCopy: {
    fontSize: 10,
    fontFamily: "Poppins-SemiBold",
    marginLeft: 3
  },
  message: {
    fontFamily: "Roboto-Medium", 
    textAlign: "left",
    letterSpacing: 0.00,
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontWeight: 'bold',
    textAlign: "left",
    marginHorizontal: 5,
    fontSize: 12,
  },
  containerFooter: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    // marginBottom: 5,
    marginTop: 10,
    alignItems: 'center',
  }
})
