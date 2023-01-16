/* eslint-disable sort-keys */

export const i18nDirection: any = {
  de: 'Richtung',
  en: 'Direction',
  fr: 'Direction',
  it: 'Direzione',
};

export const i18nArrival: any = {
  de: 'Ankunft',
  en: 'Arrival',
  fr: 'Arrivée',
  it: 'Arrivo',
};

export const i18nAttention: any = {
  de: 'Achtung',
  en: 'Attention',
  fr: 'Attention',
  it: 'Attenzione',
};

export const i18nAvailableAtDepartingStation: any = {
  de: 'am Abfahrtsbahnhof verfügbar.',
  en: 'available at departure station.',
  fr: 'disponible à la gare de départ.',
  it: 'disponibile alla stazione di partenza.',
};

export const i18nBarrierFreeTravel: any = {
  de: 'Barrierefreies Reisen.',
  en: 'Barrier-free travel.',
  fr: 'Déplacements sans obstacles.',
  it: 'Viaggio senza barriere.',
};

export const i18nClass: any = {
  first: {
    de: 'Erste Klasse',
    en: 'First Class',
    fr: 'Première classe',
    it: 'Prima classe',
  },
  second: {
    de: 'Zweite Klasse',
    en: 'Second Class',
    fr: 'Deuxième classe',
    it: 'Seconda classe',
  },
};

export const i18nWagonLabel = (wagonNumber: number): any => ({
  de: `Wagen mit der Nummer ${wagonNumber}.`,
  en: `Train coach with the number ${wagonNumber}.`,
  fr: `Wagon de train avec numéro ${wagonNumber}.`,
  it: `Vagone del treno con il numero ${wagonNumber}.`,
});

export const i18nClosedCompartmentLabel = (wagonNumber: number): any => {
  if (wagonNumber) {
    return {
      de: `Geschlossener Wagen mit der Nummer ${wagonNumber}.`,
      en: `Closed train coach with the number ${wagonNumber}.`,
      fr: `Wagon de train fermé avec le numéro ${wagonNumber}.`,
      it: `Vagone del treno chiuso con il numero ${wagonNumber}.`,
    };
  }
  return {
    de: 'Geschlossener Zugwaggon.',
    en: 'Closed train coach.',
    fr: 'Wagon de train fermé.',
    it: 'Vagone del treno chiuso.',
  };
};

export const i18nLocomotiveLabel: any = {
  de: 'Lokomotive',
  en: 'Locomotive',
  fr: 'Locomotive',
  it: 'Locomotiva',
};

export const i18nBlockedPassage: any = {
  previous: {
    de: 'Kein Durchgang zum vorherigen Wagen.',
    en: 'No passage to the previous train coach.',
    fr: 'Pas de passage au wagon du train précédent.',
    it: 'Nessun passaggio allo vagone del treno precedente.',
  },
  next: {
    de: 'Kein Durchgang zum nächsten Wagen.',
    en: 'No passage to the next train coach.',
    fr: 'Pas de passage au wagon de train suivant.',
    it: 'Nessun passaggio allo vagone del treno successivo.',
  },
  both: {
    de: 'Kein Durchgang zum nächsten und vorherigen Wagen.',
    en: 'No passage to the next and previous train coach.',
    fr: 'Pas de passage au wagon de train suivant et précédent.',
    it: 'Nessun passaggio allo vagone del treno successivo e precedente',
  },
};

export const i18nAdditionalWagonInformationHeading: any = {
  de: 'Zusätzliche Wageninformation',
  en: 'Additional wagon information',
  fr: 'Informations supplémentaires sur les wagons',
  it: 'Informazioni aggiuntive sul vagone',
};

export const i18nConnectionsDepartOn: any = {
  de: 'Abfahrten am',
  en: 'Departures on',
  fr: 'Départs le',
  it: 'Partenze su',
};

export const i18nDayChange: any = {
  de: 'Tageswechsel',
  en: 'Change of day',
  fr: 'changement de jour',
  it: 'Cambio giorno',
};

export const i18nDeparture: any = {
  de: 'Abfahrt',
  en: 'Departure',
  fr: 'Départ',
  it: 'Partenza',
};

export const i18nDistance: any = {
  de: 'Distanz',
  en: 'Distance',
  fr: 'Distance',
  it: 'Distanza',
};

