import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react"; // Combine React and hooks import
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const Ads = () => {
  const [loading, setLoading] = useState(false); // Correct initialization

  useEffect(() => {
    // Simulate some asynchronous operation
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace this with your actual data loading logic
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        // Show loader while loading
        <ActivityIndicator size={20} color="#0000ff" />
      ) : (
        // Render your content after loading
        <>
          <GAMBannerAd
            unitId={TestIds.BANNER}
            sizes={[BannerAdSize.FULL_BANNER]}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </>
      )}
    </View>
  );
};

export default Ads;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
});
