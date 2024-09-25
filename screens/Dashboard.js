import React, { useState, useCallback } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Color, Padding, Border } from "../GlobalStyles";

import HeadContainer from "../components/HeadContainer";
import MainContainer from "../components/MainContainer";
import AnnouncementsContainer from "../components/AnnouncementsContainer";
import DashHeader from "../components/DashHeader";

const Dashboard = ({ user }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state set to true

  const fetchAnnouncements = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("http://pasigtrms.great-site.net/mobile/carousel_images.php");
      const data = await response.json();

      // Filter images by type (announcement) and limit to 1
      const announcementImages = data
        .filter((item) => item.image_type === "announcement")
        .slice(0, 1); // Limit to the first announcement

      setAnnouncements(announcementImages);
    } catch (error) {
      console.error("Error fetching images: ", error);
    } finally {
      setLoading(false); // Stop loading once the data is fetched or an error occurs
    }
  };

  // Refetch announcements when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchAnnouncements();
    }, [])
  );

  // Display loader while images are being fetched
  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Color.colorPrimary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.dashboard}>
      <StatusBar hidden={true} />
      <DashHeader />
      <View style={styles.body}>
        <ScrollView style={{ width: "100%" }}>
          <HeadContainer user={user} />
          <MainContainer />
          <AnnouncementsContainer announcements={announcements} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.schemesOnPrimary,
  },
  dashboard: {
    overflow: "hidden",
    alignItems: "center",
    width: "100%",
    flex: 1,
    backgroundColor: Color.colorPrimary,
  },
  body: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_base,
    zIndex: 1,
    alignItems: "center",
    overflow: "scroll",
  },
});

export default Dashboard;
