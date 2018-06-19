import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cityinput from './components/city-input/City-input';
import Temperature from './components/temperature/Temperature';
import Tpw from './components/tpw/tpw';
import 'bootstrap/dist/css/bootstrap.min.css';
import Summary from './components/summary/Summary';
import DayTile from './components/day-tile/Day-tile';
import Chart from './components/chart/Chart';

import * as moment from 'moment';
import * as _ from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.dayWiseMap = {};
    this.state = {
      cityName: '',
      summary: {
        cityLocation: '',
        day: '',
        weatherCondition: ''
      },
      tpw: {
        humidity: '',
        pressure: '',
        windSpeed: ''
      },
      temperature: {
        imageURL: '',
        tempInKelvin: '',
        tempInCelsius: '',
        tempInFahrenheit: ''
      },
      forecastInfo: []
    }
    this.updateCityName = this.updateCityName.bind(this);
  }

  updateCityName(cityName) {
    this.setState({
      cityName: cityName
    });
    // this.state.cityName = cityName;
    this.fetchWeatherData(cityName);
  }

  fetchWeatherData(cityName) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=27d43832d2a4adcb97fcbfa23db130aa`;
    fetch(url)
      .then(rsp => rsp.json())
      .then(data => {
        const iconcode = data.list[0].weather[0].icon;
        const img="http://openweathermap.org/img/w/" + iconcode + ".png";
        // Setting the summary
        this.setState({
          summary: {
            cityLocation: cityName,
            day: moment(data.list[0].dt * 1000).format('ddd'),
            weatherCondition: data.list[0].weather[0].description
          },
          temperature: {
            imageURL:img,
            tempInKelvin: Math.ceil(data.list[0].main.temp),
            tempInCelsius: Math.ceil((data.list[0].main.temp)-270),
            tempInFahrenheit: Math.ceil(((data.list[0].main.temp)-270)*9/5+32)
          },
          tpw: {
            humidity: data.list[0].main.humidity,
            pressure: data.list[0].main.pressure,
            windSpeed: data.list[0].wind.speed
          }
        })

        // Build day wise map
        data.list.forEach(date => {
          console.log(data);
          const dateValue = new Date(date.dt * 1000);
          const dayNum = dateValue.getDay();
          if (dayNum in this.dayWiseMap) {
            this.dayWiseMap[dayNum].push(date);
          } else {
            this.dayWiseMap[dayNum] = [date];
          }
        });
        console.log(this.dayWiseMap);

        const sortedMap = _.sortBy(this.dayWiseMap, (value) => {
          let dayOfWeek = new Date(value[0].dt * 1000).getDay();
          let today = new Date().getDay();
          const diff = dayOfWeek - today;
          return diff < 0 ? diff + 7 : diff;
        });

        console.log(sortedMap);

        const forecastInfo = _.map(sortedMap, (obj) => {
          const minTemp = _.reduce(obj.map(interval => interval.main.temp_min), (a, b) => a + b) / obj.length;
          const iconcode = obj[0].weather[0].icon;
          const img="http://openweathermap.org/img/w/" + iconcode + ".png";
          return {
            day: moment(obj[0].dt * 1000).format("ddd"),
            minTemp: _.round(minTemp - 270, 0),
            maxTemp: _.round(obj[0].main.temp_max - 270, 0),
            imageURL: img,
            dayNum: new Date(obj[0].dt * 1000).getDay()
          }
        });

        this.setState({
          forecastInfo
        })

        // console.log()

      })
  }

  render() {
    return (
      <div className="App">
        <Cityinput onCitySelect={this.updateCityName} />
        <div className="main-container" id="main-con">
          <Summary summaryInfo={this.state.summary} />
          <div className="banner">
            <Temperature temperatureInfo={this.state.temperature} />
            <Tpw tpwInfo={this.state.tpw} />
          </div>
          <Chart />
          <div className="col-xs-12" id="fore1">
            <div className="row">
              {
                this.state.forecastInfo.map(forecastEle => {
                  return (
                    <DayTile dayInfo={forecastEle} />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
