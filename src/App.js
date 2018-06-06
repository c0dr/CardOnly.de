import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import Home from './Home/Home';
import Recommended from './Recommendations/Recommended';
import Contact from './Contact/Contact';
import Header from './CommonComponents/Header';
import ScreenSizeAlert from './CommonComponents/ScreenSizeAlert';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ScreenSizeAlert/>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/recommended" component={Recommended} />
          <Route path="/contact" component={Contact} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
