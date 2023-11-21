import './Home.scss';
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
import Footer from '../Footing/Footer';
import Maintenance from '../Maintenance/Maintenance';
import Alert from '../Alert/Alert';

/**
 * Home screen for the app
 * @returns Home component.
 * @since V1.6.0
 * @formerly App.js 
 * @author Noah Sternberg
 */
function Home() {

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

  // States and their abbreviations for data parsing later.
  const states = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ',
    'Arkansas': 'AR', 'California': 'CA', 'Colorado': 'CO',
    'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL',
    'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
    'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA',
    'Maine': 'ME', 'Maryland': 'MD', 'Massachusetts': 'MA',
    'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
    'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE',
    'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC',
    'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
    'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI',
    'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN',
    'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
    'Wisconsin': 'WI', 'Wyoming': 'WY'
  };

  /**
   * SET THIS TO TRUE IF THE SITE IS UNDER MAINTENANCE
   */
  const underMaintenance = false;
  /**
   * 
   */

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [place, setPlace] = useState({});
  const [hasSearchBeenMade, setSearchMade] = useState(false);
  const [areAlertsPresent, setAlertsPresent] = useState(false);
  const [error, setErrorsPresent] = useState(false);

  const versionNumber = `V${process.env.REACT_APP_VERSION_NUMBER}`;

  const loadWeather = async (location) => {
    try {
      // Cool-down period to allow API's to not be over-called. 
      await new Promise(r => {
        setTimeout(r, 500);
      })

      const alertPortal = process.env.REACT_APP_ALERT_PORTAL;
      var userLocation = randomLocations[Math.floor(Math.random() * 10)];

      if(location!==undefined) {
        userLocation = location;
      }

      localStorage.setItem('place', JSON.stringify(userLocation));

      const PORTAL = process.env.REACT_APP_LOCATION_PORTAL;
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
    const oldText = searchText;
    setAlertsPresent(false);
    setLoading(true);
    setSearchText(text);

    try {
      var [city, state] = text.split(',');
      const PORTAL = process.env.REACT_APP_GEOCODING_PORTAL;
      const specifier = process.env.REACT_APP_GEOCODING_CONSTRUCTED_URL;
      const url = `${PORTAL}${city}${specifier}`;
      console.log(url);

      const queryResponse = await fetch(url);
      const responseJSON = await queryResponse.json();
     
      var countries = [];

      responseJSON.forEach(e => {
        countries.push(e.country);
      })

      if (!countries.includes("US")) {
        localStorage.setItem('text', text);
        await handleFailure(oldText, text);
        return;
      }

      var latLongOfResult = null;

      if (state) {
        state = state.trim();
        responseJSON.forEach(r => {
          if (state === states[r.state]) {
            latLongOfResult = {lat: r.lat, long: r.lon}
          }
        })
      }
      else {
        latLongOfResult = {lat: responseJSON[0].lat, long: responseJSON[0].lon}
      }
      
      localStorage.setItem('place', JSON.stringify(latLongOfResult));
      setPlace(latLongOfResult);
    }
    catch (err) {
      console.log("Error using Geocoding API: ", err)
    }

    await loadWeather(JSON.parse(localStorage.getItem('place')));
    setSearchMade(true);
    setLoading(false);
  };

  useEffect(() => { 
      const start = async () => {
        await loadWeather();
    }

    start();
  }, []);

  const handleFailure = async (text, searchedFor) => {
    setLoading(true);
    setSearchText(text);
    setErrorsPresent(true);
    setLoading(false);
  }

  return (
    // This is an abomination. I know that. You know that. We all know that. 
    // But it works and I'm too scared to touch it ... 
    <div className='App'>
      {underMaintenance ? (<Maintenance/>) : (<>
          <Navbar versionNumber={versionNumber}/>
          {error ? (<> <div className='background'/> <Alert searchedText={localStorage.getItem('text')} onRetry={setErrorsPresent} /> </>) : (<>
            {areAlertsPresent ? (<CriticalAlerts alerts={JSON.parse(localStorage.getItem('alerts'))} setStateFunction={setAlertsPresent}  />) : (<></>)}
            {loading ? (<Loading/>) 
            :(<>{!hasSearchBeenMade ? (<></>):(<> <CurrentLocation searchText={searchText}/> </> )}
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
              <Footer versionNumber={versionNumber}/>
            </>)}</>)}</>)
        }
    </div>
  )
}

export default Home;
