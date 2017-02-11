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
    Vue.$http.get('https://rawgit.com/c0dr/2f7f070540873aa0d8d6b54be1dae74e/raw/a8ad060fb70174df9f4be67b5dc48eb32853e613/cards.json')
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
