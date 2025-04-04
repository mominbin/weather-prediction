'use client'
import { useState, useEffect } from "react";
import { WeatherData } from "../utils/weather.service";
import axios from "axios";

const WeatherPage = () => {
  const [city, setCity] = useState("上海");
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const searchCity = async () => {
    try {
      const data:{data:{daily:WeatherData[]}}  = await axios.get(`/api/searchCity?city=${city}`);
      console.log(data)
    } catch (error) {
      console.error("数据获取失败:", error);
    }
  }
  const loadData = async () => {
    setLoading(true);
    try {
      const data:{data:{daily:WeatherData[]}}  = await axios.get(`/api/weather?city=${city}`);
      setWeather(data.data.daily);
    } catch (error) {
      console.error("数据获取失败:", error);
    }
    setLoading(false);
  };
  const handleOnSearch = async () => {
    loadData();
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mx-auto p-12">
      <div className="max-w-md mx-auto">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="输入城市名称"
          />
          <button
            onClick={searchCity}
            className="bg-blue-500 text-white p-2 rounded"
          >
            查询
          </button>
        </div>

        {loading ? (
          <div>加载中...</div>
        ) : (
          <div className="space-y-4">
            {weather.map((day,index) => (
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
                  {/* <img
                    src={`http://openweathermap.org/img/wn/${day.textDay}.png`}
                    alt={day.weather.main}
                  /> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
