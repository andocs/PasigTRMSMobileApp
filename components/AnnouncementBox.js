import { StyleSheet, View, Image } from "react-native";
import  { Border } from "../GlobalStyles";

const AnnouncementBox = ({announcement}) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.announcementImg}
        contentFit="cover"
        source={announcement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 150,
    borderRadius: Border.br_8xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    flex: 1,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  announcementImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
  },
});

export default AnnouncementBox;
