/* ============
 * Account Index Page
 * ============
 *
 * Page where the user can view the account information
 */
import cardService from "../../../services/cards/";
import store from './../../../store';


export default {
  components: {
    VLayout: require('layouts/default/default.vue'),
    VPanel: require('components/panel/panel.vue'),
  },

  created() {
    var that = this;
    cardService.find()
  },
  data() {
    return {
      '3DSecure': {selected: false, inSelection: "true"},
      'charge': {selected: true, inSelection: ["charge", "credit", "debit", "prepaid"]},
      'contactless': {selected: false, inSelection: "true"},
      'fees_atm_de': {selected: false, inSelection: 0},
      'fees_atm_eur': {selected: false, inSelection: 0},
      'fees_atm_foreign': {selected: false, inSelection: 0},
      'fees_pos_eur': {selected: false, inSelection: 0},
      'fees_pos_foreign': {selected: false, inSelection: 0},
      'insurance': {selected: false, inSelection: "true"},
      'miles': {selected: false, inSelection: "true"},
      'offlinepin': {selected: false, inSelection: "true"},
      'offlinetrx': {selected: false, inSelection: "true"},
      'pinfirst': {selected: false, inSelection: "true"},
      'withChecking': {selected: false, inSelection: "true"},
      'yearlyFee': {selected: false, inSelection: 0},
    }
  },
  computed: {
    filteredCards: function () {
      let result = this.$store.state.cards.cards;

      if(!result|| result.length == 0 || !result.filter)
        return []

      const filterCard = function(property, compareValue) {
        return function(card) {
          if(compareValue instanceof Array) {
            return compareValue.indexOf(card[property]) != -1;
          }
          return card[property] == compareValue;
        }
      }

      for(var propertyName in this._data) {
        if(propertyName == "cards" || !this._data[propertyName].selected) {
        } else {
          result = result.filter(filterCard(propertyName, this._data[propertyName].inSelection));
        }
      }
      return result
    }
  }
};
