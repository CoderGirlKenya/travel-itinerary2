import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData, getWeatherData } from './Api';
import Header from '../Components/Header/Header';
import List from '../Components/List/List';
import Map from '../Components/Map/Map';
import WeatherDetails from '../Components/PlaceDetails/WeatherDetails';
//declares inital state variables used in map
//renders map component

const RenderApi = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating, places]);
  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getWeatherData(coords.lat, coords.lng)
        .then((data) => setWeatherData(data));
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type, coords.lat, coords.lng]);
  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({ lat, lng });
  };

  console.log(weatherData);
  console.log(weatherData.main);
  console.log(weatherData.main.temp);
  

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            weatherData={weatherData}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            weatherData={weatherData}
          />
         
        </Grid>
      </Grid>
    </>
  );
};
export default RenderApi;