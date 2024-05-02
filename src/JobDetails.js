import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";

import { useCallback, useState } from "react";

import useFetch from "../src/hook/Fetch";
import { createStackNavigator } from "@react-navigation/stack";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import Company from "../src/Company";
import JobTab from "./JobTab";
import Specifics from "./Specifics";
import JobAbout from "./JobAbout";
import JobFooter from "./JobFooter";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const route = useRoute();
  const { itemId } = route.params;
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: itemId,
  });
  // console.log(data);
  const onRefresh = () => {};

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

        break;
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#1A1A1C",
      }}
    >
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#312651" />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: 12, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                JobTitle={data[0]?.job_title}
                companyName={data[0].employer_name}
                Location={data[0].job_country}
              />
              <JobTab
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ?? "http://careers.google.com/jobs/results"
          }
        />
      </>
    </GestureHandlerRootView>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12 / 2,
  },
});
