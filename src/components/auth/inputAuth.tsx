import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";

interface InputPhoneNumberType {
  placeholder?: string,
  props?: any
  value?: string,
  onChange?: (text) => void,
  keyboardType?: string |  any,
  password?: boolean,
  secureTextEntry?: boolean
}

export function InputAuth({
  value, 
  placeholder, 
  onChange, 
  keyboardType, 
  secureTextEntry,
  ...props
}: InputPhoneNumberType){
  const theme = useTheme()

  const [isVisible, setIsVisible] = useState(secureTextEntry)
  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }

  return(
    <View style={styles.container}>
      <Text
        style={[styles.labelInput, {color: theme.colors.outline}]}
      >
        {placeholder}
      </Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        mode="outlined"
        contentStyle={[styles.phonenumber]}
        outlineColor={theme.colors.secondaryContainer}
        activeOutlineColor={theme.colors.tertiary}
        style={{backgroundColor: theme.colors.primaryContainer}}
        outlineStyle={{borderRadius: 20, borderColor: theme.colors.tertiary}}
        keyboardType={keyboardType}
        right={secureTextEntry &&<TextInput.Icon onPress={toggleVisible} icon={isVisible? "eye-off" : "eye"} />}
        left={secureTextEntry &&<TextInput.Icon icon="lock" />}
        secureTextEntry={isVisible}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30

  },
  labelInput: {
    fontSize: 12,
    fontFamily: "Inter",
    marginBottom: 5,
    marginLeft: 5,
  },
  phonenumber: {
    fontSize: 14,
    fontFamily: "Medium",
    borderRadius: 20,
  }
})

