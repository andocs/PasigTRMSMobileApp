import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Modal } from "react-native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const AnnouncementsContainer = ({ announcements }) => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openImageModal = (image) => {
    const imageTypeWithS = `${image.image_type}s`;
    setSelectedImage({
      ...image,
      image_type: imageTypeWithS,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.announcementsContainer}>
      <View style={styles.announcementHeaderContainer}>
        <Text style={styles.announcements}>Announcements</Text>
        {/* Add a TouchableOpacity button for navigation */}
        <TouchableOpacity onPress={() => navigation.navigate("AnnouncementsScreen")}>
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.announcementImagesContainer}>
        {announcements.map((announcement, index) => {
                const imageTypeWithS = `${announcement.image_type}s`;
                const sourceURL = `http://pasigtrms.great-site.net/uploads/${imageTypeWithS}/${announcement.image_path}`;
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.imageContainer}
                    onPress={() => openImageModal(announcement)}
                  >
                    <Image
                      style={styles.announcementImg}
                      source={{ uri: sourceURL }}
                    />
                  </TouchableOpacity>
                );
              })}
      </View>
      {selectedImage && (
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={closeModal}
            >
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.modalOverlay}
                  onPress={closeModal}
                >
                  <Image
                    source={{
                      uri: `http://pasigtrms.great-site.net/uploads/${selectedImage.image_type}/${selectedImage.image_path}`,
                    }}
                    style={styles.modalImage}
                  />
                </TouchableOpacity>
              </View>
            </Modal>
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalOverlay: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "80%",
    height: "60%",
    resizeMode: "contain",
  },
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
    width: "100%",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  announcementImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  announcementsContainer: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_8xs,
    alignSelf: "stretch",
  },
  announcements: {
    fontSize: FontSize.size_xl,
    letterSpacing: 1,
    lineHeight: 20,
    fontFamily: FontFamily.montserratExtraBold,
    color: Color.colorPrimary,
    textAlign: "center",
  },
  viewMoreText: {
    color: Color.colorPrimary,
    fontFamily: FontFamily.montserratBold,
    fontSize: FontSize.size_sm,
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
    justifyContent: 'center',
    padding: Padding.p_8xs,
    gap: 20,
    marginTop: 10,
    flexDirection: "row",
    overflow: "hidden",
  },  
});

export default AnnouncementsContainer;
