import './App.css';
import DailyView from './DailyView/DailyView';
import Navbar from './Navbar/Navbar';
import HourlyView from './HourlyView/HourlyView';
import SearchBar from './Search/SearchBar';
import CurrentLocation from './CurrentLocation/CurrentLocation';
import React, {useEffect, useState} from 'react';

function App() {

  const dataForMurray = {
    daily : {
      xData : ['12:00', "1:00", '2:00', '3:00', '4:00', '5:00', '6:00'],
      yData : [82, 80, 82, 83, 85, 86, 89],
      title : 'Hourly view for Murray, Kentucky',
      xAxis : 'Time',
      yAxis : 'Temperature' 
    },
    hourly: {
      xData: ['10/1','10/2','10/3','10/4','10/5','10/6','10/7'],
      yData: [82, 81, 79, 73, 72, 68, 64],
      title: "Weekly Outlook for Murray, Kentucky",
      xAxis: 'Day' ,
      yAxis: "Temperature",
    }
  };
  
  const dataForPaducah = {
    daily : {
      xData : ['12:00', "1:00", '2:00', '3:00', '4:00', '5:00', '6:00'],
      yData : [77, 78, 82, 81, 75, 69, 62],
      title : 'Hourly view for Paducah, Kentucky',
      xAxis : 'Time',
      yAxis : 'Temperature' 
    },
    hourly: {
      xData: ['10/1','10/2','10/3','10/4','10/5','10/6','10/7'],
      yData: [82, 81, 71, 73, 75, 78, 68],
      title: "Weekly Outlook for Paducah, Kentucky",
      xAxis: 'Day' ,
      yAxis: "Temperature",
    }
  };

  const defaultData = {
    daily : {
      xData:[1,2,3,4,5,6,7],
      yData:[1,2,3,4,5,6,7],
      title:"Daily Trends (Default dataset)",
      xAxis:'Hour' ,
      yAxis:"Temperature",
    },

    hourly : {
      xData:['12:00', "1:00", '2:00', '3:00', '4:00', '5:00', '6:00'],
      yData:[1,2,3,4,5,6,7],
      title:"Hourly Trends (Default dataset)",
      xAxis:'Hour' ,
      yAxis:"Temperature",
    }
  };

  const [searchText, setSearchText] = useState('');
  const [selectedData, setSelectedData] = useState(defaultData);

  useEffect(() => {
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

  const handleSearch = (text) => {
    localStorage.setItem('searchText', text);
    setSearchText(text);

    let newData = defaultData;

    if (text.toLowerCase() === 'murray') {
      newData = dataForMurray;
    }
    else if (text.toLowerCase() === 'paducah') {
      newData = dataForPaducah;
    }

    setSelectedData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  };

  return (
    <div className="App">
      <Navbar/>
      <SearchBar onSearch={handleSearch}/>
      <CurrentLocation searchText={searchText}/>
      <HourlyView data={selectedData.hourly}/>
      <DailyView data={selectedData.daily}/>
    </div>
  );
}

export default App;
