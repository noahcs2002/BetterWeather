import './App.scss';
import DailyView from '../DailyView/DailyView';
import Navbar from '../Navbar/Navbar';
import HourlyView from '../HourlyView/HourlyView';
import SearchBar from '../Search/SearchBar';
import CurrentLocation from '../CurrentLocation/CurrentLocation';
import React, {useEffect, useState} from 'react';
import Loading from '../Loading/Loading';
import Info from '../AdditionalInformation/Info';

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
    },

    today: "None"
  };

  // States
  const [searchText, setSearchText] = useState('');
  const [selectedData, setSelectedData] = useState(defaultData);
  const [userLocation, updateUserLocation] = useState(null);
  const [data, setData] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [hasSearchBeenMade, setSearchMade] = useState(false);

  const pollWeeklyTrends = async (location) => {
    try {
      var PORTAL = 'https://api.weather.gov/points';
      
      var url = `${PORTAL}/${location.lat},${location.long}`;

      const pollResponse = await fetch(url);
      const pollData = await pollResponse.json();
      setData(pollData);
      const region = `${pollData.properties.relativeLocation.properties.city}, ${pollData.properties.relativeLocation.properties.state}`
      const weeklyForecastResponse = await fetch(pollData.properties.forecast);
      const weeklyForcastData = await weeklyForecastResponse.json();
      const weeklyPeriods = weeklyForcastData.properties.periods
      const todaysForecast = weeklyPeriods[0];
      console.log('Today\'s forecast: ', todaysForecast);

      var hourlyForecastResponse = await fetch(pollData.properties.forecastHourly);
      var hourlyForecastData = await hourlyForecastResponse.json();
      var hourlyPeriods = hourlyForecastData.properties.periods;

      const xDataWeekView = [];
      const yHighsWeekView = [];
      const yLowsWeekView = [];
      
      const xDataHourView = [];
      const yHighsHourView = [];

      // Periods constains 14 JSON objects, starting from the present day to 7 days away, 1 per day and 1 per night
      weeklyPeriods.forEach(period => {
        const name = period.name;
        const temperature = period.temperature;

        if (period.isDaytime) {
          xDataWeekView.push(name);
          yHighsWeekView.push(temperature);
        }
        else {
          yLowsWeekView.push(temperature);
        }
      })

      hourlyPeriods.forEach((p, index) => {
        if (index < 12) {
          
          var dateObject = new Date(p.startTime);

          var hours = dateObject.getHours();
          var minutes = dateObject.getMinutes();
          var seconds = dateObject.getSeconds();

          // Format hours, minutes, and seconds as two-digit strings
          hours = hours       < 10 ? "0" + hours : hours;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          // Construct the time string
          var timeString = hours + ":" + minutes + ":" + seconds;
          xDataHourView.push(timeString);
          yHighsHourView.push(p.temperature);
        }
      });

      const dataToModel = {
        daily: {
          xData: xDataWeekView,
          yHighs : yHighsWeekView,
          yLows : yLowsWeekView,
          title: `Weekly outlook for ${region}`,
          xAxis:'Day' ,
          yAxis:"Temperature",
        },
        hourly : {
          xData:xDataHourView,
          yHighs:yHighsHourView,
          yLows: yHighsHourView,
          title:`Hourly Trends for ${region}`,
          xAxis:'Hour' ,
          yAxis:"Temperature",
        },
        todaysForecast
      }

      setData(dataToModel);
      localStorage.setItem('data', JSON.stringify(dataToModel));

    }
    catch (error) {
      console.log("Error with polling: ", error);
    }
    setLoadingWeather(false);
  }

  useEffect(() => {
    const getLocationPermission = async () => {
      if ("geolocation" in navigator) {
        try {
          const location = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              pos => (
                resolve({
                lat: pos.coords.latitude,
                long: pos.coords.longitude,
              })),
              error => reject(error)
            );
          });

          localStorage.setItem('location', JSON.stringify(location));
          updateUserLocation(location);
          await pollWeeklyTrends(location);
        }
        catch (error) {
          const defaultLocation = {lat : 40.7128, long : -74.0060};
          localStorage.setItem('location', JSON.stringify(defaultLocation));
          updateUserLocation(defaultLocation);
          await pollWeeklyTrends(defaultLocation);
          setSearchText("Hoboken, NJ");
        }
        setLoadingLocation(false);
      }
      else {
        console.log("no navigation allowed");
      }
      setLoadingLocation(false);
    }

    const startup = async () => {
      await getLocationPermission();
      pollWeeklyTrends();
    }
    startup();

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

  }, [])

  useEffect(() => {
    if(userLocation && !loadingLocation && !loadingWeather) {
      pollWeeklyTrends(userLocation);
    }
  }, [userLocation, loadingLocation, loadingWeather]);

  const handleSearch = async (text) => {
    setLoadingLocation(true);
    localStorage.setItem('searchText', text);
    setSearchText(text);
    try {
      const [city, state] = text.split(',');
      if (state) {
      }
      const PORTAL = "http://api.openweathermap.org/geo/1.0/direct?q=";
      const apiKey = '7cebf8d972aa8649dc95fc84596a9724';
      const url = state ? (`${PORTAL}${city},${state}&limit=5&appid=${apiKey}`) : (`${PORTAL}${city}&limit=5&appid=${apiKey}`);

      const queryResponse = await fetch(url);
      const responseJSON = await queryResponse.json();

      const latLongOfResult = {lat: responseJSON[0].lat, long: responseJSON[0].lon}
      console.log("Geocoding response: ", latLongOfResult);
      pollWeeklyTrends(latLongOfResult);
    }
    catch (err) {
      console.log("error using Geocoding API:", err)
    }

    let newData = defaultData;
    setSelectedData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
    setSearchMade(true);
    setLoadingLocation(false);
  };

  return (
    <div className="App">
        <Navbar/>
        {loadingLocation || loadingWeather ? (<Loading/>) : (<>
          {!hasSearchBeenMade ? (<div className='spacer'></div>) :( <> <CurrentLocation searchText={searchText}/> </>)}
          <SearchBar onSearch={handleSearch}/>
          <div className='side-by-side'>
              <div className='views'>
                  <HourlyView data={JSON.parse(localStorage.getItem('data'))}/>
                  <DailyView data={JSON.parse(localStorage.getItem('data'))}/>
              </div>
              <div className='info-holder'>
                  <Info data={JSON.parse(localStorage.getItem('data'))}/>
              </div>
          </div>
        </>)}
    </div>
  );
}

export default App;
