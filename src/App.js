import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import Home from './Home/Home';
import Recommended from './Recommendations/Recommended';
import AktuelleAktionen from './Recommendations/AktuelleAktionen';
import Contact from './Contact/Contact';
import Header from './CommonComponents/Header';
import ScreenSizeAlert from './CommonComponents/ScreenSizeAlert';
import Sparkasse from './Recommendations/JetztIstAllesMoeglich';
import { ContentfulClient, ContentfulProvider } from 'react-contentful';
const contentfulClient = new ContentfulClient({
  accessToken: 'q9EnnegMCKoT0HBJwk30-eMFjfdenU_l8e7y0uZ-P10',
  space: 'iozd3dvwz12u',
});

class App extends Component {
  render() {
    return (
      <ContentfulProvider client={contentfulClient}>
      <HashRouter>
        <div>
          <ScreenSizeAlert/>
          <Header/>
          <Route exact path="/" component={Home} />
          <Route path="/recommended" component={Recommended} />
          <Route path="/jetztistallesmoeglich" component={Sparkasse} />
          <Route path="/contact" component={Contact} />
          <Route path="/aktionen" component={AktuelleAktionen} />
        </div>
      </HashRouter>
      </ContentfulProvider>
    );
  }
}

export default App;
