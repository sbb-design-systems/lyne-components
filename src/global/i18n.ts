export const i18nDirection: Record<string, string> = {
  de: 'Richtung',
  en: 'Direction',
  fr: 'Direction',
  it: 'Direzione',
};

export const i18nArrival: Record<string, string> = {
  de: 'Ankunft',
  en: 'Arrival',
  fr: 'Arrivée',
  it: 'Arrivo',
};

export const i18nAttention: Record<string, string> = {
  de: 'Achtung',
  en: 'Attention',
  fr: 'Attention',
  it: 'Attenzione',
};

export const i18nAvailableAtDepartingStation: Record<string, string> = {
  de: 'am Abfahrtsbahnhof verfügbar.',
  en: 'available at departure station.',
  fr: 'disponible à la gare de départ.',
  it: 'disponibile alla stazione di partenza.',
};

export const i18nBarrierFreeTravel: Record<string, string> = {
  de: 'Barrierefreies Reisen.',
  en: 'Barrier-free travel.',
  fr: 'Déplacements sans obstacles.',
  it: 'Viaggio senza barriere.',
};

export const i18nSector: Record<string, string> = {
  de: 'Sektor',
  en: 'Sector',
  fr: 'Secteur',
  it: 'Settore',
};

export const i18nSectorShort: Record<string, string> = {
  de: 'Skt.',
  en: 'Sec.',
  fr: 'Sect.',
  it: 'Set.',
};

