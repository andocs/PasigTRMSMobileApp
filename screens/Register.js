import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar
} from "react-native";
import { Padding, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

import CustomInput from "../components/CustomInput";
import IndexFooter from "../components/IndexFooter";
import HeaderBack from "../components/HeaderBack";
import PrimaryButton from "../components/PrimaryButton";
import SocialLogin from "../components/SocialLogin";

const logoSize = (Dimensions.get('window').height / 100)*15

const Register = () => {
  const navigation = useNavigation();

  // State for form inputs
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading

  // Handle registration
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true); // Set loading to true
    try {
      const response = await fetch(
        "http://pasigtrms.great-site.net/mobile/register.php",
        {
          method: "POST",
          body: JSON.stringify({
            name: fullName,
            username,
            email,
            password,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        Alert.alert("Success", result.message);
        navigation.navigate("RegistrationCode", { email: email });
      } else {
        console.log(result);
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after process completes
    }
  };

  return (
    <SafeAreaView style={styles.register}>
      <StatusBar hidden={true} />
      <HeaderBack />
      <ScrollView style={{width:"100%"}} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.body}>
          <View style={[styles.logoContainer, styles.flexBox]}>
            <Image
              style={styles.pasigLogo}
              source={require("../assets/images/pasig-seal.png")}
            />
          </View>
          <View style={styles.innerBody}>
            <Text style={styles.textHeader}>Register</Text>
            <View style={styles.inputGroup}>
              <CustomInput
                placeholder="Full Name"
                iconName="person-outline"
                inputHeight={35}
                value={fullName}
                onChangeText={setFullName}
              />
              <CustomInput
                placeholder="Username"
                iconName="person-outline"
                inputHeight={35}
                value={username}
                onChangeText={setUserName}
              />
              <CustomInput
                placeholder="Email Address"
                iconName="mail-outline"
                inputHeight={35}
                value={email}
                onChangeText={setEmail}
              />
              <CustomInput
                placeholder="Password"
                iconName="lock-closed-outline"
                secureTextEntry
                inputHeight={35}
                value={password}
                onChangeText={setPassword}
              />
              <CustomInput
                placeholder="Confirm Password"
                iconName="lock-closed-outline"
                secureTextEntry
                inputHeight={35}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                onPress={handleRegister}
                text={"REGISTER"}
                loading={loading}
              />
            </View>
            {/* <Text style={styles.orText}>or sign in using</Text> */}
            {/* <SocialLogin /> */}
          </View>
        </View>
      </ScrollView>
      <IndexFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  register: {
    backgroundColor: Color.schemesOnPrimary,
    width: "100%",
    height: "100%",
    paddingVertical: 0,
    alignItems: "center",
    overflow: "scroll",
    justifyContent: "space-between",
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  body: {
    paddingHorizontal: Padding.p_21xl,
    paddingBottom: 50,
    zIndex: 1,
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "scroll",
    flex: 1,
  },
  innerBody: {
    gap: 20,
    width: "85%",
    flex: 3,
  },
  inputGroup: {
    gap: 10,
    width: "100%",
  },
  textHeader: {
    color: Color.colorPrimary,
    fontSize: FontSize.size_13xl,
    fontFamily: FontFamily.montserratExtraBold,
    textAlign: "center",
  },
  logoContainer: {
    flex: 1,
    paddingBottom: Padding.p_xl,
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
  },
  orText: {
    fontSize: FontSize.m3BodySmall_size,
    letterSpacing: 1,
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorBlack,
    textAlign: "center",
    marginTop: 5,
  },
  flexBox: {
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  pasigLogo: {
    height: logoSize,
    width: logoSize,
    resizeMode: "contain",
  },
});

export default Register;