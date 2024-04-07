import { useState,useEffect } from 'react'
import { 
  Text,
  Appbar,
  Button,
  useTheme,
  Avatar,
  IconButton,
} from 'react-native-paper'
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  Dimensions,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Bar } from '../../components/bar'
import { InputMessage } from '../../components/inputMessage'
import { ModalPickCameraImage } from "../../components/modalPickCameraImage"
import { IconProfil } from '../../components/iconProfil'
import { data } from "../../datasAi/officialBot"
import { getPermissionAsync, pickImageAsync } from '../../utils/mediaUtils'

const { width, height } = Dimensions.get("window")

function ContainerIcon({name, onPress}) {
  const theme = useTheme()
  // const IconBar = icon? Ionicons : MaterialCommunityIcons
  return (
    <IconButton 
      icon={name}
      size={30}
      mode="contained"
      onPress={onPress}
      iconColor={theme.colors.secondary}
      style={{backgroundColor: theme.colors.secondaryContainer}}
    />
  )
}



export function Home({navigation}) {
  const theme = useTheme()
  const [isViewContainerAI, setIsViewContainerAi] = useState(false)
  const [heightContainerBody, setHeightContainerBody] = useState(height / 2.7)
  const [imageToQuestion, setImageToQuestion] = useState(null)
  const [isVisibleModalImage, setIsVisibleModalImage] = useState(false)
  const { getParent } = useNavigation()
  const parentNavigation = getParent()
  const geminiAi = data.filter(item => item.model === "gemini-pro-vision")[0]

  const selectImage = async (choice) => {
    setIsVisibleModalImage(false)
    const result = await pickImageAsync(choice)
    if (result?.uri) setImageToQuestion(result["uri"])
  }

  const onSendQuestion = (question: string) => {
    parentNavigation.navigate('chat', {item: geminiAi, other:{question: question, image: imageToQuestion}})
    setImageToQuestion("")
  }

  return(
    <SafeAreaView style={[styles.container,{backgroundColor: theme.colors.background}]}>
      <Bar
        left={
          <ContainerIcon 
            key={1} 
            name="chat"
            onPress={() => navigation.navigate('Chats')}
          />
        }
        right={[
          <IconProfil key={1} />, 
          <ContainerIcon 
            name="cog"
            key={2}
            onPress={() => navigation.navigate("Settings")}
          />
        ]}
      />
      <ModalPickCameraImage
        visible={isVisibleModalImage}
        setVisible={setIsVisibleModalImage}
        selectImage={selectImage}
      />
      <View style={{height: heightContainerBody, marginTop: 30, marginBottom: 10}} >
        <Text style={{...styles.appName, color: theme.colors.secondary}} variant="displayMedium">
          Gemini
        </Text>
        {
          imageToQuestion?
          <ImageBackground source={{uri: imageToQuestion}}  style={styles.imageToQuestion} >
            <Entypo 
              name="cross" 
              size={28} 
              color="#fff" 
              style={{alignSelf: "flex-end"}} 
              onPress={() => setImageToQuestion(null)}
            />
          </ImageBackground>: null
        }
        <InputMessage
          onPressCamera={() => setIsVisibleModalImage(true)}
          onSendQuestion={onSendQuestion}
        />
      </View>
      {
        isViewContainerAI? null:
      <View 
        style={[
          styles.containerBottomAi, 
          {backgroundColor: theme.colors.secondaryContainer}
        ]}
      >
        <Text
         style={{
          fontFamily: "Poppins-SemiBold",
          fontSize: 16,
          marginLeft: 15,
         }} >
         Les bots officiels
         </Text>
        <FlatList 
          data={data}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{gap: 10}}
          contentContainerStyle={{gap: 10, paddingBottom: 20 }}
          keyExtractor={(item, index) => item.first_name + index.toString()}
          numColumns={3}
          renderItem={({item, index}) => {
            return(
              <TouchableOpacity
                activeOpacity={1} 
                disabled={item?.disabled}
                style={{margin: 10}} 
                key={index}
                onPress={() => {
                  parentNavigation.navigate('chat', {item: item})
                }}
              >
                <Avatar.Image source={item.image} size={65} />
                <Text 
                  style={{
                    marginLeft: 4,
                    fontFamily: "Roboto-Medium",
                    textAlign: "center",
                    marginTop: 3,
                  }}
                >
                  {item.first_name.length > 10? item.first_name.slice(0, 9) + "..." : item.first_name}
                </Text>
              </TouchableOpacity>
            )
          }}
        />
        
      </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android"? StatusBar.currentHeight : 0,
  },
  containerIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  containerBottomAi: {
    width: width - 30,
    height: height / 2.8,
    alignSelf: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    // marginTop: 10
  },
  appName:{
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  containerTextInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%", 
    marginHorizontal: 50, 
    alignSelf: 'center',
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  imageToQuestion:{
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
    marginLeft: 20
  }
})
