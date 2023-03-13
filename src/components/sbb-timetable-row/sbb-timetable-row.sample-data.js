import {
  cancelledLeg,
  extendedLeg,
  futureLeg,
  longFutureLeg,
  pastLeg,
  progressLeg,
  redirectedOnArrivalLeg,
  redirectedOnDepartureLeg,
} from '../sbb-pearl-chain/sbb-pearl-chain.sample-data';

export const defaultTrip = {
  legs: [futureLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
    },
    duration: 75,
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
    },
  },
};

export const cancelledTrip = {
  legs: [cancelledLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
      quayAimedName: '14',
    },
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
    },
    tripStatus: {
      cancelled: true,
      partiallyCancelled: false,
      delayedUnknown: false,
      delayed: false,
      quayChanged: false,
    },
  },
};

export const progressTrip = {
  legs: [progressLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
    },
    duration: 75,
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
    },
  },
};

export const partiallyCancelled = {
  legs: [futureLeg, cancelledLeg, futureLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
      quayAimedName: '14',
    },
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
    },
    tripStatus: {
      partiallyCancelled: true,
    },
  },
};

export const pastTrip = {
  legs: [pastLeg, pastLeg, pastLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
      quayAimedName: '14',
    },
    duration: 75,
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
    },
    tripStatus: {
      partiallyCancelled: false,
    },
  },
};

export const skippedLastArrivalStopTrip = {
  legs: [pastLeg, progressLeg, futureLeg, redirectedOnArrivalLeg],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
    },
    departure: {
      time: '2022-11-30T17:44:00+01:00',
    },
    direction: 'Trimbach, Eisenbahn',
    product: {
      line: '502',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
    },
  },
};

export const skippedArrivalStopTrip = {
  legs: [pastLeg, progressLeg, redirectedOnArrivalLeg, futureLeg],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
    },
    departure: {
      time: '2022-11-30T17:44:00+01:00',
    },
    direction: 'Trimbach, Eisenbahn',
    product: {
      line: '502',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
    },
  },
};

export const skippedDepartureStopTrip = {
  legs: [pastLeg, progressLeg, redirectedOnDepartureLeg, futureLeg],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
    },
    departure: {
      time: '2022-11-30T17:44:00+01:00',
    },
    direction: 'Trimbach, Eisenbahn',
    product: {
      line: '502',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
    },
  },
};

export const skippedFirstDepartureStopTrip = {
  legs: [redirectedOnDepartureLeg, futureLeg],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
    },
    departure: {
      time: '2022-11-30T17:44:00+01:00',
    },
    direction: 'Trimbach, Eisenbahn',
    product: {
      line: '502',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
    },
  },
};

export const disturbanceTrip = {
  legs: [pastLeg, progressLeg],
  notices: [
    {
      name: 'R',
      text: {
        template: 'Reservation possible',
      },
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 8,
    },
  ],
  situations: [
    {
      cause: 'DISTURBANCE',
      broadcastMessages: [
        {
          id: '28521',
          priority: 40,
          title: 'Test ROKAS Danke, dass Sie mit uns unterwegs sind.',
          detail:
            'Der Grund dafür ist eine technische Störung an der Bahnanlage.<br> Die Dauer der Einschränkung ist unbestimmt.<br><br> Wir wünschen Ihnen eine angenehme Reise.<br><br>Ihre SBB.',
        },
      ],
    },
  ],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
      delay: 0,
      quayRtName: '34',
      quayChanged: false,
      quayAimedName: '34',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T17:44:00+01:00',
      delay: 0,
      quayRtName: null,
      quayChanged: false,
      quayAimedName: null,
    },
    departureWalk: 0,
    direction: 'Trimbach, Eisenbahn',
    product: {
      name: 'B 502 2204',
      line: '502',
      number: '2204',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
    },
    occupancy: {
      firstClass: 'MEDIUM',
      secondClass: 'MEDIUM',
    },
    tripStatus: {
      cancelled: false,
      partiallyCancelled: false,
      delayedUnknown: false,
      delayed: false,
      quayChanged: false,
    },
  },
};

export const quayChangeTrip = {
  legs: [pastLeg, progressLeg],
  notices: [
    {
      name: 'R',
      text: {
        template: 'Reservation possible',
      },
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 8,
    },
  ],
  situations: [],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
      delay: 0,
      quayRtName: '34',
      quayChanged: false,
      quayAimedName: '34',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T17:44:00+01:00',
      delay: 0,
      quayRtName: '34',
      quayChanged: true,
      quayAimedName: '42',
    },
    departureWalk: 0,
    direction: 'Trimbach, Eisenbahn',
    product: {
      name: 'B 502 2204',
      line: '502',
      number: '2204',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
    },
    occupancy: {
      firstClass: 'MEDIUM',
      secondClass: 'MEDIUM',
    },
    tripStatus: {
      quayChanged: true,
    },
  },
};

export const TrainTrip = {
  legs: [futureLeg, futureLeg, longFutureLeg],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayAimedName: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayAimedName: '4',
    },
    departureWalk: 0,
    direction: 'Chur',
    product: {
      line: '35',
      number: '2377',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
    },
    occupancy: {
      firstClass: 'LOW',
      secondClass: 'MEDIUM',
    },
    tripStatus: {},
  },
};

