import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, useWindowDimensions } from 'react-native'
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

    const { width, height } = useWindowDimensions();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const navigation = useNavigation();

    const { login } = useContext(AuthContext);

    const [registerUser, { loading }] = useMutation(REGISTER);

    const handleRegister = async () => {
        if (!email || !password || !repeatPassword || !username || !phoneNumber) {
            Alert.alert("Error", "All fields are required");
            return;
        }
        if (password !== repeatPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const { data } = await registerUser({
                variables: {
                  input: {
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    email: email.trim(),
                    password,
                    username: username.trim(),
                    phoneNumber: phoneNumber.trim(),
                  },
                },
              });
              
              
              const userData = data.register.user;
              const token = data.register.token;
              
              // Save to AsyncStorage
              await AsyncStorage.setItem("user", JSON.stringify({ ...userData, token }));
              
              // Update context or state
              login({ ...userData, token });
              
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
            <View style={{ justifyContent: "space-evenly", backgroundColor: "white", width: "90%", height: "100%", left: "5%" }}>
                <View style={styles.registerTitle}>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "relative", top: width / 40 }}>
                        <Icon name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View>
                        <GradientText text="Create account" style={{ fontWeight: "bold", fontSize: 32, textAlign: "none" }} />
                    </View>
                    <View></View>

                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Firstname</Text>
                    <TextInput style={styles.textInputBox} placeholder='Firstname'
                        value={firstname.trim()}
                        onChangeText={setFirstname} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Lastname</Text>
                    <TextInput style={styles.textInputBox} placeholder='Lastname'
                        value={lastname.trim()}
                        onChangeText={setLastname} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Username</Text>
                    <TextInput style={styles.textInputBox} placeholder='Username'
                        value={username.trim()}
                        onChangeText={setUserName} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Email</Text>
                    <TextInput style={styles.textInputBox} placeholder='Email'
                        value={email.trim()}
                        onChangeText={setEmail} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Phone number</Text>
                    <TextInput style={styles.textInputBox} placeholder='Phone number'
                        value={phoneNumber.trim()}
                        onChangeText={setPhoneNumber} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Password</Text>
                    <TextInput style={styles.textInputBox} placeholder='Password'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelRegister}>Confirm password</Text>
                    <TextInput style={styles.textInputBox} placeholder='Confirm password'
                        secureTextEntry
                        value={repeatPassword}
                        onChangeText={setRepeatPassword} />
                </View>
                <View style={{ gap: 15 }}>
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
                        style={{ padding: 2, borderRadius: 8 }}
                    >
                        <TouchableOpacity style={{ borderRadius: 10, alignItems: "center", justifyContent: 'center', backgroundColor: "#fff", padding: 10 }} onPress={() => navigation.navigate("Login")}>
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
        padding: 10,
        paddingHorizontal: 80,
        elevation: 25
    },
    RegisterText: {
        fontSize: 20,
        color: "white",
        fontWeight: "400"
    },
    registerTitle: {
        justifyContent: "space-between",
        flexDirection: "row",
        position: "relative",
        top: "2.5%",
        marginBottom: "5%",
        marginTop: "3%"
    },
    inputContainer: {
        gap: 5
    },
    labelRegister: {
        fontWeight: "bold",
        fontSize: 13
    },
    textInputBox: {
        backgroundColor: "#F0F0F0",
        paddingHorizontal: 20,
        height: 45,
        borderRadius: 8
    }
})