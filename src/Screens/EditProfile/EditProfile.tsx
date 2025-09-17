import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import GradientText from '../../Components/GradientText/GradientText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UPDATE_USER } from "../../Network/mutations/updateUser";
import { useMutation } from '@apollo/client/react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; 

type Props = {}

const EditProfile = (props: Props) => {
    const { width } = useWindowDimensions();

    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState(""); // optional if email is editable
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [birthDate, setBirthDate] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [gender, setGender] = React.useState("");

    const [updateUser, { loading }] = useMutation(UPDATE_USER, {
        onCompleted: (data) => {
            console.log("Updated user:", data.updateUser);
            Alert.alert("Profile updated successfully!");
        },
        onError: (error) => {
            console.log(error);
            Alert.alert("Update failed: " + error.message);
        },
    });

    const validateInputs = () => {
        if (!firstname.trim()) return "First name is required";
        if (!lastname.trim()) return "Last name is required";
        if (!username.trim()) return "Username is required";
        if (!email.trim()) return "Email is required";

        // Basic email pattern check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) return "Invalid email address";

        // Optional phone validation (10-15 digits)
        const phonePattern = /^[0-9]{10,15}$/;
        if (phoneNumber && !phonePattern.test(phoneNumber)) return "Invalid phone number";

        // Optional birthdate check (YYYY-MM-DD)
        const birthPattern = /^\d{4}-\d{2}-\d{2}$/;
        if (birthDate && !birthPattern.test(birthDate)) return "Birth must be in YYYY-MM-DD format";

        // Optional gender validation
        if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
            return "Gender must be Male, Female, or Other";
        }

        return null; // no errors
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="transparent"
                        translucent={true}
                    />
                    <LinearGradient
                        colors={["#BBAFAF", "#D9D9D9", "#4A6CF7", "#7B2FF7"]}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={{ height: "28%" }}
                    >
                        <TouchableOpacity style={{ position: "absolute" }}>
                            <Icon name="arrow-back" size={25} />
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={styles.formContainer}>
                        <View style={{ alignItems: "center", position: "relative", bottom: width / 10 }}>
                            <Image
                                source={{ uri: "https://i.pravatar.cc/100" }}
                                style={styles.userIcon}
                            />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#124A7D",
                                    padding: 5,
                                    borderRadius: 40,
                                    alignItems: "center",
                                    position: "relative",
                                    left: width / 12,
                                    bottom: width / 12
                                }}
                            >
                                <MaterialCommunityIcons name="edit" size={15} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* Form */}
                        <View style={{ alignItems: "center", position: "relative", bottom: "5%" }}>
                            <View style={{ width: "80%" }}>
                                <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "700" }}>
                                    Edit Profile
                                </Text>
                                <View style={{ marginTop: 20, gap: 15 }}>
                                    <View>
                                        <Text style={{ opacity: 0.8, marginBottom: 5 }}>First Name</Text>
                                        <TextInput
                                            placeholder="First Name"
                                            style={styles.input}
                                            value={firstname}
                                            onChangeText={setFirstname}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ opacity: 0.8, marginBottom: 5 }}>Last Name</Text>
                                        <TextInput
                                            placeholder="Last Name"
                                            style={styles.input}
                                            value={lastname}
                                            onChangeText={setLastname}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ opacity: 0.8, marginBottom: 5 }}>Username</Text>
                                        <TextInput
                                            placeholder="Username"
                                            style={styles.input}
                                            value={username}
                                            onChangeText={setUsername}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ opacity: 0.8, marginBottom: 5 }}>Email</Text>
                                        <TextInput
                                            placeholder="Email"
                                            style={styles.input}
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ opacity: 0.8, marginBottom: 5 }}>Phone Number</Text>
                                        <TextInput
                                            placeholder="Phone Number"
                                            style={styles.input}
                                            value={phoneNumber}
                                            onChangeText={setPhoneNumber}
                                        />
                                    </View>
                                    <View>
  <Text style={{ opacity: 0.8, marginBottom: 5 }}>Birth Date</Text>
  <TouchableOpacity
    style={styles.input}
    onPress={() => setShowDatePicker(true)}
  >
    <Text>{birthDate ? birthDate.toISOString().split("T")[0] : "Select birth date"}</Text>
  </TouchableOpacity>
  {showDatePicker && (
    <DateTimePicker
      value={birthDate || new Date()}
      mode="date"
      display="default"
      onChange={(event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) setBirthDate(selectedDate);
      }}
      maximumDate={new Date()} // cannot select future dates
    />
  )}
</View>

<View>
  <Text style={{ opacity: 0.8, marginBottom: 5 }}>Gender</Text>
  <View style={[styles.input, { paddingHorizontal: 0 }]}>
    <Picker
      selectedValue={gender}
      onValueChange={(itemValue) => setGender(itemValue)}
    >
      <Picker.Item label="Select Gender" value="" />
      <Picker.Item label="Male" value="Male" />
      <Picker.Item label="Female" value="Female" />
      <Picker.Item label="Other" value="Other" />
    </Picker>
  </View>
</View>
                                    <LinearGradient
                                        colors={['#000000', '#4A6CF7', '#7B2FF7']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{ padding: 2.5, borderRadius: 100, marginTop: 15 }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                const errorMessage = validateInputs();
                                                if (errorMessage) {
                                                    Alert.alert("Validation Error", errorMessage);
                                                    return;
                                                }

                                                updateUser({
                                                    variables: {
                                                        firstname,
                                                        lastname,
                                                        username,
                                                        phoneNumber,
                                                        birthDate,
                                                        gender,
                                                    }
                                                });
                                            }}
                                            style={{
                                                borderRadius: 100,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#fff",
                                                padding: 12,
                                                width: "100%"
                                            }}
                                        >
                                            <GradientText text={loading ? "Updating..." : "Update"} style={{ fontSize: 15, fontWeight: "500" }} />
                                        </TouchableOpacity>

                                    </LinearGradient>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    formContainer: {
        backgroundColor: "white",
        height: "85%",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        position: "relative",
        bottom: "10%",
    },
    userIcon: {
        width: 110,
        height: 110,
        borderRadius: 65,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 45
    }
})
