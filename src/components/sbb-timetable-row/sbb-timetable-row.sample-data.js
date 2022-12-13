import {
  cancelledLeg,
  futureLeg,
  longFutureLeg,
  pastLeg,
  progressLeg,
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

export const disturbanceTrip = {
  legs: [pastLeg, progressLeg],
  notices: [
    {
      name: 'R',
      text: 'Platzreservierung möglich',
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
      text: 'Platzreservierung möglich',
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
    time: '2022-11-30T17:06:00+01:00',
    arrival: {
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
    time: '2022-11-30T17:06:00+01:00',
    arrival: {
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
    time: '2022-11-30T17:06:00+01:00',
    arrival: {
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
      text: 'Niederflureinstieg',
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 0,
      __typename: 'Notice',
    },
    {
      name: 'WR',
      text: 'Restaurant',
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 1,
      __typename: 'Notice',
    },
    {
      name: 'FA',
      text: 'Familienwagen mit Spielplatz',
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'BZ',
      text: 'Businesszone in 1. Klasse',
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'FS',
      text: 'Gratis-Internet mit der App SBB FreeSurf',
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'RZ',
      text: 'Ruhezone in 1. Klasse',
      textArguments: [],
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'R',
      text: 'Platzreservierung möglich',
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
    boardingAlightingAccessibility: 'BOARDING_ALIGHTING_BY_NOTIFICATION',
    __typename: 'TripSummary',
  },
};

export const NoticesTrip = {
  legs: [futureLeg, futureLeg, longFutureLeg],
  notices: [
    {
      name: 'XT',
      text: 'Platzreservierung möglich',
    },
    {
      name: 'EXISTIERTNICHT',
      text: 'Platzreservierung möglich',
    },
    {
      name: 'TG',
      text: 'Platzreservierung möglich',
    },
    {
      name: 'VR',
      text: 'Platzreservierung möglich',
    },
    {
      name: 'SZ >deleteme<',
      text: 'Platzreservierung möglich',
    },
    {
      name: 'SB >deleteme<',
      text: 'Platzreservierung möglich',
    },
    {
      name: 'Z',
      text: 'Platzreservierung möglich',
    },
    {
      name: 'Z',
      text: 'Platzreservierung möglich',
    },
    {
      name: 'Z',
      text: 'Platzreservierung möglich',
    },
  ],
  situations: [],
  summary: {
    duration: 41,
    time: '2022-11-30T17:06:00+01:00',
    arrival: {
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
