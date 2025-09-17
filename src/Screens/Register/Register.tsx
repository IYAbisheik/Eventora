import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import GradientText from '../../Components/GradientText/GradientText'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { REGISTER } from '../../Network/mutations/register';
import { useMutation } from '@apollo/client/react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../../../contexts/Auth';

type Props = {}

const Register = (props: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const navigation = useNavigation();

    const { login } = useContext(AuthContext);

    const [registerUser, { loading }] = useMutation(REGISTER);

    const handleRegister = async () => {
        if (!email || !password || !repeatPassword) {
          Alert.alert("Error", "All fields are required");
          return;
        }
        if (password !== repeatPassword) {
          Alert.alert("Error", "Passwords do not match");
          return;
        }
    
        try {
          const { data } = await registerUser({ variables: { email, password } });
          const userData = data.register;
          console.log("Registered:", data);

          await login(userData);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
    
          Alert.alert("Success", "Account created successfully!");
          navigation.navigate("Login");
        } catch (err: any) {
          console.error(err);
          Alert.alert("Error", err.message);
        }
    };

    console.log("LINE43", password, email);
    
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: "space-evenly", backgroundColor: "white", width: "90%", height: "95%", position: "absolute", left: "5%" }}>
                <View style={styles.registerTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "7%" }}>
                        <Icon name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <GradientText text="Create account" style={{ fontWeight: "bold", fontSize: 30, textAlign: "none" }} />
                    <Text>Please enter your details</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Your email</Text>
                    <TextInput style={styles.textInputBox} placeholder='Enter your email'
                        value={email}
                        onChangeText={setEmail} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Password</Text>
                    <TextInput style={styles.textInputBox} placeholder='Enter your password'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Repeat password</Text>
                    <TextInput style={styles.textInputBox} placeholder='Repeat password'
                        secureTextEntry
                        value={repeatPassword}
                        onChangeText={setRepeatPassword} />
                </View>
                <View style={{ gap: 30 }}>
                    <LinearGradient
                        colors={['#000000', '#4A6CF7', '#7B2FF7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 8 }}
                    >
                        <TouchableOpacity style={styles.RegisterButton} onPress={handleRegister}>

                            <Text style={styles.RegisterText}>{loading ? "Loading..." : "Register"}</Text>

                        </TouchableOpacity>
                    </LinearGradient>
                    <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>Already have an account?</Text>
                    <LinearGradient
                        colors={['#000000', '#4A6CF7', '#7B2FF7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ padding: 2.5, borderRadius: 8 }}
                    >
                        <TouchableOpacity style={{ borderRadius: 10, alignItems: "center", justifyContent: 'center', backgroundColor: "#fff", padding: 15 }} onPress={() => navigation.navigate("MainDrawer")}>
                            <GradientText text="Login" style={{ fontWeight: "bold", fontSize: 20 }} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    RegisterButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        padding: 15,
        paddingHorizontal: 80,
        elevation: 25
    },
    RegisterText: {
        fontSize: 20,
        color: "white",
        fontWeight: "400"
    },
    registerTitle: {
        gap: 10
    },
    inputContainer: {
        gap: 10
    },
    labelRegister: {
        fontWeight: "bold",
        fontSize: 13
    },
    textInputBox: {
        backgroundColor: "#F0F0F0",
        paddingHorizontal: 20,
        height: 60,
        borderRadius: 8
    }
})