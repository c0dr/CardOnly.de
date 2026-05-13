import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCardRating, getCardsForRatingProfile, ratingProfiles } from '../src/lib/cardRatings';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const siteUrl = (process.env.SITE_URL || 'https://cardonly.de').replace(/\/+$/, '');
const today = new Date().toISOString().slice(0, 10);

const chargeLabels: Record<string, string> = {
  charge: 'Charge',
  credit: 'Credit',
  debit: 'Debit',
  prepaid: 'Prepaid',
};

const isZeroLike = (value: any): boolean => {
  if (value === 0) {
    return true;
  }

  if (value === null || value === undefined || value === '') {
    return false;
  }

  if (typeof value === 'number') {
    return value <= 0;
  }

  const normalized = String(value)
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/,/g, '.');

  if (normalized.includes('gebuhrenfrei') || normalized.includes('gebührenfrei') || normalized.includes('kostenlos')) {
    return true;
  }

  if (/^0(\.0+)?(€|eur|euro)?ab100(€|eur|euro)?/.test(normalized)) {
    return true;
  }

  if (/^0(\.0+)?(%|eur|euro)?$/.test(normalized)) {
    return true;
  }

  return false;
};

const topicDefinitions = [
  {
    slug: 'good-for-miles',
    title: 'Kreditkarten gut fuer Meilen',
    description:
      'Auswahl von Kreditkarten mit Meilenprogramm laut CardOnly-Datensatz. Besonders relevant fuer Vielflieger und Bonusnutzer.',
    matcher: (card: any) => card.miles === true,
    ratingProfileKey: undefined,
  },
  {
    slug: 'good-for-ausland',
    title: 'Kreditkarten gut fuer Ausland',
    description:
      'Kreditkarten mit besonders guten Konditionen fuer Fremdwaehrung oder Bargeldabhebung ausserhalb Deutschlands.',
    matcher: (card: any) => isZeroLike(card.fees_atm_foreign) || isZeroLike(card.fees_pos_foreign),
    ratingProfileKey: undefined,
  },
  {
    slug: 'no-annual-fee',
    title: 'Kreditkarten ohne Jahresgebuehr',
    description:
      'Kreditkarten mit 0 EUR Jahresgebuehr laut hinterlegten Kartendaten.',
    matcher: (card: any) => isZeroLike(card.yearlyFee),
    ratingProfileKey: undefined,
  },
  ...ratingProfiles.map((profile) => ({
    slug: profile.staticSlug,
    title: profile.title,
    description: profile.description,
    matcher: profile.matcher,
    ratingProfileKey: profile.key,
  })),
];

const decodeEntities = (input: string) => {
  const value = String(input || '');
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
};

