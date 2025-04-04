export default function WeatherForm({ 
  selectedCity,
  onWeatherQuery
}: {
  selectedCity?: { value:string, label:string };
  onWeatherQuery:  (cityId: string|undefined) => Promise<void> 
}) {
  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        readOnly
        value={selectedCity?.label ? `城市：${selectedCity.label}` : ''}
        className="flex-1 border p-2 rounded"
        placeholder="已选城市"
      />
      <button
        onClick={()=>onWeatherQuery(selectedCity?.value)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        查询天气
      </button>
    </div>
  );
}
