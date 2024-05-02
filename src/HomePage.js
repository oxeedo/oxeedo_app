import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import NearbyJobs from "./NearbyJobs";
import PopularJobs from "./PopularJobs";
import React, { useState, useEffect } from "react";
import searchIcon from "../assets/icons/search.png";
import "expo-dev-client";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const HomePage = ({ navigation }) => {
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    if (searchTerm) {
      navigation.navigate("Search", { searchTerm });
    }
  };
  useEffect(() => {
    // Simulate some asynchronous operation
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace this with your actual data loading logic
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#1A1A1C" }}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={styles.Searchcontainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="What are you looking for?"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Image
              source={searchIcon}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 5, paddingLeft: 20 }}>
          <FlatList
            data={jobTypes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={() => {
                  setActiveJobType(item);
                  navigation.navigate("Employment", { item });
                }}
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: 12 }}
            horizontal
          />
        </View>

        <PopularJobs />

        <NearbyJobs />
      </View>
    </GestureHandlerRootView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  Searchcontainer: {
    flexDirection: "row",
    height: 70,
    width: 300,
    paddingLeft: 50,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrapper: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 20,
    marginRight: 10,
  },
  searchInput: {
    width: 250,
    height: "100%",
    paddingHorizontal: 10,
  },
  searchBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#1B1A55",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: "white",
  },
  tab: (activeJobType, item) => ({
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: activeJobType === item ? "#444262" : "#83829A",
  }),
  tabText: (activeJobType, item) => ({
    color: activeJobType === item ? "#ffff" : "#C1C0C8",
  }),
});
