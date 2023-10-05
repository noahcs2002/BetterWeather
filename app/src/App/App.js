import './App.scss';
import DailyView from '../DailyView/DailyView';
import Navbar from '../Navbar/Navbar';
import HourlyView from '../HourlyView/HourlyView';
import SearchBar from '../Search/SearchBar';
import CurrentLocation from '../CurrentLocation/CurrentLocation';
import React, {useEffect, useState} from 'react';
import Loading from '../Loading/Loading';

/**
 * The application entry point.
 * @returns Application
 * @author Noah Sternberg
 * @since V1.0.0
 */
function App() {

  // Default dataset to be loaded in the event of a fatal error
  const defaultData = {
    daily : {
      xData:[],
      yHighs:[],
      yLows: [],
      title:"(Default dataset)",
      xAxis:'Hour' ,
      yAxis:"Temperature",
    },

    hourly : {
      xData:[],
      yHighs:[],
      yLows: [],
      title:"(Default dataset)",
      xAxis:'Hour' ,
      yAxis:"Temperature",
    }
  };

  // States used throughout app
  const [searchText, setSearchText] = useState('');
  const [selectedData, setSelectedData] = useState(defaultData);
  const [userLocation, updateUserLocation] = useState(null);
  const [data, setData] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [hasSearchBeenMade, setSearchMade] = useState(false);

  // Gather weather data for a passed in location{}.
  const pollWeather = async (location) => {
    try {
      // PORTAL represents the base API URL that we add on to to make our query happen.
      var PORTAL = 'https://api.weather.gov/points';
      var url = `${PORTAL}/${location.lat},${location.long}`;

      // Make initial query and set the data to be the response
      const pollResponse = await fetch(url);
      const pollData = await pollResponse.json();
      setData(pollData);

      // Store the region from the initial response, and fetch the weekly forecast data from the response.
      // NWS's API returns links to other API endpoints to call for more data.
      const region = `${pollData.properties.relativeLocation.properties.city}, ${pollData.properties.relativeLocation.properties.state}`
      const weeklyForecastResponse = await fetch(pollData.properties.forecast);
      const weeklyForcastData = await weeklyForecastResponse.json();

      // Most important step. The periods are the time windows for the weather data
      const weeklyPeriods = weeklyForcastData.properties.periods

      // Repeat above process for hourly trends.
      var hourlyForecastResponse = await fetch(pollData.properties.forecastHourly);
      var hourlyForecastData = await hourlyForecastResponse.json();
      var hourlyPeriods = hourlyForecastData.properties.periods;

      // Prepare our data containers
      const xDataWeekView = [];
      const yHighsWeekView = [];
      const yLowsWeekView = [];
      
      const xDataHourView = [];
      const yHighsHourView = [];

      // Periods constains 14 JSON objects, starting from the present day to 7 days away, 1 per day and 1 per night
      // For each -> Grab the name and temp. If its daytime add it to day time and store the name, else add the value to the night's list.
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

      // Repeat for hourly
      hourlyPeriods.forEach((p, index) => {
        if (index < 12) {
          
          var dateObject = new Date(p.startTime);

          // Grab time components
          var hours = dateObject.getHours();
          var minutes = dateObject.getMinutes();
          var seconds = dateObject.getSeconds();

          // Format hours, minutes, and seconds as two-digit strings
          hours = hours < 10 ? "0" + hours : hours;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          // Reconstruct the time
          var timeString = hours + ":" + minutes + ":" + seconds;
          xDataHourView.push(timeString);
          yHighsHourView.push(p.temperature);
        }
      });

      // New dataset to model
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
        }
      }

      // Store it in local storage for easy re-lookup
      setData(dataToModel);
      localStorage.setItem('data', JSON.stringify(dataToModel));

    }
    catch (error) {
      console.log("Error with polling: ", error);
    }
    // turn loading screen off, but wait 2.5 seconds to allow other threads to catch up
    await new Promise(r => setTimeout(r, 2500));
    setLoadingWeather(false);
  }

  // Separate useEffect to gather user location permissions
  useEffect(() => {
    // If the user has location persmissions in its navigator, we can use it, if we have permission
    const getLocationPermission = async () => {
      if ("geolocation" in navigator) {
        try {
          const location = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              // If we have permission, store the lat/lng of the location
              pos => (
                resolve({
                lat: pos.coords.latitude,
                long: pos.coords.longitude,
              })),
              // Otherwise throw a fit
              error => reject(error)
            );
          });

          // Store the location in their browser for future lookup.
          localStorage.setItem('location', JSON.stringify(location));
          updateUserLocation(location);

          // Grab the weather with this location
          pollWeather(location);
        }
        catch (error) {
          // If we have some issue, load the weather from the API using the default location of Hobokenm, NJ. 
          // Don't ask why Hoboken, I think the name sounds hilarious so I picked it.
          const defaultLocation = {lat : 40.7128, long : -74.0060};
          localStorage.setItem('location', JSON.stringify(defaultLocation));
          updateUserLocation(defaultLocation);
          pollWeather(defaultLocation);
          setSearchText("Hoboken, NJ");
        }
      }
      else {
        console.log("no navigation allowed");
      }
      setLoadingLocation(false);
    }

    // Startup procedure
    const startup = async () => {
      await getLocationPermission();
      await new Promise(() => {
        pollWeather()
      });
    }

    startup();

    // Load in the stored data we want.
    const searchText = localStorage.getItem('searchText');
    const data = JSON.parse(localStorage.getItem('data'));

    // If we have the data, set it as the current data. Else move on
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

  // Procedure for load handling.
  useEffect(() => {
    if(userLocation && !loadingLocation && !loadingWeather) {
      pollWeather(userLocation);
    }
  }, [userLocation, loadingLocation, loadingWeather]);

  // Search function
  const handleSearch = async (text) => {
    setLoadingLocation(true);
    localStorage.setItem('searchText', text);
    setSearchText(text);
    try {
      const [city, state] = text.split(',');
      if (state) {

      }
      // Using GeoCoding API to to handle the API
      const PORTAL = "http://api.openweathermap.org/geo/1.0/direct?q=";
      const apiKey = '7cebf8d972aa8649dc95fc84596a9724';
      const url = state ? (`${PORTAL}${city},${state}&limit=5&appid=${apiKey}`) : (`${PORTAL}${city}&limit=5&appid=${apiKey}`);

      const queryResponse = await fetch(url);
      const responseJSON = await queryResponse.json();

      const latLongOfResult = {lat: responseJSON[0].lat, long: responseJSON[0].lon}
      pollWeather(latLongOfResult);
    }
    catch (err) {
      console.log("error using Geocoding API:", err)
    }

    // Update stored data
    let newData = defaultData;
    setSelectedData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
    setSearchMade(true);
    setLoadingLocation(false);
  };

  return (
    // If loading show loading, else show the app. That's this really ugly logic.
    // Only show 'showing location for ... ' if search has been made.
    <div className="App">
        <Navbar/>
        {loadingLocation || loadingWeather ? (<Loading/>) 
        : 
        (<>
          {!hasSearchBeenMade ? (<div className='spacer'></div>) :( <> <CurrentLocation searchText={searchText}/> </>)}
          <SearchBar onSearch={handleSearch}/>
          <HourlyView data={JSON.parse(localStorage.getItem('data'))}/>
          <DailyView data={JSON.parse(localStorage.getItem('data'))}/>
        </>)}
    </div>
  );
}

export default App;