const stripHtml = (input: string) => decodeEntities(input).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const escapeHtml = (input: any) =>
  String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const slugify = (input: string) =>
  String(input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

const toAbsoluteUrl = (input: string) => {
  const value = String(input || '').trim();

  if (!value) {
    return '';
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith('//')) {
    return `https:${value}`;
  }

  return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
};

const asCurrency = (value: any) => {
  if (isZeroLike(value)) {
    return '0 EUR';
  }

  if (value === null || value === undefined || value === '' || value === 'null') {
    return 'Nicht angegeben';
  }

  if (typeof value === 'string') {
    const normalized = value.trim().replace(',', '.');
    if (/^-?\d+(\.\d+)?$/.test(normalized)) {
      return `${value.trim()} EUR`;
    }
  }

  return typeof value === 'number' ? `${value} EUR` : String(value);
};

const asText = (value: any) => {
  if (value === true) {
    return 'Ja';
  }

  if (value === false) {
    return 'Nein';
  }

  if (value === null || value === undefined || value === '' || value === 'null') {
    return 'Nicht angegeben';
  }

  return String(value);
};

const cardDescription = (card: any) => {
  const parts = [];

  if (isZeroLike(card.yearlyFee)) {
    parts.push('ohne Jahresgebuehr');
  }

  if (card.miles === true) {
    parts.push('mit Meilenprogramm');
  }

  if (isZeroLike(card.fees_pos_foreign) || isZeroLike(card.fees_atm_foreign)) {
    parts.push('geeignet fuer Auslandseinsatz');
  }

  const extras = parts.length > 0 ? ` (${parts.join(', ')})` : '';
  return `${card.Issuer} im CardOnly-Vergleich${extras}. Jahresgebuehr: ${asCurrency(card.yearlyFee)}. Kartentyp: ${chargeLabels[card.charge] || 'Karte'}.`;
};

const pageShell = ({ title, description, canonicalPath, bodyHtml, jsonLd }: any) => {
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CardOnly.de" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <style>
      :root {
        --bg: #f8fafc;
        --fg: #0f172a;
        --muted: #475569;
        --card: #ffffff;
        --border: #e2e8f0;
        --primary: #0f766e;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.55;
        color: var(--fg);
        background: radial-gradient(circle at top, #e2e8f0 0%, var(--bg) 28%);
      }
      .container {
        max-width: 980px;
        margin: 0 auto;
        padding: 24px 16px 48px;
      }
      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 18px;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
      }
      h1, h2 { line-height: 1.2; margin: 0 0 12px; }
      p { margin: 0 0 12px; color: var(--muted); }
      .topnav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 18px;
      }
      .topnav a,
      .button {
        display: inline-block;
        border-radius: 999px;
        border: 1px solid #cbd5e1;
        background: #fff;
        color: #0f172a;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        padding: 8px 14px;
      }
      .button.primary {
        background: var(--primary);
        border-color: var(--primary);
        color: #fff;
      }
      .stat-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 10px;
        margin-top: 12px;
      }
      .stat-grid .item {
        border: 1px solid var(--border);
        border-radius: 12px;
        background: #fff;
        padding: 10px;
      }
      .label {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #64748b;
      }
      .value {
        margin-top: 4px;
        color: #0f172a;
        font-weight: 600;
      }
      ul.link-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 10px;
      }
      .link-list a {
        color: #0f172a;
        text-decoration: none;
      }
      .link-list a:hover {
        text-decoration: underline;
      }
      .muted {
        font-size: 13px;
        color: #64748b;
      }
      .tag-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 10px 0 14px;
      }
      .tag {
        border-radius: 999px;
        background: #e2e8f0;
        color: #0f172a;
        font-size: 12px;
        font-weight: 700;
        padding: 4px 10px;
      }
      footer {
        margin-top: 20px;
        font-size: 13px;
        color: #64748b;
      }
    </style>
    ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
  </head>
  <body>
    <main class="container">
      ${bodyHtml}
      <footer>
        Datenquelle: <a href="${siteUrl}/data/cards.json">cards.json</a> · Letztes Update: ${today}
      </footer>
    </main>
  </body>
