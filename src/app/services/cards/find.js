/* eslint-disable */
import store from './../../store';
import Vue from 'vue';
// When the request succeeds
const success = (cards) => {
  store.dispatch('getCards', cards);
};

// When the request fails
const failed = () => {};

export default function () {
  return new Promise(function (resolve, reject) {
    Vue.$http.get('../static/cards.json')
      .then((response) => {
        resolve(response);
        success(response);
      })
      .catch((error) => {
        reject(error);
        failed(error);
      });
  });
};
