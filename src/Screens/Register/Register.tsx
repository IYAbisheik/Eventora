import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    useWindowDimensions, 
    ScrollView 
  } from 'react-native';
  import React, { useContext, useState } from 'react';
  import GradientText from '../../Components/GradientText/GradientText';
  import LinearGradient from 'react-native-linear-gradient';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { useNavigation } from '@react-navigation/native';
  import { REGISTER } from '../../Network/mutations/register';
  import { useMutation } from '@apollo/client/react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { AuthContext } from '../../../contexts/Auth';
  import { Picker } from '@react-native-picker/picker';
  
  const Register = () => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);
  
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organizer, setOrganizer] = useState<"" | "Yes" | "No">("");
  
    const [registerUser, { loading }] = useMutation(REGISTER);
  
    // Validate inputs
    const validateFields = () => {
      if (!firstname || !lastname || !username || !phoneNumber || !email || !password || !organizer) {
        Alert.alert('Error', 'All fields are required');
        return false;
      }
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Enter a valid email');
        return false;
      }
      const phoneRegex = /^\d{10,}$/;
      if (!phoneRegex.test(phoneNumber)) {
        Alert.alert('Error', 'Enter a valid phone number');
        return false;
      }
      return true;
    };
  
    // Handle registration
    const handleRegister = async () => {
      if (!validateFields()) return;
  
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
              organizer: organizer === 'Yes',
            },
          },
        });
  
        const userData = data?.register?.user;
        const token = data?.register?.token;
  
        if (!userData || !token) {
          Alert.alert('Error', 'Registration failed. Please try again.');
          return;
        }
  
        await AsyncStorage.setItem('user', JSON.stringify({ ...userData, token }));
        login({ ...userData, token });
  
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
  
      } catch (err: any) {
        console.error('REGISTER_ERROR', err);
        let message = 'Something went wrong!';
        if (err?.graphQLErrors?.[0]?.message) message = err.graphQLErrors[0].message;
        else if (err?.message) message = err.message;
        Alert.alert('Error', message);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.registerTitle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <GradientText text="Create account" style={{ fontWeight: 'bold', fontSize: 32 }} />
          <View />
        </View>
  

        <View style={styles.formWrapper}>

          <View style={styles.inputContainer}>
            <Text style={styles.labelRegister}>Firstname</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="Firstname"
              value={firstname}
              onChangeText={setFirstname}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Text style={styles.labelRegister}>Lastname</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="Lastname"
              value={lastname}
              onChangeText={setLastname}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Text style={styles.labelRegister}>Username</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Text style={styles.labelRegister}>Email</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Text style={styles.labelRegister}>Phone number</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="Phone number"
              value={phoneNumber}
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Text style={styles.labelRegister}>Password</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
  
          <View style={[styles.inputContainer, styles.pickerWrapper]}>
            <Picker
              selectedValue={organizer}
              onValueChange={(value) => setOrganizer(value)}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Select Organizer" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
  
          <LinearGradient
            colors={['#000000', '#4A6CF7', '#7B2FF7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 8 }}
          >
            <TouchableOpacity style={styles.RegisterButton} onPress={handleRegister}>
              <Text style={styles.RegisterText}>{loading ? 'Loading...' : 'Register'}</Text>
            </TouchableOpacity>
          </LinearGradient>
  
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
            Already have an account?
          </Text>
  
          <LinearGradient
            colors={['#000000', '#4A6CF7', '#7B2FF7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 2, borderRadius: 8 }}
          >
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
              <GradientText text="Login" style={{ fontWeight: 'bold', fontSize: 20 }} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    );
  };
  
  export default Register;
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'white',
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    formWrapper: {
      gap: 20,
    },
    RegisterButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 12,
      marginVertical: 10,
    },
    RegisterText: {
      fontSize: 18,
      color: 'white',
      fontWeight: '600',
    },
    registerTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    inputContainer: {
      gap: 5,
    },
    labelRegister: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    textInputBox: {
      backgroundColor: '#F0F0F0',
      paddingHorizontal: 15,
      height: 45,
      borderRadius: 8,
    },
    pickerWrapper: {
      backgroundColor: '#F0F0F0',
      borderRadius: 8,
      justifyContent: 'center',
      height: 45,
    },
    loginButton: {
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      paddingVertical: 10,
    },
  });
  