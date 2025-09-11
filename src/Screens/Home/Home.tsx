import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = () => {
  const { width, height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const animatedHeight = useRef(new Animated.Value(0.54 * height)).current; 

  const eventsHeading = ["Sports", "Music", "Food", "Education", "Community", "Art", "Entertainment"]

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

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Gradient status bar overlay */}
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

            {/* Location */}
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 15, opacity: 0.7 }}>
                  Current Location
                </Text>
                <TouchableOpacity style={{left: 3}}>
                  <Icon name="chevron-down" size={13} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={{ color: "white", fontSize: 13 }}>
                India, Tamil Nadu
              </Text>
            </View>

            {/* Notification */}
            <TouchableOpacity
              onPress={() => console.log("Open Notifications")}
              style={{ padding: 5 }}
            >
              <Icon name="bell" size={23} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={{ paddingTop: 40, paddingHorizontal: 17 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 15,
                // borderWidth: 0.2,
                borderColor: "rgba(255,255,255,0.7)",
                paddingHorizontal: 10,
              }}
            >
              <Icon name="search" size={25} color="#fff" />
              <TextInput
                placeholder="Search..."
                placeholderTextColor="rgba(255,255,255,0.7)"
                selectionColor="rgba(255,255,255,0.7)"
                selection= "10"
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
              <TouchableOpacity style={{flexDirection: "row", borderRadius: 50, paddingHorizontal: 16, paddingVertical: 9, backgroundColor: "#9583f2", left: 12}}>
                <Icon name="filter" size={20} color="#fff" style={{right: 5, opacity: 0.7}}/>
                <Text style={{color: "white", fontSize: 16, opacity: 0.7}}>Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: "row"}}>
            {eventsHeading.map((title, index) => {
                return(
                    <TouchableOpacity style={{}}>
                        <Text style={{color: "white"}}>{title}</Text>
                    </TouchableOpacity>
                )
            })}
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

export default Home;
