
import React, {useEffect, useState } from "react";
import VacationItem from "./Data/VacationItem";
import { Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Welcome from "./Data/Welcome";
import Necessities from "./Data/Necessities";
import NewVacationForm from "./Components/NewVacationForm";

import Intro from "./Data/Intro";

import { GlobalProvider } from "./context/GlobalState";

const App =()=>{
const [data, setData] = useState();
const [error, setError] = useState();
const [loading, setloading] = useState(true);
    useEffect(() => {
      fetch("https://api.jsonbin.io/b/618071784a82881d6c68e66f",{
        headers:{
          'x-master-key':'$2b$10$iujLbiHUNNKEv6DqUG.AG.P90tn1SgbUBMiz8bwDhdAhaZYRcSxy2'
        }
        })
      .then(response =>{
        if(response.ok){
          return response.json();
        }
        throw response;
      }) 
      .then(data =>{
        setData(data)
      })
      .catch(error => {
        console.log('error fetching data')
        setError(error)
      })
      .finally(()=> {
        setloading(false)
      })
    }, [])
    if(loading){
      return 'Your vacation planner is loading'
    }
    
    if(error){
      return 'error'
    }
      
  
    return (
      <Router>
      <Switch>
        <GlobalProvider value={{data, loading, error}}>
          <header>
        <Welcome/>
         </header>
        <main>
        <Route path="/" exact>
          <Intro/>
        </Route>
        <Route path="/intro">
        <Intro/>
        </Route>
        <Route path="/welcome">
        <Welcome />
        </Route>
        <Route path="/newVacationForm">
        <NewVacationForm/>
        </Route>
        <Route path="/vacationItem">
        <VacationItem/>
        </Route>
        <Route path="/necessities">
          <Necessities/>
        </Route>
        
        </main>
        </GlobalProvider>
        </Switch>
        </Router>
      )
    
};

export default App;