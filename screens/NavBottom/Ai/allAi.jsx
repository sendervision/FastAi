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
import {useTheme, Button, Text, Surface } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import { ScrollHorizontalList } from "../../../components/scrollHorizontalList"
import { IconProfil } from '../../../components/iconProfil'
import { dta } from '../../../datasAi/data'

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
    fontFamily: "Poppins-Black"
  },
  
})