export const BusTrip = {
  legs: [futureLeg, futureLeg, longFutureLeg],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayAimedName: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayAimedName: '4',
    },
    departureWalk: 0,
    direction: 'Spiegel, Blinzern',
    product: {
      name: 'B 19 27014',
      line: '19',
      number: '27014',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
      corporateIdentityIcon: 'SBB_oev_b_t06',
      __typename: 'ServiceProduct',
    },
    occupancy: {
      firstClass: 'LOW',
      secondClass: 'MEDIUM',
    },
    tripStatus: {},
  },
};

export const ShipTrip = {
  legs: [futureLeg],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayAimedName: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayAimedName: '4',
    },
    departureWalk: 0,
    direction: 'Atlantis',
    product: {
      line: null,
      vehicleMode: 'SHIP',
    },
    tripStatus: {},
  },
};

export const walkTimeTrip = {
  legs: [futureLeg, futureLeg, futureLeg, futureLeg, futureLeg, futureLeg],
  notices: [
    {
      name: 'NF',
      text: {
        template: 'Reservation possible',
      },
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 0,
      __typename: 'Notice',
    },
    {
      name: 'WR',
      text: {
        template: 'Restaurant',
      },
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 1,
      __typename: 'Notice',
    },
    {
      name: 'FA',
      text: {
        template: 'Family wagon with playground',
      },
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'BZ',
      text: {
        template: 'Business zone in 1st class',
      },
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'FS',
      text: {
        template: 'Free internet with the SBB FreeSurf app',
      },
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'RZ',
      text: {
        template: 'Quiet zone in 1st class',
      },
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'R',
      text: {
        template: 'Reservation possible',
      },
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 8,
      __typename: 'Notice',
    },
  ],
  situations: [
    {
      cause: 'INFORMATION',
      broadcastMessages: [
        {
          id: '25506',
          priority: 60,
          title: 'Reisehinweis: Bern - Olten RMi',
          detail:
            'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
          __typename: 'PTSituationMessage',
        },
      ],
      __typename: 'PTSituation',
    },
    {
      cause: 'CONSTRUCTION_SITE',
      broadcastMessages: [
        {
          id: '25507',
          priority: 60,
          title: 'Bauarbeiten: Bern - Olten RMi',
          detail:
            'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
          __typename: 'PTSituationMessage',
        },
      ],
      __typename: 'PTSituation',
    },
    {
      cause: 'DISTURBANCE',
      broadcastMessages: [
        {
          id: '25505',
          priority: 60,
          title: 'Einschränkung: Bern - Olten RMi',
          detail:
            'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
          __typename: 'PTSituationMessage',
        },
      ],
      __typename: 'PTSituation',
    },
    {
      cause: 'DISTURBANCE',
      broadcastMessages: [
        {
          id: '28521',
          priority: 40,
          title: 'Test ROKAS Danke, dass Sie mit uns unterwegs sind.',
          detail:
            'Der Grund dafür ist eine technische Störung an der Bahnanlage.<br> Die Dauer der Einschränkung ist unbestimmt.<br><br> Wir wünschen Ihnen eine angenehme Reise.<br><br>Ihre SBB.',
          __typename: 'PTSituationMessage',
        },
      ],
      __typename: 'PTSituation',
    },
  ],
  summary: {
    duration: 80,
    arrival: {
      time: '2022-11-30T20:40:00+01:00',
      delay: 0,
      quayRtName: '2',
      quayChanged: false,
      quayAimedName: '2',
      __typename: 'ScheduledStopPointDetail',
    },
    arrivalWalk: 2,
    departure: {
      time: '2022-11-30T19:24:00+01:00',
      delay: 0,
      quayRtName: 'A',
      quayChanged: false,
      quayAimedName: 'A',
      __typename: 'ScheduledStopPointDetail',
    },
    departureWalk: 2,
    direction: 'Bern, Fischermätteli',
    product: {
      name: 'T 6 2258',
      line: '6',
      number: '2258',
      vehicleMode: 'TRAMWAY',
      vehicleSubModeShortName: 'T',
      corporateIdentityIcon: 'SBB_oev_b_t04',
      __typename: 'ServiceProduct',
    },
    occupancy: {
      firstClass: 'LOW',
      secondClass: 'LOW',
      __typename: 'Occupancy',
    },
    tripStatus: {
      cancelled: false,
      partiallyCancelled: false,
      delayedUnknown: false,
      delayed: false,
      quayChanged: false,
      __typename: 'TripStatus',
    },
    __typename: 'TripSummary',
  },
};

export const extendedEnterTimeTrip = {
  legs: [extendedLeg, futureLeg, longFutureLeg],
  notices: [],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayAimedName: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayAimedName: '4',
    },
    departureWalk: 0,
    direction: 'Chur',
    product: {
      line: '35',
      number: '2377',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
    },
    occupancy: {},
    tripStatus: {},
  },
};

export const NoticesTrip = {
  legs: [futureLeg, futureLeg, longFutureLeg],
  notices: [
    {
      name: 'XT',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'EXISTIERTNICHT',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'TG',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'VR',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'RM',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'SB >deleteme<',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'Z',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'Z',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'Z',
      text: {
        template: 'Reservation possible',
      },
    },
  ],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayAimedName: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayAimedName: '4',
    },
    departureWalk: 0,
    direction: 'Chur',
    product: {
      line: '35',
      number: '2377',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
    },
    occupancy: {
      firstClass: 'LOW',
      secondClass: 'MEDIUM',
    },
    tripStatus: {},
  },
};
