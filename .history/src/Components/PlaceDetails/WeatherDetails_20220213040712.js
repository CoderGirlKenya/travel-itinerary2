import React from 'react'

function WeatherDetails(weatherData) {
  
      {weatherData.main.map((weather)=>{
        console.log(weather);
      })}
        
        return (

            <div>{weather}</div>

  )
}

export default WeatherDetails;