export const configX = {
  loadingPrice: false,
  loadingTrip: false,
  trip: {
    legs: [
      {
        arrival: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T11:20:00+01:00',
        },
        departure: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T10:20:00+01:00',
        },
        duration: 161,
        serviceJourney: {
          direction: 'Heidelberg Hbf',
          notices: [
            {
              name: 'SM',
              priority: 0,
              text: 'Halt nur zum Einsteigen',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'WR',
              priority: 1,
              text: 'Restaurant',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'MO',
              priority: 2,
              text: 'Masken-/Zertifikatspflicht - bitte länderspezifische Regeln beachten',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VB',
              priority: 6,
              text: 'VELOS: Platzzahl eingeschränkt',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VR',
              priority: 6,
              text: 'VELOS: Reservierung obligatorisch',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
          ],
          serviceAlteration: {
            cancelled: false,
            cancelledText: null,
            delayText: null,
            quayChangedText: null,
            reachable: true,
            reachableText: null,
            redirected: false,
            redirectedText: null,
            unplannedStopPointsText: null,
          },
          serviceProduct: {
            number: '1579',
            name: 'ICE 1579',
            line: null,
            corporateIdentityIcon: 'SBB_oev_b_t02',
            vehicleMode: 'TRAIN',
            vehicleSubModeShortName: 'ICE',
          },
          situations: [
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Der Grund dafür ist ein Streik in Deutschland.<br> Die Dauer der Einschränkung ist unbestimmt.<br><br>',
                  id: '26935',
                  title: 'Streik in Deutschland',
                },
              ],
              cause: 'INFORMATION',
            },
          ],
        },
      },
      {
        arrival: {
          delay: 0,
          delayText: null,
          quayAimedName: '8',
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T18:56:00+01:00',
        },
        departure: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T11:20:00+01:00',
        },
        duration: 0,
        serviceJourney: {
          direction: 'Interlaken Ost',
          notices: [
            {
              name: 'WR',
              priority: 1,
              text: 'Restaurant',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'MO',
              priority: 2,
              text: 'Masken-/Zertifikatspflicht - bitte länderspezifische Regeln beachten',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VS',
              priority: 6,
              text: 'VELOS: Reservierung am Billettschalter oder URL',
              textArguments: [
                {
                  type: 'URL',
                  values: ['sbb.ch/velo-reservation'],
                },
              ],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VR',
              priority: 6,
              text: 'VELOS: Reservierung obligatorisch',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'R',
              priority: 8,
              text: 'Platzreservierung möglich',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
          ],
          serviceAlteration: {
            cancelled: true,
            cancelledText: null,
            delayText: null,
            quayChangedText: null,
            reachable: false,
            reachableText: 'Ihre Anschlussverbindung ist nicht gewährleistet.',
            redirected: false,
            redirectedText:
              'Dieses Verkehrsmittel hält ausnahmsweise nicht in Kassel-Wilhelmshöhe.',
            unplannedStopPointsText: null,
          },
          serviceProduct: {
            number: '371',
            name: 'ICE 371',
            line: null,
            corporateIdentityIcon: 'SBB_oev_b_t02',
            vehicleMode: 'TRAIN',
            vehicleSubModeShortName: 'ICE',
          },
          situations: [
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
                  id: '25506',
                  title: 'Reisehinweis: Bern - Olten RMi',
                },
              ],
              cause: 'INFORMATION',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
                  id: '25507',
                  title: 'Bauarbeiten: Bern - Olten RMi',
                },
              ],
              cause: 'CONSTRUCTION_SITE',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
                  id: '25505',
                  title: 'Einschränkung: Bern - Olten RMi',
                },
              ],
              cause: 'DISTURBANCE',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Der Grund dafür ist ein Streik in Deutschland.<br> Die Dauer der Einschränkung ist unbestimmt.<br><br>',
                  id: '26935',
                  title: 'Streik in Deutschland',
                },
              ],
              cause: 'INFORMATION',
            },
          ],
        },
      },
      {
        arrival: {
          delay: 0,
          delayText: null,
          quayAimedName: '3',
          quayChanged: false,
          quayChangedText: null,
          quayRtName: '3',
          time: '2022-11-21T21:18:00+01:00',
        },
        departure: {
          delay: 0,
          delayText: null,
          quayAimedName: '5',
          quayChanged: false,
          quayChangedText: null,
          quayRtName: '5',
          time: '2022-11-21T19:34:00+01:00',
        },
        duration: 104,
        serviceJourney: {
          direction: 'Genève-Aéroport',
          notices: [
            {
              name: 'WR',
              priority: 1,
              text: 'Restaurant',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'FA',
              priority: 4,
              text: 'Familienwagen mit Spielplatz',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'BZ',
              priority: 4,
              text: 'Businesszone in 1. Klasse',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'FS',
              priority: 4,
              text: 'Gratis-Internet mit der App SBB FreeSurf',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'RZ',
              priority: 4,
              text: 'Ruhezone in 1. Klasse',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'R',
              priority: 8,
              text: 'Platzreservierung möglich',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
          ],
          serviceAlteration: {
            cancelled: false,
            cancelledText: null,
            delayText: null,
            quayChangedText: null,
            reachable: true,
            reachableText: null,
            redirected: false,
            redirectedText: null,
            unplannedStopPointsText: null,
          },
          serviceProduct: {
            number: '730',
            name: 'IC 1 730',
            line: '1',
            corporateIdentityIcon: 'SBB_oev_b_t02',
            vehicleMode: 'TRAIN',
            vehicleSubModeShortName: 'IC',
          },
          situations: [],
        },
      },
      {
        arrival: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T22:20:00+01:00',
        },
        departure: {
          delay: 0,
          delayText: null,
          quayAimedName: '2',
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T21:32:00+01:00',
        },
        duration: 48,
        serviceJourney: {
          direction: 'Evian-les-Bains',
          notices: [
            {
              name: 'WF',
              priority: 100,
              text: 'Verkehrt ab Annemasse als TER L1 23328 in Richtung Evian-les-Bains',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
          ],
          serviceAlteration: {
            cancelled: false,
            cancelledText: null,
            delayText: null,
            quayChangedText: null,
            reachable: true,
            reachableText: null,
            redirected: false,
            redirectedText: null,
            unplannedStopPointsText: null,
          },
          serviceProduct: {
            number: '23328',
            name: 'S L1 23328',
            line: 'L1',
            corporateIdentityIcon: 'SBB_oev_b_t02',
            vehicleMode: 'TRAIN',
            vehicleSubModeShortName: 'S',
          },
          situations: [],
        },
      },
    ],
    notices: [
      {
        name: 'SM',
        priority: 0,
        text: 'Halt nur zum Einsteigen',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'WR',
        priority: 1,
        text: 'Restaurant',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'MO',
        priority: 2,
        text: 'Masken-/Zertifikatspflicht - bitte länderspezifische Regeln beachten',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'VB',
        priority: 6,
        text: 'VELOS: Platzzahl eingeschränkt',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'VR',
        priority: 6,
        text: 'VELOS: Reservierung obligatorisch',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'WR',
        priority: 1,
        text: 'Restaurant',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'MO',
        priority: 2,
        text: 'Masken-/Zertifikatspflicht - bitte länderspezifische Regeln beachten',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'VS',
        priority: 6,
        text: 'VELOS: Reservierung am Billettschalter oder URL',
        textArguments: [
          {
            type: 'URL',
            values: ['sbb.ch/velo-reservation'],
          },
        ],
        type: 'ATTRIBUTE',
      },
      {
        name: 'VR',
        priority: 6,
        text: 'VELOS: Reservierung obligatorisch',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'R',
        priority: 8,
        text: 'Platzreservierung möglich',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'WR',
        priority: 1,
        text: 'Restaurant',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'FA',
        priority: 4,
        text: 'Familienwagen mit Spielplatz',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'BZ',
        priority: 4,
        text: 'Businesszone in 1. Klasse',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'FS',
        priority: 4,
        text: 'Gratis-Internet mit der App SBB FreeSurf',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'RZ',
        priority: 4,
        text: 'Ruhezone in 1. Klasse',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'R',
        priority: 8,
        text: 'Platzreservierung möglich',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'WF',
        priority: 100,
        text: 'Verkehrt ab Annemasse als TER L1 23328 in Richtung Evian-les-Bains',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
    ],
    situations: [
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Streik in Deutschland',
            priority: 60,
            id: '26935',
            detail:
              'Der Grund dafür ist ein Streik in Deutschland.<br> Die Dauer der Einschränkung ist unbestimmt.<br><br>',
          },
        ],
        cause: 'INFORMATION',
      },
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Reisehinweis: Bern - Olten RMi',
            priority: 60,
            id: '25506',
            detail:
              'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
          },
        ],
        cause: 'INFORMATION',
      },
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Bauarbeiten: Bern - Olten RMi',
            priority: 60,
            id: '25507',
            detail:
              'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
          },
        ],
        cause: 'CONSTRUCTION_SITE',
      },
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Einschränkung: Bern - Olten RMi',
            priority: 60,
            id: '25505',
            detail:
              'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
          },
        ],
        cause: 'DISTURBANCE',
      },
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Streik in Deutschland',
            priority: 60,
            id: '26935',
            detail:
              'Der Grund dafür ist ein Streik in Deutschland.<br> Die Dauer der Einschränkung ist unbestimmt.<br><br>',
          },
        ],
        cause: 'INFORMATION',
      },
    ],
    summary: {
      __typename: 'TripSummary',
      duration: 0,
      arrival: {
        __typename: 'ScheduledStopPointDetail',
        time: '2022-11-21T22:20:00+01:00',
        delay: 0,
        quayRtName: null,
        quayChanged: false,
      },
      arrivalWalk: 0,
      departure: {
        __typename: 'ScheduledStopPointDetail',
        time: '2022-11-21T10:20:00+01:00',
        delay: 0,
        quayAimedName: 4,
        quayRtName: 14,
        quayChanged: false,
      },
      departureWalk: 0,
      direction: 'Heidelberg Hbf',
      product: {
        __typename: 'ServiceProduct',
        name: 'ICE 1579',
        line: null,
        number: '1579',
        vehicleMode: 'TRAIN',
        vehicleSubModeShortName: 'ICE',
        corporateIdentityIcon: 'SBB_oev_b_t02',
      },
      occupancy: {
        __typename: 'Occupancy',
        firstClass: 'LOW',
        secondClass: 'LOW',
      },
      tripStatus: {
        __typename: 'TripStatus',
        cancelled: false,
        partiallyCancelled: true,
        delayedUnknown: false,
        delayed: false,
        quayChanged: false,
      },
      boardingAlightingAccessibility: 'BOARDING_ALIGHTING_BY_NOTIFICATION',
    },

    valid: false,
  },
  price: {
    price: '12',
    text: 'ab CHF',
    isDiscount: false,
  },
};

