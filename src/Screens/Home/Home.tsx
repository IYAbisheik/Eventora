import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
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
    { id: 1, eventImg: require("../../../Assets/Images/music.jpeg") },
    { id: 2, eventImg: require("../../../Assets/Images/art.jpeg") },
    { id: 3, eventImg: require("../../../Assets/Images/sports.jpeg") },
    { id: 4, eventImg: require("../../../Assets/Images/community.jpeg") },
    { id: 5, eventImg: require("../../../Assets/Images/entertainment.jpeg") },
  ];

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
    <View style={{ flex: 1 }}>
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

      <LinearGradient
        colors={["#000000", "#4A6CF7", "#7B2FF7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: "27.3%", borderRadius: 40, width: "100%", }}
      >
        <Animated.View style={{ height: animatedHeight, width: "100%" }}>
          <View style={{ flex: 1 }}>
            {/* Top bar */}
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
                    left: 5,
                  }}
                />
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderRadius: 50,
                    paddingHorizontal: 16,
                    paddingVertical: 9,
                    backgroundColor: "#8A91F5",
                    left: 12,
                    opacity: 0.9
                  }}
                >
                  <Icon
                    name="filter"
                    size={20}
                    color="#fff"
                    style={{ right: 5, opacity: 0.7 }}
                  />
                  <Text style={{ color: "white", fontSize: 16, opacity: 0.7 }}>
                    Filters
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: width / 10 }}>
              <FlatList
                data={eventsHeading}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 25 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      marginRight: 15,
                      borderRadius: 50,
                      paddingVertical: 10,
                      flexDirection: "row",
                      paddingHorizontal: 25,
                      gap: 4,
                      backgroundColor: item.backgroundColor,
                      zIndex: 100000
                    }}
                  >
                    {renderIcon(item)}
                    <Text style={{ color: "white", fontSize: 16 }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      <ScrollView
    style={{ flex: 1, backgroundColor: "#F0F0F0", zIndex: -1, }}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 40, }}
  >
      <View style={{ marginTop: width/15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: width / 5,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "500", opacity: 0.9 }}>
            Upcoming Events
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
              top: 3,
            }}
          >
            <Text style={{ fontSize: 14, opacity: 0.6, alignItems: "center" }}>
              See All
            </Text>
            <FontAwesome5
              name="caret-right"
              size={13.5}
              color="#000"
              style={{ opacity: 0.6 }}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={upcomingEvents}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 25 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginRight: 15,
                width: width / 1.4,
                borderRadius: 15,
                backgroundColor: "white",
                overflow: "hidden",
                height: width / 1.35,
                alignItems: "center",
                paddingVertical: 15,
                paddingHorizontal: 15
              }}
            >
              <ImageBackground
                source={item.eventImg}
                style={{
                  width: "100%",
                  height: width / 2.1,
                }}
                imageStyle={{ borderRadius: 15 }}
              >
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ width: "100%", height: "15%", justifyContent: "center", alignItems: "center", marginTop: width / 15 }}>
        <View style={{ flexDirection: "row", width: "90%", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "#CEEAD6", borderRadius: 10 }}>
          <View style={{ position: "relative", left: 20, gap: 15 }}>
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Invite your friends</Text>
              <Text>Get 10% offer for ticket</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: "#6ec186", width: "60%", height: "25%", borderRadius: 7, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>INVITE</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image source={require("../../../Assets/Images/invite_gift_image.png")} style={{ width: width / 1.9, height: width / 2.8 }} />
          </View>
        </View>
      </View>
      <View style={{ marginTop: width / 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: width / 5,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "500", opacity: 0.9 }}>
            Nearby You
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
              top: 3,
            }}
          >
            <Text style={{ fontSize: 14, opacity: 0.6, alignItems: "center" }}>
              See All
            </Text>
            <FontAwesome5
              name="caret-right"
              size={13.5}
              color="#000"
              style={{ opacity: 0.6 }}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={upcomingEvents}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 25 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginRight: 15,
                width: width / 1.4,
                borderRadius: 15,
                backgroundColor: "white",
                overflow: "hidden",
                height: width / 1.35,
                alignItems: "center",
                paddingVertical: 15,
                paddingHorizontal: 15
              }}
            >
              <ImageBackground
                source={item.eventImg}
                style={{
                  width: "100%",
                  height: width / 2.1,
                }}
                imageStyle={{ borderRadius: 15 }}
              >
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
      </ScrollView>
    </View>
  );
};

export default Home;
