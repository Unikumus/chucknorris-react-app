import React, {Component} from 'react';
import './App.css';
import MainPage from "./pages/main-page";
import FavoritesPage from "./pages/favorites";
import {Route} from "react-router-dom";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Route exact path='/'  render={() => <MainPage  />}/>
                <Route path='/favorites' render={() => <FavoritesPage  />}/>
            </div>
        );
    }

}

export default App;
