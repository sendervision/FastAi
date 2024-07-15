import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, View, Keyboard } from "react-native";
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
} from "react-native-gifted-chat";
import { useSQLiteContext } from "expo-sqlite/next";
import { NavBar } from "@/components/navbar";
import CustomActions from "@/components/customActions";
import { RenderDay } from "@/components/chat/renderDay";
import { useTheme } from "react-native-paper";
import { RenderSystemMessage } from "@/components/chat/renderSystemMessage";
import { RenderInputToolbar } from "@/components/chat/renderInputTollbar";
import { IcoScrollToBottom } from "@/components/iconScrollToBottom";
import { Bot, Message as MessageDB } from "@/interface";
import {
  createTableMessage,
  deleteOneMessage,
  getAllMessage,
  saveMessage,
} from "@/utils/database";
import { showToast } from "@/utils/toast";
import { useInputMessage } from "@/context/hook";
import { BannerInfoBot } from "@/components/chat/bannerInfoBot";
import { RenderChatFooter } from "@/components/chat/renderChatFooter";
import { RenderTyping } from "@/components/chat/renderTyping";
import { requestResponseSendResponse } from "@/utils/aiMessage";

export function ChatScreen({ navigation, route }) {
  const messageContainerRef = useRef(null)
  const theme = useTheme();
  const bot: Bot = route.params.item;
  // Liste des fonctions qui permet rechercher des réponses
  const tablename = bot?.name
    .toLocaleLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "");
  const db = useSQLiteContext();
  const { firstname, lastname } = { firstname: "John", lastname: "Doe" };
  const user = {
    name: `${firstname} ${lastname}`,
    _id: 1,
  };
  const [messages, setMessages] = useState([]);
  const inputMessage = useInputMessage((state) => state.inputMessage);
  const setInputMessage = useInputMessage((state) => state.setInputMessage);
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    (async () => {
      await createTableMessage(db, tablename);
      await loadMessages();
    })();
  }, []);

  const loadMessages = useCallback(async () => {
    let messagesDB = await getAllMessage(db, tablename);
    const msg: IMessage[] = messagesDB.map((msg) => ({
      _id: msg._id,
      text: msg.text,
      createdAt: new Date(msg.createdAt),
      image: msg.image,
      system: true,
      user: { _id: Number(msg.user_id), name: msg.name },
    }));
    setMessages(msg.reverse());
  }, []);

  const deleteMessage = useCallback(async (_id) => {
    await deleteOneMessage(db, tablename, _id);
    showToast("Message supprimé");
    await loadMessages();
  }, []);

  const onSend = useCallback(async (messages: IMessage[]) => {
    messages = [{ ...messages[0], system: true }];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const onSendMessageAndRequestResponse = useCallback(
    async (messages: IMessage[]) => {
      setIsTyping(true)
      const { text } = messages[0];
      Keyboard.dismiss()
      await onSend(messages);
      saveMessage(
        db,
        tablename,
        {
          _id: messages[0]._id,
          text: messages[0].text,
          createdAt: new Date().toString(),
          image: messages[0].image,
          name: messages[0].user.name,
          user_id: user._id
        }
      )
      await requestResponseSendResponse(
        db,
        tablename,
        text,
        bot,
        setIsTyping,
        onSend
      )
    },
    []
  );

  const onSendFromUser = useCallback(
    (messages: IMessage[] = []) => {
      const createdAt = new Date();
      const messagesToUpload = messages.map((message) => ({
        ...message,
        user,
        createdAt,
        system: true,
        _id: Math.round(Math.random() * 1_000_000),
      }));
      onSend(messagesToUpload);
    },
    [onSend]
  );

  const renderCustomActions = useCallback(
    (props) =>
      Platform.OS === "web" ? null : (
        <CustomActions {...props} onSend={onSendFromUser} />
      ),
    [onSendFromUser]
  );

  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send {...props} containerStyle={{ justifyContent: "center" }}>
        <MaterialIcons size={30} color={theme.colors.tertiary} name={"send"} />
      </Send>
    );
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <NavBar bot={bot} />
      <BannerInfoBot bot={bot} />
      <View style={styles.content}>
        <GiftedChat
          messageContainerRef={messageContainerRef}
          placeholder="Prompt..."
          text={inputMessage}
          onInputTextChanged={setInputMessage}
          messages={messages}
          maxInputLength={2048}
          isTyping={isTyping}
          onSend={onSendMessageAndRequestResponse}
          showUserAvatar={false}
          timeFormat="LT"
          dateFormat="ll"
          bottomOffset={5}
          messagesContainerStyle={{ backgroundColor: theme.colors.background }}
          user={user}
          scrollToBottom={true}
          scrollToBottomComponent={() => <IcoScrollToBottom />}
          renderInputToolbar={(props) => <RenderInputToolbar props={props} />}
          renderDay={props => <RenderDay props={props} theme={theme} />}
          // renderAccessory={renderAccessory}
          renderSystemMessage={(props) => {
            const newProps = {
              props: props,
              deleteMessage,
            };
            return <RenderSystemMessage newProps={newProps} />;
          }}
          renderActions={renderCustomActions}
          renderSend={renderSend}
          renderFooter={() => isTyping && <RenderTyping name={bot.name} />}
          renderChatFooter={() => <RenderChatFooter bot={bot} />}
          isCustomViewBottom
          scrollToBottomStyle={{ backgroundColor: theme.colors.tertiary }}
          keyboardShouldPersistTaps="never"
        />
        {
          // Platform.OS === "android" && <KeyboardAvoidingView behavior='padding' />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { backgroundColor: "#ffffff", flex: 1 },
});
