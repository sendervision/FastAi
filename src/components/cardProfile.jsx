import { useUserData } from "@/utils";
import { View, StyleSheet, Dimensions } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

const { width, height } = Dimensions.get('window')

export function CardProfile(){
  const theme = useTheme()
  const { firstname, lastname, phonenumber } = useUserData()

  const data = [["Nom", firstname], ["Prénom", lastname], ["Mot de passe", "*******"], ["Numéro de téléphone", phonenumber]]

  const ContainerInfo = ({id,name, value}) => {
    return(
      <View>
        <View style={styles.containerInfo} >
          <Text style={[styles.labelInfo, {color:theme.colors.primaryContainer}]}>{name}</Text>
          <Text style={[styles.labelInfo, {color:theme.colors.primaryContainer}]}>{value}</Text>
        </View>
        {
          id < data.length - 1 &&
          <Divider 
            color={"gray"} 
            style={{marginHorizontal: 20, marginVertical: 3}} 
          />
        }
      </View>
    )
  }

  return(
    <View
      style={[styles.container, {backgroundColor: theme.colors.secondaryContainer}]}
    >
      {
        data.map((dt, id) => {
          return <ContainerInfo
            key={id}
            id={id}
            name={dt[0]}
            value={dt[1]}
          />
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: height / 3.5,
    alignSelf: "center",
    borderRadius: 20,
    marginVertical: 40,
    justifyContent: "center"
  },
  containerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  labelInfo: {
    fontSize: 14,
    fontFamily: "Medium",
  }
})
