import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { GET_MESSAGES } from "../../Network/queries/getMessage";
import { SEND_MESSAGE } from "../../Network/mutations/sendMessage";
import { GET_CURRENT_USER } from "../../Network/queries/getCurrentUser";
import { useMutation, useQuery } from "@apollo/client/react";

const Message = () => {

  const route = useRoute();
  const organizer = route.params?.organizer;

  // Get current logged-in user
  const { data: currentUserData, loading: userLoading } = useQuery(GET_CURRENT_USER);
  const userId = currentUserData?.me?.id;

  const { data: messagesData, loading: messagesLoading, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationWith: organizer?.id },
    skip: !organizer?.id,
    fetchPolicy: "network-only",
  });
  
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [text, setText] = useState("")
  
  const handleSend = async () => {
    if (!text.trim() || !userId || !organizer) return;
  
    try {
      await sendMessage({
        variables: { toUserId: organizer.id, content: text },
      });
      setText("");
      await refetch(); // make sure messages reload
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  if (userLoading || !userId) return <Text>Loading user...</Text>;
  if (!organizer) return <Text>No organizer selected</Text>;
  if (messagesLoading) return <Text>Loading messages...</Text>;

  return (
    <View style={styles.container}>
      <FlatList
  data={messagesData?.messages || []}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View
      style={[
        styles.message,
        item.sender.id === userId ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text>{item.content}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.createdAt).toLocaleTimeString()}
      </Text>
    </View>
  )}
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
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  message: { padding: 10, marginVertical: 4, borderRadius: 8, maxWidth: "70%" },
  myMessage: { alignSelf: "flex-end", backgroundColor: "#DCF8C6" },
  theirMessage: { alignSelf: "flex-start", backgroundColor: "#EEE" },
  timestamp: { fontSize: 10, color: "#999", marginTop: 4 },
  inputRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 20, paddingHorizontal: 12 },
  sendBtn: { marginLeft: 8, backgroundColor: "#4A6CF7", padding: 10, borderRadius: 20 },
});
