import './App.scss';
import DailyView from '../DailyView/DailyView';
import Navbar from '../Navbar/Navbar';
import HourlyView from '../HourlyView/HourlyView';
import SearchBar from '../Search/SearchBar';
import CurrentLocation from '../CurrentLocation/CurrentLocation';
import React, {useEffect, useState} from 'react';

function App() {

  const defaultData = {
    daily : {
      xData:[1,2,3,4,5,6,7],
      yHighs:[1,2,3,4,5,6,7],
      yLows: [60, 60, 60, 60, 60, 60, 60],
      title:"Daily Trends (Default dataset)",
      xAxis:'Hour' ,
      yAxis:"Temperature",
    },

    hourly : {
      xData:['12:00', "1:00", '2:00', '3:00', '4:00', '5:00', '6:00'],
      yHighs:[1,2,3,4,5,6,7],
      yLows: [60, 60, 60, 60, 60, 60, 60],
      title:"Hourly Trends (Default dataset)",
      xAxis:'Hour' ,
      yAxis:"Temperature",
    }
  };

  const [searchText, setSearchText] = useState('');
  const [selectedData, setSelectedData] = useState(defaultData);
  const [userLocation, updateUserLocation] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {

    const pollWeeklyTrends = async (lat, long) => {
      try {
        const pollResponse = await fetch('https://api.weather.gov/points/36.6163,-88.3209');
        const pollData = await pollResponse.json();
        setData(pollData);
        console.log("JSON Properties Object: ", pollData.properties);
        console.log("Forecast URL: ", pollData.properties.forecast);
        const region = `${pollData.properties.relativeLocation.properties.city}, ${pollData.properties.relativeLocation.properties.state}`

        const forecastResponse = await fetch(pollData.properties.forecast);
        const forecastData = await forecastResponse.json();
        const periods = forecastData.properties.periods
        console.log("Forecast data.properties.periods: ", periods);

        const xData = [];
        const yHighs = [];
        const yLows = [];

        // Periods constains 14 JSON objects, starting from the present day to 7 days away, 1 per day and 1 per night
        periods.forEach(period => {
          const name = period.name;
          const temperature = period.temperature;

          if (period.isDaytime) {
            xData.push(name);
            yHighs.push(temperature);
          }
          else {
            yLows.push(temperature);
          }
        })

        console.log('xData: ', xData);
        console.log('yHighs: ', yHighs);
        console.log('yLows: ', yLows);

        const dataToModel = {
          daily: {
            xData: xData,
            yHighs : yHighs,
            yLows : yLows,
            title: `Weekly outlook for ${region}`,
            xAxis:'Hour' ,
            yAxis:"Temperature",
          },
          hourly : {
            xData:['12:00', "1:00", '2:00', '3:00', '4:00', '5:00', '6:00'],
            yHighs:[1,2,3,4,5,6,7],
            yLows: [60, 60, 60, 60, 60, 60, 60],
            title:"Hourly Trends (Default dataset)",
            xAxis:'Hour' ,
            yAxis:"Temperature",
          }
        }

        setData(dataToModel);
        localStorage.setItem('data', JSON.stringify(dataToModel));

      }
      catch (error) {
        console.log(error);
      }
    }

    const jsonData = pollWeeklyTrends(1,2);
    const searchText = localStorage.getItem('searchText');
    const data = JSON.parse(localStorage.getItem('data'));

    if (searchText) {
      setSearchText(searchText);
    };

    if (data) {
      setSelectedData(data);
    }
    else {
      setSelectedData(defaultData);
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {

          const location = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          };

          updateUserLocation(location);
          console.log(location);
        },
        function error(error) {
          console.log("Error getting location:", error);
        }
      )
    }
  }, [])

  const handleSearch = (text) => {
    localStorage.setItem('searchText', text);
    setSearchText(text);

    let newData = defaultData;
    // console.log(userLocation);

    setSelectedData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  };

  return (
    <div className="App">
        <Navbar/>
        <CurrentLocation searchText={searchText}/>
        <SearchBar onSearch={handleSearch}/>
        <HourlyView data={selectedData.hourly}/>
        <DailyView data={selectedData.daily}/>
    </div>
  );
}

export default App;
