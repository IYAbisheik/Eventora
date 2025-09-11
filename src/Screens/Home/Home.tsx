import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = () => {
  const { width, height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const animatedHeight = useRef(new Animated.Value(0.54 * height)).current;

  const eventsHeading = [
    { id: 1, title: "Sports", set: "FontAwesome5", name: "baseball-ball", size: 18, color: "white", backgroundColor: "#F4B142" },
    { id: 2, title: "Music", set: "Icon", name: "music", size: 18, color: "white", backgroundColor: "#35D7EA" },
    { id: 3, title: "Food", set: "Icon", name: "spoon", size: 18, color: "white", backgroundColor: "#A83485" },
    { id: 4, title: "Education", set: "Icon", name: "graduation-cap", size: 18, color: "white", backgroundColor: "#043EFB" },
    { id: 5, title: "Community", set: "Icon", name: "users", size: 18, color: "white", backgroundColor: "#F4B142" },
    { id: 6, title: "Art", set: "FontAwesome5", name: "palette", size: 18, color: "white", backgroundColor: "#35D7EA" },
    { id: 7, title: "Entertainment", set: "Icon", name: "film", size: 18, color: "white", backgroundColor: "#A83485" },
  ];

  const upcomingEvents = [
    { id: 1, eventImg: require("../../../Assets/Images/music.jpeg")},
    { id: 2, eventImg: require("../../../Assets/Images/art.jpeg")},
    { id: 3, eventImg: require("../../../Assets/Images/sports.jpeg")},
    { id: 4, eventImg: require("../../../Assets/Images/community.jpeg")},
    { id: 5, eventImg: require("../../../Assets/Images/entertainment.jpeg")}
  ]

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(animatedHeight, {
        toValue: 0.54 * height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(animatedHeight, {
        toValue: 0.54 * height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [animatedHeight, height]);

  const renderIcon = (icon) => {
    switch (icon.set) {
      case "FontAwesome5":
        return <FontAwesome5 name={icon.name} size={icon.size} color={icon.color} />;
      case "Icon":
        return <Icon name={icon.name} size={icon.size} color={icon.color} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <LinearGradient
        colors={["#000000", "#4A6CF7", "#7B2FF7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: insets.top,
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      <Animated.View style={{ height: animatedHeight, width: "100%" }}>
        <ImageBackground
          source={require("../../../Assets/Images/home's_background.png")}
          style={{ flex: 1, height: "53%" }}
        >

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingTop: insets.top + 10,
              paddingHorizontal: 15,
            }}
          >

            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require("../../../Assets/icons/drawer_menu.png")}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 15, opacity: 0.7 }}>
                  Current Location
                </Text>
                <TouchableOpacity style={{ left: 3 }}>
                  <Icon name="chevron-down" size={13} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={{ color: "white", fontSize: 13 }}>
                India, Tamil Nadu
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => console.log("Open Notifications")}
              style={{ padding: 5 }}
            >
              <Icon name="bell" size={23} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: 40, paddingHorizontal: 17 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 15,
                borderColor: "rgba(255,255,255,0.7)",
                paddingHorizontal: 10,
              }}
            >
              <Icon name="search" size={25} color="#fff" />
              <TextInput
                placeholder="Search..."
                placeholderTextColor="rgba(255,255,255,0.7)"
                selectionColor="rgba(255,255,255,0.7)"
                style={{
                  flex: 1,
                  color: "white",
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  fontSize: 19,
                  left: 5
                }}
                autoFocus={true}
              />
              <TouchableOpacity style={{ flexDirection: "row", borderRadius: 50, paddingHorizontal: 16, paddingVertical: 9, backgroundColor: "#9583f2", left: 12 }}>
                <Icon name="filter" size={20} color="#fff" style={{ right: 5, opacity: 0.7 }} />
                <Text style={{ color: "white", fontSize: 16, opacity: 0.7 }}>Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 25 }}
            >
              {eventsHeading.map((title, index) => {
                return (
                  <TouchableOpacity key={index} style={{
                    marginRight: 15,
                    borderRadius: 50,
                    paddingVertical: 10,
                    flexDirection: "row",
                    paddingHorizontal: 25,
                    marginTop: width / 10.5, gap: 4, backgroundColor: title.backgroundColor
                  }}>
                    <Text>{renderIcon(title)}</Text>
                    <Text
                      style={{
                        color: "white", fontSize: 16
                      }}
                    >
                      {title.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", gap: width / 5, alignItems: "center", position: "relative", top: width / 16 }}>
              <Text style={{ fontSize: 24, fontWeight: "500", opacity: 0.9 }}>
                Upcoming Events
              </Text>
              <TouchableOpacity style={{ flexDirection: "row", gap: 5, justifyContent: "center", alignItems: "center", top: 3 }}>
                <Text style={{ fontSize: 14, opacity: 0.6, alignItems: "center" }}>
                  See All
                </Text>
                <FontAwesome5 name="caret-right" size={13.5} color="#000" style={{ opacity: 0.6 }} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: "row", position: "relative", top: width / 9}}>
              <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 25 }}
              >
                {upcomingEvents.map((i, index) => {
                  return(
                    <TouchableOpacity key={index} style={{marginRight: width/10, width: "17.8%", height: width/1.3, alignItems: "center", backgroundColor: "white", paddingHorizontal: 20, borderRadius: 15 }}>
                      <ImageBackground source={i.eventImg} style={{width: width/1.55, height: width/2.1, marginTop: 15}}>

                      </ImageBackground>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

export default Home;