export const config = {
  loadingPrice: false,
  loadingTrip: false,
  trip: {
    legs: [
      {
        arrival: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T12:04:00+01:00',
        },
        departure: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T08:04:00+01:00',
        },
        duration: 0,
        serviceJourney: {
          direction: 'Berlin Ostbahnhof',
          notices: [
            {
              name: 'WR',
              priority: 1,
              text: 'Restaurant',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VS',
              priority: 6,
              text: 'VELOS: Reservierung am Billettschalter oder URL',
              textArguments: [
                {
                  type: 'URL',
                  values: ['sbb.ch/velo-reservation'],
                },
              ],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VR',
              priority: 6,
              text: 'VELOS: Reservierung obligatorisch',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'R',
              priority: 8,
              text: 'Platzreservierung möglich',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
          ],
          serviceAlteration: {
            cancelled: false,
            cancelledText: null,
            delayText: null,
            quayChangedText: null,
            reachable: false,
            reachableText: null,
            redirected: false,
            redirectedText: null,
            unplannedStopPointsText: null,
          },
          serviceProduct: {
            number: '278',
            name: 'ICE 278',
            line: null,
            corporateIdentityIcon: 'SBB_oev_b_t02',
            vehicleMode: 'TRAIN',
            vehicleSubModeShortName: 'ICE',
          },
          situations: [
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
                  id: '25506',
                  title: 'Reisehinweis: Bern - Olten RMi',
                },
              ],
              cause: 'INFORMATION',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
                  id: '25507',
                  title: 'Bauarbeiten: Bern - Olten RMi',
                },
              ],
              cause: 'CONSTRUCTION_SITE',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
                  id: '25505',
                  title: 'Einschränkung: Bern - Olten RMi',
                },
              ],
              cause: 'DISTURBANCE',
            },
          ],
        },
      },
      {
        arrival: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T18:04:00+01:00',
        },
        departure: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-21T12:04:00+01:00',
        },
        duration: 0,
        serviceJourney: {
          direction: 'Berlin Ostbahnhof',
          notices: [
            {
              name: 'WR',
              priority: 1,
              text: 'Restaurant',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VS',
              priority: 6,
              text: 'VELOS: Reservierung am Billettschalter oder URL',
              textArguments: [
                {
                  type: 'URL',
                  values: ['sbb.ch/velo-reservation'],
                },
              ],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VR',
              priority: 6,
              text: 'VELOS: Reservierung obligatorisch',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'R',
              priority: 8,
              text: 'Platzreservierung möglich',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
          ],
          serviceAlteration: {
            cancelled: true,
            cancelledText: null,
            delayText: null,
            quayChangedText: null,
            reachable: false,
            reachableText: null,
            redirected: false,
            redirectedText: null,
            unplannedStopPointsText: null,
          },
          serviceProduct: {
            number: '278',
            name: 'ICE 278',
            line: null,
            corporateIdentityIcon: 'SBB_oev_b_t02',
            vehicleMode: 'TRAIN',
            vehicleSubModeShortName: 'ICE',
          },
          situations: [
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
                  id: '25506',
                  title: 'Reisehinweis: Bern - Olten RMi',
                },
              ],
              cause: 'INFORMATION',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
                  id: '25507',
                  title: 'Bauarbeiten: Bern - Olten RMi',
                },
              ],
              cause: 'CONSTRUCTION_SITE',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
                  id: '25505',
                  title: 'Einschränkung: Bern - Olten RMi',
                },
              ],
              cause: 'DISTURBANCE',
            },
          ],
        },
      },
    ],
    notices: [
      {
        name: 'WR',
        priority: 1,
        text: 'Restaurant',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'VS',
        priority: 6,
        text: 'VELOS: Reservierung am Billettschalter oder URL',
        textArguments: [
          {
            type: 'URL',
            values: ['sbb.ch/velo-reservation'],
          },
        ],
        type: 'ATTRIBUTE',
      },
      {
        name: 'VR',
        priority: 6,
        text: 'VELOS: Reservierung obligatorisch',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'R',
        priority: 8,
        text: 'Platzreservierung möglich',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
    ],
    searchHint: null,
    situations: [
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Reisehinweis: Bern - Olten RMi',
            priority: 60,
            id: '25506',
            detail:
              'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
          },
        ],
        cause: 'INFORMATION',
      },
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Bauarbeiten: Bern - Olten RMi',
            priority: 60,
            id: '25507',
            detail:
              'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
          },
        ],
        cause: 'CONSTRUCTION_SITE',
      },
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Einschränkung: Bern - Olten RMi',
            priority: 60,
            id: '25505',
            detail:
              'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
          },
        ],
        cause: 'DISTURBANCE',
      },
    ],
    summary: {
      __typename: 'TripSummary',
      duration: 0,
      arrival: {
        __typename: 'ScheduledStopPointDetail',
        time: '2022-11-18T12:01:00+01:00',
        delay: 0,
        quayRtName: null,
        quayChanged: false,
      },
      arrivalWalk: 0,
      departure: {
        __typename: 'ScheduledStopPointDetail',
        time: '2022-11-21T10:20:00+01:00',
        delay: 0,
        quayAimedName: 4,
        quayRtName: 4,
        quayChanged: false,
      },
      departureWalk: 0,
      direction: 'Berlin Ostbahnhof',
      product: {
        __typename: 'ServiceProduct',
        name: 'ICE 278',
        line: null,
        number: '278',
        vehicleMode: 'TRAIN',
        vehicleSubModeShortName: 'ICE',
        corporateIdentityIcon: 'SBB_oev_b_t02',
      },
      occupancy: {
        __typename: 'Occupancy',
        firstClass: 'LOW',
        secondClass: 'LOW',
      },
      tripStatus: {
        __typename: 'TripStatus',
        cancelled: false,
        partiallyCancelled: true,
        delayedUnknown: false,
        delayed: false,
        quayChanged: false,
      },
      boardingAlightingAccessibility: 'BOARDING_ALIGHTING_BY_NOTIFICATION',
    },
    tripId: 'id-1',
    valid: false,
  },
  price: {
    price: '12',
    text: 'ab CHF',
    isDiscount: true,
  },
};

