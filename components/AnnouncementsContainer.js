import { Text, StyleSheet, View } from "react-native";

import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import AnnouncementBox from "./AnnouncementBox";

const AnnouncementsContainer = () => {
  return (
    <View style={styles.announcementsContainer}>
      <View style={styles.announcementHeaderContainer}>
        <Text style={styles.announcements}>Announcements</Text>
      </View>
      <View style={styles.announcementImagesContainer}>
        <AnnouncementBox announcement={require('../assets/images/placeholder.png')}/>
        <AnnouncementBox announcement={require('../assets/images/placeholder.png')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  announcementsContainer: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_8xs,
    alignSelf: "stretch",
  },
  announcements: {
    fontSize: FontSize.size_xl,
    letterSpacing: 1,
    lineHeight: 20,
    fontWeight: "800",
    fontFamily: FontFamily.montserratExtraBold,
    color: Color.colorPrimary,
    textAlign: "center",
  },
  announcementHeaderContainer: {
    height: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  announcementImagesContainer: {
    padding: Padding.p_8xs,
    gap: 20,
    marginTop: 10,
    flexDirection: "row",
    overflow: "hidden",
  },  
});

export default AnnouncementsContainer;
