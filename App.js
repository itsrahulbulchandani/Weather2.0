import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

export default function App() {
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    weatherRefresh();
  }, []);

  const weatherRefresh = async () => {
    const response = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=30161aa2981c4c51b79161648231605&q=New Delhi&aqi=no"
    );
    const jsonData = await response.json();
    setApiResponse(jsonData);
  };
  console.log(apiResponse);
  return (
    <View style={styles.container}>
      <View style={styles.topPortion}>
        <View style={styles.temperatureBox}>
          <Text style={styles.temperatureBoxText}>
            {apiResponse?.current?.temp_c} C
          </Text>
          <Text></Text>
        </View>
      </View>
      <View style={styles.bottomPortion}>
        <View style={styles.dateCityData}>
          <Text style={styles.cityName}>{apiResponse?.location?.name}</Text>
          <Text style={styles.cityName}>
            {moment(apiResponse?.location?.localtime).format("dddd,MMMM Do")}
          </Text>
          <Text style={styles.cityName}>{moment().format("hh:mm")}</Text>
          <Text style={styles.cityName}>Feels like</Text>
          <Text style={styles.cityName}>{apiResponse?.current?.feelslike_c}</Text>
          <Text style={styles.cityName}>Humidity</Text>
          <Text style={styles.cityName}>{apiResponse?.current?.humidity}</Text>
          <Text></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topPortion: {
    flex: 4,
    backgroundColor: "#ADD8E6",
  },
  bottomPortion: {
    flex: 3,
    backgroundColor: "#fff",
  },
  temperatureBox: {
    paddingTop: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  temperatureBoxText: {
    fontSize: 50,
  },
});
