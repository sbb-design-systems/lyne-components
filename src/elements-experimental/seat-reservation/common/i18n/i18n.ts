/**
 * Translations regarding Seat-Reservation.
 * the first parameter is the requested key in the context of the call and the second
 * parameter is the language key.
 * There is an optional third array parameter where additional parameters to the string can be
 * attached.
 *
 * @Usage:
 * const labelStr = getI18nSeatReservation('KEY_FOR_NAVIGATION_LABEL', this._language.current); or
 * const labelStr = getI18nSeatReservation('KEY_FOR_NAVIGATION_LABEL', this._language.current, ['real text', 334]);*/

const i18nObjects: Record<string, Record<string, string>> = {
  //BASICS
  LIST_ALL_COACHES: {
    de: "Liste aller Wagen mit reservierbaren Plätzen. Sie können die Tastennavigation aktivieren, indem Sie die 's'-Taste drücken, und dann können Sie mit den Pfeiltasten zwischen den Sitzen des Wagens navigieren.",
    en: "List of all coaches with reservable places. You can activate key navigation by pressing the 's' key, then you can navigate by arrow keys between the seats of the coach.",
    fr: "Liste de tous les wagons avec des places réservables. Vous pouvez activer la navigation par touches en appuyant sur la touche 's', puis vous pouvez naviguer avec les flèches entre les sièges du wagon.",
    it: "Elenco di tutti i vagoni con posti riservabili. Puoi attivare la navigazione con tasti premendo il tasto 's', poi puoi navigare tra i posti del vagone con i tasti freccia.",
  },
  LUGGAGE_AREA: {
    de: 'Gepäckzone',
    en: 'Luggage area',
    fr: 'Zone de bagages',
    it: 'Zona bagagli',
  },
  ENTRY_EXIT: {
    de: 'Ausgang / Eingang',
    en: 'Exit/Entrance',
    fr: 'Sortie / Entrée',
    it: 'Uscita / Ingresso',
  },
  COACH_PASSAGE: {
    de: 'Wagenübergang',
    en: 'Coach passage',
    fr: 'Passage de voiture',
    it: 'Passaggio carrozza',
  },
  SERVICE_WHEELCHAIR_ICON: {
    de: 'Rollstuhl',
    en: 'wheelchair',
    fr: 'fauteuil roulant',
    it: 'sedia a rotelle',
  },
  //NAVIGATION
  SEAT_RESERVATION_NAVIGATION: {
    de: 'Sitzplatzreservierungsnavigation',
    en: 'Seat reservation Navigation',
    fr: 'Navigation pour la réservation de sièges',
    it: 'Navigazione per la prenotazione dei posti',
  },
  NAVIGATE_TO_COACH: {
    de: 'Navigiere zu Zugabteil _param0_',
    en: 'Navigate to train compartment _param0_',
    fr: 'Naviguer vers le compartiment de train _param0_',
    it: 'Naviga verso il compartimento del treno _param0_',
  },
  //NAVIGATION ICONS
  BICYCLE: {
    de: 'Velobereich',
    en: 'Velozone',
    fr: 'Véloparc',
    it: 'Veloparco',
  },
  BICYCLE_LOW: {
    de: 'Velobereich',
    en: 'Velozone',
    fr: 'Véloparc',
    it: 'Veloparco',
  },
  BICYCLE_MIDDLE: {
    de: 'Velobereich',
    en: 'Velozone',
    fr: 'Véloparc',
    it: 'Veloparco',
  },
  BICYCLE_HIGH: {
    de: 'Velobereich',
    en: 'Velozone',
    fr: 'Véloparc',
    it: 'Veloparco',
  },
  BISTRO: {
    de: 'Bistro',
    en: 'Bistro',
    fr: 'Bistro',
    it: 'bistrò',
  },
  BUSINESS: {
    de: 'Businesszone',
    en: 'Businesszone',
    fr: "Zone d'affaires",
    it: 'Zona business',
  },
  BUSINESS_COMFORT: {
    de: 'Businesszone',
    en: 'Businesszone',
    fr: "Zone d'affaires",
    it: 'Zona business',
  },
  FAMILY: {
    de: 'Familienwagen',
    en: 'Family car',
    fr: 'Voiture familiale',
    it: 'Auto familiare',
  },
  PRAM: {
    de: 'Kinderwagenbereich',
    en: 'pram area',
    fr: 'zone pour poussettes',
    it: 'area per passeggini',
  },
  RESTAURANT: {
    de: 'Restaurant',
    en: 'Restaurant',
    fr: 'Restaurant',
    it: 'Ristorante',
  },
  SILENCE: {
    de: 'Ruhezone',
    en: 'Silence area',
    fr: 'Zone de repos',
    it: 'Zona di riposo',
  },
  WHEELCHAIR: {
    de: 'Rollstuhlzone',
    en: 'Wheelchairzone',
    fr: 'Zone pour fauteuils roulants',
    it: 'Zona per disabili',
  },
  WHEELCHAIR_AND_SEAT: {
    de: 'Rollstuhlzone',
    en: 'Wheelchairzone',
    fr: 'Zone pour fauteuils roulants',
    it: 'Zona per disabili',
  },
  WHEELCHAIR_NO_SEAT: {
    de: 'Rollstuhlzone',
    en: 'Wheelchairzone',
    fr: 'Zone pour fauteuils roulants',
    it: 'Zona per disabili',
  },
  WIFI: {
    de: 'Gratis-Internet mit der App SBB FreeSurf',
    en: 'Free internet with the SBB FreeSurf app',
    fr: "Internet gratuit avec l'application SBB FreeSurf",
    it: "Internet gratuito con l'app SBB FreeSurf",
  },
  EXAMPLE_WITH_PARAMS_DO_NOT_USE: {
    de: 'Test mit Parametern: _param0_ und _param1_',
    en: 'Test with parameters: _param0_ and _param1_',
    fr: 'Test avec paramètres: _param0_ et _param1_',
    it: 'Test con parametri: _param0_ e _param1_',
  },
};

/**
 * get the translated message with key being the requested key and language the current
 * language mostly used from SbbLanguageController
 * @param key
 * @param language
 * @param args
 */
export const getI18nSeatReservation = (key: string, language: string, args?: any[]): string => {
  const innerValue = i18nObjects[key]?.[language] || '';

  return args
    ? args.reduce((value, param, index) => value.replace(`_param${index}_`, param), innerValue)
    : innerValue;
};
