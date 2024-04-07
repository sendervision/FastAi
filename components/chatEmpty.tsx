import { View, StyleSheet, Pressable, Dimensions } from 'react-native'
import { useTheme, Text, } from 'react-native-paper'

const { width, height } = Dimensions.get("window")

function ChatEmptyText() {
  const theme = useTheme()
  const texte = `Content de te voir par ici. Vous pouvez envoyer votre prémier message pour commencer cette discussion`
  return(
    <View style={styles.chatEmpty} >
      <View style={{ ...styles.containerChatEmpty,  borderColor: theme.colors.tertiary,}} >
        <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 17, color: theme.colors.secondary}}>
          {texte}
        </Text>
      </View>
    </View>
  )
}

function ChatEmptyImage({desc, sendMessage}) {
  const theme = useTheme()
  const image = "Vous pouvez cliquer sur le prompt ci-dessous pour voir la créativité de cette AI en action. Et pour plus de prompt allez dans le menu prompt ci-haut"
  return(
    <View style={styles.chatEmpty} >
      <View style={{ ...styles.containerChatEmpty,  borderColor: theme.colors.tertiary,}} >
        <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 16, color: theme.colors.secondary}} >
          {image}
        </Text>
        <Text style={{fontFamily: 'Poppins-Black', fontSize: 18, marginTop: 10, color: theme.colors.tertiary}} >
          Prompt
        </Text>
        <Pressable
          onPress={() => sendMessage(desc)}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto-Italic',
              color: theme.colors.tertiary
            }}
          >
            {desc}
          </Text>
        </Pressable>
      </View>
      
    </View>
  )
}

export {ChatEmptyImage, ChatEmptyText}

const styles = StyleSheet.create({
  chatEmpty: {
  height: height - 100,
  width: width - 20,
  alignSelf: 'center',
  alignItems: 'center',
  transform: [{rotate: "180deg"}],
  paddingVertical: 150
  },
  containerChatEmpty: {
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10
  }
})
