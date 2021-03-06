import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import Home from './Home/Home';
import Recommended from './Recommendations/Recommended';
import Contact from './Contact/Contact';
import Header from './CommonComponents/Header';
import ScreenSizeAlert from './CommonComponents/ScreenSizeAlert';
import BoonPlanet from './Recommendations/BoonPlanet';
import Sparkasse from './Recommendations/JetztIstAllesMoeglich';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ScreenSizeAlert/>
          <Header/>
          <Route exact path="/" component={Home} />
          <Route path="/recommended" component={Recommended} />
          <Route path="/jetztistallesmoeglich" component={Sparkasse} />
          <Route path="/contact" component={Contact} />
          <Route path="/boon" component={BoonPlanet} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
