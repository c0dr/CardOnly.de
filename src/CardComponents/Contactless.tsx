import React from 'react';
import ContactlessImage from '../img/contactless.svg';
import { Card } from '../types';

interface ContactlessProps {
  card: Card;
}

const Contactless: React.FC<ContactlessProps> = ({ card }) => {
  if (card.contactless) {
    return <img width="25px" alt="Contactless logo" src={ContactlessImage} />;
  }
  return null;
};

export default Contactless;
