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
  // COACH DECK LABEL DESCRIPTIONS
  SINGLE_DECK: {
    de: 'Einzeldeck',
    en: 'Single deck',
    fr: 'Étage unique',
    it: 'Piano singolo',
  },
  LOWER_DECK: {
    de: 'Unterdeck',
    en: 'Lower deck',
    fr: 'Salle basse',
    it: 'Sala bassa',
  },
  MIDDLE_DECK: {
    de: 'Mitteldeck',
    en: 'Middle deck',
    fr: 'Niveau du milieu',
    it: 'Livello centrale',
  },
  UPPER_DECK: {
    de: 'Oberdeck',
    en: 'Upper deck',
    fr: 'Salle haute',
    it: 'Sala alta',
  },
  // CAPTION FOR SCREENREADER INSIDE WAGON
  COACH_TABLE_CAPTION: {
    de: 'Wagen _param0_ selektiert',
    en: 'Coach _param0_ selected',
    fr: 'Voiture _param0_ sélectionnée',
    it: 'Carrozza _param0_ selezionata',
  },
  COACH_BLOCKED_TABLE_CAPTION: {
    de: 'Wagen _param0_ ist nicht betretbar. Navigieren Sie bitte zum nächsten verfügbaren Wagen',
    en: 'No access to coach _param0_. Please navigate to the next available coach',
    fr: 'La voiture _param0_ n’est pas accessible. Veuillez continuer jusqu’à la prochaine voiture disponible',
    it: 'La carrozza _param0_ non è accessibile. Naviga verso la prossima carrozza disponibile',
  },
  SEAT_RESERVATION_BEGIN: {
    de: 'Beginn der Grafische Sitzplatzreservierung',
    en: 'Start Graphic Seat Reservation',
    fr: 'Commencer la réservation graphique de places',
    it: 'Avvio della prenotazione grafica dei posti',
  },
  SEAT_RESERVATION_END: {
    de: 'Verlassen der Grafische Sitzplatzreservierung',
    en: 'Exit Graphic Seat Reservation',
    fr: 'Terminer la réservation graphique de places',
    it: 'Uscita dalla prenotazione grafica dei posti',
  },

  // NAVIGATION
  NAVIGATE_TO_COACH: {
    de: 'Navigiere zu Zugabteil _param0_',
    en: 'Navigate to train compartment _param0_',
    fr: 'Aller au compartiment _param0_',
    it: 'Naviga verso il compartimento del treno _param0_',
  },
  NAVIGATE_TO_COACH_SERVICE_CLASS_SUB: {
    de: ' mit _param0_ Abteil',
    en: ' with _param0_ compartment',
    fr: ' avec compartiment _param0_',
    it: ' con compartimento di _param0_',
  },
  NAVIGATE_COACH_BLOCKED: {
    de: 'Zugabteil _param0_ ist nicht betretbar',
    en: 'No access to train compartment _param0_',
    fr: 'Le compartiment _param0_ n’est pas accessible',
    it: 'Il compartimento del treno _param0_ non è accessibile',
  },
  SEAT_RESERVATION_NAVIGATION: {
    de: 'Sitzplatzreservierungsnavigation',
    en: 'Seat reservation navigation',
    fr: 'Navigation pour la réservation de places',
    it: 'Navigazione per la prenotazione dei posti',
  },
  COACH_AVAILABLE_NUMBER_OF_PLACES: {
    de: '_param0_ verfügbare Sitzplätze. _param1_ verfügbare Veloplätze.',
    en: '_param0_ seats available. _param1_ available bicycle spaces.',
    fr: '_param0_ places assises disponibles. _param1_ places pour vélos disponibles.',
    it: '_param0_ posti a sedere disponibili. _param1_ posti per biciclette disponibili.',
  },
  SERVICE_CLASS_FIRST: {
    de: 'erste Klasse',
    en: 'First class',
    fr: 'première classe',
    it: 'prima classe',
  },
  SERVICE_CLASS_SECOND: {
    de: 'zweite Klasse',
    en: 'Second class',
    fr: 'deuxième classe',
    it: 'seconda classe',
  },

  // NAVIGATION SERVICES ICONS AND SERVICE ICONS INSIDE WAGON
  BICYCLE: {
    de: 'Velobereich',
    en: 'Bike area',
    fr: 'Espace vélo',
    it: 'Area bici',
  },
  BICYCLE_HIGH: {
    de: 'Velobereich',
    en: 'Bike area',
    fr: 'Espace vélo',
    it: 'Area bici',
  },
  BICYCLE_HIGH_ICON: {
    de: 'Velobereich',
    en: 'Bike area',
    fr: 'Espace vélo',
    it: 'Area bici',
  },
  BICYCLE_ICON: {
    de: 'Velobereich',
    en: 'Bike area',
    fr: 'Espace vélo',
    it: 'Area bici',
  },
  BICYCLE_LOW: {
    de: 'Velobereich',
    en: 'Bike area',
    fr: 'Espace vélo',
    it: 'Area bici',
  },
  BICYCLE_LOW_ICON: {
    de: 'Velobereich',
    en: 'Bike area',
    fr: 'Espace vélo',
    it: 'Area bici',
  },
  BICYCLE_MIDDLE: {
    de: 'Velobereich',
    en: 'Bike area',
    fr: 'Espace vélo',
    it: 'Area bici',
  },
  BICYCLE_MIDDLE_ICON: {
    de: 'Velobereich',
    en: 'Bike area',
    fr: 'Espace vélo',
    it: 'Area bici',
  },
  BISTRO: {
    de: 'Bistro',
    en: 'Bistro',
    fr: 'Bistro',
    it: 'Bistro',
  },
  BISTRO_ICON: {
    de: 'Bistro',
    en: 'Bistro',
    fr: 'Bistro',
    it: 'Bistro',
  },
  BUSINESS: {
    de: 'Businesszone',
    en: 'Business zone',
    fr: 'Espace affaires',
    it: 'Zona business',
  },
  BUSINESS_COMFORT: {
    de: 'Businesszone',
    en: 'Business zone',
    fr: 'Espace affaires',
    it: 'Zona business',
  },
  BUSINESS_ICON: {
    de: 'Businesszone',
    en: 'Business zone',
    fr: 'Espace affaires',
    it: 'Zona business',
  },
  COACH_PASSAGE: {
    de: 'Wagenübergang',
    en: 'Inter-coach gangway',
    fr: 'Intercirculation',
    it: 'Passaggio intercomunicante',
  },
  EASY_ACCESS: {
    de: 'Zone für Reisende mit eingeschränkter Mobilität',
    en: 'Zone for travellers with reduced mobility',
    fr: 'Zone pour voyageurs à mobilité réduite',
    it: 'Zona viaggiatori a mobilità ridotta',
  },
  EASY_ACCESS_AREA: {
    de: 'Zone für Reisende mit eingeschränkter Mobilität',
    en: 'Zone for travellers with reduced mobility',
    fr: 'Zone pour voyageurs à mobilité réduite',
    it: 'Zona viaggiatori a mobilità ridotta',
  },
  EASY_ACCESS_ICON: {
    de: 'Zone für Reisende mit eingeschränkter Mobilität',
    en: 'Zone for travellers with reduced mobility',
    fr: 'Zone pour voyageurs à mobilité réduite',
    it: 'Zona viaggiatori a mobilità ridotta',
  },
  ENTRY_EXIT: {
    de: 'Ausgang / Eingang',
    en: 'Exit / entrance',
    fr: 'Sortie / Entrée',
    it: 'Uscita / Ingresso',
  },
  FAMILY: {
    de: 'Familienwagen',
    en: 'Family coach',
    fr: 'Voiture-familles',
    it: 'Carrozza famiglia',
  },
  LUGGAGE_AREA: {
    de: 'Gepäckzone',
    en: 'Luggage zone',
    fr: 'Espace bagages',
    it: 'Zona bagagli',
  },
  LUGGAGE_ICON: {
    de: 'Gepäckzone',
    en: 'Luggage zone',
    fr: 'Espace bagages',
    it: 'Zona bagagli',
  },
  MULTI_FUNCTION_AREA: {
    de: 'Multifunktionsbereich',
    en: 'Multifunction area',
    fr: 'Zone multifonctionnelle',
    it: 'Zona multifunzionale',
  },
  MULTI_FUNCTION_ICON: {
    de: 'Multifunktionsbereich',
    en: 'Multifunction area',
    fr: 'Zone multifonctionnelle',
    it: 'Zona multifunzionale',
  },
  PLAYGROUND_AREA: {
    de: 'Familienwagen',
    en: 'Family coach',
    fr: 'Voiture-familles',
    it: 'Carrozza famiglia',
  },
  PLAYGROUND_ICON: {
    de: 'Familienwagen',
    en: 'Family coach',
    fr: 'Voiture-familles',
    it: 'Carrozza famiglia',
  },
  PRAM: {
    de: 'Kinderwagenbereich',
    en: 'Pram/pushchair area',
    fr: 'Espace poussette',
    it: 'Area per passeggini',
  },
  PRAM_AREA: {
    de: 'Kinderwagenbereich',
    en: 'Pram/pushchair area',
    fr: 'Espace poussette',
    it: 'Area per passeggini',
  },
  PRAM_ICON: {
    de: 'Kinderwagenbereich',
    en: 'Pram/pushchair area',
    fr: 'Espace poussette',
    it: 'Area per passeggini',
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
    en: 'Quiet zone',
    fr: 'Espace silence',
    it: 'Zona del silenzio',
  },
  SILENCE_AREA_ICON: {
    de: 'Ruhezone',
    en: 'Quiet zone',
    fr: 'Espace silence',
    it: 'Zona del silenzio',
  },
  SILENCE_ICON: {
    de: 'Ruhezone',
    en: 'Quiet zone',
    fr: 'Espace silence',
    it: 'Zona del silenzio',
  },
  SKI_AREA: {
    de: 'Ski Bereich',
    en: 'Ski area',
    fr: 'Espace ski',
    it: 'Area sci',
  },
  SKI_ICON: {
    de: 'Ski Bereich',
    en: 'Ski area',
    fr: 'Espace ski',
    it: 'Area sci',
  },
  STAFF_AREA: {
    de: 'Zugpersonal',
    en: 'en:Zugpersonal',
    fr: 'fr:Zugpersonal',
    it: 'it:Zugpersonal',
  },
  STAIR_AREA: {
    de: 'Treppenbereich',
    en: 'Stair area',
    fr: 'Escalier',
    it: 'Area scale',
  },
  TOILET_AREA: {
    de: 'Toilettenbereich',
    en: 'Toilet area',
    fr: 'Toilettes',
    it: 'Area toilette',
  },
  TOILET_ICON: {
    de: 'Toilettenbereich',
    en: 'Toilet area',
    fr: 'Toilettes',
    it: 'Area toilette',
  },
  TOILET_WHEELCHAIR_AREA: {
    de: 'Rollstuhl Toilettenbereich',
    en: 'Wheelchair/toilet area',
    fr: 'Toilettes pour fauteuils roulants',
    it: 'Area toilette accessibile in sedia a rotelle',
  },
  TOILET_WHEELCHAIR_ICON: {
    de: 'Rollstuhl Toilettenbereich',
    en: 'Wheelchair/toilet area',
    fr: 'Toilettes pour fauteuils roulants',
    it: 'Area toilette accessibile in sedia a rotelle',
  },
  WARDROBE_AREA: {
    de: 'Garderobenbereich',
    en: 'Coat rack',
    fr: 'Espace vestiaire',
    it: 'Area guardaroba',
  },
  WHEELCHAIR: {
    de: 'Rollstuhlzone',
    en: 'Wheelchair zone',
    fr: 'Espace pour fauteuils roulants',
    it: 'Zona per sedie a rotelle',
  },
  WHEELCHAIR_AND_SEAT: {
    de: 'Rollstuhlzone',
    en: 'Wheelchair zone',
    fr: 'Espace pour fauteuils roulants',
    it: 'Zona per sedie a rotelle',
  },
  WHEELCHAIR_ICON: {
    de: 'Rollstuhlzone',
    en: 'Wheelchair zone',
    fr: 'Espace pour fauteuils roulants',
    it: 'Zona per sedie a rotelle',
  },
  WHEELCHAIR_NO_SEAT: {
    de: 'Rollstuhlzone',
    en: 'Wheelchair zone',
    fr: 'Espace pour fauteuils roulants',
    it: 'Zona per sedie a rotelle',
  },
  WIFI: {
    de: 'Gratis-Internet mit der App SBB FreeSurf',
    en: 'Free internet with the SBB FreeSurf app',
    fr: 'Internet gratuit avec l’appli FreeSurf CFF',
    it: 'Internet gratis con l’app FreeSurf FFS',
  },

  //ADDITIONAL INFO FOR SEATS
  AISLE_SEAT: {
    de: 'Gangplatz',
    en: 'Aisle seat',
    fr: 'Place côté couloir',
    it: 'Posto vicino al corridoio',
  },
  POWER: {
    de: 'Steckdose',
    en: 'Power socket',
    fr: 'Prise',
    it: 'Presa elettrica',
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
    fr: 'Place côté fenêtre',
    it: 'Posto al finestrino',
  },

  //PLACE CONTROL ARIA LABEL
  PLACE_CONTROL_SEAT_FREE: {
    de: 'Sitzplatz Nummer _param0_ ist frei',
    en: 'Seat number _param0_ is available',
    fr: 'La place numéro _param0_ est libre',
    it: 'Il posto a sedere numero _param0_ è libero',
  },
  PLACE_CONTROL_SEAT_SELECTED: {
    de: 'Sitzplatz Nummer _param0_ ist ausgewählt',
    en: 'Seat number _param0_ has been selected',
    fr: 'La place numéro _param0_ est sélectionnée',
    it: 'È selezionato il posto a sedere numero _param0_',
  },
  PLACE_CONTROL_BICYCLE_FREE: {
    de: 'Fahrrad Platz Nummer _param0_ ist frei',
    en: 'Bicycle space number _param0_ is available',
    fr: 'La place pour vélo numéro _param0_ est libre',
    it: 'Il posto per bici numero _param0_ è libero',
  },
  PLACE_CONTROL_BICYCLE_SELECTED: {
    de: 'Fahrrad Platz Nummer _param0_ ist ausgewählt',
    en: 'Bicycle space number _param0_ has been selected',
    fr: 'La place pour vélo numéro _param0_ est sélectionnée',
    it: 'È selezionato il posto per bici numero _param0_',
  },
  PLACE_CONTROL_SEAT_RESTRICTED: {
    de: 'Sitzplatz nicht verfügbar',
    en: 'Seat not available',
    fr: 'Place indisponible',
    it: 'Posto a sedere non disponibile',
  },
  PLACE_CONTROL_BICYCLE_RESTRICTED: {
    de: 'Fahrradplatz nicht verfügbar',
    en: 'Bicycle space not available',
    fr: 'Place pour vélo indisponible',
    it: 'Posto per bici non disponibile',
  },
  PLACE_CONTROL_SEAT_ALLOCATED: {
    de: 'Sitzplatz _param0_ nicht verfügbar',
    en: 'Seat _param0_ not available',
    fr: 'Place _param0_ indisponible',
    it: 'Posto a sedere _param0_ non disponibile',
  },
  PLACE_CONTROL_BICYCLE_ALLOCATED: {
    de: 'Fahrradplatz _param0_ nicht verfügbar',
    en: 'Bicycle space _param0_ not available',
    fr: 'Place pour vélo _param0_ indisponible',
    it: 'Posto per bici _param0_ non disponibile',
  },
  PLACE_PROPERTY: {
    de: 'Platzeigenschaften',
    en: 'Seat features',
    fr: 'Caractéristiques de la place',
    it: 'Caratteristiche del posto',
  },
  COACH_AVAILABLE_SERVICES: {
    de: 'Verfügbare Services',
    en: 'Available services',
    fr: 'Services disponibles',
    it: 'Servizi disponibili',
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
