export interface CardOffer {
  title: string;
  description: string;
  endsAt: string;
}

export interface CreditExample {
  principal: number;
  borrowingRatePercent: number;
  borrowingRateType: 'fixed' | 'variable';
  aprPercent: number;
  termMonths?: number;
  assumedTermMonths?: number;
  installmentCount?: number | null;
  regularInstallment?: number | null;
  regularInstallmentCount?: number;
  finalInstallment?: number;
  totalPayable: number;
  interestCosts?: number;
  cardFeePerMonth?: number;
  totalIncludesCardFee?: boolean;
}

export interface CreditDisclosure {
  sourceUrl: string;
  checkedOn: string;
  example?: CreditExample;
  paragraphs: string[];
  notices: string[];
}

export interface Card {
  id: string;
  Issuer: string;
  scheme?: 'visa' | 'mastercard' | 'amex' | Array<'visa' | 'mastercard' | 'amex'>;
  Label?: string;
  notes?: string;
  legalnotes?: string;
  creditTermsUrl?: string;
  creditDisclosure?: CreditDisclosure;
  yearlyFee?: string | number;
  fees_pos_foreign?: string | number;
  fees_atm_foreign?: string | number;
  fees_atm_eur?: string | number;
  charge?: 'credit' | 'charge' | 'debit' | 'prepaid';
  withChecking?: boolean;
  applepay?: boolean;
  googlepay?: boolean;
  contactless?: boolean;
  insurance?: boolean;
  secure?: boolean;
  offlinepin?: boolean;
  offlinetrx?: boolean;
  pinfirst?: boolean;
  miles?: boolean;
  cashAdvanceImmediate?: boolean;
  cashAdvanceApr?: string | number;
  interestApr?: string | number;
  offer?: CardOffer;
  [key: string]: any; // Allow for other fields
}

export interface RatingProfile {
  key: string;
  sortValue: string;
  label: string;
  navLabel: string;
  title: string;
  description: string;
  route: string;
  staticSlug: string;
  matcher: (card: Card) => boolean;
  score: (card: Card) => number;
}
