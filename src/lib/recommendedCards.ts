export interface RecommendedCardProfile {
  issuer: string;
  category: string;
  summary: string;
}

export const recommendedCardProfiles: RecommendedCardProfile[] = [
  {
    issuer: 'Bank Norwegian',
    category: 'Reise',
    summary: '0 € Jahresgebühr, Reiseversicherung. Bargeld wird sofort verzinst.',
  },
  {
    issuer: 'Advanzia Mastercard Gold',
    category: 'Ohne Jahresgebühr',
    summary: 'Gute Option für gebührenarmes Bezahlen und Abheben.',
  },
  {
    issuer: 'American Express Payback',
    category: 'Bonusprogramm',
    summary: 'Punkte sammeln im Alltag.',
  },
];

export const recommendedIssuers: string[] = recommendedCardProfiles.map((profile) => profile.issuer);

export const getRecommendedCardProfile = (issuer: string): RecommendedCardProfile | null =>
  recommendedCardProfiles.find((profile) => profile.issuer === issuer) || null;
