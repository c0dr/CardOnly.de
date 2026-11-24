import React from 'react';
import { getRatingProfile, getScoreMethodology, scoreMethodNotes } from '../lib/cardRatings';

const ScoreMethodology: React.FC<{ profileKey?: string }> = ({ profileKey = 'overall' }) => (
  <details className="my-4 rounded-lg border border-border bg-card p-4 text-sm leading-6">
    <summary className="cursor-pointer font-semibold text-foreground">
      So berechnen wir den CardOnly-Score: {getRatingProfile(profileKey).navLabel}
    </summary>
    <dl className="mt-4 grid gap-4 sm:grid-cols-2">
      {getScoreMethodology(profileKey).map((metric) => (
        <div key={metric.key}>
          <dt className="font-semibold">{metric.label}: maximal {metric.points} Punkte</dt>
          <dd className="text-muted-foreground">{metric.explanation}</dd>
        </div>
      ))}
    </dl>
    {scoreMethodNotes.map((note) => <p key={note} className="mt-3 text-muted-foreground">{note}</p>)}
  </details>
);

export default ScoreMethodology;
