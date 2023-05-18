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
          <View style={styles.cityNameView}>
            <Text style={styles.cityName}>{apiResponse?.location?.name}</Text>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.dayDateView}>
            <Text style={styles.dayDate}>
              {moment(apiResponse?.location?.localtime).format("MMMM Do")}
            </Text>
          </View>
          <View style={styles.currentTimeView}>
            <Text style={styles.currentTime}>{moment().format("LT")}</Text>
          </View>
          <View style={styles.feelLikeAndHumidiyRow}>
            <View style={styles.feelsLikeView}>
              <Text style={styles.feelsLike}>Feels like</Text>
              <Text style={styles.feelsLikeData}>
                {apiResponse?.current?.feelslike_c} &#8451;
              </Text>
            </View>
            <View style={styles.verticalLineMiddle}></View>
            <View style={styles.humidityView}>
              <Text style={styles.humidity}>Humidity</Text>
              <Text style={styles.humidityData}>
                {apiResponse?.current?.humidity}%
              </Text>
            </View>
          </View>
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
    flex: 5,
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
  dateCityData: {
    flex: 1,
    paddingTop: "10%",
    paddingLeft: "15%",
    paddingRight: "20%",
  },
  cityNameView: {
    paddingBottom: "5%",
  },
  cityName: {
    fontSize: 25,
    fontWeight: 600,
  },
  horizontalLine: {
    width: "45%",
    height: "0.5%",
    backgroundColor: "#909090",
  },
  verticalLine: {
    height: "30%",
    width: 1,
    backgroundColor: "#909090",
  },
  dayDateView: {
    paddingTop: "3%",
  },
  dayDate: {
    fontSize: 35,
    fontWeight: 300,
  },
  currentTimeView: {
    paddingTop: "2%",
  },
  currentTime: {
    fontSize: 15,
    fontWeight: 300,
  },
  feelLikeAndHumidiyRow: {
    paddingTop: "4%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  feelsLikeView: {
    flex: 3,
    justifyContent: "flex-start",
  },
  humidityView: {
    flex: 3,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
  },
  feelsLike: {
    fontSize: 18,
    color: "gray",
  },
  verticalLineMiddle: {
    height: "30%",
    width: "1%",
    backgroundColor: "#909090",
  },
  humidity: {
    fontSize: 20,
    color: "gray",
  },
});
