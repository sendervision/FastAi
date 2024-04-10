import { useState, useRef } from 'react'
import {
  Title,
  Text, 
  TextInput,
  Button,
  useTheme
} from 'react-native-paper'

import { Dimensions, View, StyleSheet, TouchableOpacity,SafeAreaView, ScrollView } from 'react-native'
import {CountryPicker, CountryList, CountryButton} from 'react-native-country-codes-picker'
import { AntDesign } from '@expo/vector-icons'
import Modal from 'react-native-modal'

import { BackIcon } from "../../components/backIcon"
import FormInput from '../../components/formInput'
import { TranslateX } from '../../components/animateInput'
import ModalConfirmationPhoneNumber from '../../components/modalConfirmationNumber'
import { useUserData } from '../../utils/useUserData'

const { width, height } = Dimensions.get("screen")

function FormButton({label, onPress, disabled, width_btn= width / 1.2, ...other}){
  const theme = useTheme()
  const background_color = disabled ? theme.colors.outline : theme.colors.secondary
  return(

    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{marginTop: 30}} disabled={disabled} {...other}>
      <Text style={{
        ...styles.button, 
        backgroundColor: background_color, 
        width: width_btn, 
        color: theme.colors.secondaryContainer
      }}>
        {label}
      </Text>
    </TouchableOpacity>

  )
}


function ListHeaderComponent({countries, lang, onPress}){
  return (
    <View
      style={{paddingBottom: 20}}
    >
      <Text>Pays Populaire</Text>
      {
        countries?.map((country, index) => {
          return (
            <CountryButton 
              key={index}
              item={country}
              name={country?.name?.['lang' || 'en']}
              onPress={ () => onPress(country)}
            />

          )
        })
      }

    </View>
  )
}


export default function AskPhoneNumber({navigation}){

  const theme = useTheme()
  const emoji = String.fromCodePoint(parseInt("1F642", 16))
  const [phonenumber, setPhoneNumber] = useState("")
  const [formattedValue, setFormattedValue] = useState("")
  const [showCountryPicker, setShowCountryPicker] = useState(false)
  const [nameCountry, setNameCountry] = useState("selectionner votre pays")
  const [codeCountry, setCodeCountry] = useState("+")
  const [animateSelectCountry, setAnimateSelectCountry] = useState(false)
  const [animateInputPhoneNumber, setAnimateInputPhoneNumber] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const updateDatasUser = useUserData(state => state.updateDatasUser)

  const validatePhoneNumber = () => {
    if(phonenumber){
      const num = `${codeCountry} ${phonenumber}`
      updateDatasUser({phonenumber: num})
      navigation.navigate("askPassword")
    }
  }

  return(
    <SafeAreaView style={{flex: 1, paddingTop: 10, backgroundColor: theme.colors.background}} >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingTop: 20, paddingBottom: 30,}}
      >
        <View style={styles.header} >
          <BackIcon />
        </View>
        <View style={{justifyContent:'center', alignItems: 'center'}} >
          <Text 
            style={{fontSize: 30, textAlign: 'center', fontFamily: 'Poppins-SemiBold', color: theme.colors.secondary}}
          >
            Numéro de téléphone
          </Text>
          <Text 
            variant="titleSmall" 
            style={{
              textAlign: "center",
              marginBottom: 30,
              marginTop: 20,
              marginHorizontal: 10,
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
              color: theme.colors.outline,
            }}
          >
            Votre numéro de téléphone vous permettra de récupérer votre compte en cas de perte ou d'oublie
            de mot de passe.
          </Text>
          <ModalConfirmationPhoneNumber 
            isVisibleModal={isVisibleModal} 
            setIsVisibleModal={setIsVisibleModal} 
            navigation={navigation}
            validatePhoneNumber={validatePhoneNumber}
            phonenumber={codeCountry + phonenumber}
          />

          <CountryPicker 
            show={showCountryPicker}
            lang='fr'
            pickerButtonOnPress={ item => {
              setNameCountry(item.name.fr)
              setCodeCountry(item.dial_code)
              setPhoneNumber("")
              setShowCountryPicker(false)
            }}
            ListHeaderComponent={ListHeaderComponent}
            popularCountries={["cd", 'bi','ug', "rw", "fr", 'us', "pl", 'id']}
          />
          <TranslateX animate={animateSelectCountry} onChangeValueAnimate={setAnimateSelectCountry}>
            <TouchableOpacity 
              onPress={() => setShowCountryPicker(true)} 
              style={[styles.box_input_country, {backgroundColor: theme.colors.secondaryContainer}]}
            >
              <AntDesign name='caretdown' size={30} color={theme.colors.secondary} />
            
              <Text style={{...styles.text_country, color: codeCountry==="+"? "gray" : theme.colors.secondary}}>
                {
                  nameCountry.length > 30 ? nameCountry.slice(0, 27) + "..." : nameCountry
                }
              </Text>
            </TouchableOpacity>
          </TranslateX>

          <TranslateX animate={animateInputPhoneNumber} onChangeValueAnimate={setAnimateInputPhoneNumber}>
          <FormInput
            placeholder="Numéro de téléphone"
            left={<TextInput.Affix text={codeCountry} onPress={() =>console.log('hello')}/>}
            keyboardType='numeric'
            returnKeyType="send"
            value={phonenumber}
            onChangeText={
              text => {
                text = text.replace(/[^\w\d\s]|\s/g, "")
                if (codeCountry === "+") setAnimateSelectCountry(true) // cette condition oblige à l'utilisateur de choisir un pays pour entrer le numéro de téléphone
                else setPhoneNumber(text.length < 13? text : phonenumber )
              } 
            }
          />
          </TranslateX>
          
                
          <FormButton
            label="Suivant"
            onPress={() => {
                if (!phonenumber){
                  setAnimateInputPhoneNumber(true)
                  return
                }
                setIsVisibleModal(true)
              }
            }
          />
          <Button
            style={{marginTop: 10}}
            rippleColor={theme.colors.background}
            labelStyle={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              color: theme.colors.secondary
            }}
            onPress={() => {
              updateDatasUser({phonenumber: ""})
              navigation.navigate("askPassword")
            }}
          >
            Sauter
          </Button>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height / 5
  },
  header: {
    flexDirection:  "row",
    paddingHorizontal: 20,
    marginBottom: 40,
    marginTop: 10,
  },
  box_input_country: {
    width: width / 1.2,
    height: 55,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "gray",
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text_country: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 5,
    width: "90%",
    textAlign: "left",
  },
  button: {
    marginTop: height / 12,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 0,
    alignItems: "center",
    elevation: 30,
  }

})
