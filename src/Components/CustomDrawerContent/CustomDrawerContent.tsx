import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GET_CURRENT_USER } from '../../Network/queries/getCurrentUser';
import { useQuery } from '@apollo/client/react';

function CustomDrawerContent(props) {
    const navigation = useNavigation();
  
    const { data } = useQuery(GET_CURRENT_USER)

    const menuItems = [
      { label: "My profile", icon: "👤", route: "Profile" },
      { label: "Message", icon: "✉️", route: "Message" },
      { label: "Calender", icon: "🗓️", route: "" },
      { label: "Bookmark", icon: "🏷️", route: "" },
      { label: "Contact Us", icon: "📞", route: "" },
      { label: "Settings", icon: "⚙️", route: "" },
      { label: "Helps & FAQs", icon: "❓", route: "HelpAndFAQs" }
    ];

    const handleLogout = async () => {
      try {
        // Clear local storage
        await AsyncStorage.multiRemove(["token","user"])
    
        // Sign out from Google if user logged in with Google
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          console.log("Google sign-out success");
        } catch (googleError) {
          console.log("Google sign-out skipped:", googleError);
        }
    
        // Reset navigation to Login screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
    
  
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={{ padding: 20 }}>
          <Image
            source={{ uri: data.me.photo || "https://i.pravatar.cc/100" }}
            style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 10 }}
          />
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            {`${data.me.firstname} ${data.me.lastname}`}
          </Text>
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
            {`${data.me.email}`}
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
        <TouchableOpacity onPress={() => handleLogout()
        }>
          <Text style={{ fontSize: 16 }}>➜] Logout</Text>
        </TouchableOpacity>
      </View>
      </DrawerContentScrollView>
    );
  }

export default CustomDrawerContent;