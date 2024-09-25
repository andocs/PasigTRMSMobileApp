import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import { Padding, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../components/CustomInput";
import IndexFooter from "../components/IndexFooter";
import HeaderBack from "../components/HeaderBack";
import PrimaryButton from "../components/PrimaryButton";
import SocialLogin from "../components/SocialLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logoSize = (Dimensions.get("window").height / 100) * 15;

const Login = ({ onUserLogin }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        "http://pasigtrms.great-site.net/mobile/login.php",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            remember_me: rememberMe,
          }),
        }
      );
  
      const result = await response.json(); // Parse JSON here
  
      if (result.success) {
        Alert.alert("Success", result.message);
  
        // Access user information from the result
        const userInfo = {
          userid: result.user.userid,
          role: result.user.role,
          email: result.user.email,
          name: result.user.name,
          info: result.user.info
        };
  
        onUserLogin(userInfo);
  
        // Store user info in AsyncStorage
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)); // Store as string
        navigation.navigate("DashboardTabs", { user: userInfo });
      } else if (result.action === "redirect") {        
        Alert.alert(
          "Inactive Account",
          result.message,
          [
            {
              text: "Verify Account",
              onPress: async () => {
                try {
                  // Fetch the resend_code endpoint before navigation
                  const resendResponse = await fetch(
                    "http://pasigtrms.great-site.net/mobile/resend_code.php",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        email: email,
                      }),
                    }
                  );
                  const resendResult = await resendResponse.json();
  
                  if (resendResult.status === "success") {
                    // Navigate to verification page after successfully sending the code
                    navigation.navigate(result.redirect_to, { email: email });
                  } else {
                    // If there was an issue with resending the code
                    Alert.alert("Error", resendResult.message);
                  }
                } catch (error) {
                  Alert.alert("Error", "Failed to resend the verification code.");
                }
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        Alert.alert(
          "Error",
          `Server responded with status ${error.response.status}: ${error.response.data}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert("Error", `No response received from the server: ${error.request}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert("Error", `Network error: ${error.message}`);
      }
    } finally {
      setLoading(false); // End loading
    }
  };
  

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar hidden={true} />
      <HeaderBack />
      <ScrollView style={{width:"100%"}} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.body}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.pasigLogo}
              source={require("../assets/images/pasig-seal.png")}
            />
          </View>
          <View style={styles.innerBody}>
            <Text style={styles.textHeader}>Login</Text>
            <CustomInput
              placeholder="Email"
              iconName="mail-outline"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <CustomInput
              placeholder="Password"
              iconName="lock-closed-outline"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
              <Text style={styles.rememberMe}>
                {rememberMe ? "✔" : "☐"} Remember Me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordEmail")}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <View>
              <PrimaryButton onPress={handleLogin} text={"LOGIN"} loading={loading} />
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
  login: {
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
    width: "100%",
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
    gap: 10,
    width: "85%",
    flex: 3,
  },
  textHeader: {
    color: Color.colorPrimary,
    fontSize: FontSize.size_13xl,
    fontFamily: FontFamily.montserratExtraBold,
    textAlign: "center",
  },
  rememberMe: {
    fontSize: FontSize.m3BodySmall_size,
    fontFamily: FontFamily.montserratRegular,
    letterSpacing: 1,
    textAlign: "left",
    color: Color.colorPrimary,
    marginVertical: 8,
  },
  forgotPassword: {
    fontSize: FontSize.m3BodySmall_size,
    fontFamily: FontFamily.montserratRegular,
    letterSpacing: 1,
    textAlign: "center",
    color: Color.colorPrimary,
    marginVertical: 8,
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
  },
});

export default Login;
