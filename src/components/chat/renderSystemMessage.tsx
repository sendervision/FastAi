import { useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import * as Animatable from "react-native-animatable";
import { IconSystemMessageType } from "@/interface";
import { TextMessage } from "./textMessage";
import { CopyText } from "@/utils/clipboard";
import { saveFile, shareImage } from "@/utils/image";
import { vibrationAlert } from "@/utils/mediaUtils";
import { ImageComponent } from "../ImageComponent";

const { width } = Dimensions.get("window");
const ANIMATION_IN_ICONS_MSG = "fadeIn";
const ANIMATION_OUT_ICONS_MSG = "fadeOut";
const TIME_CLOSE_ICON_MSG = 20 // en séconde
const DELAY_VIBRATION = 50

function IconSystemMessage({ onPress, icon }: IconSystemMessageType) {
  const theme = useTheme();
  return (
    <TouchableOpacity style={[styles.containerIconMessage]} onPress={onPress}>
      <MaterialIcons name={icon} size={25} color={theme.colors.tertiary} />
    </TouchableOpacity>
  );
}

export function RenderSystemMessage({ newProps }) {
  const theme = useTheme();
  const props = newProps.props;
  const { currentMessage } = props;
  const idUser = currentMessage.user._id;
  const myName = currentMessage.user.name;
  const fontSize = 13;
  const [animationIconMsg, setAnimationIconMsg] = useState(ANIMATION_OUT_ICONS_MSG);
  const RenderTime = ({ props }) => {
    const { createdAt } = currentMessage;
    let hour = dayjs(createdAt).hour().toString();
    let minute = dayjs(createdAt).minute().toString();
    hour = hour.length === 1 ? "0" + hour : hour;
    minute = minute.length === 1 ? "0" + minute : minute;

    return (
      <Text
        style={{
          fontFamily: "Italic",
          fontSize: 10,
          textAlignVertical: "center",
          marginHorizontal: 5,
          color:
            idUser === 2
              ? theme.colors.primaryContainer
              : theme.colors.secondary,
        }}
      >
        {`${hour}:${minute}`}
      </Text>
    );
  };

  const onLongPressMsg = () => {
    if (animationIconMsg === ANIMATION_IN_ICONS_MSG) {
      return onPressMsg();
    }
    vibrationAlert(DELAY_VIBRATION);
    setAnimationIconMsg(ANIMATION_IN_ICONS_MSG);
    const timeoutIcon = setTimeout(() => {
      setAnimationIconMsg(ANIMATION_OUT_ICONS_MSG);
    }, 1000 * TIME_CLOSE_ICON_MSG);
    return () => clearTimeout(timeoutIcon);
  };

  const onPressMsg = () => {
    if (animationIconMsg === ANIMATION_IN_ICONS_MSG) {
      setAnimationIconMsg(ANIMATION_OUT_ICONS_MSG);
      vibrationAlert(DELAY_VIBRATION);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={onLongPressMsg}
        onPress={onPressMsg}
        delayPressIn={1000}
        style={[
          styles.containerMessage,
          {
            backgroundColor:
              idUser in [0, 1]
                ? theme.colors.primaryContainer
                : theme.colors.secondary,
          },
        ]}
      >
        {currentMessage.image ? (
          <ImageComponent 
            source={{uri:currentMessage.image}}
            imgHeight={width - 150}
            imgWidth={width - 30}
            style={{borderRadius: 10}}
          />
        ) : null}
        <TextMessage
          selectable={true}
          style={{
            ...styles.message,
            color:
              idUser !== 1
                ? theme.colors.primaryContainer
                : theme.colors.secondary,
            fontSize: fontSize,
          }}
        >
          {currentMessage?.text}
        </TextMessage>
        <View style={styles.containerFooter}>
          <Text
            style={{
              color:
                idUser === 2
                  ? theme.colors.primaryContainer
                  : theme.colors.secondary,
              ...styles.name,
            }}
          >
            {idUser !== 1 ? myName : currentMessage.user.name}
          </Text>
          <RenderTime props={props} />
        </View>
      </TouchableOpacity>
      {animationIconMsg !== ANIMATION_OUT_ICONS_MSG && (
        <Animatable.View
          animation={animationIconMsg}
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 10,
            marginBottom: 10,
            marginTop: 5,
          }}
        >
          {currentMessage.text && (
            <IconSystemMessage
              onPress={() => {
                CopyText(currentMessage.text, "Copier");
              }}
              icon="content-copy"
              name="Copier"
            />
          )}
          {currentMessage.image && (
            <IconSystemMessage
              onPress={async () => {
                await saveFile(currentMessage.image);
              }}
              icon="download"
              name="Enregister"
            />
          )}
          {currentMessage.image && (
            <IconSystemMessage
              onPress={async () => await shareImage(currentMessage.image)}
              icon="share"
              name="Partager"
            />
          )}
          <IconSystemMessage
            onPress={() => {
              newProps.deleteMessage(currentMessage._id);
            }}
            icon="delete"
            name="Supprimer"
            color="red"
          />
        </Animatable.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerMessage: {
    width: width - 20,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 3,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  containerIconMessage: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginHorizontal: 3,
  },
  textCopy: {
    fontSize: 10,
    fontFamily: "InterBold",
    marginLeft: 3,
  },
  message: {
    fontFamily: "Medium",
    textAlign: "left",
    letterSpacing: 0.0,
    marginHorizontal: 5,
  },
  name: {
    fontFamily: "Italic",
    textAlign: "left",
    marginHorizontal: 5,
    fontSize: 10,
  },
  containerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 5,
    marginTop: 10,
    alignItems: "center",
  },
});
