import { ChatEmptyImage, ChatEmptyText } from "@/components/chat/chatEmpty";
import { RenderBubble } from "@/components/chat/renderBubble";
import { renderDay } from "@/components/chat/renderDay";
import { RenderInputToolbar } from "@/components/chat/renderInputTollbar";
import { RenderSystemMessage } from "@/components/chat/renderSystemMessage";
import React, { useState, useCallback, useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { GiftedChat } from "react-native-gifted-chat";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  useTheme,
} from "react-native-paper";

export function ChatScreen({ navigation }) {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const name = "John Doe";
  const model = "gpt-4"
  const category = "image";
  const description = "Voici ma description";

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        system: true,
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSendMessage = () => {};
  const onSendImageMessage = () => {}
  const onCheckMessage = () => {}

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.secondaryContainer }}
      >
        <Appbar.BackAction
          color={theme.colors.primaryContainer}
          onPress={() => navigation.goBack()}
        />
        <Avatar.Image
          source={require("@/images/profile.jpeg")}
          size={50}
          style={{ marginHorizontal: 10 }}
        />
        <Appbar.Content
          titleStyle={{
            fontFamily: "Inter",
            color: theme.colors.primaryContainer,
          }}
          title={name}
        />
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        alwaysShowSend={true}
        loadEarlier={false} // affiche le bouton pour recharger les messages antérieur
        onLoadEarlier={() => {}} // fonction appeler lors du chargement de loadEarlier
        showUserAvatar={false}
        timeFormat="LT"
        dateFormat="ll"
        bottomOffset={5}
        renderDay={renderDay}
        renderLoading={() => (
          <ActivityIndicator size={30} color={theme.colors.onSurface} />
        )}
        renderBubble={(props) => <RenderBubble props={props} />}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        messagesContainerStyle={{ backgroundColor: theme.colors.background }}
        renderSystemMessage={(props) => {
          const newProps = {
            props: props,
            // deleteOneMessage
            // onLongPress: onLongPressMessageText,
          };
          return <RenderSystemMessage newProps={newProps} />;
        }}
        renderInputToolbar={props => {
          const newProps = {
            ...props,
            checkedMessage: onCheckMessage,
            sendMessage: onSendMessage,
            sendImageMessage: onSendImageMessage,
            model: model,
            user: {_id: 1}
          }
          return(
            <RenderInputToolbar props={newProps} />
           )
        }}
        scrollToBottom
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </>
  );
}
