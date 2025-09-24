import React, { useState, useMemo, useCallback } from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { GET_USERS } from "../../Network/queries/getUsers";
import { GET_CURRENT_USER } from "../../Network/queries/getCurrentUser";
import { GET_CONVERSATIONS } from "../../Network/queries/getConversation";
import { useQuery } from "@apollo/client/react";

const Search = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const { data: currentUserData, refetch: refetchCurrentUser } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "network-only",
  });
  const currentUser = currentUserData?.me;
  const currentUserId = currentUser?.id;
  const isOrganizer = currentUser?.organizer;

  const { data: allUsersData, refetch: refetchUsers } = useQuery(GET_USERS, {
    fetchPolicy: "network-only",
    skip: isOrganizer, 
  });

  const { data: conversationsData, refetch: refetchConversations } = useQuery(GET_CONVERSATIONS, {
    skip: !isOrganizer,
    fetchPolicy: "network-only",
  });

  useFocusEffect(
    useCallback(() => {
      refetchCurrentUser?.();
      refetchUsers?.();
      refetchConversations?.();
    }, [refetchCurrentUser, refetchUsers, refetchConversations])
  );

  const filteredList = useMemo(() => {
    if (!currentUser) return [];

    if (!isOrganizer) {
      return (allUsersData?.users || [])
        .filter((u: any) => u.organizer)
        .filter((u: any) =>
          (u.username ?? `${u.firstname ?? ""} ${u.lastname ?? ""}`)
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
    }

    const uniqueUsers: any[] = conversationsData?.myConversations || [];
    return uniqueUsers.filter((u: any) =>
      (u.username ?? `${u.firstname ?? ""} ${u.lastname ?? ""}`)
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [currentUser, isOrganizer, allUsersData, conversationsData, searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.searchContainer}>
        <Image
          source={{ uri: currentUser?.photo || "https://i.pravatar.cc/100" }}
          style={styles.userIcon}
        />
        <LinearGradient
          colors={['#000000', '#4A6CF7', '#7B2FF7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientWrapper}
        >
          <View style={styles.inputWrapper}>
            <Icon name="search" size={20} color="#888" style={{ marginRight: 8 }} />
            <TextInput
              placeholder={!isOrganizer ? "Search organizers..." : "Search users..."}
              style={styles.input}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </LinearGradient>
      </View>

      <FlatList
        data={filteredList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userRow}
            onPress={() => navigation.navigate("Message", { organizer: item })}
          >
            <Image
              source={{ uri: item.photo || "https://i.pravatar.cc/100" }}
              style={styles.userIconSmall}
            />
            <Text style={styles.username}>
              {`${item.firstname ?? ""} ${item.lastname ?? ""}`.trim()}
            </Text>
          </TouchableOpacity>
        )}
        style={{ paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchContainer: { paddingHorizontal: 20, paddingVertical: 20, flexDirection: "row", alignItems: "center" },
  userIcon: { width: 60, height: 60, borderRadius: 65 },
  gradientWrapper: { padding: 2, borderRadius: 35, flex: 1, marginLeft: 10 },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 35, paddingHorizontal: 10 },
  input: { flex: 1, fontSize: 16, paddingVertical: 8 },
  userRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  userIconSmall: { width: 50, height: 50, borderRadius: 50, marginRight: 10 },
  username: { fontSize: 16, color: "#333" }
});
