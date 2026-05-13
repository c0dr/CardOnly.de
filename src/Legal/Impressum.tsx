import React from 'react';

const Impressum: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900">Impressum</h1>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Angaben gemaess Paragraf 5 DDG</h2>
          <p className="mt-3 text-sm text-slate-700">
            Simon Schraeder<br />
            Auf der Steig 52<br />
            70376 Stuttgart<br />
            Deutschland
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Kontakt</h2>
          <p className="mt-3 text-sm text-slate-700">
            E-Mail: info@simon-schraeder.de<br />
            Telefon: +49 15678 750749
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Redaktionell Verantwortlicher</h2>
          <p className="mt-3 text-sm text-slate-700">Verantwortlich fuer journalistisch-redaktionelle Inhalte gemaess Paragraf 18 Abs. 2 MStV: Simon Schraeder, Anschrift wie oben.</p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Hinweis zu Partnerlinks</h2>
          <p className="mt-3 text-sm text-slate-700">
            Diese Website enthaelt Partnerlinks. Bei Abschluss ueber entsprechend gekennzeichnete Links kann eine Provision anfallen.
            Die Darstellung der Karten und Konditionen erfolgt davon unabhaengig.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Impressum;
