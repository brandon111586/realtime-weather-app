import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";
import useWeatherAPI from "./hooks/useWeatherAPI";
import { getMoment } from "./utils/helper";
import WeatherCard from "./views/WeatherCard";
import WeatherSetting from "./views/WeatherSetting";

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282",
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc",
  },
};

const AUTHORIZATION_KEY = "CWB-D03A23A0-15DA-4C62-A2B7-1378D0D45A7F";
const LOCATION_NAME = "羅東";
const LOCATION_NAME_FORECAST = "宜蘭縣";

const App = () => {
  const [weatherElement, fetchData] = useWeatherAPI({
    locationName: LOCATION_NAME,
    cityName: LOCATION_NAME_FORECAST,
    authorizationKey: AUTHORIZATION_KEY,
  });
  const [currentTheme, setCurrentTheme] = useState("dark");
  const moment = useMemo(() => getMoment(LOCATION_NAME_FORECAST), []);
  useEffect(() => {
    setCurrentTheme(moment === "day" ? "light" : "dark");
  }, [moment]);
  const [currentPage, setCurrentPage] = useState("WeatherCard");

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === "WeatherCard" && (
          <WeatherCard
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
          ></WeatherCard>
        )}
        {currentPage === "WeatherSetting" && (
          <WeatherSetting theme={theme[currentTheme]}></WeatherSetting>
        )}
      </Container>
    </ThemeProvider>
  );
};
export default App;
