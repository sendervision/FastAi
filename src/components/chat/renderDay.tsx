import { View, StyleSheet, Dimensions } from "react-native";
import { isSameDay, DayProps } from "react-native-gifted-chat";
import dayjs from "dayjs";
import { Text, MD3Theme } from "react-native-paper";

interface RenderDayType {
  props: DayProps;
  theme: MD3Theme
}

const { width,height } = Dimensions.get('window')

export const RenderDay = ({props, theme}: RenderDayType) => {
  const { createdAt } = props.currentMessage;
  if (
    props.currentMessage === null ||
    isSameDay(props.currentMessage, props.previousMessage)
  ) {
    return null
  }

  return (
    <View style={{ width: "100%", alignItems: "center"}}>
      <Text style={[styles.labelDate, { backgroundColor: theme.colors.secondary}]}>
        {dayjs(createdAt).locale("en").format("DD.MM.YYYY")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelDate: {
    fontFamily: "Medium", 
    fontSize: 12,
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  }
})
