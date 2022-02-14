//fetched places and weather api data 

import axios from 'axios';
export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': 'cf8cd58a9amsh9b25b1e131da0b9p1c7cdajsnf20f31405381',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat: '0', lon: '0' },
        headers: {
          'x-rapidapi-key': 'cf8cd58a9amsh9b25b1e131da0b9p1c7cdajsnf20f31405381',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      });
      console.log(data);
      console.log(data.weather)
      return data;
    }
    axios.request(data).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  } catch (error) {
    console.log(error);
  }
};

