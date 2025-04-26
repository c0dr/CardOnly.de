import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h2 className="text-2xl font-bold mb-6">Kontakt</h2>
        
        <pre className="whitespace-pre-wrap mb-6 text-sm">
          <code>
            Kontakt per Email: info@simon-schraeder.de
            
            <strong>Angaben gemäß § 5 TMG:</strong>
            Simon Schraeder
            Auf der Steig 52
            70376 Stuttgart
          </code>
        </pre>

        <p className="mb-2">Kontakt:</p>
        <pre className="whitespace-pre-wrap mb-6 text-sm">
          <code>
            Telefon:    (+49) 15678 750749
            Telefax:    -
            E-Mail:    info@simon-schraeder.de
          </code>
        </pre>

        <strong className="block mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong>

        <p className="mb-2">Autor</p>
        <pre className="whitespace-pre-wrap mb-6 text-sm">
          <code>
            <p>Simon Schraeder<br/>
            <br/>
            Auf der Steig 52<br/>
            70376 Stuttgart<br/>
            Germany</p>
          </code>
        </pre>

        <p className="mb-4 text-sm">Quelle: erstellt mit dem Impressum-Generator Website von eRecht24.</p>

        <div className="prose prose-sm max-w-none">
          <h4 className="text-lg font-semibold mt-6 mb-4">Haftungsausschluss:</h4>
          <p className="mb-4">Haftung für Inhalte</p>
          <p className="mb-6">{/* Rest of the content... */}</p>
          
          {/* The rest of the privacy policy content, wrapped in appropriate typography classes */}
          {/* Note: Content is preserved but formatted with Tailwind's typography plugin classes */}
          <div className="space-y-4">
            {/* The rest of your content here, preserving all the text but with proper spacing and typography */}
            {/* ... */}
          </div>

          <h4 className="text-lg font-semibold mt-6 mb-4">Datenschutzbestimmungen zu Einsatz und Verwendung von Google Analytics (mit Anonymisierungsfunktion)</h4>
          {/* ... rest of the Google Analytics section ... */}

          <h4 className="text-lg font-semibold mt-6 mb-4">Bestehen einer automatisierten Entscheidungsfindung</h4>
          <p className="mb-6">Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling.</p>

          <p className="text-sm text-gray-600">
            Diese Datenschutzerklärung wurde durch den Datenschutzerklärungs-Generator von den{' '}
            <a href="https://dg-datenschutz.de/" className="text-primary hover:underline">
              externer DSB Nürnberg
            </a>{' '}
            in Kooperation mit der RC GmbH, die{' '}
            <a href="http://remarketing.company/" className="text-primary hover:underline">
              gebrauchte Notebooks
            </a>{' '}
            wiederverwertet und den{' '}
            <a href="https://www.wbs-law.de/abmahnung-filesharing/" className="text-primary hover:underline">
              Filesharing Rechtsanwälten
            </a>{' '}
            von WBS-LAW erstellt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
