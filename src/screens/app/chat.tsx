import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Platform, StyleSheet, View, Keyboard } from "react-native";
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
} from "react-native-gifted-chat";
import { useSQLiteContext } from "expo-sqlite/next";
import * as Crypto from "expo-crypto";
import { NavBar } from "@/components/navbar";
import AccessoryBar from "@/components/accessoryBar";
import CustomActions from "@/components/customActions";
import { renderDay } from "@/components/chat/renderDay";
import { RenderBubble } from "@/components/chat/renderBubble";
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
import { imageBase64ToImage } from "@/utils/image";
import { useInputMessage, useUser } from "@/context/hook";
import { BannerInfoBot } from "@/components/chat/bannerInfoBot";
import { RenderChatFooter } from "@/components/chat/renderChatFooter";
import { useFuncBot } from "@/utils/utilsNavigation";

const otherUser = {
  _id: 2,
  name: "React Native",
  avatar: "https://facebook.github.io/react/img/logo_og.png",
};

interface IState {
  messages: any[];
  step: number;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  isTyping: boolean;
}

enum ActionKind {
  SEND_MESSAGE = "SEND_MESSAGE",
  LOAD_EARLIER_MESSAGES = "LOAD_EARLIER_MESSAGES",
  LOAD_EARLIER_START = "LOAD_EARLIER_START",
  SET_IS_TYPING = "SET_IS_TYPING",
  // LOAD_EARLIER_END = 'LOAD_EARLIER_END',
}

// An interface for our actions
interface StateAction {
  type: ActionKind;
  payload?: any;
}

function reducer(state: IState, action: StateAction) {
  switch (action.type) {
    case ActionKind.SEND_MESSAGE: {
      return {
        ...state,
        step: state.step + 1,
        messages: action.payload,
      };
    }
    case ActionKind.LOAD_EARLIER_MESSAGES: {
      return {
        ...state,
        loadEarlier: true,
        isLoadingEarlier: false,
        messages: action.payload,
      };
    }
    case ActionKind.LOAD_EARLIER_START: {
      return {
        ...state,
        isLoadingEarlier: true,
      };
    }
    case ActionKind.SET_IS_TYPING: {
      return {
        ...state,
        isTyping: action.payload,
      };
    }
  }
}

function getMessageFomat(message): MessageDB {
  return {
    _id: message._id,
    text: message.text,
    createdAt: message.createdAt.toString(),
    image: message?.image,
    user_id: message.user._id.toString(),
    name: message.user.name,
  };
}

export function ChatScreen({ navigation, route }) {
  const theme = useTheme();
  const bot: Bot = route.params.item;
  // Liste des fonctions qui permet rechercher des réponses
  const func_request_response = useFuncBot((state) => state.func);
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
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    step: 0,
    loadEarlier: true,
    isLoadingEarlier: false,
    isTyping: false,
  });
  const inputMessage = useInputMessage((state) => state.inputMessage);
  const setInputMessage = useInputMessage((state) => state.setInputMessage);

  useEffect(() => {
    (async () => {
      await createTableMessage(db, tablename);
      await loadMessages();
    })();
  }, []);

  const getFormatMessage = (
    text: string = "",
    image: string = ""
  ): IMessage => {
    return {
      _id: Crypto.randomUUID(),
      text: text,
      createdAt: new Date(),
      image: image,
      system: true,
      user: { _id: 2, name: bot.name },
    };
  };

  const requestResponse = useCallback(
    async (prompt: string): Promise<IMessage[]> => {
      const listMessages = [];
      try {
        const response = await func_request_response[0](prompt);
        if (bot.model === "text") {
          if (!response[0]) throw Error();
          listMessages.push(getFormatMessage(response, ""));
        } else if (bot.model === "image") {
          for (let imageBase64 of response) {
            const image = await imageBase64ToImage(
              imageBase64,
              Crypto.randomUUID()
            );
            listMessages.push(getFormatMessage("", image));
          }
        }
      } catch (error) {
        console.log("error req func: ", error.message);
        listMessages.push(getFormatMessage("Erreur please try later...", ""));
      } finally {
        return listMessages;
      }
    },
    []
  );

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
    const { _id, text, createdAt, image, user_id, name } = getMessageFomat(
      messages[0]
    );
    await saveMessage(db, tablename, {
      _id,
      text,
      createdAt,
      image,
      user_id,
      name,
    });
  }, []);

  const onSendMessageAndRequestResponse = useCallback(
    async (messages: IMessage[]) => {
      const { text } = messages[0];
      setIsTyping(true);
      await onSend(messages);
      const msgResponseBot: IMessage[] = await requestResponse(text);
      setIsTyping(false);
      await onSend(msgResponseBot);
    },
    []
  );

  const setIsTyping = useCallback(
    (isTyping: boolean) => {
      reducer(state, { type: ActionKind.SET_IS_TYPING, payload: isTyping });
    },
    [dispatch]
  );

  const onSendFromUser = useCallback(
    (messages: IMessage[] = []) => {
      const createdAt = new Date();
      const messagesToUpload = messages.map((message) => ({
        ...message,
        user,
        createdAt,
        system: true,
        _id: Math.round(Math.random() * 1000000),
      }));

      onSend(messagesToUpload);
    },
    [onSend]
  );

  const renderAccessory = useCallback(() => {
    return (
      <AccessoryBar
        onSend={onSendFromUser}
        isTyping={() => setIsTyping(true)}
      />
    );
  }, [onSendFromUser, setIsTyping]);

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
          placeholder="Prompt..."
          text={inputMessage}
          onInputTextChanged={setInputMessage}
          messages={messages}
          maxInputLength={2048}
          onSend={onSendMessageAndRequestResponse}
          showUserAvatar={false}
          timeFormat="LT"
          dateFormat="ll"
          bottomOffset={5}
          messagesContainerStyle={{ backgroundColor: theme.colors.background }}
          user={user}
          scrollToBottom
          scrollToBottomComponent={() => <IcoScrollToBottom />}
          renderInputToolbar={(props) => <RenderInputToolbar props={props} />}
          renderDay={renderDay}
          renderBubble={(props) => <RenderBubble props={props} />}
          renderAccessory={renderAccessory}
          renderSystemMessage={(props) => {
            const newProps = {
              props: props,
              deleteMessage,
            };
            return <RenderSystemMessage newProps={newProps} />;
          }}
          renderActions={renderCustomActions}
          renderSend={renderSend}
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
