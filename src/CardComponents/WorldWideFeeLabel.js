import React, { Component } from 'react';

class WorldWideFeeLabel extends Component {
  returnLabel() {
    if (this.props.foreign === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
          <span className="mr-1">✓</span> Weltweit kostenlos
        </span>
      );
    } else if (this.props.eur === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
          <span className="mr-1">!</span> Im Euroraum kostenlos
        </span>
      );
    } else {
      return (
        <div className="flex gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            Euro: {this.props.eur}%
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            Weltweit: {this.props.foreign}%
          </span>
        </div>
      );
    }
  }

  render() {
    return this.returnLabel();
  }
}

export default WorldWideFeeLabel;
