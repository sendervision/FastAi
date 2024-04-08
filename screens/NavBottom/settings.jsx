import React, { useRef, useState } from 'react'
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import { 
  View, 
  ScrollView, 
  FlatList, 
  StyleSheet, 
  Platform, 
  StatusBar,
  SafeAreaView,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTheme, Text, Button, Switch, Portal, Dialog } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store'
import * as MailComposer from 'expo-mail-composer'
import { HeaderAnimated } from "../../components/headerAnimated"
import { DialogFontSize } from '../../components/dialog/dialogFontSize'
import { PreferencesContext } from '../../context/store';
import { checkPermissionsToSecurity } from '../../utils/params'
import { useUserData } from '../../utils/useUserData'
import {dbChat, dbMessages} from '../../utils/database'

const { width, height } = Dimensions.get('window');
const headerHeight = 300;
const headerFinalHeight = 70;
const imageSize = (headerHeight / 3) * 2;

const BoxedIcon = ({ name, backgroundColor, color }) => {
  return (
    <View style={{ backgroundColor, padding: 4, borderRadius: 6 }}>
      <Ionicons name={name} size={25} color={color? color : '#fff'} />
    </View>
  );
};

const Colors = {
  primary: '#1063FD',
  muted: '#3A5A92',
  background: '#EFEEF6',
  gray: '#6E6E73',
  lightGray: '#DCDCE2',
  green: '#4FEE57',
  lightGreen: '#DBFFCB',
  red: "#B71C1C",
  yellow: '#FCC70B',
};

function IconOption({item, color}) {
  const theme = useTheme()
  if (item.viewIcon === false) return null
  return item.component? 
    <item.component/> : 
    <Ionicons name="chevron-forward" size={20} color={color? color : theme.colors.primary} />
  
}

function BlockSetting({data, isDarkTheme}) {
  const theme = useTheme()
  return(
    <View style={[styles.block, {backgroundColor: theme.colors.secondaryContainer}]}>
      <FlatList
        data={data}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, {backgroundColor: theme.colors.secondary}]} />
        )}
        renderItem={({ item }) => {
          return<TouchableOpacity style={[styles.item]} activeOpacity={1} disabled={item.disabled}>
            <BoxedIcon 
              name={item.icon} 
              backgroundColor={item.disabled? "gray":item.backgroundColor} 
              color={item?.color}
            />

            <Text 
              style={{ 
                fontSize: 16, 
                flex: 1, 
                color: item.disabled? "gray": theme.colors.secondary,
                fontFamily: 'Roboto-Medium' 
              }}
            >
              {item.name}
            </Text>
            <IconOption item={item} color={item.disabled? "gray" : null}/>
          </TouchableOpacity>
        }}
      />
    </View>
  )
}

function FontSizeComponent() {
  const theme = useTheme()
  const [visibleDialogFontSize, setVisibleDialogFontSize] = useState(false)
  const viewDialog = () => setVisibleDialogFontSize(true)
  return(
    <View>
      <DialogFontSize
        visible={visibleDialogFontSize}
        setVisible={setVisibleDialogFontSize}
      />
      <Button 
        contentStyle={{backgroundColor: theme.colors.secondary}}
        labelStyle={{color: theme.colors.secondaryContainer, fontSize: 16}}
        onPress={viewDialog}
      >
        16
      </Button>
    </View>
  )
}


