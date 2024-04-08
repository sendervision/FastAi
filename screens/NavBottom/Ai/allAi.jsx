import React, {useState, useEffect, useCallback} from 'react'
import { 
  View, 
  FlatList, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native'
import {useTheme, Button, Text, Surface, Card, withTheme } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import { ScrollHorizontalList } from "../../../components/scrollHorizontalList"
import { IconProfil } from '../../../components/iconProfil'
import { dta } from '../../../datasAi/data'

const { width, height } = Dimensions.get('window')

function Head() {
  const theme = useTheme()

  return(
    <View style={styles.containerHead} >
      <Text style={[styles.title, {color: theme.colors.secondary}]} >Moon</Text>
      <IconProfil />
    </View>
  )
}

function ListFooterComponent() {
  return <View style={{height: 70}} />
}

function ListHeaderComponent({theme}) {
  const { getParent } = useNavigation()
  const parentNavigation = getParent()
  const item = {
    first_name: "ChatGPT4",
    image: {uri: "https://cdn.siasat.com/wp-content/uploads/2023/07/GPT-4.jpg"},
    model: "gpt-3.5-turbo-0125",
    category: 'general',
    desc: "hello world",
    system: "You are a general artificial intelligence who helps people in all areas",
  }

  return(
    <Card style={[styles.card, {backgroundColor: theme.colors.secondaryContainer}]} >
      <Card.Content>
        <Text style={[styles.nameAi, {color: theme.colors.secondary}]} >
          Générale
        </Text>
        <Button 
          mode="contained" 
          style={[styles.buttonChat, {backgroundColor: theme.colors.secondary}]}
          labelStyle={{fontFamily: 'Roboto-Medium', fontSize: 14, color: theme.colors.secondaryContainer}}
          contentStyle={{marginHorizontal: 0,}}
          onPress={() => {
            parentNavigation.navigate('chat', {item: item})
          }}
        >
          Commencer la discussion
        </Button>
      </Card.Content>
    </Card>
  )
}

export function AllAi({navigation}) {
  const theme = useTheme()
  const { getParent } = useNavigation()
  const parentNavigation = getParent()

  const dataGroupThree = []
  let datas = {}
  for (let ai of dta){
    if(!datas[ai.category]){
      datas[ai.category] = []
    }
    datas[ai.category].push(ai)
  }

  return(
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]} >
      <Head />
      <FlatList 
        data={Object.keys(datas)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={withTheme(ListHeaderComponent)}
        ListFooterComponent={ListFooterComponent}
        renderItem={(key) => {
          return(
            <Animatable.View 
              key={key.index}
            >
              <View style={styles.containerHead} >
                <Text style={[
                  styles.textCategory,
                  { color: theme.colors.secondary, textTransform: 'capitalize'}
                  ]} 
                >
                  {key.item}
                </Text>
                <Button 
                  labelStyle={{fontFamily: 'Poppins-SemiBold', color: theme.colors.secondary}}
                  rippleColor={theme.colors.background}
                  onPress={() => navigation.navigate(
                    'listCategory', 
                    {
                      data: datas[key.item],
                      category: key.item
                    }
                  )}
                >
                  Voir tout
                </Button>
              </View>
              <ScrollHorizontalList 
                data={datas[key.item]}
                parentNavigation={parentNavigation}
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
    fontSize: 40
  },
  containerHead: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  textCategory: {
    fontSize: 20,
    fontFamily: "Poppins-Black",

  },
  card: {
    marginVertical: 5,
    elevation: 20,
    height: height / 6,
    width: width - 20,
    alignSelf: 'center',
  },
  buttonChat: {
    borderRadius: 10,
  },
  nameAi: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 30,
  }
})
