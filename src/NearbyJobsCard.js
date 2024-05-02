import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { checkImageURL } from "../utils";

const NearbyJobsCard = ({ item, handleNavigate }) => {
  return (
    <ScrollView>
      <TouchableOpacity style={styles.container} onPress={handleNavigate}>
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={{
              uri: checkImageURL(item.employer_logo)
                ? item.employer_logo
                : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.jobName}>{item.job_title}</Text>
          <Text style={styles.jobType}>{item.job_employment_type}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NearbyJobsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 5,
    borderRadius: 12,
    backgroundColor: "#DAE3E9",
    shadowColor: "#000",
    paddingRight: 40,

    marginTop: 10,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    marginHorizontal: 16,
  },
  jobName: {
    fontSize: 16,
    color: "#312651",
  },
  jobType: {
    fontSize: 12,
    color: "#83829A",
    marginTop: 3,
    textTransform: "capitalize",
  },
});