export const i18nDistanceMeter: any = {
  single: {
    long: {
      de: 'Meter',
      en: 'Meter',
      fr: 'mètre',
      it: 'Metro',
    },
    short: {
      de: 'm',
      en: 'm',
      fr: 'm',
      it: 'm',
    },
  },
  multiple: {
    long: {
      de: 'Meter',
      en: 'Meters',
      fr: 'mètres',
      it: 'Metri',
    },
    short: {
      de: 'm',
      en: 'm',
      fr: 'm',
      it: 'm',
    },
  },
};

export const i18nDurationSecond: any = {
  single: {
    long: {
      de: 'Sekunde',
      en: 'Second',
      fr: 'Seconde',
      it: 'Seconda',
    },
    short: {
      de: 's',
      en: 's',
      fr: 's',
      it: 's',
    },
  },
  multiple: {
    long: {
      de: 'Sekunden',
      en: 'Seconds',
      fr: 'Secondes',
      it: 'Secondi',
    },
    short: {
      de: 's',
      en: 's',
      fr: 's',
      it: 's',
    },
  },
};

export const i18nDurationMinute: any = {
  single: {
    long: {
      de: 'Minute',
      en: 'Minute',
      fr: 'Minute',
      it: 'Minuto',
    },
    short: {
      de: 'm',
      en: 'm',
      fr: 'm',
      it: 'm',
    },
  },
  multiple: {
    long: {
      de: 'Minuten',
      en: 'Minutes',
      fr: 'Minutes',
      it: 'Minuti',
    },
    short: {
      de: 'Min',
      en: 'min',
      fr: 'min.',
      it: 'mins',
    },
  },
};

export const i18nDurationHour: any = {
  single: {
    long: {
      de: 'Stunde',
      en: 'Hour',
      fr: 'Heure',
      it: 'Ora',
    },
    short: {
      de: 'Std.',
      en: 'h',
      fr: 'ore',
      it: 'hrs',
    },
  },
  multiple: {
    long: {
      de: 'Stunden',
      en: 'Hours',
      fr: 'Heures',
      it: 'Ore',
    },
    short: {
      de: 'Std.',
      en: 'h',
      fr: 'ore',
      it: 'hrs',
    },
  },
};

export const i18nEarlierConnections: any = {
  de: 'Frühere Verbindungen',
  en: 'Earlier connections',
  fr: 'Connexions antérieures',
  it: 'Collegamenti precedenti',
};

export const i18nFromPlatform: any = {
  long: {
    de: 'Von Gleis',
    en: 'from platform',
    fr: 'à partir de la voie',
    it: 'Dalla piattaforma',
  },
  short: {
    de: 'Gl.',
    en: 'Pl.',
    fr: 'Voie',
    it: 'Bin.',
  },
};

export const i18nFromStand: any = {
  long: {
    de: 'Von Kante',
    en: 'from Stand',
    fr: 'à partir de la Quai',
    it: 'Dalla Corsia',
  },
  short: {
    de: 'Kante',
    en: 'Stand',
    fr: 'Quai',
    it: 'Corsia.',
  },
};

export const i18nFromPier: any = {
  long: {
    de: 'Von Steg',
    en: 'from Pier',
    fr: 'à partir de la Imbarco',
    it: 'Dalla Corsia',
  },
  short: {
    de: 'Steg',
    en: 'Pier',
    fr: 'Quai',
    it: 'Imbarco.',
  },
};

export const i18nLaterConnections: any = {
  de: 'Spätere Verbindungen',
  en: 'Later connections',
  fr: 'Connexions ultérieures',
  it: 'Collegamenti successivi',
};

export const i18nNone: any = {
  de: 'Keine',
  en: 'None',
  fr: 'aucun',
  it: 'nessuno',
};

export const i18nOccupancy: any = {
  unknown: {
    de: 'Keine Belegungsprognose verfügbar.',
    en: 'No occupancy forecast available.',
    fr: "Aucune prévision d'occupation disponible.",
    it: 'Nessuna previsione di occupazione disponibile.',
  },
  low: {
    de: 'Tiefe bis mittlere Belegung erwartet.',
    en: 'Low to medium occupancy expected.',
    fr: "On s'attend à un taux d'occupation faible à moyen.",
    it: "Si prevede un'occupazione medio-bassa.",
  },
  medium: {
    de: 'Hohe Belegung erwartet.',
    en: 'High occupancy expected.',
    fr: "Un taux d'occupation élevé est attendu.",
    it: "Ci si aspetta un'alta occupazione.",
  },
  high: {
    de: 'Sehr hohe Belegung erwartet.',
    en: 'Very high occupancy expected.',
    fr: "Un taux d'occupation très élevé est attendu.",
    it: "Ci si aspetta un'occupazione molto alta.",
  },
};

