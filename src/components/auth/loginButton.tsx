import { Pressable, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

export function SecondaryLoginButton(){
  const theme = useTheme();
  return(
    <Pressable
      style={styles.container}
    >
      <Text style={[styles.label, {color: theme.colors.primaryContainer}]}>Vous avez déjà un compte? </Text>
      <Text style={[styles.label, {color: theme.colors.tertiary, fontSize: 14}]}>Connectez-vous</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 12,
    fontFamily: "Medium",
  }
})

