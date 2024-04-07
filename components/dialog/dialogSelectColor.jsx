import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Portal, Dialog, Text, useTheme, Button } from 'react-native-paper'

export function DialogSelectColor({visible, setVisible}) {
  const theme = useTheme()
  const hideDialog = function () {
    setVisible(false)
  }

// ✓
  return(
    <Portal>
      <Dialog>
        <Dialog.Title>
          Couleur de l'app
        </Dialog.Title>
        <Dialog.ScrollArea style={{height: 250}} >
          <ScrollView>
            
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({

})
 
