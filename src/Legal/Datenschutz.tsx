import React from 'react';

const Datenschutz: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900">Datenschutzerklaerung</h1>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">1. Verantwortlicher</h2>
          <p className="mt-3 text-sm text-slate-700">
            Simon Schraeder, Auf der Steig 52, 70376 Stuttgart, Deutschland<br />
            E-Mail: info@simon-schraeder.de
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">2. Zugriffsdaten (Server-Logfiles)</h2>
          <p className="mt-3 text-sm text-slate-700">
            Beim Aufruf der Website verarbeitet der Hosting-Provider technisch erforderliche Daten (z. B. IP-Adresse, Datum/Uhrzeit,
            angefragte Ressource, User-Agent), um den Betrieb, die Sicherheit und die Fehleranalyse zu ermoeglichen.
            Rechtsgrundlage ist Paragraf 25 Abs. 2 Nr. 2 TDDDG und Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">3. Hosting und Infrastruktur (Vercel und Cloudflare)</h2>
          <p className="mt-3 text-sm text-slate-700">
            Diese Website wird ueber Vercel gehostet. Zusaetzlich wird Cloudflare fuer Infrastrukturaufgaben wie DNS,
            Auslieferung, Stabilitaet und Sicherheitsfunktionen eingesetzt. Dabei koennen technisch notwendige Verbindungs-
            und Protokolldaten verarbeitet werden.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer und stabiler Betrieb der Website) sowie,
            soweit erforderlich, Paragraf 25 Abs. 2 Nr. 2 TDDDG.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">4. Cookies und Einwilligung</h2>
          <p className="mt-3 text-sm text-slate-700">
            Nicht technisch notwendige Cookies und Tracking werden erst nach Einwilligung gesetzt.
            Ihre Entscheidung koennen Sie jederzeit ueber den Link "Cookie-Einstellungen" im Footer aendern.
            Rechtsgrundlage fuer die Speicherung/den Zugriff ist Paragraf 25 Abs. 1 TDDDG; fuer nachgelagerte Verarbeitung Art. 6 Abs. 1 lit. a DSGVO.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">5. Google Analytics (nur nach Einwilligung)</h2>
          <p className="mt-3 text-sm text-slate-700">
            Google Analytics wird nur aktiviert, wenn Sie dem Tracking aktiv zustimmen (Opt-in im Cookie-Banner bzw.
            ueber Cookie-Einstellungen). Ohne Einwilligung wird Google Analytics nicht geladen.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            Bei aktivierter Einwilligung koennen Cookies gesetzt und Nutzungsdaten zur Reichweitenmessung verarbeitet werden.
            IP-Anonymisierung ist aktiviert. Anbieter ist Google Ireland Limited.
            Eine Datenuebermittlung in Drittstaaten (insbesondere USA) kann nicht ausgeschlossen werden.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Weitere Informationen:
            {' '}
            <a className="text-primary hover:underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              Google Datenschutzhinweise
            </a>
            .
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">6. Partnerlinks und Verguetung</h2>
          <p className="mt-3 text-sm text-slate-700">
            Diese Website enthaelt gekennzeichnete Partnerlinks. Beim Aufruf oder Abschluss ueber solche Links kann eine Verguetung
            durch den jeweiligen Anbieter erfolgen. Dabei kann der Anbieter eigene Tracking-Mechanismen einsetzen.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (wirtschaftlicher Betrieb der Website) bzw. Art. 6 Abs. 1 lit. a DSGVO,
            sofern eine Einwilligung erforderlich ist.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">7. Speicherdauer</h2>
          <p className="mt-3 text-sm text-slate-700">
            Wir speichern personenbezogene Daten nur so lange, wie dies fuer die genannten Zwecke erforderlich ist oder gesetzliche
            Aufbewahrungspflichten bestehen.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">8. Ihre Rechte</h2>
          <p className="mt-3 text-sm text-slate-700">
            Sie haben insbesondere das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung,
            Datenuertragbarkeit sowie Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            Einwilligungen koennen Sie jederzeit mit Wirkung fuer die Zukunft widerrufen.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            Zudem haben Sie ein Beschwerderecht bei einer Datenschutzaufsichtsbehoerde.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">9. Stand</h2>
          <p className="mt-3 text-sm text-slate-700">Stand dieser Datenschutzerklaerung: 7. Maerz 2026.</p>
        </section>
      </div>
    </div>
  );
};

export default Datenschutz;