export const i18nOptional: any = {
  de: '(optional)',
  en: '(optional)',
  fr: '(facultatif)',
  it: '(facoltativo)',
};

export const i18nShowOnMap: any = {
  de: 'Auf der Karte anzeigen',
  en: 'Show on the map',
  fr: 'Indiquer sur la carte',
  it: 'Visualizzare sulla carta',
};

export const i18nTargetOpensInNewWindow: any = {
  de: 'Linkziel öffnet in neuem Fenster.',
  en: 'Link target opens in new window.',
  fr: "Le lien s'ouvre dans une nouvelle fenêtre.",
  it: "L'obiettivo del link si apre in una nuova finestra.",
};

export const i18nXResultsAvailable = (resultsCount: number): any => ({
  de: `${resultsCount} Resultate verfügbar.`,
  en: `${resultsCount} results available.`,
  fr: `${resultsCount} résultats disponibles.`,
  it: `${resultsCount} sarà disponibile.`,
});

export const i18nUseArrowKeysToNavigate: any = {
  de: 'Verwenden Sie Pfeiltasten nach oben und unten, um zu navigieren.',
  en: 'Use up and down arrow keys to navigate.',
  fr: 'Utilisez les touches fléchées haut et bas pour naviguer.',
  it: 'Usa i tasti freccia su e giù per navigare.',
};
export const i18nWalk: any = {
  de: 'Fussweg',
  en: 'Walk',
  fr: 'Parcours à pied',
  it: 'Percorso a piedi',
};

export const i18nWalkingDistanceArrival: any = {
  de: 'Minuten Fussweg nach Ankunft:',
  en: 'minutes of walking time after arrival:',
  fr: 'minutes de trajet à pied après l’arrivée:',
  it: 'minuti a piedi all’arrivo:',
};

export const i18nWalkingDistanceDeparture: any = {
  de: 'Minuten Fussweg vor Abfahrt:',
  en: 'minutes of walking time before departure:',
  fr: 'minutes trajet à pied avant le départ:',
  it: 'minuti a piedi prima della partenza:',
};

export const i18nWalkingDistanceToDepartureStation: any = {
  de: 'Fussweg zum Abfahrtsbahnhof.',
  en: 'of walking distance to departing station.',
  fr: 'de distance à pied de la gare de départ.',
  it: 'di distanza a piedi dalla stazione di partenza.',
};

export const i18nCloseAlert: any = {
  de: 'Meldung schliessen',
  en: 'Close message',
  fr: 'Fermer message',
  it: 'Chiudere il messaggio',
};

export const i18nCloseDialog: any = {
  de: 'Übergelagertes Fenster schliessen',
  en: 'Close secondary window',
  fr: 'Fermer la fenêtre superposée',
  it: 'Chiudere la finestra sovrapposta',
};

export const i18nCloseNavigation: any = {
  de: 'Navigation schliessen',
  en: 'Close navigation',
  fr: 'Fermer la navigation',
  it: 'Chiudere la navigazione',
};

export const i18nCloseTooltip: any = {
  de: 'Hinweis schliessen',
  en: 'Close note',
  fr: 'Fermer la note',
  it: 'Chiudere la nota',
};

export const i18nGoBack: any = {
  de: 'Zurück',
  en: 'Go back',
  fr: 'Retourner',
  it: 'Vai indietro',
};

export const i18nFindOutMore: any = {
  de: 'Mehr erfahren',
  en: 'Find out more',
  fr: 'En savoir plus',
  it: 'Per saperne di più',
};

export const i18nToday: any = {
  de: 'Heute',
  en: 'Today',
  fr: 'Aujourd’hui',
  it: 'Oggi',
};

export const i18nTomorrow: any = {
  de: 'Morgen',
  en: 'Tomorrow',
  fr: 'Demain',
  it: 'Domani',
};

export const i18nConnectionFrom: any = {
  de: 'Verbindung von ',
  en: 'Connection from ',
  fr: 'Liaison de ',
  it: 'Collegamento da ',
};

export const i18nConnectionTo: any = {
  de: ' nach ',
  en: ' to ',
  fr: ' à ',
  it: ' a ',
};

export const i18nConnectionRoundtrip = (returnCity: string): any => ({
  de: ` und zurück nach ${returnCity}.`,
  en: ` and back to ${returnCity}.`,
  fr: ` et retour à ${returnCity}.`,
  it: ` e ritorno a ${returnCity}.`,
});
/* eslint-enable sort-keys */