</html>`;
};

const createCardEntries = (cards: any[]) => {
  const seen = new Map<string, number>();

  return cards.map((card) => {
    const baseSlug = slugify(card.Issuer) || 'card';
    const count = seen.get(baseSlug) || 0;
    seen.set(baseSlug, count + 1);

    return {
      ...card,
      slug: count === 0 ? baseSlug : `${baseSlug}-${count + 1}`,
      imageUrl: toAbsoluteUrl(card.image),
      cardUrl: `${siteUrl}/card/${count === 0 ? baseSlug : `${baseSlug}-${count + 1}`}/`,
    };
  });
};

const createCardPage = (card: any, allTopics: any[]) => {
  const notes = [stripHtml(card.notes || ''), stripHtml(card.legalnotes || '')].filter(Boolean).join(' ');
  const title = `${card.Issuer} - Details und Konditionen | CardOnly.de`;
  const description = cardDescription(card);
  const topicTags = allTopics.filter((topic) => topic.cards.some((entry: any) => entry.slug === card.slug));

  const bodyHtml = `
    <nav class="topnav">
      <a href="/">Zur Startseite</a>
      <a href="/card/">Alle Karten</a>
      <a href="/topic/">Themen</a>
      <a href="/#/">Vergleichs-App</a>
    </nav>

    <article class="card">
      <h1>${escapeHtml(card.Issuer)}</h1>
      <p>${escapeHtml(description)}</p>

      <div class="tag-row">
        <span class="tag">${escapeHtml(chargeLabels[card.charge] || 'Karte')}</span>
        <span class="tag">${isZeroLike(card.yearlyFee) ? '0 EUR Jahresgebuehr' : `${escapeHtml(String(card.yearlyFee))} EUR/Jahr`}</span>
        <span class="tag">${card.withChecking ? 'mit Girokonto' : 'ohne Girokonto'}</span>
      </div>

      <div class="stat-grid">
        <div class="item"><div class="label">Jahresgebuehr</div><div class="value">${escapeHtml(asCurrency(card.yearlyFee))}</div></div>
        <div class="item"><div class="label">Bargeld Ausland</div><div class="value">${escapeHtml(asText(card.fees_atm_foreign))}</div></div>
        <div class="item"><div class="label">Zahlung Fremdwaehrung</div><div class="value">${escapeHtml(asText(card.fees_pos_foreign))}</div></div>
        <div class="item"><div class="label">Meilenprogramm</div><div class="value">${escapeHtml(asText(card.miles))}</div></div>
        <div class="item"><div class="label">Apple Pay</div><div class="value">${escapeHtml(asText(card.applepay))}</div></div>
        <div class="item"><div class="label">Google Pay</div><div class="value">${escapeHtml(asText(card.googlepay))}</div></div>
      </div>

      ${notes ? `<p style="margin-top:14px"><strong>Hinweise:</strong> ${escapeHtml(notes)}</p>` : ''}

      ${topicTags.length > 0 ? `<p style="margin-top:14px"><strong>Passende Themen:</strong> ${topicTags
        .map((topic) => `<a href="/topic/${topic.slug}/">${escapeHtml(topic.linkLabel)}</a>`)
        .join(' · ')}</p>` : ''}

      <p style="margin-top:16px">
        ${card.link ? `<a class="button primary" href="${escapeHtml(toAbsoluteUrl(card.link))}" rel="noopener noreferrer" target="_blank">Zur Anbieterseite</a>` : ''}
        <a class="button" href="/#/">Im interaktiven Vergleich ansehen</a>
      </p>
    </article>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreditCard',
    name: card.Issuer,
    description,
    url: card.cardUrl,
    image: card.imageUrl || undefined,
    provider: card.link
      ? {
          '@type': 'Organization',
          url: toAbsoluteUrl(card.link),
          name: card.Issuer,
        }
      : undefined,
    feesAndCommissionsSpecification: [
      {
        '@type': 'PriceSpecification',
        name: 'Jahresgebuehr',
        priceCurrency: 'EUR',
        price: typeof card.yearlyFee === 'number' ? card.yearlyFee : undefined,
      },
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Charge type',
        value: chargeLabels[card.charge] || 'Karte',
      },
      {
        '@type': 'PropertyValue',
        name: 'Meilenprogramm',
        value: asText(card.miles),
      },
      {
        '@type': 'PropertyValue',
        name: 'Fremdwaehrung',
        value: asText(card.fees_pos_foreign),
      },
    ],
  };

  return pageShell({
    title,
    description,
    canonicalPath: `/card/${card.slug}/`,
    bodyHtml,
    jsonLd,
  });
};

const createTopicPage = (topic: any) => {
  const title = `${topic.title} | CardOnly.de`;

  const itemsHtml =
    topic.cards.length === 0
      ? '<p>Derzeit gibt es in diesem Thema keine Karten.</p>'
      : `<ul class="link-list">${topic.cards
          .map((card: any) => {
            const rating = topic.ratingProfileKey ? getCardRating(card, topic.ratingProfileKey) : null;
            const ratingText = rating ? `Bewertung: ${rating.label} · ` : '';

            return `<li class="card"><a href="/card/${card.slug}/"><strong>${escapeHtml(card.Issuer)}</strong></a><p>${escapeHtml(
                cardDescription(card)
              )}</p><p class="muted">${escapeHtml(ratingText)}Jahresgebuehr: ${escapeHtml(asCurrency(card.yearlyFee))} · Ausland: ${escapeHtml(
                asText(card.fees_atm_foreign)
              )}</p></li>`;
          })
          .join('')}</ul>`;

  const bodyHtml = `
    <nav class="topnav">
      <a href="/">Zur Startseite</a>
      <a href="/topic/">Alle Themen</a>
      <a href="/card/">Alle Karten</a>
      <a href="/#/">Vergleichs-App</a>
    </nav>

    <section class="card">
      <h1>${escapeHtml(topic.title)}</h1>
      <p>${escapeHtml(topic.description)}</p>
      <p><strong>${topic.cards.length}</strong> Karten im Thema.</p>
    </section>

    <section style="margin-top:14px">${itemsHtml}</section>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: topic.title,
    description: topic.description,
    url: `${siteUrl}/topic/${topic.slug}/`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: topic.cards.length,
      itemListElement: topic.cards.map((card: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/card/${card.slug}/`,
        name: card.Issuer,
        description: topic.ratingProfileKey ? `CardOnly Bewertung: ${getCardRating(card, topic.ratingProfileKey).label}` : undefined,
      })),
    },
  };

  return pageShell({
    title,
    description: topic.description,
    canonicalPath: `/topic/${topic.slug}/`,
    bodyHtml,
    jsonLd,
  });
};

