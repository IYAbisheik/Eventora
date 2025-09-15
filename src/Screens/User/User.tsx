import React, { useState } from "react";
import {
    Image,
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const User = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const renderScene = SceneMap({
        first: Description,
        second: Address,
    });

    const routes = [
        { key: "first", title: "Description" },
        { key: "second", title: "Address" },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View style={styles.header}>
                <Image
                    source={require("../../../Assets/Private_party.jpg")}
                    style={styles.headerImage}
                />
                <Text style={styles.titleText}>Private party</Text>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.dateTimeText}>Date: 02/Sep</Text>
                    <Text style={styles.dateTimeText}>Time: 05:00PM</Text>
                </View>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                swipeEnabled
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: "transparent" }}
                        style={{
                            backgroundColor: "transparent",
                            elevation: 0,
                        }}
                        renderTabBarItem={({ route, focused, onPress, onLongPress }) => {
                            const isFocused =
                                typeof focused === "boolean"
                                    ? focused
                                    : props.navigationState.index ===
                                    props.navigationState.routes.findIndex((r) => r.key === route.key);

                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={onPress}
                                    onLongPress={onLongPress}
                                    accessibilityRole="button"
                                    accessibilityState={isFocused ? { selected: true } : {}}
                                    style={{ marginHorizontal: 20 }}
                                    activeOpacity={0.85}
                                >
                                    <LinearGradient
                                        colors={
                                            isFocused
                                                ? ["#4A6CF7", "#7B2FF7"]
                                                : ["#EDEFF2", "#E0E4F8"]
                                        }
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{
                                            paddingVertical: 12,
                                            paddingHorizontal: 55,
                                            borderRadius: 8,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: isFocused ? "white" : "#333",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {route.title}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            );
                        }}
                    />
                )}
                style={{ flex: 1, top: 20 }}
            />
        </View>
    );
};

export default User;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: "35%",
        alignItems: "center",
        gap: 13,
    },
    headerImage: {
        width: "100%",
        height: "60%",
    },
    titleText: {
        fontSize: 35,
        color: "#b50427",
        fontWeight: "bold",
    },
    dateTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    dateTimeText: {
        fontSize: 15,
        fontWeight: "600",
        backgroundColor: "#d9c7b6",
        borderRadius: 6,
        padding: 10,
    },
});

const Description = () => (
    <ScrollView style={{ padding: 16 }}>
        <Text style={{ textAlign: "center", color: "black" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua...
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        </Text>
        <Image
            source={require("../../../Assets/design_img.png")}
            style={{ width: "100%", height: 200, marginTop: 20 }}
            resizeMode="contain"
        />
    </ScrollView>
);

const Address = () => (
    <ScrollView style={{ padding: 16, gap: 10 }}>
        <Text
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "#b50427",
            }}
        >
            Short and sweet
        </Text>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Short and sweet is located at T. Kodimangalam,
        </Text>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Thirumal Puram Post, Madurai, Tamil Nadu 625014
        </Text>
    </ScrollView>
);
