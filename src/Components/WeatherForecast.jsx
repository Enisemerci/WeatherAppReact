import React from 'react'
import Card from './Content/Card'
import WeatherDetail from './Content/WeatherDetail'
import NextDays from './Content/NextDays'
import '../App.css'

const WeatherForecast = ({weatherData}) => {
  return (
    <div className='weatherforecast'>
        <Card weatherData={weatherData}/>
        <WeatherDetail weatherData={weatherData}/>
        <NextDays weatherData={weatherData}/>
    </div>
  )
}

export default WeatherForecast