import {
  TextInput,
  useTheme,
  HelperText
} from 'react-native-paper'

import { Dimensions, View, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get("screen")

export default function FormInput({placeholder, value, onChangeText, left, right, secureTextEntry, errorText="", error=false, opacity, label, ...otherProps }){
  const theme = useTheme()
  const hasErrors = () => {
    return !value.includes('@')
  }
  return(
    <>
      <TextInput
        mode='outlined'
        placeholder={placeholder}
        style={[
          styles.input, 
          {
            backgroundColor: theme.colors.secondaryContainer, 
            borderColor: theme.colors.secondary,
            color: theme.colors.secondary,
          }
        ]}
        value={value}
        outlineStyle={{borderolor: theme.colors.secondaryContainer, justifyContent: 'center'}}
        onChangeText={ onChangeText }
        left={left}
        right={right}
        secureTextEntry={secureTextEntry? secureTextEntry: null}
        error={error}
        textColor={theme.colors.secondary}
        // label={placeholder}
        cursorColor={theme.colors.secondary}
        outlineColor={theme.colors.secondary}
        activeUnderlineColor={theme.colors.secondary}
        underlineColor={theme.colors.secondary}
        outlineStyle={{
          // backgroundColor: theme.colors.secondary,
          borderWidth: 2,
          borderColor: theme.colors.secondary,
          justifyContent: "center",
        }}
        underlineStyle={{
          backgroundColor: theme.colors.secondary,
          // textAlignVertical: 'center',
        }}
        contentStyle={{
          fontFamily: 'Poppins-SemiBold',
          // backgroundColor: theme.colors.secondaryContainer,
          color: theme.colors.secondary,
          textAlignVertical: 'center',
          height: 50,
          paddingBottom: 5,
        }}
        placeholderTextColor={theme.colors.outlined}
        dense
        textAlignVertical="center"
        {...otherProps}

      />
      {
        errorText?
        <HelperText 
          type="error" 
          visible={ hasErrors() } 
          style={{
            textAlign: "left", 
            width: width / 1.2,
            fontFamily: "Poppins-SemiBold"
          }}
        >
          {errorText}
        </HelperText> : null
      }
    </>

  )
}

const styles = StyleSheet.create({
  input: {
    width: width / 1.2,
    height: 60,
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    textAlignVertical: "center",
  }
})
