import { View } from "react-native";
import { isSameDay } from "react-native-gifted-chat";
import dayjs from "dayjs"
import { Text } from "react-native-paper";

export const renderDay = (props) => {
  const { createdAt } = props.currentMessage
  if (
    props.currentMessage === null ||
    isSameDay(props.currentMessage, props.previousMessage)
  ) {
    return null
  }

  return (
    <View style={{width: "100%", alignItems: 'center'}}>
      <Text style={{fontFamily: "Medium", fontSize: 12}} >
        {dayjs(createdAt).locale("en").format("DD.MM.YYYY")}
      </Text>
    </View>
  )
};

