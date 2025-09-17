import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { GET_USERS } from "../../Network/queries/getUsers";
import { useQuery } from "@apollo/client/react";

const Message = () => {

    const { loading, error, data } = useQuery(GET_USERS);

    const navigation = useNavigation();

    console.log("LINE17", data);
    
    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={23} />
                </TouchableOpacity>

                <Text style={styles.title}>Conversations</Text>

                <View>
                </View>
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
                            />
                        </View>
                    </LinearGradient>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default Message;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
    },
    btn: {
        fontSize: 16,
        color: "#007AFF",
    },
    topBody: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    gradientContainer: {
        padding: 20, flexDirection: "row", alignItems: "center", gap: 15
    },
    userIcon: {
        width: 60, height: 60, borderRadius: 65, marginBottom: 10
    },
    editProfileBtn: {
        backgroundColor: "#489de8",
        width: "61%",
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 6,
        position: "relative",
        top: 20,
        alignItems: "center"
    },
    bodyContainer: {
        flex: 1,
        justifyContent: "space-evenly"
    }
});
