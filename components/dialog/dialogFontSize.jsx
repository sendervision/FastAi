import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Portal, Dialog, Text, useTheme, Button } from 'react-native-paper'

export function DialogFontSize({visible, setVisible}) {
  const theme = useTheme()
  const hideDialog = function () {
    setVisible(false)
  }
  const [fontSize, setFontSize] =  useState(16)
  const numbers = []

  const toggleFontSize = function (newFont) {
    if (newFont) setFontSize(newFont)
  }

  for (let i = 10; i < 26; i++) {
    if(i % 2 === 0) numbers.push(i + 2)
  }

// ✓
  return(
    <Portal>
      <Dialog 
        visible={visible} 
        onDismiss={hideDialog} 
        style={{backgroundColor: theme.colors.secondaryContainer}}
      >
        <Dialog.Title style={{...styles.title, color:theme.colors.secondary}} >
          Taille de la police
        </Dialog.Title>
        <Dialog.ScrollArea style={{height: 250}} >
          <ScrollView style={styles.scrollview} >
            {
              numbers.map(num => (
                <TouchableOpacity style={[
                    styles.containerTextFont, 
                    {
                      backgroundColor: num === fontSize? theme.colors.secondary : "#CFD8DC",
                    }
                  ]}
                  key={num}
                  onPress={() => toggleFontSize(num)}
                >
                  <Text 
                    style={[
                      styles.fontStyle,
                      { 
                        fontSize: num === fontSize? 20 : 16,
                        color: num === fontSize? theme.colors.secondaryContainer : theme.colors.secondary
                      }
                    ]}
                  >
                    {num}
                  </Text>
                  {
                    num !== fontSize & num === 16?
                    <Text style={{color:"gray"}} >(default)</Text>:null
                  }
                  {
                    num === fontSize?
                    <Text style={{
                        fontFamily: 'Poppins-SemiBold', 
                        fontSize: 20,
                        color: theme.colors.secondaryContainer,
                      }} >✓</Text>:null
                  }
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button 
            mode="outlined" 
            onPress={hideDialog} 
            labelStyle={{
              color: theme.colors.secondary
            }}
          >
            Annuler
          </Button>
          <Button 
            mode="contained"
            style={{backgroundColor: theme.colors.secondary}}
          >Confirmer</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  scrollview: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
  },
  fontStyle: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  containerTextFont: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 5,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  }
})
