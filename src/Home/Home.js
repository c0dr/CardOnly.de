import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Filter from '../Filter/Filter';
import Cards from './Cards';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      enabledFilters: {},
      filterOptions: [],
      cols: []
    };
    this.filterChange = this.filterChange.bind(this);
    this.filteredCards = this.filteredCards.bind(this);
  }

  componentDidMount() {
    fetch('data/cards.json')
      .then(response => response.json())
      .catch(console.log)
      .then(data => this.setState({ cards: data }))

    fetch('data/filterOptions.json')
      .then(response => response.json())
      .catch(console.log)
      .then(data => this.setState({ filterOptions: data }))

    fetch('data/columns.json')
      .then(response => response.json())
      .catch(console.log)
      .then(data => this.setState({ cols: data }))
  }

  filterChange(filterName, filterValue) {
    let obj = {};
    obj[filterName] = filterValue;
    this.setState({
      enabledFilters: { ...this.state.enabledFilters, ...obj }
    });
  }

  filteredCards() {
    let allCards = this.state.cards;
    let enabledFilters = this.state.enabledFilters;
    for (let filterName of Object.keys(enabledFilters)) {
      allCards = allCards.filter(card => this.filterFunction(card, filterName, enabledFilters[filterName]));
    }
    return allCards.sort((a, b) => a.Issuer.localeCompare(b.Issuer))
  }

  cardFeeFreeFeatures(card) {
    let features = ['fees_atm_de', 'fees_atm_eur', 'fees_atm_foreign', 'fees_pos_foreign'];
    return features.filter(feature => card[feature] === 0);
  }

  getFilterByName(filterName) {
    return this.state.filterOptions.filter(filter => filter.filterName === filterName)[0];
  }

  filterFunction(card, filterName, filterValue) {
    //TODO: Beautify this mess

    if (filterValue === 'dontcare') {
      return true;
    }

    if (typeof filterValue === "boolean") {
      return card[filterName] === filterValue;
    } else if (Array.isArray(filterValue)) {

      let filter = this.getFilterByName(filterName);
      let freeCardFeatures = [];

      if (filter.derivedAttribute && filter.derivedAttribute === true) {
        freeCardFeatures = this.cardFeeFreeFeatures(card);
      }

      if (filterValue.length === 1 && !filter.derivedAttribute) {
        return this.filterFunction(card, filterName, filterValue[0]);
        // If we have just one property in the array, we can check the attribute directly
      }

      if (filter.match === 'single') {
        return filterValue.includes(card[filterName]);
      } else {
        return filterValue.every(val => freeCardFeatures.indexOf(val) >= 0);
      }

    } else if (typeof filterValue === "number") {
      return card[filterName] <= filterValue;
    } else {
        return card[filterName] === filterValue;
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="2"><Filter filterChange={this.filterChange} filterOptions={this.state.filterOptions} /></Col>
          <Col xs="10"><Cards cards={this.filteredCards()} cols={this.state.cols} /></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
