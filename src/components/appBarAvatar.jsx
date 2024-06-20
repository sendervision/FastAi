import { View, StyleSheet, Dimensions, StatusBar } from "react-native"
import { Text, useTheme, Avatar, Searchbar, IconButton } from "react-native-paper"

const { width, height } = Dimensions.get("window")

export function AppBarAvatar(){
  const theme = useTheme()
  const backgroundColorSearchbar = theme.colors.secondary
  const borderColorSearchbar = theme.colors.tertiary
  return(
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.containerHeader} >
        <Text style={[styles.title, {color: theme.colors.primaryContainer}]} >
          Fast<Text style={[styles.title, {color: theme.colors.onSurface}]}>Ai</Text>
        </Text>
        <Avatar.Image
          source={require("@/images/profile.jpeg")}
          size={50}
        />
      </View>
      <Searchbar
        placeholder="Recherche..."
        style={[styles.searchbar, {backgroundColor: backgroundColorSearchbar, borderColor: borderColorSearchbar}]}
        iconColor={theme.colors.primaryContainer}
        inputStyle={[styles.inputStyle, {color: theme.colors.primaryContainer}]}
        placeholderTextColor={theme.colors.outline}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: width,
    height: height / 4,
    paddingTop: StatusBar.currentHeight + 10,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontFamily: "InterBold",
  },
  searchbar: {
    marginVertical: 10,
    marginHorizontal: 20,
    height: "40%",
    borderWidth: 2
  },
  inputStyle: {
    fontSize: 16,
    fontFamily: "Medium",
  },

})
