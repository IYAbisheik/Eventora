import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRoute } from "@react-navigation/native";
import { GET_MESSAGES } from "../../Network/queries/getMessage";
import { SEND_MESSAGE } from "../../Network/mutations/sendMessage";
import { GET_CURRENT_USER } from "../../Network/queries/getCurrentUser";
import { useMutation, useQuery } from "@apollo/client/react";

const Message = () => {
  const route = useRoute();
  const selectedUser = route.params?.organizer;

  const { data: currentUserData, loading: userLoading } = useQuery(GET_CURRENT_USER);
  const currentUser = currentUserData?.me;
  const currentUserId = currentUser?.id;
  const isOrganizer = currentUser?.organizer;

  const { data: messagesData, loading: messagesLoading, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationWith: selectedUser?.id },
    skip: !selectedUser?.id,
    fetchPolicy: "network-only",
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages);
      scrollToBottom();
    }
  }, [messagesData]);

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSend = async () => {
    if (!text.trim() || !currentUserId || !selectedUser) return;

    try {
      await sendMessage({ variables: { toUserId: selectedUser?.id, content: text } });
      setText("");
      const { data } = await refetch();
      setMessages(data?.messages || []);
      scrollToBottom();
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  if (userLoading || !currentUserId) return <Text>Loading user...</Text>;
  if (!selectedUser) return <Text>No conversation selected</Text>;
  if (messagesLoading) return <Text>Loading messages...</Text>;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.message,
            item.sender.id === currentUserId ? styles.myMessage : styles.theirMessage
          ]}>
            <Text>{item.content}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  message: { padding: 10, marginVertical: 4, borderRadius: 8, maxWidth: "70%" },
  myMessage: { alignSelf: "flex-end", backgroundColor: "#DCF8C6" },
  theirMessage: { alignSelf: "flex-start", backgroundColor: "#EEE" },
  timestamp: { fontSize: 10, color: "#999", marginTop: 4 },
  inputRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 20, paddingHorizontal: 12 },
  sendBtn: { marginLeft: 8, backgroundColor: "#4A6CF7", padding: 10, borderRadius: 20 },
});
