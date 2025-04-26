import React, { Component } from 'react';
import { Button } from '../components/ui/button';

class Header extends Component {

    freeAtm = () => {
      if (this.isActive("freeATM")) {
        this.props.resetFilters();
      } else {
        this.props.resetFilters("freeATM");
        this.props.filterChange("freeATM", ["fees_atm_foreign"]);
      }
    }

    miles = () => {
      if (this.isActive("miles")) {
        this.props.resetFilters();
      } else {
        this.props.resetFilters("miles");
        this.props.filterChange("miles", true);
      }
    }

    applePay = () => {
      if (this.isActive("applePay")) {
        this.props.resetFilters();
      } else {
        this.props.resetFilters("applePay");
        this.props.filterChange("applePay", true);
      }
    }

    isActive = (filterName) => {
      return this.props.enabledFilters[filterName] !== undefined;
    }
  
  render() {
    return (
      <div className="relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 opacity-90"></div>
        <div className="relative p-8 md:p-12 rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Finde jetzt die richtige Karte
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
            Egal ob Reise, Meilen oder Bargeld abheben, schnell zur passenden Karte für dich!
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant={this.isActive("freeATM") ? "default" : "outline"}
              className={`${this.isActive("freeATM") 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
              onClick={this.freeAtm}
            >
              Kostenlose Abhebungen
            </Button>
            <Button 
              variant={this.isActive("miles") ? "default" : "outline"}
              className={`${this.isActive("miles") 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
              onClick={this.miles}
            >
              Meilen sammeln
            </Button>
            <Button 
              variant={this.isActive("applePay") ? "default" : "outline"}
              className={`${this.isActive("applePay") 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
              onClick={this.applePay}
            >
              Apple Pay
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
