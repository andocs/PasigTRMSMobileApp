import { StyleSheet, View, Image, Pressable } from "react-native";
import { Border } from "../GlobalStyles";

const AnnouncementBox = ({ announcement, onPress }) => {
  // Add 's' to image_type
  const imageTypeWithS = `${announcement.image_type}s`;
  const sourceURL = `http://pasigtrms.great-site.net/uploads/${imageTypeWithS}/${announcement.image_path}`;

  return (
    <Pressable style={styles.imageContainer} onPress={onPress}>
      <Image
        style={styles.announcementImg}
        contentFit="cover"
        source={{ uri: sourceURL }}
      />
    </Pressable>
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
    width: "90%",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  announcementImg: {
    maxHeight: "100%",
    height: "100%",
    width: "100%",
  },
});

export default AnnouncementBox;
