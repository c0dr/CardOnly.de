export interface TopicPage {
  key: string;
  label: string;
  description: string;
  path: string;
}

export const topicPages: TopicPage[] = [
  {
    key: 'good-for-miles',
    label: 'Gut fuer Meilen',
    description: 'Karten mit Meilenprogramm',
    path: '/topic/good-for-miles/',
  },
  {
    key: 'good-for-ausland',
    label: 'Gut fuer Ausland',
    description: 'Karten mit starken Auslandskonditionen',
    path: '/topic/good-for-ausland/',
  },
  {
    key: 'no-annual-fee',
    label: 'Keine Jahresgebuehr',
    description: 'Karten ohne Fixkosten pro Jahr',
    path: '/topic/no-annual-fee/',
  },
  {
    key: 'best-credit-cards',
    label: 'Beste Kreditkarten',
    description: 'Karten nach CardOnly Bewertung',
    path: '/topic/best-credit-cards/',
  },
  {
    key: 'best-for-cashback',
    label: 'Beste fuer Cashback',
    description: 'Karten mit Cashback-, Punkte- oder Meilenwert',
    path: '/topic/best-for-cashback/',
  },
  {
    key: 'best-for-atm-outside-europe',
    label: 'Beste fuer ATM ausserhalb Europas',
    description: 'Karten fuer Bargeldabhebungen ausserhalb des Euroraums',
    path: '/topic/best-for-atm-outside-europe/',
  },
  {
    key: 'best-free-cards',
    label: 'Beste kostenlose Karten',
    description: 'Kostenlose Karten nach Gesamtpaket',
    path: '/topic/best-free-cards/',
  },
];

export const createCardSlug = (issuer: string): string =>
  String(issuer || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

export const getCardDetailPath = (issuer: string): string => `/card/${createCardSlug(issuer)}/`;
