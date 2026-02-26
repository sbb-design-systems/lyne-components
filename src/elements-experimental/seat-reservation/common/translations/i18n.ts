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

  // TRAVEL DIRECTION
  SEAT_RESERVATION_TRAVEL_DIRECTION: {
    de: 'Fahrtrichtung',
    en: 'Travel direction',
    fr: 'Direction du voyage',
    it: 'Direzione di viaggio',
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
      de: 'Gang',
      en: 'aisle',
      fr: 'Couloir',
      it: 'corridoio',
    },
    'AIR-CONDITIONED': {
      de: 'Klimatisierter Bereich',
      en: 'air-conditioned area',
      fr: 'Zone climatisée',
      it: 'area climatizzata',
    },
    ANY_SEAT: {
      de: 'optionale Auswahl',
      en: 'optional selection',
      fr: 'sélection facultative',
      it: 'selezione opzionale',
    },
    BISTRO: { de: 'Bistro', en: 'bistro', fr: 'Bistro', it: 'bistrò' },
    BICYCLE: { de: 'Velo', en: 'bicycle', fr: 'Vélo', it: 'biciclette' },
    BICYCLE_LOW: {
      de: 'Velohaken tief',
      en: 'bicycle hook low',
      fr: 'Crochets pour vélos abaissés',
      it: 'gancio per biciclette abbassare',
    },
    BICYCLE_MIDDLE: {
      de: 'Velohaken mittel',
      en: 'bicycle hook medium',
      fr: 'Crochets pour vélos moyens',
      it: 'gancio per biciclette medio',
    },
    BICYCLE_HIGH: {
      de: 'Velohaken hoch',
      en: 'bicycle hook high',
      fr: 'Crochets pour vélos surélevés',
      it: 'gancio per biciclette alto',
    },
    BUSINESS: { de: 'Business', en: 'business', fr: 'Business', it: 'business' },
    BUSINESS_COMFORT: {
      de: 'Business comfort',
      en: 'business Comfort',
      fr: 'Business Confort',
      it: 'business Comfort',
    },
    CABIN8: { de: 'Gruppen', en: 'groups', fr: 'Groupes', it: 'gruppi' },
    CAR_LARGE: {
      de: 'Fahrzeug mit einer Länge zwischen 4,42m und 5,3m und einer Dachbreite zwischen 1,36m und 1,55m',
      en: 'Vehicle with a length between 4.42m and 5.3m and a roof width between 1.36m and 1.55m',
      fr: 'Véhicule d’une longueur comprise entre 4,42m et 5,3m et d’une largeur de toit comprise entre 1,36m et 1,55m',
      it: 'Veicoli con una lunghezza compresa tra 4,42m e 5,3m e una larghezza del tetto compresa tra 1,36m e 1,55m',
    },
    CAR_SMALL: {
      de: 'Fahrzeug mit einer Länge zwischen 4,42m und 5,3m und einerDachbreite bis 1,35m',
      en: 'Vehicle with a length between 4.42m and 5.3m and a roof width of up to 1.35m',
      fr: 'Véhicule d’une longueur comprise entre 4,42m et 5,3m et d’une largeur de toit inférieure ou égale à 1,35m',
      it: 'Veicolo con una lunghezza compresa tra 4,42m e 5,3m e unalarghezza del tetto fino a 1,35m',
    },
    CARRE: { de: 'Carré', en: 'Carré', fr: 'Carré', it: 'Carré' },
    CHILDREN_AREA: {
      de: 'Kinderabteil',
      en: 'children’s compartment',
      fr: 'Compartiment enfants',
      it: 'compartimento per bambini',
    },
    CLUB: { de: 'Club', en: 'Club', fr: 'Club', it: 'Club' },
    CLUB_2: { de: 'Club Duo', en: 'Club Duo', fr: 'Club Duo', it: 'Club Duo' },
    CLUB_4: { de: 'Club 4', en: 'Club 4', fr: 'Club 4', it: 'Club 4' },
    COMPARTMENT: {
      de: 'Seitengang',
      en: 'side aisle',
      fr: 'Couloir latéral',
      it: 'corridoio laterale',
    },
    COMPLETE: {
      de: 'Privatabteil',
      en: 'private compartment',
      fr: 'Compartiment privé',
      it: 'compartimento privato',
    },
    CONFERENCE: {
      de: 'Konferenzraum',
      en: 'conference room',
      fr: 'Compartiment conférence',
      it: 'compartimento Conferenza',
    },
    CONNECTING_DOOR: {
      de: 'Abteil mit Verbindungstür',
      en: 'compartment with connecting door',
      fr: 'Compartiment avec porte communicante',
      it: 'compartimento con porta di collegamento',
    },
    COUCHETTE_2: { de: '2er', en: '2 berths', fr: '2 places', it: '2 posti' },
    COUCHETTE_4: { de: '4er', en: '4 berths', fr: '4 places', it: '4 posti' },
    COUCHETTE_5: { de: '5er', en: '5 berths', fr: '5 places', it: '5 posti' },
    COUCHETTE_6: { de: '6er', en: '6 berths', fr: '6 places', it: '6 posti' },
    COUCHETTE_COMFORT_4: {
      de: '4er comfort',
      en: '4 berths comfort',
      fr: '4 places confort',
      it: '4 posti comfort',
    },
    COUCHETTE_COMFORT_5: {
      de: '5er comfort',
      en: '5 berths comfort',
      fr: '5 places confort',
      it: '5 posti comfort',
    },
    COUCHETTE_COMFORT_6: {
      de: '6er',
      en: '6 berths comfort',
      fr: '6 places confort',
      it: '6 posti comfort',
    },
    COUCHETTE_PRM_2: { de: '2er PRM', en: '2 berths PRM', fr: '2 places PMR', it: '2 posti PRM' },
    COUCHETTE_PRM_3: { de: '3er PRM', en: '3 berths PRM', fr: '3 places PMR', it: '3 posti PRM' },
    COUCHETTE_PRM_4: { de: '4er PRM', en: '4 berths PRM', fr: '4 places PMR', it: '4 posti PRM' },
    DOUBLE: { de: 'Double', en: 'Double', fr: 'Double', it: 'Double' },
    DOUBLE_WC: {
      de: 'Double mit WC',
      en: 'Double with WC',
      fr: 'Double avec WC',
      it: 'Double con WC',
    },
    DOUBLE_SWC: {
      de: 'Double Deluxe',
      en: 'Double Deluxe',
      fr: 'Double Deluxe',
      it: 'Double Deluxe',
    },
    DOUBLE_S: {
      de: 'Double mit Dusche',
      en: 'Double with shower',
      fr: 'Double avec douche',
      it: 'Double con Doccia',
    },
    EASY_ACCESS: { de: 'PRM', en: 'PRM', fr: 'PRM', it: 'PRM' },
    FACE_2_FACE: {
      de: 'Duo vis à vis',
      en: 'Duo vis à vis',
      fr: 'Duo vis à vis',
      it: 'Duo vis à vis',
    },
    EXCELLENCE: { de: 'Excellence', en: 'excellence', fr: 'excellence', it: 'excellence' },
    FAMILY: {
      de: 'Familienabteil',
      en: 'family zone',
      fr: 'compartement famille',
      it: 'compartimente familia',
    },
    FRONT_VIEW: { de: 'VIP', en: 'VIP', fr: 'VIP', it: 'VIP' },
    HISTORIC_COACH: { de: 'Historic', en: 'historic', fr: 'historique', it: 'historic' },
    INCLUDING_MEAL: {
      de: 'Mahlzeit inbegriffen',
      en: 'meal included',
      fr: 'repas inclus',
      it: 'pasto incluso',
    },
    INCLUDING_DRINK: {
      de: 'Willkommensgetränk inbegriffen',
      en: 'welcome drink included',
      fr: 'boisson de bienvenue incluse',
      it: 'bevanda di benvenuto incluso',
    },
    KIOSQUE: { de: 'Kiosk', en: 'kiosk', fr: 'kiosque', it: 'chiosco' },
    LADIES: {
      de: 'Damenabteil',
      en: 'women Compartment',
      fr: 'compartiment femmes',
      it: 'compartimento donne',
    },
    LOWER_BED: { de: 'unten', en: 'at the bottom', fr: 'en bas', it: 'in basso' },
    LOWER_DECK: { de: 'unten', en: 'at the bottom', fr: 'en bas', it: 'in basso' },
    MEN: {
      de: 'Herrenabteil',
      en: 'gents compartment',
      fr: 'compartiment hommes',
      it: 'compartimento Uomini',
    },
    MIDDLE_BED: { de: 'Mitte', en: 'middle', fr: 'milieu', it: 'centro' },
    MIDDLE_DECK: { de: 'Mitte', en: 'middle', fr: 'milieu', it: 'centro' },
    MIDDLE_SEAT: { de: 'Mitte', en: 'middle', fr: 'milieu', it: 'centro' },
    MINI_SUITE: {
      de: 'Mini Cabin',
      en: 'mini Cabin',
      fr: 'Mini Cabin',
      it: 'Mini Cabin',
    },
    MIXED: {
      de: 'gemischtes Abteil',
      en: 'mixed compartment',
      fr: 'compartiment mixte',
      it: 'compartimento misto',
    },
    MOTOR_CYCLE: { de: 'Motorrad', en: 'motorcycle', fr: 'moto', it: 'motocicletta' },
    MOTOR_CYCLE_SC: {
      de: 'Motorrad mit Seitenwagen',
      en: 'motorcycle with sidecar',
      fr: 'moto avec side-car',
      it: 'motocicletta con sidecar',
    },
    NEAR_ANIMALS: {
      de: 'nah am Haustier',
      en: 'close to pet',
      fr: 'proche de l’animal de compagnie',
      it: 'vicino all’animale domestico',
    },
    NEAR_ASSISTANT_DOG_AREA: {
      de: 'nah am Assistenzhund',
      en: 'close to assistance dog',
      fr: 'près du chien d’assistance',
      it: 'vicino al cane da assistenza',
    },
    NEAR_DINING: {
      de: 'nah am Speisewagen',
      en: 'close to dining car',
      fr: 'à proximité de la voiture-restaurant',
      it: 'nelle vicinanze della carrozza ristorantev',
    },
    NEAR_PLAY_AREA: {
      de: 'nah am Spielplatz',
      en: 'close to playground',
      fr: 'à proximité de l’aire de jeux',
      it: 'vicino al parco giochi',
    },
    NEAR_BICYCLE_AREA: {
      de: 'nah am Veloplatz',
      en: 'close to bike space',
      fr: 'à proximité de la place pour vélo',
      it: 'vicino al posto bici',
    },
    NEAR_WHEELCHAIR: {
      de: 'nah am Rollstuhlplatz',
      en: 'close to wheelchair space',
      fr: 'à proximité de l’emplacement pour fauteuils roulants',
      it: 'vicino al posto per sedie a rotelle',
    },
    OPEN_SPACE: {
      de: 'Mittelgang',
      en: 'middle aisle',
      fr: 'couloir central',
      it: 'corridoio centrale',
    },
    PANORAMA: {
      de: 'Panoramawagen',
      en: 'panorama coach',
      fr: 'voiture panoramique',
      it: 'carrozza panoramica',
    },
    PHONE: { de: 'Mobile', en: 'mobile', fr: 'mobile', it: 'mobile' },
    POWER: {
      de: 'Mit Steckdose',
      en: 'with power socket',
      fr: 'avec prise',
      it: 'con presa elettrica',
    },
    PRAM: {
      de: 'Kinderwagen',
      en: 'close to space for strollers',
      fr: 'poussettes',
      it: 'passeggino',
    },
    PRAM_WITH_SEAT: {
      de: 'nah am Platz für Kinderwagen',
      en: 'Seat with space for a pram',
      fr: 'près de l’espace pour les poussettes',
      it: 'vicino al posto per passeggini',
    },
    PREMIUM: { de: 'Premium', en: 'premium', fr: 'premium', it: 'premium' },
    RESTAURANT: { de: 'Restaurant', en: 'restaurant', fr: 'restaurant', it: 'ristorante' },
    RESTRICTED_VIEW: {
      de: 'Fenster mit eingeschränkter Sicht',
      en: 'windows with restricted visibility',
      fr: 'fenêtres avec visibilité réduite',
      it: 'finestre con visibilità limitata',
    },
    SALON: { de: 'Salon', en: 'Salon', fr: 'salon', it: 'Salon' },
    SILENCE: {
      de: 'Ruheabteil',
      en: 'quiet compartment',
      fr: 'compartiment silence',
      it: 'compartimento del silenzio',
    },
    SINGLE: { de: 'Single', en: 'Single', fr: 'Single', it: 'Single' },
    SINGLE_WC: {
      de: 'Single mit WC',
      en: 'Single with WC',
      fr: 'Single avec WC',
      it: 'Single con WC',
    },
    SINGLE_SWC: {
      de: 'Single Deluxe',
      en: 'Single Deluxe',
      fr: 'Single Deluxe',
      it: 'Single Deluxe',
    },
    SIDE_BY_SIDE: {
      de: 'Duo côte à côte',
      en: 'Duo côte à côte',
      fr: 'Duo côte à côte',
      it: 'Duo côte à côte',
    },
    SLEEPERETTE: { de: 'Sleeperette', en: 'Sleeperette', fr: 'Sleeperette', it: 'Sleeperette' },
    SOLO: {
      de: 'freier Nebensitz',
      en: 'free side seat',
      fr: 'siège voisin libre',
      it: 'sedile secondario libero',
    },
    SOLO_COM: {
      de: 'freier Nebensitz',
      en: 'free side seat',
      fr: 'siège voisin libre',
      it: 'sedile secondario libero',
    },
    SLEEPER: {
      de: 'Single (klein)',
      en: 'Single (small)',
      fr: 'Single (petit)',
      it: 'Single (piccolo)',
    },
    TANDEM: { de: 'Tandem', en: 'tandem', fr: 'tandem', it: 'tandem' },
    TABLE: { de: 'Tisch', en: 'table', fr: 'table', it: 'tavolo' },
    TOURIST_SLEEPER_2: { de: 'Duo', en: 'Duo', fr: 'Duo', it: 'Duo' },
    TOURIST_SLEEPER_3: { de: '3er', en: 'Triple', fr: 'Triple', it: 'Triple' },
    TOURIST_SLEEPER_3_WC: {
      de: '3er mit WC',
      en: 'Triple with WC',
      fr: '3 places avec WC',
      it: '3 posti con WC',
    },
    TOURIST_SLEEPER_3_SWC: {
      de: '3er Deluxe',
      en: 'Triple Deluxe',
      fr: '3 places Deluxe',
      it: '3 posti Deluxe',
    },
    TOURIST_SLEEPER_4: { de: '4er', en: '4-berth', fr: '4 places', it: '4 posti' },
    TRAVEL_DIRECTION_TRANSVERSELY: {
      de: 'quer zur Fahrtrichtung',
      en: 'transversely to travel direction',
      fr: 'Transversalement à la direction du voyage',
      it: 'trasversalmente alla direzione di viaggio',
    },
    TRAVEL_DIRECTION_IN_DIRECTION: {
      de: 'in Fahrtrichtung',
      en: 'in travel direction',
      fr: 'Dans le sens de la marche',
      it: 'nella direzione di marcia',
    },
    TRAVEL_DIRECTION_IN_OPPOSITE_DIRECTION: {
      de: 'gegen die Fahrtrichtung',
      en: 'in opposite direction',
      fr: 'Dans le sens inverse de la marche',
      it: 'nella direzione opposta alla marcia',
    },
    UPPER_BED: { de: 'oben', en: 'at the top', fr: 'en haut', it: 'in alto' },
    UPPER_DECK: { de: 'oben', en: 'at the top', fr: 'en haut', it: 'in alto' },
    VIDEO: {
      de: 'mit Unterhaltungssytem',
      en: 'with entertainment system',
      fr: 'avec système de divertissement',
      it: 'con sistema di intrattenimento',
    },
    WHEELCHAIR: {
      de: 'Rollstuhl',
      en: 'wheelchair',
      fr: 'fauteuil roulant',
      it: 'sedia a rotelle',
    },
    WHEELCHAIR_AND_SEAT: {
      de: 'Rollstuhl mit zusätzlichem Sitzplatz',
      en: 'wheelchair with additional seat',
      fr: 'fauteuil roulant avec place assise supplémentaire',
      it: 'sedia a rotelle con posto a sedere aggiuntivo',
    },
    WHEELCHAIR_NO_SEAT: {
      de: 'Rollstuhl ohne zusätzlichen Sitzplatz',
      en: 'Wheelchair space without additional seat',
      fr: 'fauteuil roulant avec place assise supplémentaire',
      it: 'sedia a rotelle con posto a sedere aggiuntivo',
    },
    WIFI: { de: 'Wlan', en: 'Wi-Fi', fr: 'Wi-Fi', it: 'Wlan' },
    WINDOW_SEAT: {
      de: 'Fenster',
      en: 'window',
      fr: 'fenêtre',
      it: 'finestre',
    },
    WITHOUT_TRAY_TABLE: {
      de: 'ohne Tisch',
      en: 'without table',
      fr: 'sans table',
      it: 'senza tavolo',
    },
    WITH_ANIMALS: {
      de: 'Tiere erlaubt',
      en: 'animals allowed',
      fr: 'animaux admis',
      it: 'animali ammessi',
    },
    WITH_SMALL_CHILDREN: {
      de: 'Kleinkindabteil',
      en: 'infant compartment',
      fr: 'compartiment petit enfants',
      it: 'compartimento per bambini piccoli',
    },
    WITHOUT_ANIMALS: {
      de: 'Tiere nicht erlaubt',
      en: 'pets not allowed',
      fr: 'animaux non autorisés',
      it: 'animali non ammessi',
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
