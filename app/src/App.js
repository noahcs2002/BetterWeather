import logo from './logo.svg';
import './App.css';
import DailyView from './DailyView/DailyView';
import Navbar from './Navbar/Navbar';
import HourlyView from './HourlyView/HourlyView';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <HourlyView/>
      <DailyView/>
    </div>
  );
}

export default App;
