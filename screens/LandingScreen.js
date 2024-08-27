import { StyleSheet, View, Text, Image, SafeAreaView, Dimensions, StatusBar } from "react-native";
import { Color, Padding, FontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

import OutlineButton from "../components/OutlineButton";
import PrimaryButton from "../components/PrimaryButton";
import IndexFooter from "../components/IndexFooter";

const trmsSize = (Dimensions.get('window').height / 100)*4

const LandingScreen = () => {
  const navigate = useNavigation();
  return (
    <SafeAreaView style={styles.landingScreen}>
      <StatusBar hidden={true} />
      <Image
        style={styles.headerIcon}
        contentFit="cover"
        source={require("../assets/images/header.png")}
      />
      <View style={styles.body}>
        <View style={[styles.logoContainer, styles.buttonContainerFlexBox]}>
          <Image
            style={styles.pasigLogo}
            source={require("../assets/images/pasig-seal.png")}
          />
        </View>
        <View style={[styles.textContainer, styles.buttonContainerFlexBox]}>
          <Image
            style={styles.pasigBlueCroppedIcon}
            contentFit="cover"
            source={require("../assets/images/pasig-wordmark-blue.png")}
          />
          <Text style={[styles.trms, styles.trmsFlexBox]}>TRMS</Text>
        </View>
        <View style={styles.buttonContainer}>
          <OutlineButton
            onPress={() => navigate.navigate("Login")}
            text={"LOGIN"}
          />
          <PrimaryButton
            onPress={() => navigate.navigate("Register")}
            text={"REGISTER"}
          />
        </View>
      </View>
      <IndexFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  landingScreen: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 0,
    backgroundColor: Color.schemesOnPrimary,
    overflow: "hidden",
    flex: 1,
  },
  headerIcon: {
    width: "100%",
    zIndex: 2,
    height: 100,
    overflow: "hidden",
    resizeMode: "stretch",
  },
  body: {
    paddingHorizontal: Padding.p_21xl,
    paddingTop: 30,
    paddingBottom: 50,
    zIndex: 1,
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    paddingBottom: Padding.p_xl,
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
  },
  pasigLogo: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  buttonContainerFlexBox: {
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: 3,
    flex: 1,
  },
  pasigBlueCroppedIcon: {
    height: "80%",
    width: "100%",
    resizeMode: "contain",
  },
  trms: {
    fontSize: trmsSize,
    letterSpacing: 1,
    lineHeight: 35,
    fontWeight: "800",
    fontFamily: FontFamily.montserratExtraBold,
    marginTop: 10,
  },
  trmsFlexBox: {
    textAlign: "center",
    color: Color.colorPrimary,
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
    paddingHorizontal: Padding.p_9xs,
    marginVertical: 30,
    flex: 1,
  },
});

export default LandingScreen;
