import React from 'react'

function WeatherDetails(weatherData) {
  
    console.log(weatherData);
    


    // const weather = weatherData.main
    
   
      //{weatherData.list.map)((weather) =>{
      //    console.log(weather);
      //  })}
      //   console.log(weatherData)

        // 
        return (
          <div>
          {weatherData.map((weather => {
          <div>{weather}</div>
})}
          </div>
        )
        
}

export default WeatherDetails;