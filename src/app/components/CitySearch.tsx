import AsyncSelect from "react-select/async";
import axios from "axios";
import { CityData } from "../utils/weather.service";
import { useState } from "react";

export type CityOption = {
  value: string;
  label: string;
};
export const defaultCity = {
  value: "101020100",
  label: "上海, 上海市",
};
const loadOptions = async (inputValue: string, updateCache: (options: CityOption[]) => void) => {
  const response = await axios.get(`/api/searchCity?city=${inputValue}`);
  const cityOptions = response.data?.map((city: CityData) => ({
    value: city.id,
    label: `${city.name}, ${city.adm1}`,
  })) || [];

  updateCache(cityOptions); 
  return cityOptions;
};

export default function CitySearch({
  onSelect,
}: {
  onSelect: (city: CityOption | null) => void;
}) {
  const [cachedOptions, setCachedOptions] = useState<CityOption[]>([defaultCity]);

  const handleLoadOptions = (inputValue: string) => 
    loadOptions(inputValue, (options) => setCachedOptions(options));
  return (
    <AsyncSelect
      defaultOptions={cachedOptions} 
      defaultValue={defaultCity}
      cacheOptions={true}
      loadOptions={handleLoadOptions}
      onChange={onSelect}
      placeholder="搜索城市..."
      className="w-full"
      styles={{
        control: (base) => ({
          ...base,
          border: "1px solid #e5e7eb",
          borderRadius: "0.375rem",
          padding: "0.25rem",
        }),
      }}
    />
  );
}