export const i18nClass: Record<string, Record<string, string>> = {
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

export const i18nTrain: Record<string, string> = {
  de: 'Zug',
  en: 'Train',
  fr: 'Train',
  it: 'Treno',
};

export const i18nTrains: Record<string, string> = {
  de: 'Züge',
  en: 'Trains',
  fr: 'Trains',
  it: 'Treni',
};

export const i18nWagonsLabel: Record<string, string> = {
  de: 'Wagen des Zuges',
  en: 'Coaches of the train',
  fr: 'Wagons de train',
  it: 'Carrozze del treno',
};

export const i18nWagonLabel: Record<string, string> = {
  de: 'Wagen',
  en: 'Train coach',
  fr: 'Wagon de train',
  it: 'Carrozza del treno',
};

export const i18nWagonLabelNumber: Record<string, string> = {
  de: `Nummer`,
  en: `Number`,
  fr: `Numéro`,
  it: `Numero`,
};

export const i18nClosedCompartmentLabel = (wagonNumber: number): Record<string, string> => {
  if (wagonNumber) {
    return {
      de: `Geschlossener Wagen mit der Nummer ${wagonNumber}`,
      en: `Closed train coach with the number ${wagonNumber}`,
      fr: `Wagon de train fermé avec le numéro ${wagonNumber}`,
      it: `Carrozza del treno chiuso con il numero ${wagonNumber}`,
    };
  }
  return {
    de: 'Geschlossener Zugwaggon',
    en: 'Closed train coach',
    fr: 'Wagon de train fermé',
    it: 'Carrozza del treno chiuso',
  };
};

export const i18nLocomotiveLabel: Record<string, string> = {
  de: 'Lokomotive',
  en: 'Locomotive',
  fr: 'Locomotive',
  it: 'Locomotiva',
};

export const i18nBlockedPassage: Record<string, Record<string, string>> = {
  previous: {
    de: 'Kein Durchgang zum vorherigen Wagen',
    en: 'No passage to the previous train coach',
    fr: 'Pas de passage au wagon du train précédent',
    it: 'Nessun passaggio alla carrozza del treno precedente',
  },
  next: {
    de: 'Kein Durchgang zum nächsten Wagen',
    en: 'No passage to the next train coach',
    fr: 'Pas de passage au wagon de train suivant',
    it: 'Nessun passaggio alla carrozza del treno successivo',
  },
  both: {
    de: 'Kein Durchgang zum nächsten und vorherigen Wagen',
    en: 'No passage to the next and previous train coach',
    fr: 'Pas de passage au wagon de train suivant et précédent',
    it: 'Nessun passaggio alla carrozza del treno successivo e precedente',
  },
};

export const i18nAdditionalWagonInformationHeading: Record<string, string> = {
  de: 'Zusätzliche Wageninformation',
  en: 'Additional wagon information',
  fr: 'Informations supplémentaires sur les wagons',
  it: 'Informazioni aggiuntive sulla carrozza del treno',
};

export const i18nConnectionsDepartOn: Record<string, string> = {
  de: 'Abfahrten am',
  en: 'Departures on',
  fr: 'Départs le',
  it: 'Partenze su',
};

export const i18nDayChange: Record<string, string> = {
  de: 'Tageswechsel',
  en: 'Change of day',
  fr: 'changement de jour',
  it: 'Cambio giorno',
};

export const i18nDeparture: Record<string, string> = {
  de: 'Abfahrt',
  en: 'Departure',
  fr: 'Départ',
  it: 'Partenza',
};

export const i18nDistanceMeter: Record<string, Record<string, Record<string, string>>> = {
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

export const i18nDurationMinute: Record<string, Record<string, Record<string, string>>> = {
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

export const i18nDurationHour: Record<string, Record<string, Record<string, string>>> = {
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

export const i18nDurationDay: Record<string, Record<string, Record<string, string>>> = {
  single: {
    long: {
      de: 'Tag',
      en: 'Day',
      fr: 'Jour',
      it: 'Giorno',
    },
  },
  multiple: {
    long: {
      de: 'Tage',
      en: 'Days',
      fr: 'Jours',
      it: 'Giorni',
    },
  },
};

export const i18nTripQuayChange: Record<string, string> = {
  de: 'Gleisänderung im Verlauf dieser Verbindung',
  en: 'Track change in the course of this connection',
  fr: 'Changement de voie sur le parcours de cette connexion',
  it: 'Cambiamento di binario nel corso di questa connessione',
};

export const i18nTripDuration: Record<string, string> = {
  de: 'Reisedauer',
  en: 'Travel time',
  fr: 'Durée du voyage',
  it: 'Durata del viaggio',
};

export const i18nTransferProcedures: Record<string, string> = {
  de: 'mal umsteigen',
  en: 'changes',
  fr: 'changement(s) de train',
  it: 'cambi',
};

export const i18nNew: Record<string, string> = {
  de: 'neu',
  en: 'new',
  fr: 'nouveau',
  it: 'nuovo',
};

export const i18nFromPlatform: Record<string, Record<string, string>> = {
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

export const i18nFromStand: Record<string, Record<string, string>> = {
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

export const i18nFromPier: Record<string, Record<string, string>> = {
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

export const i18nNone: Record<string, string> = {
  de: 'Keine',
  en: 'None',
  fr: 'aucun',
  it: 'nessuno',
};

export const i18nOccupancy: Record<string, Record<string, string>> = {
  unknown: {
    de: 'Keine Belegungsprognose verfügbar',
    en: 'No occupancy forecast available',
    fr: "Aucune prévision d'occupation disponible",
    it: 'Nessuna previsione di occupazione disponibile',
  },
  low: {
    de: 'Tiefe bis mittlere Belegung erwartet',
    en: 'Low to medium occupancy expected',
    fr: "On s'attend à un taux d'occupation faible à moyen",
    it: "Si prevede un'occupazione medio-bassa",
  },
  medium: {
    de: 'Hohe Belegung erwartet',
    en: 'High occupancy expected',
    fr: "Un taux d'occupation élevé est attendu",
    it: "Ci si aspetta un'alta occupazione",
  },
  high: {
    de: 'Sehr hohe Belegung erwartet',
    en: 'Very high occupancy expected',
    fr: "Un taux d'occupation très élevé est attendu",
    it: "Ci si aspetta un'occupazione molto alta",
  },
};

export const i18nMeansOfTransport: Record<string, Record<string, string>> = {
  funicular: {
    de: 'Seilbahn/Zahnradbahn',
    en: 'Funicular/Cog railway',
    fr: 'Funiculaire/Chemin de fer à crémaillère',
    it: 'Funivia/Ferrovia a cremagliera',
  },
  ec_id: {
    de: 'EC/IC',
    en: 'EC/IC',
    fr: 'EC/IC',
    it: 'EC/IC',
  },
  bus: {
    de: 'Bus',
    en: 'Bus',
    fr: 'Bus',
    it: 'Bus',
  },
  re: {
    de: 'RE',
    en: 'RE',
    fr: 'RE',
    it: 'RE',
  },
  arz_ext: {
    de: 'ARZ/EXT',
    en: 'ARZ/EXT',
    fr: 'ARZ/EXT',
    it: 'ARZ/EXT',
  },
  ice_tgv_rjx: {
    de: 'ICE/TGV/RJX',
    en: 'ICE/TGV/RJX',
    fr: 'ICE/TGV/RJX',
    it: 'ICE/TGV/RJX',
  },
  ir_pe: {
    de: 'IR/PE',
    en: 'IR/PE',
    fr: 'IR/PE',
    it: 'IR/PE',
  },
  s_sn_r: {
    de: 'S/SN/R',
    en: 'S/SN/R',
    fr: 'S/SN/R',
    it: 'S/SN/R',
  },
  tram: {
    de: 'Tram/Metro',
    en: 'Tramway/Underground',
    fr: 'Tram/Métro',
    it: 'Tram/Metro',
  },
  ship: {
    de: 'Schiff',
    en: 'Ship',
    fr: 'Bateau',
    it: 'Battello',
  },
  train: {
    de: 'Zug',
    en: 'Train',
    fr: 'Train',
    it: 'Treno',
  },
};

export const i18nOptional: Record<string, string> = {
  de: '(optional)',
  en: '(optional)',
  fr: '(facultatif)',
  it: '(facoltativo)',
};

export const i18nTargetOpensInNewWindow: Record<string, string> = {
  de: 'Linkziel öffnet in neuem Fenster.',
  en: 'Link target opens in new window.',
  fr: "Le lien s'ouvre dans une nouvelle fenêtre.",
  it: "L'obiettivo del link si apre in una nuova finestra.",
};

export const i18nWalkingDistanceArrival: Record<string, string> = {
  de: 'Minuten Fussweg nach Ankunft:',
  en: 'minutes of walking time after arrival:',
  fr: 'minutes de trajet à pied après l’arrivée:',
  it: 'minuti a piedi all’arrivo:',
};

export const i18nWalkingDistanceDeparture: Record<string, string> = {
  de: 'Minuten Fussweg vor Abfahrt:',
  en: 'minutes of walking time before departure:',
  fr: 'minutes trajet à pied avant le départ:',
  it: 'minuti a piedi prima della partenza:',
};

export const i18nWalkingDistanceToDepartureStation: Record<string, string> = {
  de: 'Fussweg zum Abfahrtsbahnhof.',
  en: 'of walking distance to departing station.',
  fr: 'de distance à pied de la gare de départ.',
  it: 'di distanza a piedi dalla stazione di partenza.',
};

export const i18nCloseAlert: Record<string, string> = {
  de: 'Meldung schliessen',
  en: 'Close message',
  fr: 'Fermer message',
  it: 'Chiudere il messaggio',
};

export const i18nCloseDialog: Record<string, string> = {
  de: 'Übergelagertes Fenster schliessen',
  en: 'Close secondary window',
  fr: 'Fermer la fenêtre superposée',
  it: 'Chiudere la finestra sovrapposta',
};

export const i18nCloseNavigation: Record<string, string> = {
  de: 'Navigation schliessen',
  en: 'Close navigation',
  fr: 'Fermer la navigation',
  it: 'Chiudere la navigazione',
};

export const i18nCloseTooltip: Record<string, string> = {
  de: 'Hinweis schliessen',
  en: 'Close note',
  fr: 'Fermer la note',
  it: 'Chiudere la nota',
};

export const i18nGoBack: Record<string, string> = {
  de: 'Zurück',
  en: 'Go back',
  fr: 'Retourner',
  it: 'Vai indietro',
};

export const i18nFindOutMore: Record<string, string> = {
  de: 'Mehr erfahren',
  en: 'Find out more',
  fr: 'En savoir plus',
  it: 'Per saperne di più',
};

export const i18nToday: Record<string, string> = {
  de: 'Heute',
  en: 'Today',
  fr: 'Aujourd’hui',
  it: 'Oggi',
};

export const i18nTomorrow: Record<string, string> = {
  de: 'Morgen',
  en: 'Tomorrow',
  fr: 'Demain',
  it: 'Domani',
};

export const i18nNextMonth: Record<string, string> = {
  de: 'Zum nächsten Monat wechseln',
  en: 'Change to the next month',
  fr: 'Passer au mois suivant',
  it: 'Passare al mese successivo',
};

export const i18nPreviousMonth: Record<string, string> = {
  de: 'Zum letzten Monat wechseln',
  en: 'Change to the previous month',
  fr: 'Passer au mois précédent',
  it: 'Passare al mese precedente',
};

export const i18nNextDay: Record<string, string> = {
  de: 'Nächster Tag',
  en: 'Next day',
  fr: 'Le prochain jour',
  it: 'Giorno successivo',
};

export const i18nPreviousDay: Record<string, string> = {
  de: 'Vorheriger Tag',
  en: 'Previous day',
  fr: 'Jour précédent',
  it: 'Giorno precedente',
};

export const i18nShowCalendar: Record<string, string> = {
  de: 'Kalender anzeigen',
  en: 'Show calendar',
  fr: 'Afficher le calendrier',
  it: 'Visualizzare calendario',
};

export const i18nDatePickerPlaceholder: Record<string, string> = {
  de: 'TT.MM.JJJJ',
  en: 'DD.MM.YYYY',
  fr: 'JJ.MM.AAAA',
  it: 'GG.MM.AAAA',
};

export const i18nConnectionFrom: Record<string, string> = {
  de: 'Verbindung von',
  en: 'Connection from',
  fr: 'Liaison de',
  it: 'Collegamento da',
};

export const i18nConnectionTo: Record<string, string> = {
  de: 'nach',
  en: 'to',
  fr: 'à',
  it: 'a',
};

export const i18nConnectionRoundtrip = (returnCity: string): Record<string, string> => ({
  de: `und zurück nach ${returnCity}.`,
  en: `and back to ${returnCity}.`,
  fr: `et retour à ${returnCity}.`,
  it: `e ritorno a ${returnCity}.`,
});

export const i18nExpanded: Record<string, string> = {
  de: 'erweitert',
  en: 'expanded',
  fr: 'est tiré',
  it: 'esapnso',
};

export const i18nCollapsed: Record<string, string> = {
  de: 'reduziert',
  en: 'collapsed',
  fr: 'condensé',
  it: 'compresso',
};

export const i18nMapContainerButtonLabel: Record<string, string> = {
  de: 'Karte zeigen',
  en: 'Show map',
  fr: 'Afficher la carte',
  it: 'Mostra la mappa',
};

export const i18nBreadcrumbEllipsisButtonLabel: Record<string, string> = {
  de: 'Mehr Breadcrumbs anzeigen',
  en: 'Show more breadcrumbs',
  fr: 'Afficher plus breadcrumbs',
  it: 'Mostra più breadcrumbs',
};
