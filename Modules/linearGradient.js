import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import gradientValues from "../constants/colours.js";

const LinearGradientComponent = ({ apiResponseProp, textColor }) => {
  const [gradient, setGradient] = useState(["white", "white"]);

  const RAINY_WEATHER = [
    "Thundery outbreaks possible",
    "Patchy rain possible",
    "Patchy light drizzle",
    "Light drizzle",
    "Freezing drizzle",
    "Heavy freezing drizzle",
    "Patchy light rain",
    "Light rain",
    "Moderate rain at times",
    "Moderate rain",
    "Heavy rain at times",
    "Heavy rain",
    "Light freezing rain",
    "Moderate or heavy freezing rain",
    "Light rain shower",
    "Moderate or heavy rain shower",
    "Torrential rain shower",
    "Light sleet showers",
    "Moderate or heavy sleet showers",
    "Patchy light rain with thunder",
    "Moderate or heavy rain with thunder",
    "Moderate or heavy rain with thunder",
  ];
  const CLOUDY_WEATHER = ["Partly cloudy", "Cloudy", "Overcast"];
  const SLEET_WEATHER = [
    "Patchy snow possible",
    "Patchy sleet possible",
    "Patchy freezing drizzle possible",
  ];
  const SNOW_WEATHER = [
    "Blowing snow",
    "Blizzard",
    "Patchy light snow",
    "Light snow",
    "Patchy moderate snow",
    "Moderate snow",
    "Patchy heavy snow",
    "Heavy snow",
    "Ice pellets",
    "Light snow showers",
    "Moderate or heavy snow showers",
    "Light showers of ice pellets",
    "Moderate or heavy showers of ice pellets",
    "Patchy light snow with thunder",
    "Moderate or heavy snow with thunder",
  ];
  const FOG_WEATHER = ["Fog", "Freezing fog"];

  useEffect(() => {
    console.log("logging to find errors:", apiResponseProp?.current?.is_day);
    if (apiResponseProp?.current?.condition) {
      let weatherText = apiResponseProp?.current?.condition?.text;
      if (apiResponseProp?.current?.is_day === 1 && weatherText === "Sunny") {
        setGradient(gradientValues.sunnyGradient);
      } else if (
        apiResponseProp?.current?.is_day === 0 &&
        weatherText === "Clear"
      ) {
        setGradient(gradientValues.nightGradient);
        textColor("white");
      } else if (RAINY_WEATHER.includes(weatherText)) {
        textColor("white");
        setGradient(gradientValues.rainyGradient);
      } else if (CLOUDY_WEATHER.includes(weatherText)) {
        textColor("white");
        setGradient(gradientValues.cloudyGradient);
      } else if (SNOW_WEATHER.includes(weatherText)) {
        textColor("black");
        setGradient(gradientValues.snowGradient);
      } else if (SLEET_WEATHER.includes(weatherText)) {
        setGradient(gradientValues.sleetGradient);
        textColor("white");
      } else if (FOG_WEATHER.includes(weatherText)) {
        textColor("black");
        setGradient(gradientValues.fogGradient);
      } else if (weatherText === "Mist") {
        textColor("white");
        setGradient(gradientValues.mistGradient);
      } else {
        textColor("black");
        setGradient(gradientValues.blueGradient);
      }
    }
  }, [apiResponseProp]);

  return (
    <LinearGradient
      colors={gradient}
      style={{
        position: "absolute",
        left: 0,
        right: -100,
        top: -500,
        height: 1500,
      }}
    />
  );
};

export default LinearGradientComponent;
