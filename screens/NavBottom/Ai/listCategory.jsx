import React, {useState, useEffect} from 'react'
import { 
  View, 
  FlatList, 
  StyleSheet, 
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native'
import {
  useTheme, 
  Button, 
  Text, 
  Searchbar, 
  Surface,
  Avatar,
  Card, 
  Appbar,
  Menu,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { CopyText } from '../../../utils/copyText'


function Head({category, color, navigation}) {
  const theme = useTheme()
  const [isVisibleMenu, setIsVisibleMenu] = useState(false)
  const { getParent } = useNavigation()
  const parentNavigation = getParent()

  return(
    <Appbar.Header>
      <Appbar.BackAction 
        color={theme.colors.secondary} 
        onPress={() => navigation.goBack()} 
      />
      <Appbar.Content 
        titleStyle={[styles.title, { color: theme.colors.secondary }]} 
        title={category}
      />
      {
        category === "Image Generator"?
        <Menu
          visible={isVisibleMenu}
          onDismiss={() => setIsVisibleMenu(false)}
          anchor={
            <Appbar.Action 
              icon="dots-vertical" 
              onPress={() => {setIsVisibleMenu(true)}} 
            />
          }
        >
          <Menu.Item 
            title="Voir plus des prompts"
            onPress={() => {
              parentNavigation.navigate('otherPrompt')
              setIsVisibleMenu(false)
            }}
          />
        </Menu> : null
      }
    </Appbar.Header>
  )
}

export function ListCategory({navigation, route}) {
  const theme = useTheme()
  const { getParent } = useNavigation()
  const parentNavigation = getParent()
  const [datas, setDatas] = useState([])
  const category = route.params.category
  const [textSearch, setTextSearch] = useState("")

  const labelButtonChat = category === "Image Generator"? "Utiliser ce modèle" : "Demarrer la discussion"

  useEffect(() => {
    const newList = route.params.data.filter(data => {
      return data.first_name.toUpperCase().includes(textSearch.toUpperCase()
      )})
    setDatas(newList)
  },[textSearch])

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


  return(
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]} >
      <Head category={category} navigation={navigation}/>
      <Searchbar 
        style={styles.searchbar} 
        value={textSearch}
        onChangeText={setTextSearch}
        placeholder='Recherche...'
      />
      <FlatList 
        data={datas}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{height: 70}}/>}
        renderItem={({index, item}) => {
          return(
            <Card style={[styles.card, {backgroundColor: theme.colors.secondaryContainer}]} >
              <Card.Cover 
                style={[styles.cardCover, {shadowColor: theme.colors.secondary}]} 
                source={item.image} 
              />
              <Card.Content>
                <Text variant="titleLarge" style={[styles.nameAi, {color: theme.colors.secondary}]} >
                  {item.first_name}
                </Text>
                <Text 
                  variant="bodyMedium" 
                  style={styles.description}
                  onLongPress={() => {
                    if (category === "Image Generator") CopyText(item.desc, "Prompt copier");
                  }}
                >
                  {item.desc}
                </Text>
                <Button 
                  mode="contained" 
                  style={styles.buttonChat}
                  labelStyle={{fontFamily: 'Roboto-Medium', fontSize: 14}}
                  contentStyle={{marginHorizontal: 0,}}
                  onPress={() => parentNavigation.navigate('chat', {item: item})}
                >
                  {labelButtonChat}
                </Button>
              </Card.Content>
            </Card>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === "android"? StatusBar.currentHeight : 0,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    marginLeft: 20,
    textTransform: "capitalize",
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 20,
  },
  cardCover: {
    marginHorizontal: 5,
    marginVertical: 5,
    height: 260,
    elevation: 10,
  },
  description:{
    fontSize: 14,
    fontFamily: "Roboto-Italic",
  },
  nameAi: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    marginTop: 10,
  },
  containerHead: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 0,
    paddingTop: 5,
  },
  searchbar: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  buttonChat: {
    borderRadius: 10,
    width: 200,
    alignSelf: "flex-end",
    marginTop: 20,
  },
  
})
