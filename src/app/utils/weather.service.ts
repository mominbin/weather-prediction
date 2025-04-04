import axios from "axios";
import { apiPathConfig } from "./APIConfig";

export interface WeatherData {
  fxDate: string; // 预报日期
  tempMax: string; // 最高温度
  tempMin: string; // 最低温度
  iconDay: string; // 白天天气图标代码
  textDay: string; // 白天天气描述
  iconNight: string; // 夜间天气图标代码
  textNight: string; // 夜间天气描述
  wind360Day: string; // 白天风向角度
  windDirDay: string; // 白天风向描述
  windScaleDay: string; // 白天风力等级
  windSpeedDay: string; // 白天风速
  humidity: string; // 湿度
  precip: string; // 降水量
  pressure: string; // 气压
  vis: string; // 能见度
  uvIndex: string; // 紫外线指数
}

export interface CityData {
  name: string; // 城市名称
  id: string; // 城市ID
  lat: string; // 纬度
  lon: string; // 经度
  adm2: string; // 二级行政区名称（如区、县）
  adm1: string; // 一级行政区名称（如省、直辖市）
  country: string; // 国家名称
  tz: string; // 时区
  utcOffset: string; // UTC偏移量
  isDst: string; // 是否夏令时（"0"表示否，"1"表示是）
  type: string; // 地点类型（如"city"表示城市）
  rank: string; // 排名或等级（具体含义取决于API提供者）
  fxLink: string; // 指向和风天气网站上该城市天气页面的链接
}

export async function fetchWeatherByAPIKey(cityID: string) {
  try {
    const response = await axios.get(
      `${process.env.Next_QWEATHER_API_HOST}${apiPathConfig.weather_7d}?location=${cityID}&key=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCity(city: string) {
  try {
    const url = `${process.env.Next_QWEATHER_API_HOST}${apiPathConfig.city_search}?location=${city}&key=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`;
    const response = await axios.get(url);
    const data: { location: CityData[] } = response.data;
    return data.location;
  } catch (error) {
    console.error(error);
  }
}
