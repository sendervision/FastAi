import { View, StyleSheet } from "react-native";
import { Button, Icon, useTheme } from "react-native-paper";

export function ButtonsSwitch({values, value, setValue}){
  const theme = useTheme()
  const checkedColor = theme.colors.secondary
  const textCheckedColor = theme.colors.tertiary

  return(
    <View style={styles.container} >
      {
        values?.map((data, id) => (
          <Button
            key={id}
            mode="outlined"
            style={[
              styles.button,
              {
                borderColor: theme.colors.secondary,
                borderWidth: 2,
              }
            ]}
            icon={data.value === "updated"? () => <Icon size={20} color={textCheckedColor} source={"upload"}/> : null}
            buttonColor={data.value === value? checkedColor : null}
            textColor={data.value === value? textCheckedColor : theme.colors.secondary}
            labelStyle={styles.labelStyle}
            onPress={() => setValue(data.value)}
          >
            {data?.label}
          </Button>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 10,
  },
  button: {
    marginHorizontal: 5,
    alignSelf: "center"
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: "InterBold",
    textAlignVertical: "center"
  }
})
