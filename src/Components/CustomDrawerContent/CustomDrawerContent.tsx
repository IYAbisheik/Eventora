import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

function CustomDrawerContent(props) {
    const navigation = useNavigation();
  
    const menuItems = [
      { label: "My profile", icon: "👤", route: "Profile" },
      { label: "Message", icon: "✉️", route: "User" },
      { label: "Calender", icon: "🗓️", route: "" },
      { label: "Bookmark", icon: "🏷️", route: "" },
      { label: "Contact Us", icon: "📞", route: "" },
      { label: "Settings", icon: "⚙️", route: "" },
      { label: "Helps & FAQs", icon: "❓", route: "" }
    ];
  
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={{ padding: 20 }}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 10 }}
          />
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            Leo abi
          </Text>
        </LinearGradient>
  
        <View style={{ flex: 1, padding: 15 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginBottom: 8,
                backgroundColor:
                  props.state.routeNames[props.state.index] === item.route
                    ? "#E8F5E9"
                    : "transparent",
              }}
              onPress={() => item.route && navigation.navigate(item.route)}
            >
              <Text style={{fontSize: 18}}>{item.icon}</Text>
              <Text style={{ fontSize: 16, marginLeft: 5 }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderColor: "#ccc",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontSize: 16 }}>➜] Logout</Text>
        </TouchableOpacity>
      </View>
      </DrawerContentScrollView>
    );
  }

export default CustomDrawerContent;