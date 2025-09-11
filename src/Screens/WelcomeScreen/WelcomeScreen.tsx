import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientText from '../../Components/GradientText/GradientText';
import { useNavigation } from '@react-navigation/native';

type Props = {}

const WelcomeScreen = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ImageBackground source={require("../../../Assets/Images/linear_gradient_login.png")} style={styles.linearBackground}>
          <Image source={require("../../../Assets/Images/appIcon.png")} style={styles.loginAppIcon} />
        </ImageBackground>
      </View>
      <View style={styles.downContainer}>
        <View>
          <Text style={styles.welcomeText}>Welcome !</Text>
        </View>
        <View style={{ gap: 20 }}>
          <LinearGradient
            colors={['#000000', '#4A6CF7', '#7B2FF7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 100 }}
          >
            <TouchableOpacity style={styles.createAccountAndLoginButton} onPress={() => navigation.navigate("Register")}>

              <Text style={styles.createAccountAndLoginText}>Create Account</Text>

            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#000000', '#4A6CF7', '#7B2FF7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 2.5, borderRadius: 100 }}
          >
            <TouchableOpacity style={{ borderRadius: 100, alignItems: "center", justifyContent: 'center', backgroundColor: "#fff", padding: 10, paddingHorizontal: 140 }} onPress={() => navigation.navigate("Login")}>
              <GradientText text="Login" style={{fontSize: 20, fontWeight: "500"}}/>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={{ gap: 10 }}>
          <View style={styles.socialLogin}>
            <LinearGradient
              colors={['#000000', '#4A6CF7', '#7B2FF7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ width: 40, height: 40, borderRadius: 100, alignItems: "center", justifyContent: "center" }}
            >
              <TouchableOpacity>
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
      </View>
    </View>
  )
}

export default WelcomeScreen;

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
    height: "53%",
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
    padding: 10,
    paddingHorizontal: 80
  },
  createAccountAndLoginText: {
    fontSize: 20,
    color: "white",
    fontWeight: "400"
  }
})