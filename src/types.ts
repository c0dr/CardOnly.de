export interface Card {
  id: string;
  Issuer: string;
  Label?: string;
  notes?: string;
  legalnotes?: string;
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
