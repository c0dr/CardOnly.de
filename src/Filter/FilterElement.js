import React from 'react';
import FilterSelect from './FilterSelect';
import FilterDropDown from './FilterDropDown';

export default class FilterElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.props.onFilterChange;
  }

  render() {
    switch(this.props.config.type) {
      case 'dropdown': 
        return (<FilterDropDown config={this.props.config} onFilterChange={this.handleChange}/>);      
      case 'select':
        return (<FilterSelect config={this.props.config} onFilterChange={this.handleChange}/>);      
      default:
        console.error('Invalid filterElement type + ' + this.props.config.type);
        return (<div></div>);
    }
  }
}