const createCardIndexPage = (cards: any[]) => {
  const bodyHtml = `
    <nav class="topnav">
      <a href="/">Zur Startseite</a>
      <a href="/topic/">Themenseiten</a>
      <a href="/#/">Vergleichs-App</a>
    </nav>

    <section class="card">
      <h1>Alle Kreditkarten im CardOnly-Datensatz</h1>
      <p>Alphabetische Uebersicht aller Karten mit eigener Detailseite.</p>
      <p><strong>${cards.length}</strong> Karten gelistet.</p>
    </section>

    <section style="margin-top:14px">
      <ul class="link-list">
        ${cards
          .map(
            (card) => `<li class="card"><a href="/card/${card.slug}/"><strong>${escapeHtml(card.Issuer)}</strong></a>
              <p class="muted">Jahresgebuehr: ${escapeHtml(asCurrency(card.yearlyFee))} · ${escapeHtml(
                chargeLabels[card.charge] || 'Karte'
              )}</p>
            </li>`
          )
          .join('')}
      </ul>
    </section>
  `;

  return pageShell({
    title: 'Alle Kreditkarten | CardOnly.de',
    description: `Alle ${cards.length} Karten aus dem CardOnly-Datensatz mit Detailseiten und Kernkonditionen.`,
    canonicalPath: '/card/',
    bodyHtml,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Alle Kreditkarten im CardOnly-Datensatz',
      url: `${siteUrl}/card/`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: cards.length,
        itemListElement: cards.map((card, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: card.Issuer,
          url: `${siteUrl}/card/${card.slug}/`,
        })),
      },
    },
  });
};

const createTopicIndexPage = (topics: any[]) => {
  const bodyHtml = `
    <nav class="topnav">
      <a href="/">Zur Startseite</a>
      <a href="/card/">Alle Karten</a>
      <a href="/#/">Vergleichs-App</a>
    </nav>

    <section class="card">
      <h1>Themenseiten fuer die Kartensuche</h1>
      <p>Diese Seiten clustern Karten nach typischen Suchintentionen.</p>
    </section>

    <section style="margin-top:14px">
      <ul class="link-list">
        ${topics
          .map(
            (topic) => `<li class="card"><a href="/topic/${topic.slug}/"><strong>${escapeHtml(topic.title)}</strong></a>
              <p>${escapeHtml(topic.description)}</p>
              <p class="muted">${topic.cards.length} Karten</p>
            </li>`
          )
          .join('')}
      </ul>
    </section>
  `;

  return pageShell({
    title: 'Themenseiten | CardOnly.de',
    description: 'Themencluster fuer Meilen, Ausland und Karten ohne Jahresgebuehr.',
    canonicalPath: '/topic/',
    bodyHtml,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Kreditkarten-Themenseiten',
      url: `${siteUrl}/topic/`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: topics.length,
        itemListElement: topics.map((topic, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: topic.title,
          url: `${siteUrl}/topic/${topic.slug}/`,
        })),
      },
    },
  });
};

