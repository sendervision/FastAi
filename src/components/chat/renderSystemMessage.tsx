import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  Platform,
  View,
  Image,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import dayjs from "dayjs";
import { IconSystemMessageType } from "@/interface";
import { TextMessage } from "./textMessage";
import { CopyText } from "@/utils/clipboard";
import { saveFile, shareImage } from "@/utils/image";

const { width } = Dimensions.get("window");

function IconSystemMessage({
  onPress,
  icon,
  name,
  color,
}: IconSystemMessageType) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.containerIconMessage,
      ]}
      onPress={onPress}
    >
      <MaterialIcons
        name={icon}
        size={25}
        color={theme.colors.tertiary}
      />
    </TouchableOpacity>
  );
}

export function RenderSystemMessage({ newProps }) {
  const theme = useTheme();
  const props = newProps.props;
  const idUser = props.currentMessage.user._id;
  const myName = props.currentMessage.user.name;
  const fontSize = 13;


  const RenderTime = ({ props }) => {
    const { createdAt } = props.currentMessage;
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

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.containerMessage,
          {
            backgroundColor:
              idUser !== 1
                ? theme.colors.secondary
                : theme.colors.primaryContainer,
          },
        ]}
      >
        {props.currentMessage.image ? (
          <Image
            source={{ uri: props.currentMessage.image }}
            style={{
              width: "98%",
              height: width - 100,
              borderRadius: 5,
              marginBottom: 10,
              alignSelf: "center",
            }}
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
          {props?.currentMessage?.text}
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
            {idUser !== 1 ? myName : props.currentMessage.user.name}
          </Text>
          <RenderTime props={props} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: 10,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
          {props.currentMessage.text && (
            <IconSystemMessage
              onPress={() => {
                CopyText(newProps.props.currentMessage.text, "Copier");
              }}
              icon="content-copy"
              name="Copier"
            />
          )}
          {props.currentMessage.image && (
            <IconSystemMessage
              onPress={async () => {await saveFile(props.currentMessage.image)}}
              icon="download"
              name="Enregister"
            />
          )}
          {props.currentMessage.image && (
            <IconSystemMessage
              onPress={async () => await shareImage(props.currentMessage.image)}
              icon="share"
              name="Partager"
            />
          )}
          <IconSystemMessage
            onPress={() => {
              newProps.deleteMessage(newProps.props.currentMessage._id);
            }}
            icon="delete"
            name="Supprimer"
            color="red"
          />
      </View>
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
