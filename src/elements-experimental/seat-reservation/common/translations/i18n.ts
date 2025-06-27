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
  // BASICS
  // CAPTION FOR SCREENREADER INSIDE WAGON
  COACH_TABLE_CAPTION: {
    de: 'Wagen _param0_ selektiert',
    en: 'en:Wagen _param0_ selektiert',
    fr: 'fr:Wagen _param0_ selektiert',
    it: 'it:Wagen _param0_ selektiert',
  },
  COACH_BLOCKED_TABLE_CAPTION: {
    de: 'Wagen _param0_ ist nicht betretbar. Navigieren Sie bitte zum nächsten verfügbaren Wagen',
    en: 'en:Wagen _param0_ ist nicht betretbar. Navigieren Sie bitte zum nächsten verfügbaren Wagen',
    fr: 'fr:Wagen _param0_ ist nicht betretbar. Navigieren Sie bitte zum nächsten verfügbaren Wagen',
    it: 'it:Wagen _param0_ ist nicht betretbar. Navigieren Sie bitte zum nächsten verfügbaren Wagen',
  },
  SEAT_RESERVATION_BEGIN: {
    de: 'Beginn der Grafische Sitzplatzreservierung',
    en: 'en:Beginn der Grafische Sitzplatzreservierung',
    fr: 'fr:Beginn der Grafische Sitzplatzreservierung',
    it: 'it:Beginn der Grafische Sitzplatzreservierung',
  },
  SEAT_RESERVATION_END: {
    de: 'Verlassen der Grafische Sitzplatzreservierung',
    en: 'en:Verlassen der Grafische Sitzplatzreservierung',
    fr: 'fr:Verlassen der Grafische Sitzplatzreservierung',
    it: 'it:Verlassen der Grafische Sitzplatzreservierung',
  },

  // NAVIGATION
  NAVIGATE_TO_COACH: {
    de: 'Navigiere zu Zugabteil _param0_',
    en: 'Navigate to train compartment _param0_',
    fr: 'Naviguer vers le compartiment de train _param0_',
    it: 'Naviga verso il compartimento del treno _param0_',
  },
  NAVIGATE_TO_COACH_SERVICE_CLASS_SUB: {
    de: ' mit _param0_ Abteil',
    en: 'en: mit _param0_ Abteil',
    fr: 'fr: mit _param0_ Abteil',
    it: 'it: mit _param0_ Abteil',
  },
  NAVIGATE_COACH_BLOCKED: {
    de: 'Zugabteil _param0_ ist nicht betretbar',
    en: 'en:Zugabteil _param0_ ist nicht betretbar',
    fr: 'fr:Zugabteil _param0_ ist nicht betretbar',
    it: 'it:Zugabteil _param0_ ist nicht betretbar',
  },
  SEAT_RESERVATION_NAVIGATION: {
    de: 'Sitzplatzreservierungsnavigation',
    en: 'Seat reservation Navigation',
    fr: 'Navigation pour la réservation de sièges',
    it: 'Navigazione per la prenotazione dei posti',
  },
  SERVICE_CLASS_FIRST: {
    de: 'erste Klasse',
    en: 'en:erste Klasse',
    fr: 'fr:erste Klasse',
    it: 'it:erste Klasse',
  },
  SERVICE_CLASS_SECOND: {
    de: 'zweite Klasse',
    en: 'en:zweite Klasse',
    fr: 'fr:zweite Klasse',
    it: 'it:zweite Klasse',
  },

  // NAVIGATION SERVICES ICONS AND SERVICE ICONS INSIDE WAGON
  BICYCLE: {
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
  BICYCLE_HIGH_ICON: {
    de: 'Velobereich',
    en: 'Velozone',
    fr: 'Véloparc',
    it: 'Veloparco',
  },
  BICYCLE_ICON: {
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
  BICYCLE_LOW_ICON: {
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
  BICYCLE_MIDDLE_ICON: {
    de: 'Velobereich',
    en: 'Velozone',
    fr: 'Véloparc',
    it: 'Veloparco',
  },
  BISTRO: {
    de: 'Bistro',
    en: 'Bistro',
    fr: 'Bistro',
    it: 'Bistrot',
  },
  BISTRO_ICON: {
    de: 'Bistro',
    en: 'Bistro',
    fr: 'Bistro',
    it: 'Bistrot',
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
  BUSINESS_ICON: {
    de: 'Businesszone',
    en: 'Businesszone',
    fr: "Zone d'affaires",
    it: 'Zona business',
  },
  COACH_PASSAGE: {
    de: 'Wagenübergang',
    en: 'Coach passage',
    fr: 'Passage de voiture',
    it: 'Passaggio carrozza',
  },
  EASY_ACCESS: {
    de: 'de:Easy access area for PRMs',
    en: 'Easy access area for PRMs',
    fr: 'fr:Easy access area for PRMs',
    it: 'it:Easy access area for PRMs',
  },
  EASY_ACCESS_AREA: {
    de: 'de:Easy access area for PRMs',
    en: 'Easy access area for PRMs',
    fr: 'fr:Easy access area for PRMs',
    it: 'it:Easy access area for PRMs',
  },
  EASY_ACCESS_ICON: {
    de: 'de:Easy access area for PRMs',
    en: 'Easy access area for PRMs',
    fr: 'fr:Easy access area for PRMs',
    it: 'it:Easy access area for PRMs',
  },
  ENTRY_EXIT: {
    de: 'Ausgang / Eingang',
    en: 'Exit/Entrance',
    fr: 'Sortie / Entrée',
    it: 'Uscita / Ingresso',
  },
  FAMILY: {
    de: 'Familienwagen',
    en: 'Family car',
    fr: 'Voiture familiale',
    it: 'Auto familiare',
  },
  LUGGAGE_AREA: {
    de: 'Gepäckzone',
    en: 'Luggage area',
    fr: 'Zone de bagages',
    it: 'Zona bagagli',
  },
  LUGGAGE_ICON: {
    de: 'Gepäckzone',
    en: 'Luggage area',
    fr: 'Zone de bagages',
    it: 'Zona bagagli',
  },
  MULTI_FUNCTION_AREA: {
    de: 'de:Multifunction area',
    en: 'en:Multifunction area',
    fr: 'fr:Multifunction area',
    it: 'it:Multifunction area',
  },
  MULTI_FUNCTION_ICON: {
    de: 'de:Multifunction area',
    en: 'en:Multifunction area',
    fr: 'fr:Multifunction area',
    it: 'it:Multifunction area',
  },
  PLAYGROUND_AREA: {
    de: 'Familienwagen',
    en: 'Family car',
    fr: 'Voiture familiale',
    it: 'Auto familiare',
  },
  PLAYGROUND_ICON: {
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
  PRAM_AREA: {
    de: 'Kinderwagenbereich',
    en: 'pram area',
    fr: 'zone pour poussettes',
    it: 'area per passeggini',
  },
  PRAM_ICON: {
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
  RESTAURANT_AREA: {
    de: 'Restaurant',
    en: 'Restaurant',
    fr: 'Restaurant',
    it: 'Ristorante',
  },
  RESTAURANT_ICON: {
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
  SILENCE_AREA_ICON: {
    de: 'Ruhezone',
    en: 'Silence area',
    fr: 'Zone de repos',
    it: 'Zona di riposo',
  },
  SILENCE_ICON: {
    de: 'Ruhezone',
    en: 'Silence area',
    fr: 'Zone de repos',
    it: 'Zona di riposo',
  },
  SKI_AREA: {
    de: 'Ski Bereich',
    en: 'en: Ski area',
    fr: 'fr:Ski area',
    it: 'it:Ski area',
  },
  SKI_ICON: {
    de: 'Ski Bereich',
    en: 'en: Ski area',
    fr: 'fr:Ski area',
    it: 'it:Ski area',
  },
  STAIR_AREA: {
    de: 'Treppenbereich',
    en: 'en: Stair area',
    fr: 'fr:Stair area',
    it: 'it:Stair area',
  },
  TOILET_AREA: {
    de: 'Toilettenbereich',
    en: 'en: Toilet area',
    fr: 'fr:Toilet area',
    it: 'it:Toilet area',
  },
  TOILET_ICON: {
    de: 'Toilettenbereich',
    en: 'en: Toilet area',
    fr: 'fr:Toilet area',
    it: 'it:Toilet area',
  },
  TOILET_WHEELCHAIR_AREA: {
    de: 'Rollstuhl Toilettenbereich',
    en: 'en: Wheelchair toilet area',
    fr: 'fr:Wheelchair toilet area',
    it: 'it:Wheelchair toilet area',
  },
  TOILET_WHEELCHAIR_ICON: {
    de: 'Rollstuhl Toilettenbereich',
    en: 'Wheelchair toilet area',
    fr: 'fr:Wheelchair toilet area',
    it: 'it:Wheelchair toilet area',
  },
  WARDROBE_AREA: {
    de: 'Garderobenbereich',
    en: 'en: Garderobenbereich',
    fr: 'fr: Garderobenbereich',
    it: 'it: Garderobenbereich',
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
  WHEELCHAIR_ICON: {
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

  //ADDITIONAL INFO FOR SEATS
  AISLE_SEAT: {
    de: 'Gangplatz',
    en: 'en: Aisle seat',
    fr: 'fr:Aisle seat',
    it: 'it:Aisle seat',
  },
  POWER: {
    de: 'Steckdose',
    en: 'Power socket',
    fr: 'Prise Électrique',
    it: 'Presa Elettrica',
  },
  TABLE: {
    de: 'Tisch',
    en: 'Table',
    fr: 'Table',
    it: 'Tavolo',
  },
  TABLE_RESTAURANT: {
    de: 'Tisch',
    en: 'Table',
    fr: 'Table',
    it: 'Tavolo',
  },
  WINDOW_SEAT: {
    de: 'Fensterplatz',
    en: 'Window seat',
    fr: 'Place Côté Fenêtre',
    it: 'Posto Finestrino',
  },

  //PLACE CONTROL ARIA LABEL
  PLACE_CONTROL_SEAT_FREE: {
    de: 'Sitzplatz Nummer _param0_ ist frei',
    en: 'Seat number _param0_ is free',
    fr: 'Le siège numéro _param0_ est libre',
    it: 'Il posto numero _param0_ è libero',
  },
  PLACE_CONTROL_SEAT_SELECTED: {
    de: 'Sitzplatz Nummer _param0_ ist ausgewählt',
    en: 'Seat number _param0_ is selected',
    fr: 'Le numéro de siège _param0_ est sélectionné',
    it: 'Il numero di posto _param0_ è selezionato',
  },
  PLACE_CONTROL_BICYCLE_FREE: {
    de: 'Fahrrad Platz Nummer _param0_ ist frei',
    en: 'Bike Seat number _param0_ is free',
    fr: 'Le siège de vélo numéro _param0_ est libre',
    it: 'Il posto bici numero _param0_ è libero',
  },
  PLACE_CONTROL_BICYCLE_SELECTED: {
    de: 'Fahrrad Platz Nummer _param0_ ist ausgewählt',
    en: 'Bike Seat number _param0_ is selected',
    fr: 'Le siège de vélo numéro _param0_ est sélectionné',
    it: 'Il sedile della bici numero _param0_ è selezionato',
  },
  PLACE_CONTROL_SEAT_RESTRICTED: {
    de: 'Sitzplatz nicht verfügbar',
    en: 'Seat not available',
    fr: 'Siège non disponible',
    it: 'Posto non disponibile',
  },
  PLACE_CONTROL_BICYCLE_RESTRICTED: {
    de: 'Fahrradplatz nicht verfügbar',
    en: 'Bike place not available',
    fr: 'Siège non disponible',
    it: 'Posto non disponibile',
  },
  PLACE_CONTROL_SEAT_ALLOCATED: {
    de: 'Sitzplatz _param0_ nicht verfügbar',
    en: 'Seat _param0_ not available',
    fr: 'Siège _param0_ non disponible',
    it: 'Posto _param0_ non disponibile',
  },
  PLACE_CONTROL_BICYCLE_ALLOCATED: {
    de: 'Fahrradplatz _param0_ nicht verfügbar',
    en: 'Bike place _param0_ not available',
    fr: 'Siège _param0_ non disponible',
    it: 'Posto _param0_ non disponibile',
  },
  PLACE_PROPERTY: {
    de: 'Platzeigenschaften',
    en: 'en:Platzeigenschaften',
    fr: 'fr:Platzeigenschaften',
    it: 'it:Platzeigenschaften',
  },
  COACH_AVAILABLE_SERVICES: {
    de: 'Verfügbare Services',
    en: 'en:Verfügbare Services',
    fr: 'fr:Verfügbare Services',
    it: 'it:Verfügbare Services',
  },

  // LEAVE EXAMPLE AT LAST POSITION
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
