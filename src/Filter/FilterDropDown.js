import React from 'react';
import { FormGroup, Label, Input, Col } from 'reactstrap';

export default class FilterDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onFilterChange(this.props.config.filterName, this.props.config.options[e.target.value].value);
  }
  render() {
    return (
      <div>
        <FormGroup row>
          <Label sm={6} for={this.props.config.elmentName}>{this.props.config.label}</Label>
          <Col sm={6}>
            <Input type="select" onChange={this.handleChange} name={this.props.config.elementName} id={this.props.config.elementName}>
              {this.props.config.options.map((obj, index) => {
                return <option value={index} key={index}>{obj.label}</option>
              })}
            </Input>
          </Col>
        </FormGroup>
      </div>
    );
  }
}


