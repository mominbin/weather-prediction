'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import CitySearch, { CityOption, defaultCity } from "./components/CitySearch";
import WeatherForm from "./components/WeatherForm";
import { WeatherData } from "./utils/weather.service";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<{ label: string; value: string } | undefined>();
  const [weather, setWeather] = useState<WeatherData[]>();

  const handleSearchWeather = async (cityId: string | undefined) => {
    if (!cityId) return;
    try {
      const data: { data: { daily: WeatherData[] } } = await axios.get(`/api/weather?cityID=${cityId}`);
      setWeather(data.data.daily);
    } catch (error) {
      console.error("数据获取失败:", error);
    }
  };

  const onCitySelect = (city: CityOption | null) => {
    setSelectedCity(city ? city : undefined);
  }

  useEffect(() => {
    if (defaultCity) {
      setSelectedCity({ ...defaultCity });
      console.log("begin search", defaultCity.value);
      handleSearchWeather(defaultCity.value); 
    }
  }, []);
  return (
    <>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">城市天气查询</h1>

        <CitySearch onSelect={onCitySelect} />

        <WeatherForm
          selectedCity={selectedCity}
          onWeatherQuery={handleSearchWeather}
        />

        {weather && (
          <div className="space-y-4 mt-4">
            {weather.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded"
              >
                <div>
                  <span className="font-medium">
                    {day.fxDate} {new Date(day.fxDate).toLocaleDateString("zh-CN", {
                      weekday: "long",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{day.tempMin}°C ~ {day.tempMax}°C</span>
                  <span>{day.textDay}</span>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
