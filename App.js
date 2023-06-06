import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
} from "react-native";
import moment from "moment";
import { SvgXml } from "react-native-svg";
import gradientValues from "./constants/colours.js";
import LinearGradientComponent from "./Modules/linearGradient.js";
import clouds from "./constants/clouds.js";
import { AntDesign } from "@expo/vector-icons";
import LocationSelector from "./Modules/locationSelectionModal.js";

export default function App() {
  const [apiResponse, setApiResponse] = useState({});
  const [textColor, setTextColor] = useState("black");
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  useEffect(() => {
    weatherRefresh();
  }, []);

  console.log(gradientValues?.mistGradient);

  const weatherRefresh = async () => {
    console.log("sfsdfaf");
    const response = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=30161aa2981c4c51b79161648231605&q=New Delhi&aqi=yes"
    );
    const jsonData = await response.json();
    setApiResponse(jsonData);
  };

  //console.log(apiResponse);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topPortion}>
          <LinearGradientComponent
            apiResponseProp={apiResponse}
            textColor={(data) => setTextColor(data)}
          />
          <View style={styles.aboveClouds}>
            <View style={styles.refreshIcon}>
              <TouchableHighlight onPress={weatherRefresh} underlayColor="none">
                <AntDesign
                  name="sync"
                  size={24}
                  color={textColor === "white" ? "white" : "black"}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.temperatureBox}>
              <Text
                style={
                  textColor === "white"
                    ? styles.temperatureBoxTextWhite
                    : styles.temperatureBoxTextBlack
                }
              >
                {apiResponse?.current?.temp_c} &#8451;
              </Text>
            </View>
            <View style={styles.weatherStatusBox}>
              <Text
                style={
                  textColor === "white"
                    ? styles.weatherStatusTextWhite
                    : styles.weatherStatusTextBlack
                }
              >
                {apiResponse?.current?.condition?.text?.toLowerCase()}
              </Text>
            </View>
          </View>
          <View style={styles.waves3}>
            <SvgXml
              style={styles.waves2}
              xml={clouds.clouds}
              width="100%"
              height="100%"
            />
            <SvgXml
              style={styles.waves2}
              xml={clouds.clouds1}
              width="100%"
              height="80%"
            />
            <SvgXml
              style={styles.waves2}
              xml={clouds.clouds2}
              width="100%"
              height="80%"
            />
            <SvgXml
              style={styles.waves2}
              xml={clouds.clouds3}
              width="100%"
              height="90%"
            />
          </View>
          {/* <View style={styles.waves1}></View> */}
        </View>
        <View style={styles.bottomPortion}>
          <View style={styles.dateCityData}>
            <View style={styles.cityNameView}>
              <Text style={styles.cityName}>{apiResponse?.location?.name}</Text>
              <View style={styles.editIcon}>
                <TouchableHighlight
                  onPress={() => setLocationModalVisible(true)}
                  underlayColor="none"
                >
                  <AntDesign name="edit" size={18} color="black" />
                </TouchableHighlight>
              </View>
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
      <LocationSelector
        locationModalVisible={locationModalVisible}
        handleModal={() => {
          setLocationModalVisible(false);
        }}
      />
    </>
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
    paddingTop: "15%",
    paddingLeft: "10%",
  },
  refreshIcon: {
    paddingTop: "15%",
    paddingLeft: "87%",
  },
  weatherStatusBox: {
    paddingLeft: "10%",
  },
  weatherStatusTextBlack: {
    fontSize: 30,
    fontWeight: 200,
    color: "black",
  },
  weatherStatusTextWhite: {
    fontSize: 30,
    fontWeight: 200,
    color: "white",
  },
  temperatureBoxTextBlack: {
    fontSize: 50,
    fontWeight: 300,
    color: "black",
  },
  temperatureBoxTextWhite: {
    fontSize: 50,
    fontWeight: 300,
    color: "white",
  },
  dateCityData: {
    flex: 1,
    paddingTop: "10%",
    paddingLeft: "15%",
    paddingRight: "20%",
  },
  cityNameView: {
    flex: 1,
    maxHeight: "18%",
    flexDirection: "row",
    paddingBottom: "0%",
  },
  editIcon: {
    paddingLeft: "4%",
    marginTop: "4%",
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