export const configTest = {
  loadingPrice: false,
  loadingTrip: false,
  trip: {
    legs: [
      {
        arrival: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-18T12:01:00+01:00',
        },
        departure: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-18T11:04:00+01:00',
        },
        duration: 50,
        serviceJourney: {
          direction: 'Berlin Ostbahnhof',
          notices: [
            {
              name: 'WR',
              priority: 1,
              text: 'Restaurant',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VS',
              priority: 6,
              text: 'VELOS: Reservierung am Billettschalter oder URL',
              textArguments: [
                {
                  type: 'URL',
                  values: ['sbb.ch/velo-reservation'],
                },
              ],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VR',
              priority: 6,
              text: 'VELOS: Reservierung obligatorisch',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'R',
              priority: 8,
              text: 'Platzreservierung möglich',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
          ],
          serviceAlteration: {
            cancelled: true,
            cancelledText: null,
            delayText: null,
            quayChangedText: null,
            reachable: false,
            reachableText: null,
            redirected: false,
            redirectedText: null,
            unplannedStopPointsText: null,
          },
          serviceProduct: {
            number: '278',
            name: 'ICE 278',
            line: null,
            corporateIdentityIcon: 'SBB_oev_b_t02',
            vehicleMode: 'TRAIN',
            vehicleSubModeShortName: 'ICE',
          },
          situations: [
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
                  id: '25506',
                  title: 'Reisehinweis: Bern - Olten RMi',
                },
              ],
              cause: 'INFORMATION',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
                  id: '25507',
                  title: 'Bauarbeiten: Bern - Olten RMi',
                },
              ],
              cause: 'CONSTRUCTION_SITE',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
                  id: '25505',
                  title: 'Einschränkung: Bern - Olten RMi',
                },
              ],
              cause: 'DISTURBANCE',
            },
          ],
        },
      },

      {
        arrival: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-18T12:01:00+01:00',
        },
        departure: {
          delay: 0,
          delayText: null,
          quayAimedName: null,
          quayChanged: false,
          quayChangedText: null,
          quayRtName: null,
          time: '2022-11-18T11:04:00+01:00',
        },
        duration: 50,
        serviceJourney: {
          direction: 'Berlin Ostbahnhof',
          notices: [
            {
              name: 'WR',
              priority: 1,
              text: 'Restaurant',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VS',
              priority: 6,
              text: 'VELOS: Reservierung am Billettschalter oder URL',
              textArguments: [
                {
                  type: 'URL',
                  values: ['sbb.ch/velo-reservation'],
                },
              ],
              type: 'ATTRIBUTE',
            },
            {
              name: 'VR',
              priority: 6,
              text: 'VELOS: Reservierung obligatorisch',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
            {
              name: 'R',
              priority: 8,
              text: 'Platzreservierung möglich',
              textArguments: [],
              type: 'ATTRIBUTE',
            },
          ],
          serviceAlteration: {
            cancelled: false,
            cancelledText: null,
            delayText: null,
            quayChangedText: null,
            reachable: false,
            reachableText: null,
            redirected: false,
            redirectedText: null,
            unplannedStopPointsText: null,
          },
          serviceProduct: {
            number: '278',
            name: 'ICE 278',
            line: null,
            corporateIdentityIcon: 'SBB_oev_b_t02',
            vehicleMode: 'TRAIN',
            vehicleSubModeShortName: 'ICE',
          },
          situations: [
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
                  id: '25506',
                  title: 'Reisehinweis: Bern - Olten RMi',
                },
              ],
              cause: 'INFORMATION',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
                  id: '25507',
                  title: 'Bauarbeiten: Bern - Olten RMi',
                },
              ],
              cause: 'CONSTRUCTION_SITE',
            },
            {
              affectedStopPointFromIdx: -1,
              affectedStopPointToIdx: -1,
              broadcastMessages: [
                {
                  priority: 60,
                  detail:
                    'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
                  id: '25505',
                  title: 'Einschränkung: Bern - Olten RMi',
                },
              ],
              cause: 'DISTURBANCE',
            },
          ],
        },
      },
    ],
    notices: [
      {
        name: 'WR',
        priority: 1,
        text: 'Restaurant',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'VS',
        priority: 6,
        text: 'VELOS: Reservierung am Billettschalter oder URL',
        textArguments: [
          {
            type: 'URL',
            values: ['sbb.ch/velo-reservation'],
          },
        ],
        type: 'ATTRIBUTE',
      },
      {
        name: 'VR',
        priority: 6,
        text: 'VELOS: Reservierung obligatorisch',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
      {
        name: 'R',
        priority: 8,
        text: 'Platzreservierung möglich',
        textArguments: [],
        type: 'ATTRIBUTE',
      },
    ],
    searchHint: null,
    situations: [
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Reisehinweis: Bern - Olten RMi',
            priority: 60,
            id: '25506',
            detail:
              'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
          },
        ],
        cause: 'INFORMATION',
      },
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Bauarbeiten: Bern - Olten RMi',
            priority: 60,
            id: '25507',
            detail:
              'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
          },
        ],
        cause: 'CONSTRUCTION_SITE',
      },
      {
        affectedStopPointFromIdx: -1,
        affectedStopPointToIdx: -1,
        broadcastMessages: [
          {
            title: 'Einschränkung: Bern - Olten RMi',
            priority: 60,
            id: '25505',
            detail:
              'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
          },
        ],
        cause: 'DISTURBANCE',
      },
    ],
    summary: {
      __typename: 'TripSummary',
      duration: 0,
      arrival: {
        __typename: 'ScheduledStopPointDetail',
        time: '2022-11-18T12:01:00+01:00',
        delay: 0,
        quayRtName: null,
        quayChanged: false,
      },
      arrivalWalk: 0,
      departure: {
        __typename: 'ScheduledStopPointDetail',
        time: '2022-11-18T11:04:00+01:00',
        delay: 0,
        quayRtName: null,
        quayChanged: false,
      },
      departureWalk: 0,
      direction: 'Berlin Ostbahnhof',
      product: {
        __typename: 'ServiceProduct',
        name: 'ICE 278',
        line: null,
        number: '278',
        vehicleMode: 'TRAIN',
        vehicleSubModeShortName: 'ICE',
        corporateIdentityIcon: 'SBB_oev_b_t02',
      },
      occupancy: {
        __typename: 'Occupancy',
        firstClass: 'LOW',
        secondClass: 'LOW',
      },
      tripStatus: {
        __typename: 'TripStatus',
        cancelled: true,
        partiallyCancelled: false,
        delayedUnknown: false,
        delayed: false,
        quayChanged: false,
      },
      boardingAlightingAccessibility: 'BOARDING_ALIGHTING_BY_NOTIFICATION',
    },
    tripId: 'id-1',
    valid: false,
  },
  price: {
    price: '12',
    text: 'ab CHF',
    isDiscount: true,
  },
};