export function Settings (){
  const theme = useTheme()
  const preferences = React.useContext(PreferencesContext);
  const {
    toggleTheme,
    toggleRtl: toggleRTL,
    toggleThemeVersion,
    toggleCollapsed,
    toggleCustomFont,
    toggleRippleEffect,
    toggleisSecurityActivate,
    toggleSupportImport,
    customFontLoaded,
    rippleEffectEnabled,
    isSecurityActivate,
    supportImport,
    collapsed,
    rtl: isRTL,
    theme: { dark: isDarkTheme },
  } = preferences;
  const [isActivateSecurity, setIsAtivateSecurity] = useState(isSecurityActivate)
  const bottomSheetRefTheme = useRef(null)
  const updateDatasUser = useUserData(state => state.updateDatasUser)
  const [isVisibleModalDisconnect, setIsVisibleModalDisconnect] = useState()

  async function disconnected() {

    try{
    updateDatasUser({idUser: ""})
    updateDatasUser({firstname: ""})
    updateDatasUser({lastname: ""})
    updateDatasUser({phonenumber: ""})
    updateDatasUser({photoURL: ""})
    updateDatasUser({username: ""})

    await SecureStore.deleteItemAsync("firstname")
    await SecureStore.deleteItemAsync("lastname")
    await SecureStore.deleteItemAsync("photoURL")
    await SecureStore.deleteItemAsync("phoneNumber")
    await SecureStore.deleteItemAsync("username")
    await SecureStore.deleteItemAsync("idUser")
    await SecureStore.deleteItemAsync("firstname")

    await dbMessages.closeAsync()
    await dbChat.closeAsync()
    await dbMessages.deleteAsync()
    await dbChat.deleteAsync()
    } catch(error){

    }

  }

  const devices = [
    {
      name: 'Mode sombre',
      icon: isDarkTheme? 'moon' : "sunny",
      backgroundColor: theme.colors.secondary,
      color: theme.colors.secondaryContainer,
      component: () => (
        <Switch 
          value={isDarkTheme} 
          onValueChange={toggleTheme}
        />
      )
    },
    // {
    //   name: 'Taille de la police',
    //   icon: 'text',
    //   backgroundColor: Colors.yellow,
    //   //component: () =>(
    //     // <FontSizeComponent />
    //   //)
    // },
    // {
    //   name: 'Couleur primaire',
    //   icon: 'color-filter',
    //   backgroundColor: theme.colors.primary,
    //   disabled: true,
    //   component: () => (
    //     <TouchableOpacity
    //       style={{
    //         width: 30,
    //         height: 30,
    //         borderRadius: 30,
    //         backgroundColor: "gray",
    //         marginRight: 5
    //       }}
    //     />
    //   )
    // },
  ];

  const items = [
    {
      name: 'Sécurité',
      icon: 'lock-closed',
      backgroundColor: '#33A5D1',
      component: () => (
        <Entypo 
          name={isSecurityActivate? "check" : "cross"} 
          size={20} 
          color={theme.colors.surface} 
          style={{
            alignSelf: "flex-end",
            marginRight: 10, 
            borderRadius: 20,
            padding: 5,
            backgroundColor: isSecurityActivate? "green" : "red", 
          }} 
          onPress={() => checkPermissionsToSecurity(true, toggleisSecurityActivate) }
        />
      )
    },
    {
      name: 'Autorisé les exports',
      icon: 'arrow-down',
      backgroundColor: Colors.primary,
      component: () => (
        <Switch 
          value={supportImport} 
          onValueChange={() => {
            if(supportImport) toggleSupportImport()
            else checkPermissionsToSecurity(true, toggleSupportImport)
          }}
        />
      )
    },
    // {
    //   name: 'Notifications',
    //   icon: 'notifications',
    //   backgroundColor: Colors.red,
    //   disabled: true,
    // },
  ];

  const support = [
    {
      name: 'Aide',
      icon: 'information',
      backgroundColor: Colors.primary,
      component: () => (
        <Entypo 
          name="mail"
          size={30}
          color={theme.colors.secondary}
          onPress={async () => {
            if(await MailComposer.isAvailableAsync()){
              await MailComposer.composeAsync({
                bccRecipients: ["benenoc@yahoo.com"],
                subject: "Demander d'aide sur l'application Moon",
                isHtml: Platform.OS === "android"? false : true
              })
            }
          }}
        />
      )
    },
    {
      name: 'Partager à vos amis',
      icon: 'accessibility',
      backgroundColor: Colors.red,
      component: () => (
        <Ionicons 
          name="share-social-sharp" 
          size={25}
          style={{marginRight: 10}}
          color={theme.colors.secondary}
        />
      )
    },
  ];

  const ModalDisconnect = () => (
    <Portal>
      <Dialog  
        visible={isVisibleModalDisconnect} 
        onDismiss={() => setIsVisibleModalDisconnect(false)}
        style={{
          backgroundColor: theme.colors.error
        }}
      >
        <Dialog.Icon color={theme.colors.errorContainer} icon="alert" size={40} />
        <Dialog.Title
          style={{
            color: theme.colors.errorContainer,
            textAlign: "center",
            fontFamily: "Poppins-SemiBold",
          }}
        >
          Attention
        </Dialog.Title>
        <Dialog.Content>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              color: theme.colors.surface,
            }}
          >
          Vous allez perdre toute vos conversations, vos historiques de chats et vos prompt. Etes-vous sur de vouloir continuer?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            style={{
              borderRadius: 10,
            }} 
            labelStyle={{
              fontFamily: "Poppins-SemiBold",
              color: theme.colors.secondaryContainer,
              fontSize: 14
            }}
            onPress={() => setIsVisibleModalDisconnect(false)}
          >
            Annuler
          </Button>
          <Button 
            mode="contained" 
            style={{
              borderRadius: 10,
              backgroundColor: theme.colors.errorContainer
            }} 
            labelStyle={{
              fontFamily: "Poppins-SemiBold",
              color: theme.colors.secondary,
              fontSize: 14
            }}
            onPress={() => onSignOut()}
          >
            Continuer
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )

  const onSignOut = () => {
    checkPermissionsToSecurity(true, disconnected)
  };

  return (
    <SafeAreaView style={[styles.container,{backgroundColor: theme.colors.background}]}>
      <ModalDisconnect />
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 55}}
        >
          <HeaderAnimated />
          <BlockSetting data={devices} isDarkTheme={isDarkTheme}/>

          <BlockSetting data={items} isDarkTheme={isDarkTheme}/>

          <BlockSetting data={support} isDarkTheme={isDarkTheme}/>
          {/*<Button 
            mode="contained"
            contentStyle={{backgroundColor: theme.colors.secondary}}
            labelStyle={{fontSize: 14, }}
            style={[styles.buttonSignOut, { marginTop: 20, marginBottom: 5}]}
            onPress={() => setIsVisibleModalDisconnect(true)}
            disabled
          >
            Se Déconnecter
          </Button>
          <Button 
            disabled
            mode="contained"
            labelStyle={{fontSize: 14,color: "#fff" }}
            style={{...styles.buttonSignOut, marginBottom: 20}}
          >
            Supprimer mon compte
          </Button>*/}
        </ScrollView>
      </View>
      {/*<ComponentTheme ref={bottomSheetRefTheme} />*/}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android"? StatusBar.currentHeight : 0,
  },
  buttonSignOut: {
    width: "90%",
    marginHorizontal: 20,
    alignSelf: "center",
    borderRadius: 10,
  },

  block: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 14,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: width - 50,
    alignSelf: 'center',
  },
  
});

