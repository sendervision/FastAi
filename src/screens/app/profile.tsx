import React, { useState } from 'react'
import { 
  View, 
  StyleSheet, 
  Dimensions,
  Pressable
} from 'react-native'
import { useTheme, Avatar, Text, Icon } from 'react-native-paper'
import { IconProfil } from '../../components/avatar'
import { showToast } from '@/utils/toast'

const { width,height } = Dimensions.get('window')

export function ProfileScreen({navigation}) {
  const theme = useTheme()

  const user = {
    name: "XXXXXXXX",
    phonenumber: "xxxxxxxxx",
  }

  const ComponentProfile = ({icon, label, speciality = false}) => {
    const message = "A venir"
    return(
      <Pressable
        style={[
          styles.containerInfo,
          {
            backgroundColor: speciality? theme.colors.onSurface : theme.colors.secondary
          }
        ]}
        onPress={() => showToast(message)}
      >
        <View style={{flexDirection: "row"}} >
          <Avatar.Icon 
            icon={icon} 
            size={45}
            color={speciality? theme.colors.secondaryContainer : theme.colors.onSurface}
            style={{backgroundColor: speciality? "rgba(224, 224, 255, 0.7)" : "rgba(0,180,137, 0.3)"}}
          />
          <Text 
            style= {{
              color: theme.colors.primaryContainer,
              fontSize: 16,
              fontFamily: "Medium",
              marginLeft: 10,
              textAlignVertical: "center",
            }}
          >
            {label}
          </Text>
        </View>
        <Icon
          source={"arrow-right"}
          size={30}
          color={speciality? "rgba(30,41,59, 1)" : null}
        />
      </Pressable>
    )
  }

  return(
    <View style={[styles.container, { backgroundColor: theme.colors.background}]}  >
      <Text 
        style={[
          styles.titlePage,
          {
            color: theme.colors.primaryContainer
          }
        ]}
      >
        Profile
      </Text>
      <IconProfil size={90} />
      <Text 
        style={[
          styles.name,
          {
            color: theme.colors.primaryContainer
          }
        ]} 
      >
        {user.name}
      </Text>
      <Text
        style={[
          styles.name,
          {
            fontSize: 14,
            color: theme.colors.outline,
            marginTop: 0,
          }
        ]}
      >
        +{user.phonenumber}
      </Text>
      <ComponentProfile speciality icon='account' label="Compte" />
      <ComponentProfile icon='tools' label="Paramètres" />
      <ComponentProfile icon='translate' label="Langues" />
      <ComponentProfile icon='comment-question-outline' label="Commenter" />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titlePage: {
    fontSize: 30,
    fontFamily: "InterBold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: "InterBold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  containerInfo: {
    width: "90%",
    height: 70,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  }
  
})