export const configPosition = {
  trip: {
    legs: [
      {
        duration: 60,
        id: 'test',
        arrival: { time: '2023-08-18T05:00' },
        departure: { time: '2021-08-18T04:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 780,
        id: 'test',
        arrival: { time: '2024-08-18T18:00' },
        departure: { time: '2023-08-18T05:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
    ],
    notices: [
      {
        name: 'Z',
        text: {
          template: 'hint 1',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 10,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'RR',
        text: {
          template: 'hint 2',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 100,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'om',
        text: {
          template: 'hint 3',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 40,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'FS',
        text: {
          template: 'hint 4',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 20,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'Z',
        text: {
          template: 'hint 5',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 100,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
    ],
    situations: [{ cause: 'DELAY', broadcastMessages: 'test', priority: 60 }],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:48:00+02:00',
      },
      arrivalWalk: 5,
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:16:00+02:00',
      },
      departureWalk: 8,
      direction: 'Luzern',
      duration: 60 * 48 + 130,
      occupancy: {
        firstClass: 'low',
        secondClass: 'low',
      },
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'IR 27 2473',
        line: 27,
        vehicleSubModeShortName: 'IR',
      },
      tripStatus: {
        quayChanged: false,
      },
    },
    tripId: 'id-1',
    valid: true,
  },
};

export const configMinimal = {
  trip: {
    legs: [
      {
        duration: 360,
        id: 'test',
        arrival: { time: '2022-08-31T15:00:00+02:00' },
        departure: { time: '2022-04-30T15:00:00+02:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
    ],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:48:00+02:00',
      },
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '7',
        time: '2022-07-28T13:16:00+02:00',
      },
      direction: 'Mars',
      duration: 20,
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'ISS 27 2473',
        line: 27,
        vehicleSubModeShortName: 'ISS',
      },
    },
  },
};

export const configCancelled = {
  trip: {
    legs: [
      {
        duration: 360,
        serviceJourney: {
          serviceAlteration: {
            cancelled: true,
          },
        },
      },
    ],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:48:00+02:00',
      },
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '7',
        time: '2022-07-28T13:16:00+02:00',
      },
      direction: 'Mars',
      duration: 20,
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'ISS 27 2473',
        line: 27,
        vehicleSubModeShortName: 'ISS',
      },
    },
  },
};

