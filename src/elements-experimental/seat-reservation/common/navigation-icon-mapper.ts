/**
 * Map Object from OSDM Code to SVG icon name represented in svg-icon
 * component regarding the namespace "fpl".
 */
type NavigationIcon = {
  svgName: string;
};

export const mapNavigationIconToSvg: Record<string, NavigationIcon> = {
  BICYCLE: { svgName: 'sa-vo' },
  BICYCLE_LOW: { svgName: 'sa-vo' },
  BICYCLE_MIDDLE: { svgName: 'sa-vo' },
  BICYCLE_HIGH: { svgName: 'sa-vo' },
  BISTRO: { svgName: 'sa-wr' },
  BUSINESS: { svgName: 'sa-bz' },
  BUSINESS_COMFORT: { svgName: 'sa-bz' },
  FAMILY: { svgName: 'sa-fz' },
  PRAM: { svgName: 'sa-abteilkinderwagen' },
  RESTAURANT: { svgName: 'sa-wr' },
  SILENCE: { svgName: 'sa-rz' },
  WHEELCHAIR: { svgName: 'sa-rs' },
  WHEELCHAIR_AND_SEAT: { svgName: 'sa-rs' },
  WHEELCHAIR_NO_SEAT: { svgName: 'sa-rs' },
  WIFI: { svgName: 'sa-fs' },
};

/**
CABIN8 Special place group in TGV	COMPARTMENT_TYPE
CAR_LARGE 	Vehicle parking place category 6-8	SPECIAL_COMPARTMENT_TYPE
CAR_SMALL 	Vehicle parking place category 1-3	SPECIAL_COMPARTMENT_TYPE
CARRE		Carré (4 seats facing normally 2nd Class)	COMPARTMENT_TYPE
CHILDREN_AREA		Places in children area	PLACE_OR_COMPARTMENT_POSITION
CLUB 	Club Category (RENFE)	COMPARTMENT_TYPE
CLUB_2		Club Duo (2 seats facing in a separate compartment)	COMPARTMENT_TYPE
CLUB_4		Club 4 (4 seats facing)	COMPARTMENT_TYPE
COMPARTMENT		Places in a compartment	COMPARTMENT_TYPE
COUCHETTE_2 	Two person couchette cabin	COMPARTMENT_TYPE
COUCHETTE_4 	Couchette Four-berth	COMPARTMENT_TYPE
COUCHETTE_5 	Couchette Five-berth	COMPARTMENT_TYPE
COUCHETTE_6 	Couchette Six-berth	COMPARTMENT_TYPE
COUCHETTE_COMFORT_4 	Couchette higher quality Four-berth	COMPARTMENT_TYPE
COUCHETTE_COMFORT_5 	Couchette higher quality Five-berth	COMPARTMENT_TYPE
COUCHETTE_COMFORT_6 	Couchette higher quality Six-berth	COMPARTMENT_TYPE
COUCHETTE_PRM_2 	Couchette suitable for PRMs Two-berth	SPECIAL_COMPARTMENT_TYPE
COUCHETTE_PRM_3 	Couchette suitable for PRMs Three-berth	SPECIAL_COMPARTMENT_TYPE
COUCHETTE_PRM_4 	Couchette suitable for PRMs Four-berth	SPECIAL_COMPARTMENT_TYPE
DOUBLE 	Two person sleeper compartment	COMPARTMENT_TYPE
DOUBLE_WC 	Two person sleeper compartment with WC	COMPARTMENT_TYPE
DOUBLE_SWC 	Double sleeper compartment with shower & WC	COMPARTMENT_TYPE
DOUBLE_SWC_DB 	Double sleeper compartment with shower & WC & double bed	COMPARTMENT_TYPE
DOUBLE_S 	Double sleeper compartment with shower	COMPARTMENT_TYPE
EASY_ACCESS		Place with easy access for PRMs	PLACE_OR_COMPARTMENT_POSITION
EXCELLENCE		Special Excellence Places (RhB)	COMPARTMENT_TYPE
FRONT_VIEW		Seat with front-view	PLACE_OR_COMPARTMENT_POSITION
HISTORIC_COACH		Seat in historic coach	COMPARTMENT_TYPE
KIOSQUE		Kiosque (special seats in edge area of a TGV)	COMPARTMENT_TYPE
MINI_SUITE 	Mini Suite - single person couchette compartment (Capsule)	COMPARTMENT_TYPE
MOTOR_CYCLE 	Motorcycle	SPECIAL_COMPARTMENT_TYPE
MOTOR_CYCLE_SC 	Motorcycle with sidecar	SPECIAL_COMPARTMENT_TYPE
OPEN_SPACE		Places in open space area	COMPARTMENT_TYPE
PANORAMA		Places in a panorama coach	COMPARTMENT_TYPE
PRAM_WITH_SEAT 	Seat with space for a pram	SPECIAL_COMPARTMENT_TYPE
PREMIUM		Seat with premium comfort (higher than first class)	SPECIAL_COMPARTMENT_TYPE
SALON		Salon (6 seats facing in a separate compartment)	COMPARTMENT_TYPE
SINGLE 	Single sleeper compartment	COMPARTMENT_TYPE
SINGLE_WC 	Single sleeper compartment with WC	COMPARTMENT_TYPE
SINGLE_SWC 	Single sleeper compartment with shower & WC	COMPARTMENT_TYPE
SINGLE_SWC_DOUBLE 	Single compartment with shower & WC & double bed	COMPARTMENT_TYPE
SLEEPERETTE 	Sleeperette (reclining seat)	COMPARTMENT_TYPE
SLEEPER_DELUXE 	Berth deluxe	COMPARTMENT_TYPE
SOLO		Separate place without neighbor seat	COMPARTMENT_TYPE
SOLO_COM		Special separate place without neighbor seat (e.g. in TGV)	COMPARTMENT_TYPE
SPECIAL_SLEEPER 	Special Sleeper Compartment, one Person sleeper compartment smaller than a Single	COMPARTMENT_TYPE
TANDEM		Tandem Bicycle	SPECIAL_COMPARTMENT_TYPE
TOURIST_SLEEPER_2 	T2 sleeper compartment	COMPARTMENT_TYPE
TOURIST_SLEEPER_3 	T3 sleeper compartment	COMPARTMENT_TYPE
TOURIST_SLEEPER_3_WC 	T3 sleeper compartment with WC	COMPARTMENT_TYPE
TOURIST_SLEEPER_3_SWC 	T3 sleeper compartment with shower & WC	COMPARTMENT_TYPE
TOURIST_SLEEPER_4 	T4 sleeper compartment	COMPARTMENT_TYPE
WITH_ANIMALS		Place with animals (animals allowed)	SPECIAL_COMPARTMENT_TYPE
WITH_SMALL_CHILDREN		Place for passengers with small children	PLACE_OR_COMPARTMENT_POSITION
WITHOUT_ANIMALS		Place in an area where animals are not allowed	SPECIAL_COMPARTMENT_TYPE
 */
