import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Color, FontSize, FontFamily, Padding, Border } from "../GlobalStyles";
import Header from "../components/Header";
import UpdateInformation from "../components/UpdateInformation";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileTab = ({ user }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://192.168.1.8/pasigtrms/mobile/logout.php", {
        method: "POST",
      });
      const result = await response.json();
      if (result.success) {
        console.log(result.message);
        await AsyncStorage.removeItem("userInfo");
        navigation.navigate("LandingScreen");
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Return empty string if input is falsy
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View style={styles.profileTab}>
      <Header title={"PROFILE"} />
      <View style={[styles.body, styles.bodyFlexBox]}>
        <View style={styles.profileContainer}>
          <View style={styles.profileInformation}>
            <Image
              style={styles.frameIcon}
              contentFit="cover"
              source={require("../assets/images/user-profile.png")}
            />
            <View style={[styles.frame, styles.bodyFlexBox]}>
              <Text style={[styles.userFullName, styles.flexBox]}>
                {user ? user.name : "JUAN DELA CRUZ"}
              </Text>
              <Text style={[styles.operator, styles.flexBox]}>
                {user ? capitalizeFirstLetter(user.role) : "Operator"}
              </Text>
            </View>
          </View>
          <View style={styles.userDetailContainer}>
            <View style={styles.userDetails}>
              <View style={styles.moreInformation}>
                <Image
                  style={styles.emailIcon}
                  contentFit="cover"
                  source={require("../assets/images/email-outlined.svg")}
                />
              </View>
              <Text style={styles.details}>
                {user ? user.email : "email@email.com"}
              </Text>
            </View>
          </View>
          <UpdateInformation />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyFlexBox: {
    justifyContent: "center",
    overflow: "hidden",
  },
  flexBox: {
    textAlign: "left",
    color: Color.colorPrimary,
  },
  frameIcon: {
    width: 82,
    height: 82,
    overflow: "hidden",
  },
  userFullName: {
    fontSize: FontSize.m3BodyLarge_size,
    letterSpacing: 3,
    lineHeight: 16,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemiBold,
  },
  operator: {
    fontSize: FontSize.m3BodySmall_size,
    letterSpacing: 1,
    lineHeight: 12,
    fontFamily: FontFamily.montserratRegular,
    marginTop: 10,
  },
  frame: {
    paddingHorizontal: 0,
    paddingVertical: 23,
    marginLeft: 10,
  },
  profileInformation: {
    borderStyle: "solid",
    borderColor: Color.colorPrimary,
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: Padding.p_8xs,
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
  },
  userDetailContainer: {
    marginTop: 10,
    alignSelf: "stretch",
    overflow: "hidden",
    flex: 1,
  },
  profileContainer: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_8xs,
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  body: {
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_base,
    zIndex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  profileTab: {
    backgroundColor: Color.colorPrimary,
    width: "100%",
    height: 800,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  userDetails: {
    alignItems: "center",
    alignSelf: "stretch",
    height: 44,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_8xs,
    flexDirection: "row",
    borderRadius: Border.br_8xs,
    overflow: "hidden",
  },
  emailIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  moreInformation: {
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Border.br_8xs,
    overflow: "hidden",
    padding: Padding.p_8xs,
  },
  details: {
    fontSize: FontSize.m3BodyLarge_size,
    letterSpacing: 1,
    lineHeight: 16,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorPrimary,
    textAlign: "left",
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 1,
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_xl,
    borderRadius: Border.br_8xs,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  logoutButtonText: {
    color: "red",
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.m3BodyLarge_size,
    letterSpacing: 1,
    lineHeight: 16,
  },
});

export default ProfileTab;
