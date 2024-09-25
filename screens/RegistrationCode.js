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
import { useNavigation } from "@react-navigation/native";

import CustomInput from "../components/CustomInput";
import IndexFooter from "../components/IndexFooter";
import HeaderBack from "../components/HeaderBack";
import PrimaryButton from "../components/PrimaryButton";
    
const logoSize = (Dimensions.get("window").height / 100) * 15;

const RegistrationCode = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params; // Get email from route params
  const [code, setCode] = useState(""); // State for the code input
  const [submitLoading, setSubmitLoading] = useState(false); // State for loading
  const [resendLoading, setResendLoading] = useState(false); // State for loading

  // Handle code submission
  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const response = await fetch(
        "http://pasigtrms.great-site.net/mobile/verify_code.php",
        {
          method: "POST",
          body: JSON.stringify({ email, code }),
        }
      );

      const result = await response.json();
      if (result.success) {
        Alert.alert("Success", "Code verified successfully!");
        navigation.navigate("LandingScreen");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setSubmitLoading(false); // Set loading to false after process completes
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      const response = await fetch(
        "http://pasigtrms.great-site.net/mobile/resend_code.php", // Adjust the resend endpoint
        {
          method: "POST",
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (result.success) {
        Alert.alert("Success", "A new code has been sent to your email.");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.registrationCode}>
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
          <Text style={styles.textHeader}>Verify Registration</Text>
          <Text style={styles.subText}>
            A code has been sent to your email. Please enter it below.
          </Text>
          <View style={styles.inputGroup}>
            <CustomInput
              placeholder="Enter Code"
              iconName="key-outline"
              inputHeight={35}
              value={code}
              onChangeText={setCode}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleSubmit} text={"SUBMIT"} loading={submitLoading} />
            <PrimaryButton onPress={handleResendCode} text={"RESEND CODE"} loading={resendLoading} />
          </View>
        </View>
      </View>
      <IndexFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registrationCode: {
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
    fontFamily: FontFamily.montserratExtraBold,
    textAlign: "center",
  },
  subText: {
    color: Color.colorPrimary,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    marginBottom: 10,
  },
  logoContainer: {
    flex: 1,
    paddingBottom: Padding.p_xl,
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
  },
  inputGroup: {
    gap: 10,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
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

export default RegistrationCode;