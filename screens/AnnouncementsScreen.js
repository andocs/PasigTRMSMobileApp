import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import Header from "../components/Header";

const AnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://pasigtrms.great-site.net/mobile/carousel_images.php"
        );
        const data = await response.json();

        const announcementImages = data.filter(
          (item) => item.image_type === "announcement"
        );
        const eventImages = data.filter((item) => item.image_type === "event");

        setAnnouncements(announcementImages);
        setEvents(eventImages);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch images. Please try again.");
        console.error("Error fetching images: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar hidden={true} />
      <Header title={"EVENTS"} />
      <ScrollView
        contentContainerStyle={[
          loading ? { ...styles.body, height: '100%' } : styles.body
        ]}  
        >
        {loading ? (
        <ActivityIndicator size="large" color={Color.colorPrimary} />
        ) : (
        <>
          {announcements && announcements.length > 0 && 
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Announcements</Text>
              <View style={styles.imagesContainer}>
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
            </View>
          }

          {events && events.length > 0 && 
            <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Events</Text>
            <View style={styles.imagesContainer}>
              {events.map((event, index) => {
                const imageTypeWithS = `${event.image_type}s`;
                const sourceURL = `http://pasigtrms.great-site.net/uploads/${imageTypeWithS}/${event.image_path}`;
                return (
                  <Pressable
                    key={index}
                    style={styles.imageContainer}
                    onPress={() => openImageModal(event)}
                  >
                    <Image
                      style={styles.announcementImg}
                      source={{ uri: sourceURL }}
                    />
                  </Pressable>
                );
              })}
            </View>
            </View>
          }          

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
        </>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Color.colorPrimary,
  },
  body: {
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_base,
    width: "100%",
    zIndex: 1,
    justifyContent: "center",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.montserratExtraBold,
    color: Color.colorPrimary,
    marginBottom: 10,
    textAlign: "start",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
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
});

export default AnnouncementsScreen;