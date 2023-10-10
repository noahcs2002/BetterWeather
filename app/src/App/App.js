import './App.scss';
import DailyView from '../DailyView/DailyView';
import Navbar from '../Navbar/Navbar';
import HourlyView from '../HourlyView/HourlyView';
import SearchBar from '../Search/SearchBar';
import CurrentLocation from '../CurrentLocation/CurrentLocation';
import React, {useEffect, useState} from 'react';
import Loading from '../Loading/Loading';
import Info from '../AdditionalInformation/Info';
import CriticalAlerts from '../CriticalAlerts/CriticalAlerts';
import Precipitation from '../PrecipitationGraph/PrecipitationGraph';

function App() {

  const randomLocations = [
    {lat: 40.7128, long: -74.0060, name: 'New York City, NY'},
    {lat: 34.0522, long: -118.2437, name: 'Los Angeles, CA'},
    {lat: 41.8781, long: -87.6298, name: 'Chicago, IL'},
    {lat: 29.7604, long: -95.3698, name: 'Houston, TX'},
    {lat: 25.7617, long: -80.1918, name: 'Miami, FL'},
    {lat: 37.7749, long: -122.4194, name: 'San Francisco, CA'},
    {lat: 47.6062, long: -122.3321, name: 'Seattle, WA'},
    {lat: 42.3601, long: -71.0589, name: 'Boston, MA'},
    {lat: 33.7490, long: -84.3880, name: 'Atlanta, GA'},
    {lat: 36.1699, long: -115.1398, name: 'Las Vegas, NV'}
];


  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [place, setPlace] = useState({});
  const [hasSearchBeenMade, setSearchMade] = useState(false);
  const [areAlertsPresent, setAlertsPresent] = useState(false);

  const loadWeather = async () => {
    try {
      const alertPortal = 'https://api.weather.gov/alerts/active?point=';


      const userLocation = JSON.parse(localStorage.getItem('place'));
      var PORTAL = 'https://api.weather.gov/points';
      var url = `${PORTAL}/${userLocation.lat},${userLocation.long}`;
      const pollResponse = await fetch(url);
      const pollData = await pollResponse.json();
      const region = `${pollData.properties.relativeLocation.properties.city}, ${pollData.properties.relativeLocation.properties.state}`
      const weeklyForecastResponse = await fetch(pollData.properties.forecast);
      const weeklyForcastData = await weeklyForecastResponse.json();
      const weeklyPeriods = weeklyForcastData.properties.periods
      const todaysForecast = weeklyPeriods[0];

      var hourlyForecastResponse = await fetch(pollData.properties.forecastHourly);
      var hourlyForecastData = await hourlyForecastResponse.json();
      var hourlyPeriods = hourlyForecastData.properties.periods;

      var alertUrl = `${alertPortal}${userLocation.lat},${userLocation.long}`;
      var alerts = await fetch(alertUrl);
      var alertJson = await alerts.json();

      if (alertJson.features.length !== 0) {
        localStorage.setItem('alerts', JSON.stringify(alertJson.features));
        setAlertsPresent(true);
      }
      else {
        setAlertsPresent(false);
      }

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
        todaysForecast,
        weeklyPeriods,
      }

      localStorage.setItem('data', JSON.stringify(dataToModel));

    }
    catch (error) {
      console.log("Error with polling: ", error);
    }
    setLoading(false);
  }

  const handleSearch = async (text) => {
    setLoading(true);
    setSearchText(text);
    setAlertsPresent(false);

    try {
      const [city, state] = text.split(',');
      const PORTAL = "http://api.openweathermap.org/geo/1.0/direct?q=";
      const apiKey = '7cebf8d972aa8649dc95fc84596a9724';
      const url = state ? (`${PORTAL}${city},${state}&limit=5&appid=${apiKey}`) : (`${PORTAL}${city}&limit=5&appid=${apiKey}`);

      const queryResponse = await fetch(url);
      const responseJSON = await queryResponse.json();

      const latLongOfResult = {lat: responseJSON[0].lat, long: responseJSON[0].lon}
      localStorage.setItem('place', JSON.stringify(latLongOfResult));
      setPlace(latLongOfResult);
    }
    catch (err) {
      console.log("error using Geocoding API:", err)
    }

    await loadWeather(place);
    setSearchMade(true);
    setLoading(false);
  };

  useEffect(() => { 
    const getLocationPermission = async () => {
      setLoading(true);
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

          localStorage.setItem('place', JSON.stringify(location));
          setPlace(location);
        }
        catch (error) {
          const defaultLocation = randomLocations[Math.floor(Math.random() * 10)];
          localStorage.setItem('place', JSON.stringify(defaultLocation));
          setPlace({lat:defaultLocation.lat, long:defaultLocation.long});
          setSearchText(defaultLocation.name);
          localStorage.setItem('region', defaultLocation.name);
        }
        setLoading(false);
      }
      else {
        console.log("no navigation allowed");
      }
      setLoading(false);
    }

    const start = async () => {
      await getLocationPermission();
      await loadWeather();
    }

    start();
  }, []);

  return (
    <div className='App'>
        <Navbar/>
        {areAlertsPresent ? (<CriticalAlerts alerts={JSON.parse(localStorage.getItem('alerts'))}/>) : (<></>)}
        {loading ? (<Loading/>) 
        :(<>{!hasSearchBeenMade ? (<div className='spacer'></div>):(<> <CurrentLocation searchText={searchText}/> </> )}
          <SearchBar onSearch={handleSearch}/>
          <div className='side-by-side'>
              <div className='views'>
                  <HourlyView data={JSON.parse(localStorage.getItem('data'))}/>
                  <DailyView data={JSON.parse(localStorage.getItem('data'))}/>
                  <Precipitation data={JSON.parse(localStorage.getItem('data'))}/>
              </div>
              <div className='info-holder'>
                  <Info data={JSON.parse(localStorage.getItem('data'))}/>
              </div>
          </div>
        </>)}
    </div>
  )
}

export default App;
