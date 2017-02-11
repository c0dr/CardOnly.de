/* ============
 * Vuex Actions
 * ============
 *
 * All the actions that can be used
 * inside the store
 */
import * as types from './mutation-types';

// Account
export const getCards = ({ commit }, cards) => {
  commit(types.GET_CARDS, cards);
};


export const getCard = ({ commit }, card) => {
  commit(types.GET_CARD, card);
};

