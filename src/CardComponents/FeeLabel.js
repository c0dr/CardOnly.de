import React, { Component } from 'react';

class FeeLabel extends Component {
  returnLabel(value, euro) {
    if (value === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
          <span className="mr-1">✓</span> Kostenlos
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
          {value}{euro ? '€' : ''}
        </span>
      );
    }
  }

  render() {
    return this.returnLabel(this.props.value, this.props.euro);
  }
}

export default FeeLabel;
