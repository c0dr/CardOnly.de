import React, { Component } from 'react';

class CurrentAccount extends Component {

  generateHtml() {
    if (this.props.card.withChecking) {
      return (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Girokonto:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            <span className="mr-1">✓</span> Mit Girokonto
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Girokonto:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            <span className="mr-1">✓</span> Ohne Girokonto
          </span>
        </div>
      );
    }
  }
  render() {
    return this.generateHtml()
  }
}

export default CurrentAccount;
