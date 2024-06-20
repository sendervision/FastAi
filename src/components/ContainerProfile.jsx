import { Dimensions, ImageBackground, View, Image } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";

const { height, width } = Dimensions.get("window")

export function ContainerProfile(){
  const theme = useTheme()

  return(
    <View
      style={{
        height: height / 2.2,
        marginBottom: 10
      }}
    >
      <Image
        source={require("@/images/fastai_bg.png")}
        style={{
          width: "100%",
          height: "80%",
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: "red"
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Avatar.Image
          source={require("@/images/profile.jpeg")}
          size={100}
        />
        <Text
          style={{
            color: theme.colors.tertiary,
            fontSize: 14,
            fontFamily: "Medium",
            textAlign: "center",
            marginTop: 10
          }}
        >
          Ajouter un profile
        </Text>
      </View>
    </View>
  )
}
