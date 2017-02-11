import {
  GET_CARDS,
} from './../../mutation-types';

export default {
  [GET_CARDS](state, cards) {
    state.cards = cards.data;
  },
};
