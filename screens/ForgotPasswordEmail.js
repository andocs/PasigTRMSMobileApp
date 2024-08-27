import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar
} from "react-native";
import { Padding, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

import CustomInput from "../components/CustomInput";
import IndexFooter from "../components/IndexFooter";
import HeaderBack from "../components/HeaderBack";
import PrimaryButton from "../components/PrimaryButton";

const logoSize = (Dimensions.get('window').height / 100)*15
const ForgotPasswordEmail = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://pasigtrms.great-site.net/mobile/verify_email.php",
          {
            method: "POST",
            body: JSON.stringify({ email }),
          }
        );
        const result = await response.json();
  
        if (result.success) {
          // Navigate to ForgotPassword screen with the userid as a prop
          navigation.navigate("ForgotPassword", { userid: result.userid });
        } else {
          Alert.alert("Error", result.message);
        }
      } catch (error) {
        setLoading(false);
        Alert.alert("Error", "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <SafeAreaView style={styles.forgotPasswordEmail}>
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
          <Text style={styles.subHeader}>Please enter your email to reset your password.</Text>
          <View style={styles.inputGroup}>
            <CustomInput
              placeholder="Email Address"
              iconName="mail-outline"
              value={email}
              onChangeText={setEmail} // Update email state on input change
            />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={handleSubmit} // Call handleEmailSubmit on button press
              text={"SUBMIT"}
              loading={loading}
            />
          </View>
        </View>
      </View>
      <IndexFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotPasswordEmail: {
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
  subHeader: {
    color: Color.colorPrimary,
    fontSize: FontSize.m3BodySmall_size,
    fontFamily: FontFamily.montserratRegular,
    textAlign: "center",
    marginBottom: 20,
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

export default ForgotPasswordEmail;