export const configCancelledStops = {
  trip: {
    legs: [
      {
        duration: 100,
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 300,
        serviceJourney: {
          serviceAlteration: {
            cancelled: true,
          },
        },
      },
      {
        duration: 150,
      },
      {
        duration: 150,
        serviceJourney: {
          serviceAlteration: {
            cancelled: true,
          },
        },
      },
      {
        duration: 150,
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 400,
      },
    ],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:48:00+02:00',
      },
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '7',
        time: '2022-07-28T13:16:00+02:00',
      },
      direction: 'Mars',
      duration: 20,
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'ISS 27 2473',
        line: 27,
        vehicleSubModeShortName: 'ISS',
      },
    },
  },
};

export const configPast = {
  trip: {
    legs: [
      {
        duration: 360,
        id: 'test',
        arrival: { time: '2022-07-30T17:00:00+02:00' },
        departure: { time: '2022-07-01T05:00:00+02:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 360,
        id: 'test',
        arrival: { time: '2022-07-30T17:00:00+02:00' },
        departure: { time: '2022-07-01T05:00:00+02:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 360,
        id: 'test',
        arrival: { time: '2022-07-30T17:00:00+02:00' },
        departure: { time: '2022-07-01T05:00:00+02:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
    ],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2021-08-04T20:00:00+02:00',
      },
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '7',
        time: '2020-08-04T15:00:00+02:00',
      },
      direction: 'Mars',
      duration: 20,
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'ISS 27 2473',
        line: 27,
        vehicleSubModeShortName: 'ISS',
      },
    },
  },
};