const createSitemap = (cards: any[], topics: any[]) => {
  const urls = [
    '/',
    '/card/',
    '/topic/',
    ...cards.map((card) => `/card/${card.slug}/`),
    ...topics.map((topic) => `/topic/${topic.slug}/`),
  ];

  const entries = urls
    .map(
      (urlPath) => `  <url>\n    <loc>${siteUrl}${urlPath}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
};

const createLlmsTxt = (cards: any[], topics: any[]) => {
  const topicLines = topics.map((topic: any) => `- [${topic.title}](${siteUrl}/topic/${topic.slug}/)`).join('\n');

  return `# CardOnly.de\n> Unabhaengiger Kreditkartenvergleich fuer Deutschland mit strukturierten Kartendaten.\n\n## Einstieg\n- [Startseite](${siteUrl}/)\n- [Alle Karten](${siteUrl}/card/)\n- [Themenseiten](${siteUrl}/topic/)\n\n## Thema-Seiten\n${topicLines}\n\n## Datenquellen\n- [Karten-Datensatz (JSON)](${siteUrl}/data/cards.json)\n- [SEO/Agent-Index (JSON)](${siteUrl}/data/seo-index.json)\n- [Sitemap](${siteUrl}/sitemap.xml)\n- [Erweiterte LLM-Liste](${siteUrl}/llms-full.txt)\n`;
};

const createLlmsFullTxt = (cards: any[], topics: any[]) => {
  const topicBlock = topics
    .map((topic: any) => {
      const cardsInTopic = topic.cards.map((card: any) => `- [${card.Issuer}](${siteUrl}/card/${card.slug}/)`).join('\n');
      return `### ${topic.title}\n${cardsInTopic || '- Keine Karten'}\n`;
    })
    .join('\n');

  const cardBlock = cards
    .map(
      (card) =>
        `- [${card.Issuer}](${siteUrl}/card/${card.slug}/) | Jahresgebuehr: ${asCurrency(card.yearlyFee)} | Meilen: ${asText(
          card.miles
        )} | Ausland ATM: ${asText(card.fees_atm_foreign)} | Ausland POS: ${asText(card.fees_pos_foreign)}`
    )
    .join('\n');

  return `# CardOnly.de - Expanded LLM Index\n\n## Topics\n${topicBlock}\n## All Cards\n${cardBlock}\n`;
};

const createSeoJsonIndex = (cards: any[], topics: any[]) => {
  return {
    generatedAt: new Date().toISOString(),
    site: siteUrl,
    topics: topics.map((topic: any) => ({
      slug: topic.slug,
      title: topic.title,
      description: topic.description,
      url: `${siteUrl}/topic/${topic.slug}/`,
      cardCount: topic.cards.length,
      cards: topic.cards.map((card: any) => ({
        issuer: card.Issuer,
        slug: card.slug,
        url: `${siteUrl}/card/${card.slug}/`,
      })),
    })),
    cards: cards.map((card) => ({
      issuer: card.Issuer,
      slug: card.slug,
      url: `${siteUrl}/card/${card.slug}/`,
      yearlyFee: card.yearlyFee,
      charge: card.charge,
      miles: card.miles,
      withChecking: card.withChecking,
      feesAtmForeign: card.fees_atm_foreign,
      feesPosForeign: card.fees_pos_foreign,
      hasApplePay: card.applepay,
      hasGooglePay: card.googlepay,
      source: card.link || null,
    })),
  };
};

const writeFileSafe = async (relativePath: string, content: string) => {
  const targetPath = path.join(publicDir, relativePath);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, content, 'utf8');
};

const run = async () => {
  const rawCards = JSON.parse(await fs.readFile(path.join(publicDir, 'data', 'cards.json'), 'utf8'));

  const cardEntries = createCardEntries(rawCards).sort((a, b) => a.Issuer.localeCompare(b.Issuer, 'de'));

  const topics = topicDefinitions.map((definition) => ({
    ...definition,
    linkLabel: definition.title,
    cards: definition.ratingProfileKey
      ? getCardsForRatingProfile(cardEntries, definition.ratingProfileKey)
      : cardEntries.filter(definition.matcher).sort((a, b) => a.Issuer.localeCompare(b.Issuer, 'de')),
  }));

  await fs.rm(path.join(publicDir, 'card'), { recursive: true, force: true });
  await fs.rm(path.join(publicDir, 'topic'), { recursive: true, force: true });

  await writeFileSafe('card/index.html', createCardIndexPage(cardEntries));
  await writeFileSafe('topic/index.html', createTopicIndexPage(topics));

  for (const card of cardEntries) {
    await writeFileSafe(`card/${card.slug}/index.html`, createCardPage(card, topics));
  }

  for (const topic of topics) {
    await writeFileSafe(`topic/${topic.slug}/index.html`, createTopicPage(topic));
  }

  await writeFileSafe('sitemap.xml', createSitemap(cardEntries, topics));
  await writeFileSafe('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  await writeFileSafe('llms.txt', createLlmsTxt(cardEntries, topics));
  await writeFileSafe('llms-full.txt', createLlmsFullTxt(cardEntries, topics));
  await writeFileSafe('data/seo-index.json', JSON.stringify(createSeoJsonIndex(cardEntries, topics), null, 2) + '\n');

  console.log(
    `Generated SEO assets for ${cardEntries.length} cards and ${topics.length} topics in ${path.relative(
      rootDir,
      publicDir
    )}.`
  );
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
