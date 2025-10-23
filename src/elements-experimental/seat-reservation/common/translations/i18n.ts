/**
 * Returns the translation for a seat reservation string based on a key and language.
 * Supports nested keys (e.g. "PLACE_PROPERTIES.AISLE_SEAT") and placeholder replacement.
 *
 * @param key The translation key (can be nested, e.g. "PLACE_PROPERTIES.AISLE_SEAT").
 * @param language The desired language (e.g. "de", "en", "fr", "it").
 * @param args Optional array of parameters to replace placeholders like _param0_, _param1_ in the translation string.
 * @returns The translated string or an empty string if no translation is found.
 *
 * @example
 * getI18nSeatReservation('COACH_TABLE_CAPTION', 'de', ['12']); // "Wagen 12 selektiert"
 * getI18nSeatReservation('PLACE_PROPERTIES.AISLE_SEAT', 'en'); // "Aisle seat"
 */

// entry for all 4 translations: key: {de: '...', en: '...', fr: '...', it: '...'}
interface I18nEntry {
  [language: string]: string;
}

interface I18nObjects {
  [key: string]: I18nEntry | { [subKey: string]: I18nEntry };
}

const i18nObjects: I18nObjects = {
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
    de: 'Navigiere zu Wagen _param0_',
    en: 'Navigate to coach _param0_',
    fr: 'Aller à la voiture _param0_',
    it: 'Naviga verso la carrozza _param0_',
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
    en: 'Train crew',
    fr: 'Personnel de train',
    it: 'Personale di treno',
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

  //ADDITIONAL INFO FOR SEATS (PLACE PROPERTIES)
  // @see https://osdm.io/spec/catalog-of-code-lists/#PlaceProperty
  PLACE_PROPERTIES: {
    AISLE_SEAT: {
      de: 'Gangplatz',
      en: 'Aisle seat',
      fr: 'Place côté couloir',
      it: 'Posto vicino al corridoio',
    },
    'AIR-CONDITIONED': { de: '', en: 'Air-conditioned', fr: '', it: '' },
    ANY_SEAT: { de: '', en: 'Selection is optional', fr: '', it: '' },
    BISTRO: { de: '', en: 'Place in a coach with self-service bistro', fr: '', it: '' },
    BICYCLE: { de: '', en: 'Bicycle hook', fr: '', it: '' },
    BICYCLE_LOW: {
      de: '',
      en: 'Bicycle hook, no or slight lift only of front wheel needed',
      fr: '',
      it: '',
    },
    BICYCLE_MIDDLE: { de: '', en: 'Bicycle hook, waist high lift of bike needed', fr: '', it: '' },
    BICYCLE_HIGH: {
      de: '',
      en: 'Bicycle hook, complete lift of bike needed to reach hook',
      fr: '',
      it: '',
    },
    BUSINESS: { de: '', en: 'Manager compartment/business', fr: '', it: '' },
    BUSINESS_COMFORT: { de: '', en: 'Business seat with reduced service', fr: '', it: '' },
    CABIN8: { de: '', en: 'Special place group in TGV', fr: '', it: '' },
    CAR_LARGE: {
      de: '',
      en: 'Vehicle place category for motor vehicle between 4.42 m up to 5.30 m and with a roof width between 1.36 m and 1.55 m',
      fr: '',
      it: '',
    },
    CAR_SMALL: {
      de: '',
      en: 'Vehicle place for motor vehicle between 4.42 m up to 5.30 m and with a roof width up to 1.35 m',
      fr: '',
      it: '',
    },
    CARRE: { de: '', en: 'Carré (4 seats facing normally 2nd Class)', fr: '', it: '' },
    CHILDREN_AREA: { de: '', en: 'Places in children area', fr: '', it: '' },
    CLUB: { de: '', en: 'Club Category (RENFE)', fr: '', it: '' },
    CLUB_2: { de: '', en: 'Club Duo (2 seats facing in a separate compartment)', fr: '', it: '' },
    CLUB_4: { de: '', en: 'Club 4 (4 seats facing)', fr: '', it: '' },
    COMPARTMENT: { de: '', en: 'Places in a compartment', fr: '', it: '' },
    COMPLETE: {
      de: '',
      en: 'All places in a compartment are included, no other passengers will be located in the compartment',
      fr: '',
      it: '',
    },
    CONFERENCE: { de: '', en: 'Conference compartment', fr: '', it: '' },
    CONNECTING_DOOR: {
      de: '',
      en: 'Compartments with connecting door (in sleepers)',
      fr: '',
      it: '',
    },
    COUCHETTE_2: { de: '', en: 'Two person couchette cabin', fr: '', it: '' },
    COUCHETTE_4: { de: '', en: 'Couchette Four-berth', fr: '', it: '' },
    COUCHETTE_5: { de: '', en: 'Couchette Five-berth', fr: '', it: '' },
    COUCHETTE_6: { de: '', en: 'Couchette Six-berth', fr: '', it: '' },
    COUCHETTE_COMFORT_4: { de: '', en: 'Couchette higher quality Four-berth', fr: '', it: '' },
    COUCHETTE_COMFORT_5: { de: '', en: 'Couchette higher quality Five-berth', fr: '', it: '' },
    COUCHETTE_COMFORT_6: { de: '', en: 'Couchette higher quality Six-berth', fr: '', it: '' },
    COUCHETTE_PRM_2: { de: '', en: 'Couchette suitable for PRMs Two-berth', fr: '', it: '' },
    COUCHETTE_PRM_3: { de: '', en: 'Couchette suitable for PRMs Three-berth', fr: '', it: '' },
    COUCHETTE_PRM_4: { de: '', en: 'Couchette suitable for PRMs Four-berth', fr: '', it: '' },
    DOUBLE: { de: '', en: 'Two person sleeper compartment', fr: '', it: '' },
    DOUBLE_WC: { de: '', en: 'Two person sleeper compartment with WC', fr: '', it: '' },
    DOUBLE_SWC: { de: '', en: 'Double sleeper compartment with shower & WC', fr: '', it: '' },
    DOUBLE_S: { de: '', en: 'Double sleeper compartment with shower', fr: '', it: '' },
    EASY_ACCESS: { de: '', en: 'Place with easy access for PRMs', fr: '', it: '' },
    FACE_2_FACE: { de: '', en: 'Places face to face (2 seats facing)', fr: '', it: '' },
    EXCELLENCE: { de: '', en: 'Special Excellence Places (RhB)', fr: '', it: '' },
    FAMILY: { de: '', en: 'Places in family area', fr: '', it: '' },
    FRONT_VIEW: { de: '', en: 'Seat with front-view', fr: '', it: '' },
    HISTORIC_COACH: { de: '', en: 'Seat in historic coach', fr: '', it: '' },
    INCLUDING_MEAL: { de: '', en: 'Meal at the place is included', fr: '', it: '' },
    INCLUDING_DRINK: { de: '', en: 'A drink is included at the place', fr: '', it: '' },
    KIOSQUE: { de: '', en: 'Kiosque (special seats in edge area of a TGV)', fr: '', it: '' },
    LADIES: { de: '', en: 'Ladies compartment', fr: '', it: '' },
    LOWER_BED: { de: '', en: 'Lower bed or couchette', fr: '', it: '' },
    LOWER_DECK: { de: '', en: 'Lower deck in a double deck train', fr: '', it: '' },
    MEN: { de: '', en: 'Men compartment in night train', fr: '', it: '' },
    MIDDLE_BED: { de: '', en: 'Middle bed or couchette', fr: '', it: '' },
    MIDDLE_DECK: { de: '', en: 'Middle bed or couchette', fr: '', it: '' },
    MIDDLE_SEAT: { de: '', en: 'Middle seat', fr: '', it: '' },
    MINI_SUITE: {
      de: '',
      en: 'Mini Suite - single person couchette compartment (Capsule)',
      fr: '',
      it: '',
    },
    MIXED: { de: '', en: 'Mixed compartment in night train', fr: '', it: '' },
    MOTOR_CYCLE: { de: '', en: 'Motorcycle', fr: '', it: '' },
    MOTOR_CYCLE_SC: { de: '', en: 'Motorcycle with sidecar', fr: '', it: '' },
    NEAR_ANIMALS: { de: '', en: 'Places close to place with animals', fr: '', it: '' },
    NEAR_ASSISTANT_DOG_AREA: {
      de: '',
      en: 'Places close to an area where assistance dogs are kept',
      fr: '',
      it: '',
    },
    NEAR_DINING: { de: '', en: 'Places near the dining car', fr: '', it: '' },
    NEAR_PLAY_AREA: { de: '', en: 'Places near a child play area', fr: '', it: '' },
    NEAR_BICYCLE_AREA: { de: '', en: 'Places near the bicycle storage space', fr: '', it: '' },
    NEAR_WHEELCHAIR: {
      de: '',
      en: 'Used to indicate places near the wheelchair when booked by an accompanying person',
      fr: '',
      it: '',
    },
    OPEN_SPACE: { de: '', en: 'Places in open space area', fr: '', it: '' },
    PANORAMA: { de: '', en: 'Places in a panorama coach', fr: '', it: '' },
    PHONE: { de: '', en: 'Places in an area with mobile phone amplifier', fr: '', it: '' },
    POWER: {
      de: 'Steckdose',
      en: 'Power socket',
      fr: 'Prise',
      it: 'Presa elettrica',
    },
    PRAM: { de: '', en: 'Place for a Pram', fr: '', it: '' },
    PRAM_WITH_SEAT: { de: '', en: 'Seat with space for a pram', fr: '', it: '' },
    PREMIUM: { de: '', en: 'Seat with premium comfort (higher than first class)', fr: '', it: '' },
    RESTAURANT: { de: '', en: 'Restaurant (places in a dining car)', fr: '', it: '' },
    RESTRICTED_VIEW: { de: '', en: 'Place at the window with restricted view', fr: '', it: '' },
    SALON: { de: '', en: 'Salon (6 seats facing in a separate compartment)', fr: '', it: '' },
    SILENCE: { de: '', en: 'Quiet Compartment (Seat)', fr: '', it: '' },
    SINGLE: { de: '', en: 'Single sleeper compartment', fr: '', it: '' },
    SINGLE_WC: { de: '', en: 'Single sleeper compartment with WC', fr: '', it: '' },
    SINGLE_SWC: { de: '', en: 'Single sleeper compartment with shower & WC', fr: '', it: '' },
    SIDE_BY_SIDE: { de: '', en: 'Places side by side (2 seats side by side)', fr: '', it: '' },
    SLEEPERETTE: { de: '', en: 'Sleeperette (reclining seat)', fr: '', it: '' },
    SOLO: { de: '', en: 'Separate place without neighbor seat', fr: '', it: '' },
    SOLO_COM: {
      de: '',
      en: 'Special separate place without neighbor seat (e.g. in TGV)',
      fr: '',
      it: '',
    },
    SLEEPER: {
      de: '',
      en: 'Special Sleeper Compartment, one Person sleeper compartment smaller than a Single',
      fr: '',
      it: '',
    },
    TANDEM: { de: '', en: 'Tandem Bicycle', fr: '', it: '' },
    TABLE: { de: '', en: 'Places at a table', fr: '', it: '' },
    TOURIST_SLEEPER_2: { de: '', en: 'T2 sleeper compartment', fr: '', it: '' },
    TOURIST_SLEEPER_3: { de: '', en: 'T3 sleeper compartment', fr: '', it: '' },
    TOURIST_SLEEPER_3_WC: { de: '', en: 'T3 sleeper compartment with WC', fr: '', it: '' },
    TOURIST_SLEEPER_3_SWC: {
      de: '',
      en: 'T3 sleeper compartment with shower & WC',
      fr: '',
      it: '',
    },
    TOURIST_SLEEPER_4: { de: '', en: 'T4 sleeper compartment', fr: '', it: '' },
    UPPER_BED: { de: '', en: 'Upper bed or couchette', fr: '', it: '' },
    UPPER_DECK: { de: '', en: 'Upper deck in a double deck train', fr: '', it: '' },
    VIDEO: { de: '', en: 'Place with video entertainment', fr: '', it: '' },
    WHEELCHAIR: { de: '', en: 'Wheelchair place', fr: '', it: '' },
    WHEELCHAIR_AND_SEAT: { de: '', en: 'Wheelchair place with additional seat', fr: '', it: '' },
    WHEELCHAIR_NO_SEAT: { de: '', en: 'Wheelchair space without additional seat', fr: '', it: '' },
    WIFI: { de: '', en: 'Place with WiFi access point', fr: '', it: '' },
    WINDOW_SEAT: {
      de: 'Fensterplatz',
      en: 'Window seat',
      fr: 'Place côté fenêtre',
      it: 'Posto al finestrino',
    },
    WITHOUT_TRAY_TABLE: { de: '', en: 'Without tray table', fr: '', it: '' },
    WITH_ANIMALS: { de: '', en: 'Place with animals (animals allowed)', fr: '', it: '' },
    WITH_SMALL_CHILDREN: { de: '', en: 'Place for passengers with small children', fr: '', it: '' },
    WITHOUT_ANIMALS: {
      de: '',
      en: 'Place in an area where animals are not allowed',
      fr: '',
      it: '',
    },
  },

  //PLACE CONTROL ARIA LABEL
  PLACE_CONTROL_SEAT_FREE: {
    de: 'Sitzplatz _param0_ ist frei',
    en: 'Seat _param0_ is available',
    fr: 'Place _param0_ est libre',
    it: 'Posto a sedere _param0_ è libero',
  },
  PLACE_CONTROL_SEAT_SELECTED: {
    de: 'Sitzplatz _param0_ ist ausgewählt',
    en: 'Seat _param0_ has been selected',
    fr: 'Place _param0_ est sélectionnée',
    it: 'Posto a sedere _param0_ è selezionato',
  },
  PLACE_CONTROL_BICYCLE_FREE: {
    de: 'Veloplatz _param0_ ist frei',
    en: 'Bike space _param0_ is available',
    fr: 'Place pour vélo _param0_ est libre',
    it: 'Posto bici _param0_ è libero',
  },
  PLACE_CONTROL_BICYCLE_SELECTED: {
    de: 'Veloplatz _param0_ ist ausgewählt',
    en: 'Bike space _param0_ has been selected',
    fr: 'Place pour vélo _param0_ est sélectionnée',
    it: 'Posto bici _param0_ è selezionato',
  },
  PLACE_CONTROL_SEAT_RESTRICTED: {
    de: 'Sitzplatz ist nicht buchbar',
    en: 'Seat cannot be reserved',
    fr: 'Place ne peut pas être réservée',
    it: 'Posto a sedere non è prenotabile',
  },
  PLACE_CONTROL_BICYCLE_RESTRICTED: {
    de: 'Veloplatz ist nicht buchbar',
    en: 'Bike space cannot be reserved',
    fr: 'Place pour vélo indisponible',
    it: 'Posto bici non è prenotabile',
  },
  PLACE_CONTROL_SEAT_ALLOCATED: {
    de: 'Sitzplatz _param0_ ist besetzt',
    en: 'Seat _param0_ is occupied',
    fr: 'Place _param0_ est occupée',
    it: 'Posto a sedere _param0_ è occupato',
  },
  PLACE_CONTROL_BICYCLE_ALLOCATED: {
    de: 'Veloplatz _param0_ ist besetzt',
    en: 'Bike space _param0_ is occupied',
    fr: 'Place pour vélo _param0_ est occupée',
    it: 'Posto bici _param0_ è occupato',
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
 * Returns the translation for a seat reservation string based on a key and language.
 * Supports nested keys (e.g. "PLACE_PROPERTIES.AISLE_SEAT") and placeholder replacement.
 *
 * @param key The translation key (can be nested, e.g. "PLACE_PROPERTIES.AISLE_SEAT").
 * @param language The desired language (e.g. "de", "en", "fr", "it").
 * @param args Optional array of parameters to replace placeholders like _param0_, _param1_ in the translation string.
 * @returns The translated string or an empty string if no translation is found.
 *
 * @example
 * getI18nSeatReservation('COACH_TABLE_CAPTION', 'de', ['12']); // "Wagen 12 selektiert"
 * getI18nSeatReservation('PLACE_PROPERTIES.AISLE_SEAT', 'en'); // "Aisle seat"
 */
export const getI18nSeatReservation = (key: string, language: string, args?: any[]): string => {
  let innerValue: any = i18nObjects;
  let translatedStr = '';

  // Unterstützt verschachtelte Keys mit Punktnotation
  for (const part of key.split('.')) {
    innerValue = innerValue?.[part];
    if (!innerValue) break;
  }

  if (typeof innerValue === 'object' && innerValue !== null && !Array.isArray(innerValue)) {
    translatedStr = innerValue[language] || '';
  } else if (typeof innerValue === 'string') {
    translatedStr = innerValue;
  }

  return args
    ? args.reduce((val, param, idx) => val.replace(`_param${idx}_`, param), translatedStr)
    : translatedStr;
};
