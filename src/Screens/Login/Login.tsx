import React, { useState } from 'react'
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fa from 'react-native-vector-icons/Ionicons';
import GradientText from '../../Components/GradientText/GradientText';
import { useNavigation } from '@react-navigation/native';
import Checkbox from '../../Components/Checkbox/Checkbox';
import { LOGIN } from '../../Network/mutations/login';
import { useMutation } from '@apollo/client/react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_SIGNIN } from '../../Network/mutations/googleSignin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type Props = {}

const Login = (props: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const [login, { loading, error }] = useMutation(LOGIN);

  const [googleSignInMutation] = useMutation(GOOGLE_SIGNIN);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const { email, id: googleId, givenName, familyName, photo } = userInfo.data.user;
      console.log("Google User Info:", userInfo);

      const { data } = await googleSignInMutation({
        variables: {
          input: {
            email,
            googleId,
            firstname: givenName,
            lastname: familyName,
            photo,
          },
        },
      });

      const token = data.googleSignIn.token;
      const user = data.googleSignIn.user;

      console.log("Logged in user:", user, "Token:", token);

      Alert.alert("Login success", `Welcome ${userInfo.data?.user.name}`);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainDrawer" }],
      });
      
    } catch (error: any) {
      console.log("Google Signin Error:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("In progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play Services not available");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  const handleLogin = async () => {
    if (!password || !username) {
      Alert.alert("Error", "All fields are required");
      return;
  }

    try {
      const { data } = await login({
        variables: { email: username, password },
      });
      
      const { token, user } = data?.login;
      
      await AsyncStorage.setItem("token", token);
      const testToken = await AsyncStorage.getItem("token");
  console.log("Stored token:", testToken);
      const userData = { ...user, token };
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      Alert.alert("Login Success", `Welcome ${user.firstname || user.email}`);
      console.log("LINE86", JSON.stringify(user), "token", token);
      
      navigation.reset({
        index: 0,
        routes: [{ name: "MainDrawer" }],
      });
    }
    catch (err: any) {
      console.log("GraphQL Error:", err?.graphQLErrors);
      console.log("Network Error:", err?.networkError);
      console.log("Full Error:", JSON.stringify(err, null, 2));

      Alert.alert("Login Failed", err?.message || "Something went wrong.");
    }
  };

  return (

    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.topContainer}>
        <ImageBackground source={require("../../../Assets/Images/linear_gradient_login.png")} style={styles.linearBackground}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "7%", position: "absolute", left: 15, top: 15 }}>
            <Fa name="arrow-back" size={26} color="white" />
          </TouchableOpacity>
          <Image source={require("../../../Assets/Images/appIcon.png")} style={styles.loginAppIcon} />
        </ImageBackground>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.downContainer}
      >
        <ScrollView
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20, gap: 29 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text style={styles.welcomeText}>Welcome back !</Text>
          </View>
          <View style={{ gap: 25, width: "100%" }}>
            <TextInput placeholder='Email' style={styles.textInput} value={username} onChangeText={setUsername} />
            <TextInput placeholder='Password' style={styles.textInput} secureTextEntry value={password} onChangeText={setPassword} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity >
                <Checkbox
                  label="Remember me"
                  size={18}
                  checkedColor="#7B2FF7"
                  uncheckedColor="#999"
                  defaultChecked={isChecked}
                  onChange={(val) => setIsChecked(val)}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ gap: 20 }}>
            <LinearGradient
              colors={['#000000', '#4A6CF7', '#7B2FF7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 2.5, borderRadius: 100 }}
            >
              <TouchableOpacity style={styles.loginBtn} disabled={loading} onPress={() => handleLogin()}>
                <GradientText text={loading ? "Logging in..." : "Login"} style={{ fontSize: 20, fontWeight: "500" }} />
              </TouchableOpacity>
            </LinearGradient>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Text>New user? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}><GradientText text="Sign Up" style={{ fontSize: 15, fontWeight: "bold" }} /></TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ opacity: 0.5 }}>_________________________  </Text>
              <GradientText text="OR" style={{ fontSize: 15, fontWeight: "bold", top: 3 }} />
              <Text style={{ opacity: 0.5 }}>  ________________________</Text>
            </View>
          </View>
          <View style={{ gap: 10 }}>
            <View style={styles.socialLogin}>
              <LinearGradient
                colors={['#000000', '#4A6CF7', '#7B2FF7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 40, height: 40, borderRadius: 100, alignItems: "center", justifyContent: "center" }}
              >
                <TouchableOpacity onPress={googleSignIn}>
                  <Icon name="google" size={25} color="#fff" />
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={['#000000', '#4A6CF7', '#7B2FF7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: "center" }}
              >
                <TouchableOpacity>
                  <Icon name="facebook-square" size={25} color="#fff" />
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View>
              <Text>Sign in with another account</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>

  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    height: "37.9%"
  },
  linearBackground: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  loginAppIcon: {
    height: "70%",
    width: "70%",
    bottom: "4%"
  },
  downContainer: {
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
    gap: 40
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "500"
  },
  socialLogin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  createAccountAndLoginButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    padding: 15,
    paddingHorizontal: 80
  },
  createAccountAndLoginText: {
    fontSize: 25,
    color: "white",
    fontWeight: "400"
  },
  textInput: {
    borderWidth: 0.7,
    borderColor: "black",
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: "#F0F0F0"
  },
  loginBtn: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    width: "100%",
    alignSelf: "center"
  }
})