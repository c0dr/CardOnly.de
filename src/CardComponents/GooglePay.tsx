import React from 'react';
import GooglePayImg from '../img/googlepay.svg';
import { Card } from '../types';

interface GooglePayProps {
  card: Card;
}

const GooglePay: React.FC<GooglePayProps> = ({ card }) => {
  if (card.googlepay) {
    return <img width="50px" alt="Google Pay logo" src={GooglePayImg} />;
  }
  return null;
};

export default GooglePay;
