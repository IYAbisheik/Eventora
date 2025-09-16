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
    Platform
} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import GradientText from '../../Components/GradientText/GradientText';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {}

const EditProfile = (props: Props) => {
    const { width } = useWindowDimensions();

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
                        <TouchableOpacity style={{position: "absolute"}}>
                            <Icon name="arrow-back" size={25}/>
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
                                        <TextInput placeholder='First Name' style={styles.input} />
                                    </View>
                                    <View>
                                        <Text style={{ opacity: 0.8, marginBottom: 5 }}>Last Name</Text>
                                        <TextInput placeholder='Last Name' style={styles.input} />
                                    </View>
                                    <View>
                                        <Text style={{ opacity: 0.8, marginBottom: 5 }}>Username</Text>
                                        <TextInput placeholder='Username' style={styles.input} />
                                    </View>
                                    <View>
                                        <Text style={{ opacity: 0.8, marginBottom: 5 }}>Email</Text>
                                        <TextInput placeholder='Email' style={styles.input} />
                                    </View>
                                    <View>
                                        <Text style={{ opacity: 0.8, marginBottom: 5 }}>Phone Number</Text>
                                        <TextInput placeholder='Phone Number' style={styles.input} />
                                    </View>
                                    <View style={{ gap: 5 }}>
                                        <TextInput placeholder='Birth' style={styles.input} />
                                        <TextInput placeholder='Gender' style={styles.input} />
                                    </View>
                                    <LinearGradient
                                        colors={['#000000', '#4A6CF7', '#7B2FF7']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{ padding: 2.5, borderRadius: 100, marginTop: 15 }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                borderRadius: 100,
                                                alignItems: "center",
                                                justifyContent: 'center',
                                                backgroundColor: "#fff",
                                                padding: 12,
                                                paddingHorizontal: 140
                                            }}
                                        >
                                            <GradientText text="Update" style={{ fontSize: 15, fontWeight: "500" }} />
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
