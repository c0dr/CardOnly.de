import React from 'react';
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';

export default class FilterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedOptions: this.props.config.options.filter(option => option.checked).map(option => option.value) || [],
    }
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    const options = this.state.checkedOptions;
    let index;
    let value = e.target.value;
    
    if(this.props.config.parseAsBoolean) {
      value = (value === 'true');
    }

    if(this.props.config.parseAsInt) {
      value = parseInt(value, 10);
    }

    if (e.target.checked) {
      options.push(value);
    } else {
      index = options.indexOf(value);
      options.splice(index, 1);
    }
    this.setState({ checkedOptions: options });
    this.props.onFilterChange(this.props.config.filterName, options);
  }
  render() {
    return (
      <div>
        <FormGroup row>
          <Label sm={6} for={this.props.config.elmentName}><strong>{this.props.config.label}</strong></Label>
          <Col sm={6}>
            <Form innerRef={(ref) => this.form = ref}>
              <FormGroup check>
                {this.props.config.options.map((option, index) => {
                  return <div key={index} ><Input type="checkbox" defaultChecked={option.checked} value={option.value} onChange={this.handleChange} />
                    <Label>{option.label}</Label>
                  </div>
                })}
              </FormGroup>
            </Form>
          </Col>
        </FormGroup>
      </div>
    );
  }
}
