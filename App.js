import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import moment from "moment";
import Path, { Svg } from "react-native-svg";
import { WaveSVG } from "./assets/wave.svg";
import { SvgXml } from "react-native-svg";

export default function App() {
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    weatherRefresh();
  }, []);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const xml =
    '<?xml version="1.0" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="0.4" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>';
  const xml1 =
    '<?xml version="1.0" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="0.4" d="M0,128L48,112C96,96,192,64,288,90.7C384,117,480,203,576,245.3C672,288,768,288,864,261.3C960,235,1056,181,1152,160C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>';
  const xml2 =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="0.4" d="M0,224L120,218.7C240,213,480,203,720,202.7C960,203,1200,213,1320,218.7L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>';
  const xml3 =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="0.3s" d="M0,288L60,293.3C120,299,240,309,360,288C480,267,600,213,720,192C840,171,960,181,1080,202.7C1200,224,1320,256,1380,272L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>';
  // '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="red" fill-opacity="0.5" d="M0,128L48,138.7C96,149,192,171,288,186.7C384,203,480,213,576,202.7C672,192,768,160,864,160C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>';
  const weatherRefresh = async () => {
    const response = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=30161aa2981c4c51b79161648231605&q=New Delhi&aqi=yes"
    );
    const jsonData = await response.json();
    setApiResponse(jsonData);
  };
  console.log(apiResponse);
  return (
    <View style={styles.container}>
      <View style={styles.topPortion}>
        <View style={styles.aboveClouds}>
          <View style={styles.temperatureBox}>
            <Text style={styles.temperatureBoxText}>
              {apiResponse?.current?.temp_c} &#8451;
            </Text>
          </View>
          <View style={styles.weatherStatusBox}>
            <Text style={styles.weatherStatusText}>
              {apiResponse?.current?.condition?.text?.toLowerCase()}
            </Text>
            <Text></Text>
          </View>
        </View>
        <View style={styles.waves3}>
          <SvgXml style={styles.waves2} xml={xml} width="100%" height="100%" />
          <SvgXml style={styles.waves2} xml={xml2} width="100%" height="80%" />
          <SvgXml style={styles.waves2} xml={xml1} width="100%" height="80%" />
          <SvgXml style={styles.waves2} xml={xml3} width="100%" height="90%" />
        </View>

        {/* <View style={styles.waves1}></View> */}
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
  aboveClouds: {
    //opacity: 0.1,
    height: 10,
    flex: 3.8,
  },
  waves1: {
    position: "absolute",
  },
  waves2: {
    position: "absolute",
  },
  waves3: {
    position: "relative",
    flex: 1.2,
    marginBottom: -20,
    justifyContent: "flex-end",
  },
  bottomPortion: {
    flex: 3,
    backgroundColor: "#fff",
  },
  temperatureBox: {
    paddingTop: "35%",
    paddingLeft: "10%",
  },
  weatherStatusBox: {
    paddingLeft: "10%",
  },
  weatherStatusText: {
    fontSize: 30,
    fontWeight: 200,
  },
  temperatureBoxText: {
    fontSize: 50,
    fontWeight: 300,
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
    fontSize: 18,
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
