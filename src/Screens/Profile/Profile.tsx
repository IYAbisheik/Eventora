import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

    const navigation = useNavigation();

    const elements = [
        { icon: "heart-outline", label: "Favourites" },
        { icon: "download", label: "Downloads" },
        {},
        { icon: "translate", label: "Languages" },
        { icon: "crosshairs-gps", label: "Location" },
        { icon: "credit-card-outline", label: "Subscription" },
        {},
        { icon: "delete-outline", label: "Clear Cache" },
        { icon: "clock-outline", label: "Clear History" },
        { icon: "logout", label: "Log Out" },
        {}
    ]

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name="arrow-back" size={23} />
                </TouchableOpacity>

                <Text style={styles.title}>My Profile</Text>

                <TouchableOpacity>
                    <Icon name="settings" size={23} />
                </TouchableOpacity>
            </View>

            <View style={styles.topBody}>
                <View style={styles.gradientContainer}>
                    <View>
                        <Image
                            source={{ uri: "https://i.pravatar.cc/100" }}
                            style={styles.userIcon}
                        />
                        <TouchableOpacity style={{ backgroundColor: "white", padding: 5, width: "40%", borderRadius: 40, alignItems: "center", position: "absolute", right: 0, bottom: 0 }}>
                            <Icon name="camera-alt" size={19} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ color: "#000", fontSize: 25, fontWeight: "bold" }}>
                            Leo abi
                        </Text>
                        <Text style={{ color: "#000", fontSize: 15, fontWeight: "500" }}>
                            leoabi10@gmail.com
                        </Text>
                        <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate("EditProfile")}>
                            <Text style={{ color: "white" }}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                {elements.map((item, index) => {
                    return (
                        <View>
                            <TouchableOpacity key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 25 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", width: "50%", gap: 25 }}>
                                    <MaterialCommunityIcons name={item.icon} size={28} />
                                    <Text style={{ fontSize: 18, fontWeight: "400", textAlign: "left" }}>{item.label}</Text>
                                </View>
                                {item?.icon && <Text style={{ fontSize: 30, fontWeight: "700" }}>›</Text>}
                                {!item.icon && <Text style={{ position: "absolute", left: "6%", fontWeight: "700"}}>──────────────────────────────────────</Text>}
                            </TouchableOpacity>

                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    );
};

export default Profile;

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
        paddingHorizontal: 20
    },
    gradientContainer: {
        padding: 20, flexDirection: "row", alignItems: "center", gap: 15
    },
    userIcon: {
        width: 90, height: 90, borderRadius: 65, marginBottom: 10
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
