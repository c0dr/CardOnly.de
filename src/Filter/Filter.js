import React, { Component } from 'react';
import FilterElement from './FilterElement';

class Filter extends Component {
   render() {
    return (
     <div>
        <h4>Filter</h4>
        {this.props.filterOptions.map((filterOption, index) => {
            return <FilterElement key={index} onFilterChange={this.props.filterChange} config={filterOption}/>
        })}
    </div>
    );
  }
}

export default Filter;
