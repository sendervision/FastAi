import { InputToolbar } from "react-native-gifted-chat";
import { useTheme } from "react-native-paper";


export const RenderInputToolbar = ({props}) => {
  const theme = useTheme()

  return (
    <InputToolbar
      {...props}
      primaryStyle={{
        backgroundColor: theme.colors.primaryContainer,
        marginVertical: 5,
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderColor: theme.colors.tertiary,
        borderWidth: 2,
        alignSelf: "center",
        justifyContent: "center"
      }}
      accessoryStyle={{
        backgroundColor: theme.colors.background
      }}
      containerStyle={{
        borderTopWidth: 0,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.background,
      }}
    />
  );
};