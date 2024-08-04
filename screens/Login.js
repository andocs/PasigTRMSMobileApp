import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Padding, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

import CustomInput from "../components/CustomInput";
import IndexFooter from "../components/IndexFooter";
import HeaderBack from "../components/HeaderBack";
import PrimaryButton from "../components/PrimaryButton";
import SocialLogin from "../components/SocialLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ onUserLogin }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.8/pasigtrms/mobile/login.php",
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
        console.log(result)
        Alert.alert("Success", result.message);

        // Access user information from the result
        const userInfo = {
          userid: result.user.userid,
          username: result.user.username,
          role: result.user.role,
          email: result.user.email,
          name: result.user.name,
        };

        onUserLogin(userInfo);

        // Store user info in AsyncStorage
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)); // Store as string
        navigation.navigate("DashboardTabs", { user: userInfo });
      } else {
        console.log(result)
        Alert.alert("Error", result.message);
      }
    } catch (error) {
        console.log(error)
        Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.login}>
      <HeaderBack />
      <View style={styles.body}>
        <View style={[styles.logoContainer, styles.flexBox]}>
          <Image
            style={styles.pasigLogo}
            source={require("../assets/images/pasig-seal.png")}
          />
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.textHeader}>Login</Text>
          <CustomInput
            placeholder="Email"
            iconName="person-outline"
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
            <PrimaryButton onPress={handleLogin} text={"LOGIN"} />
          </View>
          <Text style={styles.orText}>or sign in using</Text>
          <SocialLogin />
        </View>
      </View>
      <IndexFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    backgroundColor: Color.schemesOnPrimary,
    width: "100%",
    height: "100%",
    paddingVertical: 0,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "space-between",
    flex: 1,
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
    gap: 10,
    width: "85%",
    flex: 3,
  },
  textHeader: {
    color: Color.colorPrimary,
    fontSize: FontSize.size_13xl,
    fontWeight: "800",
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
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});

export default Login;
