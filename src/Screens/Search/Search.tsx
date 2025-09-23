// Search.tsx
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GET_USERS } from "../../Network/queries/getUsers";
import { useQuery } from "@apollo/client/react";
import React, { useState, useMemo, useCallback } from "react";

// Types for navigation
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigations/RootNavigator"; // adjust path

type SearchNavProp = NativeStackNavigationProp<RootStackParamList, "Search">;

const Search = () => {
  const navigation = useNavigation<SearchNavProp>();
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  });
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];
    return data.users
      .filter((user: any) => user.organizer === true)
      .filter((user: any) =>
        (user.username || `${user.firstname || ''} ${user.lastname || ''}`)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
  }, [searchText, data]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={23} />
        </TouchableOpacity>
        <Text style={styles.title}>Conversations</Text>
        <View />
      </View>

      <View style={styles.topBody}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.userIcon}
          />
          <LinearGradient
            colors={['#000000', '#4A6CF7', '#7B2FF7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 2, borderRadius: 35, flex: 1, marginLeft: 10 }}
          >
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 35,
              paddingHorizontal: 10,
            }}>
              <Icon name="search" size={20} color="#888" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Search messages"
                placeholderTextColor="#999"
                style={{
                  flex: 1,
                  fontSize: 16,
                  paddingVertical: 8,
                }}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </LinearGradient>
        </View>
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userRow}
            onPress={() => {
              console.log('navigate to Message with', item);
              navigation.navigate("Message", {
                organizer: {
                  id: item.id,
                  username: item.username ?? `${item.firstname ?? ''} ${item.lastname ?? ''}`.trim(),
                  photo: item.photo ?? null,
                },
              });
            }}
          >
            <Image
              source={{ uri: item.photo || "https://i.pravatar.cc/100" }}
              style={styles.userIconSmall}
            />
            <Text style={styles.username}>{item.username ?? `${item.firstname} ${item.lastname}`}</Text>
          </TouchableOpacity>
        )}
        style={{ paddingHorizontal: 20 }}
      />

    </SafeAreaView>
  );
};

export default Search;

/* styles same as you provided */


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  title: { fontSize: 20, fontWeight: "600", color: "#333" },
  topBody: { paddingHorizontal: 20, paddingVertical: 20 },
  userIcon: { width: 60, height: 60, borderRadius: 65, marginBottom: 10 },
  userRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  userIconSmall: { width: 50, height: 50, borderRadius: 50, marginRight: 10 },
  username: { fontSize: 16, color: "#333" }
});
