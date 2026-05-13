import React from 'react';
import ApplePayImg from '../img/applepay.svg';
import { Card } from '../types';

interface ApplePayProps {
  card: Card;
}

const ApplePay: React.FC<ApplePayProps> = ({ card }) => {
  if (card.applepay) {
    return <img width="50px" alt="Apple Pay logo" src={ApplePayImg} />;
  }
  return null;
};

export default ApplePay;
