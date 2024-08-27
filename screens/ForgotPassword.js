import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Padding, Color, FontSize, FontFamily } from "../GlobalStyles";

import CustomInput from "../components/CustomInput";
import IndexFooter from "../components/IndexFooter";
import HeaderBack from "../components/HeaderBack";
import PrimaryButton from "../components/PrimaryButton";

const logoSize = (Dimensions.get("window").height / 100) * 15;

const ForgotPassword = ({ route }) => {
  const { userid } = route.params; // Get userid from route params
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Send the new password to the server
    try {
      const response = await fetch(
        "http://pasigtrms.great-site.net/mobile/reset_password.php", // Adjust the endpoint URL as needed
        {
          method: "POST",
          body: JSON.stringify({ userid, password: newPassword }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.success) {
        console.log(result);
        Alert.alert("Success", result.message);
        navigation.navigate("LandingScreen"); // Navigate after successful registration
        // Optionally navigate back to the login screen or another screen
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after process completes
    }
  };
  return (
    <SafeAreaView style={styles.forgotPassword}>
      <StatusBar hidden={true} />
      <HeaderBack />
      <View style={styles.body}>
        <View style={[styles.logoContainer, styles.flexBox]}>
          <Image
            style={styles.pasigLogo}
            source={require("../assets/images/pasig-seal.png")}
          />
        </View>
        <View style={styles.innerBody}>
          <Text style={styles.textHeader}>Forgot Password</Text>
          <View style={styles.inputGroup}>
            <CustomInput
              placeholder="New Password"
              iconName="lock-closed-outline"
              secureTextEntry
              onChangeText={(text) => setNewPassword(text)}
            />
            <CustomInput
              placeholder="Confirm Password"
              iconName="lock-closed-outline"
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleSubmit} text={"SUBMIT"} loading={loading} />
          </View>
        </View>
      </View>
      <IndexFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    backgroundColor: Color.schemesOnPrimary,
    width: "100%",
    height: "100%",
    paddingVertical: 0,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "space-between",
    flex: 1,
  },
  inputGroup: {
    gap: 10,
    width: "100%",
  },
  body: {
    paddingHorizontal: Padding.p_21xl,
    paddingBottom: 50,
    zIndex: 1,
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  innerBody: {
    gap: 20,
    width: "85%",
    flex: 3,
  },
  textHeader: {
    color: Color.colorPrimary,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
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

export default ForgotPassword;
