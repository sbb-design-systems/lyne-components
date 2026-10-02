import type { SeatReservation } from '../../types.ts';

export const MOCK_COACHES_DB_WALLS = [
  {
    warnings: null,
    coachDeckLayout: {
      name: 'coach information missing',
      dimension: {
        width: 58000,
        height: 10000,
      },
      id: '21',
      deckLevel: 'SINGLE_DECK',
      placeGroups: [
        {
          serviceClass: 'BASIC',
          travelClass: 'SECOND',
          accommodationSubType: 'SEAT',
          places: [
            {
              number: '15',
              rectangle: {
                position: {
                  x: 0,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '17',
              rectangle: {
                position: {
                  x: 0,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '13',
              rectangle: {
                position: {
                  x: 0,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '11',
              rectangle: {
                position: {
                  x: 0,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '16',
              rectangle: {
                position: {
                  x: 2000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '18',
              rectangle: {
                position: {
                  x: 2000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '14',
              rectangle: {
                position: {
                  x: 2000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '12',
              rectangle: {
                position: {
                  x: 2000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '25',
              rectangle: {
                position: {
                  x: 4000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '27',
              rectangle: {
                position: {
                  x: 4000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '23',
              rectangle: {
                position: {
                  x: 4000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '21',
              rectangle: {
                position: {
                  x: 4000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '26',
              rectangle: {
                position: {
                  x: 8000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '28',
              rectangle: {
                position: {
                  x: 8000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '24',
              rectangle: {
                position: {
                  x: 8000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '22',
              rectangle: {
                position: {
                  x: 8000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '35',
              rectangle: {
                position: {
                  x: 10000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '37',
              rectangle: {
                position: {
                  x: 10000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '33',
              rectangle: {
                position: {
                  x: 10000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '31',
              rectangle: {
                position: {
                  x: 10000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '36',
              rectangle: {
                position: {
                  x: 12000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '38',
              rectangle: {
                position: {
                  x: 12000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '34',
              rectangle: {
                position: {
                  x: 12000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '32',
              rectangle: {
                position: {
                  x: 12000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '43',
              rectangle: {
                position: {
                  x: 14000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '41',
              rectangle: {
                position: {
                  x: 14000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '46',
              rectangle: {
                position: {
                  x: 16000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '48',
              rectangle: {
                position: {
                  x: 16000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '44',
              rectangle: {
                position: {
                  x: 16000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '42',
              rectangle: {
                position: {
                  x: 16000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '55',
              rectangle: {
                position: {
                  x: 18000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '57',
              rectangle: {
                position: {
                  x: 18000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '53',
              rectangle: {
                position: {
                  x: 18000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '51',
              rectangle: {
                position: {
                  x: 18000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '65',
              rectangle: {
                position: {
                  x: 20000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '67',
              rectangle: {
                position: {
                  x: 20000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '63',
              rectangle: {
                position: {
                  x: 20000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '61',
              rectangle: {
                position: {
                  x: 20000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '66',
              rectangle: {
                position: {
                  x: 24000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '68',
              rectangle: {
                position: {
                  x: 24000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '64',
              rectangle: {
                position: {
                  x: 24000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '62',
              rectangle: {
                position: {
                  x: 24000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '75',
              rectangle: {
                position: {
                  x: 26000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '77',
              rectangle: {
                position: {
                  x: 26000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '76',
              rectangle: {
                position: {
                  x: 28000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '78',
              rectangle: {
                position: {
                  x: 28000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '85',
              rectangle: {
                position: {
                  x: 30000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '83',
              rectangle: {
                position: {
                  x: 30000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '81',
              rectangle: {
                position: {
                  x: 30000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '86',
              rectangle: {
                position: {
                  x: 34000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '84',
              rectangle: {
                position: {
                  x: 34000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '82',
              rectangle: {
                position: {
                  x: 34000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '95',
              rectangle: {
                position: {
                  x: 36000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '93',
              rectangle: {
                position: {
                  x: 36000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '91',
              rectangle: {
                position: {
                  x: 36000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '96',
              rectangle: {
                position: {
                  x: 40000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '94',
              rectangle: {
                position: {
                  x: 40000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '92',
              rectangle: {
                position: {
                  x: 40000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '105',
              rectangle: {
                position: {
                  x: 42000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '103',
              rectangle: {
                position: {
                  x: 42000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '101',
              rectangle: {
                position: {
                  x: 42000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '106',
              rectangle: {
                position: {
                  x: 46000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '104',
              rectangle: {
                position: {
                  x: 46000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '102',
              rectangle: {
                position: {
                  x: 46000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '115',
              rectangle: {
                position: {
                  x: 48000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '113',
              rectangle: {
                position: {
                  x: 48000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '111',
              rectangle: {
                position: {
                  x: 48000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '116',
              rectangle: {
                position: {
                  x: 52000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '114',
              rectangle: {
                position: {
                  x: 52000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '112',
              rectangle: {
                position: {
                  x: 52000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
          ],
        },
        {
          serviceClass: 'BASIC',
          travelClass: 'SECOND',
          accommodationSubType: 'MOBILE_PHONE_ICON',
          places: [],
        },
      ],
      graphicElements: [
        {
          rectangle: {
            position: {
              x: 6000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 6000,
              y: 6000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 22000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 22000,
              y: 6000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 30000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 0,
          type: 'WALL_RIGHT_3',
        },
        {
          rectangle: {
            position: {
              x: 32000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 35000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 0,
          type: 'T_WALL_COMPARTMENTS_3',
        },
        {
          rectangle: {
            position: {
              x: 38000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 41000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 0,
          type: 'T_WALL_COMPARTMENTS_3',
        },
        {
          rectangle: {
            position: {
              x: 44000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 47000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 0,
          type: 'T_WALL_COMPARTMENTS_3',
        },
        {
          rectangle: {
            position: {
              x: 50000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 52000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 0,
          type: 'WALL_LEFT_3',
        },
        {
          rectangle: {
            position: {
              x: 14000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'LUGGAGE_AREA',
        },
        {
          rectangle: {
            position: {
              x: 26000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'LUGGAGE_AREA',
        },
        {
          rectangle: {
            position: {
              x: 54000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TOILET_AREA',
        },
        {
          rectangle: {
            position: {
              x: 56000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TOILET_AREA',
        },
        {
          rectangle: {
            position: {
              x: 0,
              y: 0,
              z: 0,
            },
            dimension: {
              width: 1000,
              height: 10000,
            },
          },
          orientation: 0,
          type: 'COACH_WALL_NO_PASSAGE',
        },
        {
          rectangle: {
            position: {
              x: 57000,
              y: 0,
              z: 0,
            },
            dimension: {
              width: 1000,
              height: 10000,
            },
          },
          orientation: 180,
          type: 'COACH_WALL_NO_PASSAGE',
        },
      ],
      serviceIcons: [
        {
          rectangle: {
            position: {
              x: 14000,
              y: 4000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          type: 'MOBILE_PHONE_ICON',
        },
        {
          rectangle: {
            position: {
              x: 40000,
              y: 6000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          type: 'SILENCE_ICON',
        },
        {
          rectangle: {
            position: {
              x: 42000,
              y: 6000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          type: 'MOBILE_PHONE_FORBIDDEN_ICON',
        },
      ],
    },
  },
  {
    warnings: null,
    coachDeckLayout: {
      name: 'coach all partition walls',
      dimension: {
        width: 58000,
        height: 10000,
      },
      id: '22',
      deckLevel: 'SINGLE_DECK',
      placeGroups: [
        {
          serviceClass: 'BASIC',
          travelClass: 'SECOND',
          accommodationSubType: 'SEAT',
          places: [
            {
              number: '211',
              rectangle: {
                position: {
                  x: 1000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '212',
              rectangle: {
                position: {
                  x: 1000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '213',
              rectangle: {
                position: {
                  x: 1000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '214',
              rectangle: {
                position: {
                  x: 1000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '221',
              rectangle: {
                position: {
                  x: 5000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '222',
              rectangle: {
                position: {
                  x: 5000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '223',
              rectangle: {
                position: {
                  x: 5000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '224',
              rectangle: {
                position: {
                  x: 5000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '231',
              rectangle: {
                position: {
                  x: 7000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '232',
              rectangle: {
                position: {
                  x: 7000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '233',
              rectangle: {
                position: {
                  x: 7000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '234',
              rectangle: {
                position: {
                  x: 7000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '241',
              rectangle: {
                position: {
                  x: 11000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '242',
              rectangle: {
                position: {
                  x: 11000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '243',
              rectangle: {
                position: {
                  x: 11000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '244',
              rectangle: {
                position: {
                  x: 11000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '251',
              rectangle: {
                position: {
                  x: 13000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '252',
              rectangle: {
                position: {
                  x: 13000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '253',
              rectangle: {
                position: {
                  x: 13000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '254',
              rectangle: {
                position: {
                  x: 13000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '261',
              rectangle: {
                position: {
                  x: 17000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '262',
              rectangle: {
                position: {
                  x: 17000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '263',
              rectangle: {
                position: {
                  x: 17000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '264',
              rectangle: {
                position: {
                  x: 17000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '271',
              rectangle: {
                position: {
                  x: 19000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '272',
              rectangle: {
                position: {
                  x: 19000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '273',
              rectangle: {
                position: {
                  x: 19000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '274',
              rectangle: {
                position: {
                  x: 19000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '281',
              rectangle: {
                position: {
                  x: 23000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '282',
              rectangle: {
                position: {
                  x: 23000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '283',
              rectangle: {
                position: {
                  x: 23000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '284',
              rectangle: {
                position: {
                  x: 23000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '291',
              rectangle: {
                position: {
                  x: 25000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '292',
              rectangle: {
                position: {
                  x: 25000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '293',
              rectangle: {
                position: {
                  x: 25000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '294',
              rectangle: {
                position: {
                  x: 25000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '301',
              rectangle: {
                position: {
                  x: 29000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '302',
              rectangle: {
                position: {
                  x: 29000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '303',
              rectangle: {
                position: {
                  x: 29000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '304',
              rectangle: {
                position: {
                  x: 29000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '311',
              rectangle: {
                position: {
                  x: 31000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '312',
              rectangle: {
                position: {
                  x: 31000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '313',
              rectangle: {
                position: {
                  x: 31000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '314',
              rectangle: {
                position: {
                  x: 31000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '321',
              rectangle: {
                position: {
                  x: 35000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '322',
              rectangle: {
                position: {
                  x: 35000,
                  y: 2000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '323',
              rectangle: {
                position: {
                  x: 35000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '324',
              rectangle: {
                position: {
                  x: 35000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '342',
              rectangle: {
                position: {
                  x: 41000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '343',
              rectangle: {
                position: {
                  x: 41000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '344',
              rectangle: {
                position: {
                  x: 41000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '351',
              rectangle: {
                position: {
                  x: 43000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '352',
              rectangle: {
                position: {
                  x: 43000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '353',
              rectangle: {
                position: {
                  x: 43000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '354',
              rectangle: {
                position: {
                  x: 43000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '361',
              rectangle: {
                position: {
                  x: 47000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '362',
              rectangle: {
                position: {
                  x: 47000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '363',
              rectangle: {
                position: {
                  x: 47000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '364',
              rectangle: {
                position: {
                  x: 47000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '371',
              rectangle: {
                position: {
                  x: 49000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '372',
              rectangle: {
                position: {
                  x: 49000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '373',
              rectangle: {
                position: {
                  x: 49000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '374',
              rectangle: {
                position: {
                  x: 49000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 0,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '381',
              rectangle: {
                position: {
                  x: 53000,
                  y: 0,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '382',
              rectangle: {
                position: {
                  x: 53000,
                  y: 4000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '383',
              rectangle: {
                position: {
                  x: 53000,
                  y: 6000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
            {
              number: '384',
              rectangle: {
                position: {
                  x: 53000,
                  y: 8000,
                  z: 1,
                },
                dimension: {
                  width: 2000,
                  height: 2000,
                },
              },
              orientation: 180,
              placeProperties: [],
              state: 'FREE',
              placeLocations: [],
            },
          ],
        },
        {
          serviceClass: 'BASIC',
          travelClass: 'SECOND',
          accommodationSubType: 'SILENCE_ICON',
          places: [],
        },
      ],
      graphicElements: [
        {
          rectangle: {
            position: {
              x: 3000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 3000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 9000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 9000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 15000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 15000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 1000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 0,
          type: 'WALL_RIGHT_3',
        },
        {
          rectangle: {
            position: {
              x: 6000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 0,
          type: 'T_WALL_COMPARTMENTS_3',
        },
        {
          rectangle: {
            position: {
              x: 12000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 0,
          type: 'WALL_COMPARTMENTS_3',
        },
        {
          rectangle: {
            position: {
              x: 17000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 0,
          type: 'WALL_LEFT_3',
        },
        {
          rectangle: {
            position: {
              x: 1000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'WALL_LEFT_1',
        },
        {
          rectangle: {
            position: {
              x: 6000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'T_WALL_COMPARTMENTS_1',
        },
        {
          rectangle: {
            position: {
              x: 12000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'WALL_COMPARTMENTS_1',
        },
        {
          rectangle: {
            position: {
              x: 17000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'WALL_RIGHT_1',
        },
        {
          rectangle: {
            position: {
              x: 21000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 21000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 27000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 27000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 33000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 33000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 24000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 0,
          type: 'T_WALL_COMPARTMENTS_2',
        },
        {
          rectangle: {
            position: {
              x: 30000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 0,
          type: 'WALL_COMPARTMENTS_2',
        },
        {
          rectangle: {
            position: {
              x: 35000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 0,
          type: 'WALL_LEFT_2',
        },
        {
          rectangle: {
            position: {
              x: 24000,
              y: 6000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 180,
          type: 'T_WALL_COMPARTMENTS_2',
        },
        {
          rectangle: {
            position: {
              x: 30000,
              y: 6000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 180,
          type: 'WALL_COMPARTMENTS_2',
        },
        {
          rectangle: {
            position: {
              x: 35000,
              y: 6000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 4000,
            },
          },
          orientation: 180,
          type: 'WALL_RIGHT_2',
        },
        {
          rectangle: {
            position: {
              x: 39000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 39000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 45000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 45000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 51000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 51000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 180,
          type: 'TABLE',
        },
        {
          rectangle: {
            position: {
              x: 42000,
              y: 4000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 180,
          type: 'T_WALL_COMPARTMENTS_3',
        },
        {
          rectangle: {
            position: {
              x: 48000,
              y: 4000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 180,
          type: 'WALL_COMPARTMENTS_3',
        },
        {
          rectangle: {
            position: {
              x: 53000,
              y: 4000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 6000,
            },
          },
          orientation: 180,
          type: 'WALL_RIGHT_3',
        },
        {
          rectangle: {
            position: {
              x: 55000,
              y: 0,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'TOILET_AREA',
        },
        {
          rectangle: {
            position: {
              x: 55000,
              y: 8000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          orientation: 0,
          type: 'LUGGAGE_AREA',
        },
        {
          rectangle: {
            position: {
              x: 0,
              y: 0,
              z: 0,
            },
            dimension: {
              width: 1000,
              height: 10000,
            },
          },
          orientation: 0,
          type: 'COACH_WALL_NO_PASSAGE',
        },
        {
          rectangle: {
            position: {
              x: 57000,
              y: 0,
              z: 0,
            },
            dimension: {
              width: 1000,
              height: 10000,
            },
          },
          orientation: 180,
          type: 'COACH_WALL_NO_PASSAGE',
        },
      ],
      serviceIcons: [
        {
          rectangle: {
            position: {
              x: 19000,
              y: 4000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          type: 'SILENCE_ICON',
        },
        {
          rectangle: {
            position: {
              x: 37000,
              y: 2000,
              z: 2,
            },
            dimension: {
              width: 2000,
              height: 2000,
            },
          },
          type: 'MOBILE_PHONE_ICON',
        },
      ],
    },
  },
  {
    notifications: [],
    vehicleAvailability: {
      coaches: [
        {
          number: '21',
          travelDirection: 'UNSPECIFIED',
          decks: [
            {
              layoutID: 'b204d012-1b16-4729-86fe-6c99f0f9f112',
              compartments: [
                {
                  serviceClass: 'BASIC',
                  accommodationType: 'SEAT',
                  accommodationSubType: 'ANY_SEAT',
                  places: [
                    {
                      number: '15',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '17',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '13',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '11',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '16',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '18',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '14',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '12',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '25',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '27',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '21',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '26',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '28',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '24',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '22',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '35',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '37',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '33',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '31',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '36',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '38',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '34',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '32',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '45',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '47',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '43',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '41',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '46',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '48',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '44',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '42',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '55',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '57',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '53',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '51',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '56',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '58',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '54',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '52',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '65',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '67',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '63',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '61',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '66',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '68',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '64',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '62',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '75',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '77',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '73',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '71',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '76',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '78',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '74',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '72',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '85',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '87',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '83',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '81',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '86',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '88',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '84',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '82',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                  ],
                  number: '1',
                  reservationRefs: [],
                },
              ],
            },
          ],
        },
        {
          number: '22',
          travelDirection: 'UNSPECIFIED',
          decks: [
            {
              layoutID: '94bdbf56-18e2-4963-a98b-cf9e1d873c66',
              compartments: [
                {
                  serviceClass: 'BASIC',
                  accommodationType: 'SEAT',
                  accommodationSubType: 'ANY_SEAT',
                  places: [
                    {
                      number: '15',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '17',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '16',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '18',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '14',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '12',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '35',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '37',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '33',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '31',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '36',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '38',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '34',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '32',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '45',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '47',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '43',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '41',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '46',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '48',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '44',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '42',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '55',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '57',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '53',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '51',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '56',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '58',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '54',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '52',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '65',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '67',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '63',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '61',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '66',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '68',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '64',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '62',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '75',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '77',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '73',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '71',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '76',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '78',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '74',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '72',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '85',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '87',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '83',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '81',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '86',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '88',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '84',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '82',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '95',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '97',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '93',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '91',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '96',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '98',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '94',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '92',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                  ],
                  number: '1',
                  reservationRefs: [],
                },
              ],
            },
          ],
        },
        {
          number: '23',
          travelDirection: 'UNSPECIFIED',
          decks: [
            {
              layoutID: 'd9db5dfe-01b2-4ccd-9002-6fc4588bbd07',
              compartments: [
                {
                  serviceClass: 'BASIC',
                  accommodationType: 'SEAT',
                  accommodationSubType: 'ANY_SEAT',
                  places: [
                    {
                      number: '15',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '17',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '13',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '11',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '16',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '18',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '14',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '12',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '35',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '37',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '33',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '31',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '36',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '38',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '34',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '32',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '45',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '47',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '43',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '41',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '46',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '48',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '44',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '42',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '55',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '57',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '53',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '51',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '56',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '58',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '54',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '52',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '63',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '61',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '66',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '68',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '64',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '62',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '75',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '77',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '73',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '71',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '76',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '78',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '74',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '72',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '85',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '87',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '83',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '81',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '86',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '88',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '84',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '82',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '95',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '97',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '93',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '91',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '96',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '98',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '94',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '92',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                  ],
                  number: '1',
                  reservationRefs: [],
                },
              ],
            },
          ],
        },
        {
          number: '24',
          travelDirection: 'UNSPECIFIED',
          decks: [
            {
              layoutID: '87a67b15-035b-4744-8ed0-74754bac265f',
              compartments: [
                {
                  serviceClass: 'BASIC',
                  accommodationType: 'SEAT',
                  accommodationSubType: 'ANY_SEAT',
                  places: [
                    {
                      number: '101',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '102',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '103',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '15',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '17',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '13',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '11',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '16',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '18',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '14',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '12',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '35',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '37',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '33',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '31',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '36',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '38',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '34',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '32',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '45',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '47',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '43',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '41',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '46',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '48',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '44',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '42',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '55',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '57',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '53',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '51',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '56',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '58',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '54',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '52',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '65',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '67',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '63',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '61',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '66',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '68',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '64',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '62',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '75',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '77',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '73',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '71',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '76',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '78',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '74',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '72',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '85',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '87',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '83',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '81',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '86',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '88',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '84',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '82',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '95',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '97',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '93',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '91',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '96',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '98',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '94',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '92',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                  ],
                  number: '1',
                  reservationRefs: [],
                },
              ],
            },
          ],
        },
        {
          number: '26',
          travelDirection: 'UNSPECIFIED',
          decks: [
            {
              layoutID: '74badca8-5157-44f2-bf59-58516a0e8e9e',
              compartments: [
                {
                  serviceClass: 'BASIC',
                  accommodationType: 'SEAT',
                  accommodationSubType: 'ANY_SEAT',
                  places: [
                    {
                      number: '104',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '106',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '102',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '105',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '97',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '95',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                  ],
                  number: '1',
                  reservationRefs: [],
                },
              ],
            },
          ],
        },
        {
          number: '27',
          travelDirection: 'UNSPECIFIED',
          decks: [
            {
              layoutID: 'a07f9b35-216d-49aa-8963-53f2b7089ce0',
              compartments: [
                {
                  serviceClass: 'BASIC',
                  accommodationType: 'SEAT',
                  accommodationSubType: 'ANY_SEAT',
                  places: [
                    {
                      number: '116',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '118',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '114',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '112',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '115',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '117',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '113',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '111',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '106',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '108',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '104',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '102',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '105',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '107',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '103',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '101',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '96',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '98',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '94',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '92',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '95',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '97',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '93',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '91',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '86',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '88',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '84',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '82',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '85',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '87',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '83',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '81',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '76',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '78',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '74',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '72',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '75',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '77',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '73',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '71',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '66',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '68',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '64',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '62',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '65',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '67',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '61',
                      status: 'FREE',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '26',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '24',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '22',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '25',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '23',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '21',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '16',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '14',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '12',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '15',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '13',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '11',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                  ],
                  number: '1',
                  reservationRefs: [],
                },
              ],
            },
          ],
        },
        {
          number: '28',
          travelDirection: 'UNSPECIFIED',
          decks: [
            {
              layoutID: '963969b0-da7a-4684-8331-4f4ac674b8f5',
              compartments: [
                {
                  serviceClass: 'HIGH',
                  accommodationType: 'SEAT',
                  accommodationSubType: 'ANY_SEAT',
                  places: [
                    {
                      number: '82',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '86',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '81',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '83',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '85',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '72',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '74',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '76',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '71',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '73',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '75',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '62',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '64',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '66',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '61',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '63',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '65',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '52',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '54',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '56',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '46',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '55',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '45',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '43',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '41',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '36',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '34',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '32',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '35',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '33',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '31',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '26',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '24',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '22',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '25',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '23',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '21',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '16',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '14',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '12',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '15',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '13',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                    {
                      number: '11',
                      status: 'ALLOCATED',
                      reservationRefs: [
                        {
                          contextId: '0922d591-95a0-4270-9a72-956890e2a71c',
                          contextType: 'OFFER',
                          resourceId: '243d9527-ef03-4d78-88d2-ad91834c5e0a',
                          resourceType: 'RESERVATION',
                        },
                      ],
                    },
                  ],
                  number: '1',
                  reservationRefs: [],
                },
              ],
            },
          ],
        },
      ],
      preSelectedPlaces: [],
      preSelectedCompartments: [],
    },
    coachDeckLayouts: [
      {
        name: 'coach information missing',
        dimension: {
          width: 42000,
          height: 10000,
        },
        id: 'b204d012-1b16-4729-86fe-6c99f0f9f112',
        deckLevel: 'SINGLE_DECK',
        placeGroups: [
          {
            serviceClass: 'BASIC',
            accommodationType: 'SEAT',
            places: [
              {
                number: '15',
                rectangle: {
                  position: {
                    x: 0,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '17',
                rectangle: {
                  position: {
                    x: 0,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '13',
                rectangle: {
                  position: {
                    x: 0,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '11',
                rectangle: {
                  position: {
                    x: 0,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '16',
                rectangle: {
                  position: {
                    x: 2000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '18',
                rectangle: {
                  position: {
                    x: 2000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '14',
                rectangle: {
                  position: {
                    x: 2000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '12',
                rectangle: {
                  position: {
                    x: 2000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '25',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '27',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '21',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '26',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '28',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '24',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '22',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '35',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '37',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '33',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '31',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '36',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '38',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '34',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '32',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '45',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '47',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '43',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '41',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '46',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '48',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '44',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '42',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '55',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '57',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '53',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '51',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '56',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '58',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '54',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '52',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '65',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '67',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '63',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '61',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '66',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '68',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '64',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '62',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '75',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '77',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '73',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '71',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '76',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '78',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '74',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '72',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '85',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '87',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '83',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '81',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '86',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '88',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '84',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '82',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
            ],
          },
        ],
        graphicElements: [
          {
            rectangle: {
              position: {
                x: 3000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 3000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 5000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 5000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 8000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 8000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 18000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 18000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 28000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 28000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 38000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 38000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 0,
            type: 'COACH_WALL_NO_PASSAGE',
          },
          {
            rectangle: {
              position: {
                x: 41000,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 180,
            type: 'COACH_WALL_NO_PASSAGE',
          },
        ],
        serviceIcons: [
          {
            rectangle: {
              position: {
                x: 0,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'SILENCE_ICON',
          },
          {
            rectangle: {
              position: {
                x: 2000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'MOBILE_PHONE_FORBIDDEN_ICON',
          },
          {
            rectangle: {
              position: {
                x: 22000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'MOBILE_PHONE_ICON',
          },
        ],
      },
      {
        name: 'coach information missing',
        dimension: {
          width: 48000,
          height: 10000,
        },
        id: '94bdbf56-18e2-4963-a98b-cf9e1d873c66',
        deckLevel: 'SINGLE_DECK',
        placeGroups: [
          {
            serviceClass: 'BASIC',
            accommodationType: 'SEAT',
            places: [
              {
                number: '15',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '17',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '16',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '18',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '14',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '12',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '35',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '37',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '33',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '31',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '36',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '38',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '34',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '32',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '45',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '47',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '43',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '41',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '46',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '48',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '44',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '42',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '55',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '57',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '53',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '51',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '56',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '58',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '54',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '52',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '65',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '67',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '63',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '61',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '66',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '68',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '64',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '62',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '75',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '77',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '73',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '71',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '76',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '78',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '74',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '72',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '85',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '87',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '83',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '81',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '86',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '88',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '84',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '82',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '95',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '97',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '93',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '91',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '96',
                rectangle: {
                  position: {
                    x: 46000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '98',
                rectangle: {
                  position: {
                    x: 46000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '94',
                rectangle: {
                  position: {
                    x: 46000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '92',
                rectangle: {
                  position: {
                    x: 46000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
            ],
          },
        ],
        graphicElements: [
          {
            rectangle: {
              position: {
                x: 5000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 5000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 7000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 7000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 10000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 10000,
                y: 8000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 24000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 24000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 30000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 30000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 44000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 44000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'LUGGAGE_AREA',
          },
          {
            rectangle: {
              position: {
                x: 2000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TOILET_AREA',
          },
          {
            rectangle: {
              position: {
                x: 4000,
                y: 2000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TOILET_AREA',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 0,
            type: 'COACH_WALL_NO_PASSAGE',
          },
          {
            rectangle: {
              position: {
                x: 47000,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 180,
            type: 'COACH_WALL_NO_PASSAGE',
          },
        ],
        serviceIcons: [
          {
            rectangle: {
              position: {
                x: 4000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'WHEELCHAIR_ICON',
          },
          {
            rectangle: {
              position: {
                x: 8000,
                y: 8000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'WHEELCHAIR_ICON',
          },
          {
            rectangle: {
              position: {
                x: 10000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'EASY_ACCESS_ICON',
          },
          {
            rectangle: {
              position: {
                x: 24000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'MOBILE_PHONE_FORBIDDEN_ICON',
          },
          {
            rectangle: {
              position: {
                x: 28000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'SILENCE_ICON',
          },
        ],
      },
      {
        name: 'coach information missing',
        dimension: {
          width: 46000,
          height: 10000,
        },
        id: 'd9db5dfe-01b2-4ccd-9002-6fc4588bbd07',
        deckLevel: 'SINGLE_DECK',
        placeGroups: [
          {
            serviceClass: 'BASIC',
            accommodationType: 'SEAT',
            places: [
              {
                number: '15',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '17',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '13',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '11',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '16',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '18',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '14',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '12',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '35',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '37',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '33',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '31',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '36',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '38',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '34',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '32',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '45',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '47',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '43',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '41',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '46',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '48',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '44',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '42',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '55',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '57',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '53',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '51',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '56',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '58',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '54',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '52',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '63',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '61',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '66',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '68',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '64',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '62',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '75',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '77',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '73',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '71',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '76',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '78',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '74',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '72',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '85',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '87',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '83',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '81',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '86',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '88',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '84',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '82',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '95',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '97',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '93',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '91',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '96',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '98',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '94',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '92',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
            ],
          },
        ],
        graphicElements: [
          {
            rectangle: {
              position: {
                x: 3000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 3000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 5000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 5000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 8000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 8000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 22000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 22000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 32000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 32000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 42000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 42000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TOILET_AREA',
          },
          {
            rectangle: {
              position: {
                x: 2000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TOILET_AREA',
          },
          {
            rectangle: {
              position: {
                x: 26000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'LUGGAGE_AREA',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 0,
            type: 'COACH_WALL_NO_PASSAGE',
          },
          {
            rectangle: {
              position: {
                x: 45000,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 180,
            type: 'COACH_WALL_NO_PASSAGE',
          },
        ],
        serviceIcons: [
          {
            rectangle: {
              position: {
                x: 26000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'MOBILE_PHONE_ICON',
          },
        ],
      },
      {
        name: 'coach information missing',
        dimension: {
          width: 52000,
          height: 10000,
        },
        id: '87a67b15-035b-4744-8ed0-74754bac265f',
        deckLevel: 'SINGLE_DECK',
        placeGroups: [
          {
            serviceClass: 'BASIC',
            accommodationType: 'SEAT',
            places: [
              {
                number: '101',
                rectangle: {
                  position: {
                    x: 2000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 90,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '102',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 90,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '103',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 90,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '15',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '17',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '13',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '11',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '16',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '18',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '14',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '12',
                rectangle: {
                  position: {
                    x: 16000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '35',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '37',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '33',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '31',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '36',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '38',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '34',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '32',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '45',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '47',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '43',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '41',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '46',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '48',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '44',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '42',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '55',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '57',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '53',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '51',
                rectangle: {
                  position: {
                    x: 26000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '56',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '58',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '54',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '52',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '65',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '67',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '63',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '61',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '66',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '68',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '64',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '62',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '75',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '77',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '73',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '71',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '76',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '78',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '74',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '72',
                rectangle: {
                  position: {
                    x: 40000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '85',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '87',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '83',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '81',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '86',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '88',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '84',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '82',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '95',
                rectangle: {
                  position: {
                    x: 46000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '97',
                rectangle: {
                  position: {
                    x: 46000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '93',
                rectangle: {
                  position: {
                    x: 46000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '91',
                rectangle: {
                  position: {
                    x: 46000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '96',
                rectangle: {
                  position: {
                    x: 50000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '98',
                rectangle: {
                  position: {
                    x: 50000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '94',
                rectangle: {
                  position: {
                    x: 50000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '92',
                rectangle: {
                  position: {
                    x: 50000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
            ],
          },
        ],
        graphicElements: [
          {
            rectangle: {
              position: {
                x: 9000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 9000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 11000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 11000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 14000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 14000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 28000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 28000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 34000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 34000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 48000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 48000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TOILET_AREA',
          },
          {
            rectangle: {
              position: {
                x: 4000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'LUGGAGE_AREA',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 0,
            type: 'COACH_WALL_NO_PASSAGE',
          },
          {
            rectangle: {
              position: {
                x: 51000,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 180,
            type: 'COACH_WALL_NO_PASSAGE',
          },
        ],
        serviceIcons: [
          {
            rectangle: {
              position: {
                x: 4000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'BICYCLE_ICON',
          },
          {
            rectangle: {
              position: {
                x: 16000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'FAMILY',
          },
          {
            rectangle: {
              position: {
                x: 36000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'MOBILE_PHONE_ICON',
          },
        ],
      },
      {
        name: 'coach information missing',
        dimension: {
          width: 30000,
          height: 10000,
        },
        id: '74badca8-5157-44f2-bf59-58516a0e8e9e',
        deckLevel: 'SINGLE_DECK',
        placeGroups: [
          {
            serviceClass: 'BASIC',
            accommodationType: 'SEAT',
            places: [
              {
                number: '104',
                rectangle: {
                  position: {
                    x: 2000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '106',
                rectangle: {
                  position: {
                    x: 2000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '102',
                rectangle: {
                  position: {
                    x: 4000,
                    y: 4000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 90,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '105',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '97',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '95',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
            ],
          },
        ],
        graphicElements: [
          {
            rectangle: {
              position: {
                x: 4000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 8000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 6000,
              },
            },
            orientation: 180,
            type: 'WALL_RIGHT_3',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 8000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TOILET_AREA',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 0,
            type: 'COACH_WALL_NO_PASSAGE',
          },
          {
            rectangle: {
              position: {
                x: 29000,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 180,
            type: 'COACH_WALL_NO_PASSAGE',
          },
        ],
        serviceIcons: [
          {
            rectangle: {
              position: {
                x: 2000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'TODDLER',
          },
          {
            rectangle: {
              position: {
                x: 14000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'BISTRO_ICON',
          },
          {
            rectangle: {
              position: {
                x: 24000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'RESTAURANT_ICON',
          },
        ],
      },
      {
        name: 'coach information missing',
        dimension: {
          width: 48000,
          height: 10000,
        },
        id: 'a07f9b35-216d-49aa-8963-53f2b7089ce0',
        deckLevel: 'SINGLE_DECK',
        placeGroups: [
          {
            serviceClass: 'BASIC',
            accommodationType: 'SEAT',
            places: [
              {
                number: '116',
                rectangle: {
                  position: {
                    x: 0,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '118',
                rectangle: {
                  position: {
                    x: 0,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '114',
                rectangle: {
                  position: {
                    x: 0,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '112',
                rectangle: {
                  position: {
                    x: 0,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '115',
                rectangle: {
                  position: {
                    x: 4000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '117',
                rectangle: {
                  position: {
                    x: 4000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '113',
                rectangle: {
                  position: {
                    x: 4000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '111',
                rectangle: {
                  position: {
                    x: 4000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '106',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '108',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '104',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '102',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '105',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '107',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '103',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '101',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '96',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '98',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '94',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '92',
                rectangle: {
                  position: {
                    x: 10000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '95',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '97',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '93',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '91',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '86',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '88',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '84',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '82',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '85',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '87',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '83',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '81',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '76',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '78',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '74',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '72',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '75',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '77',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '73',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '71',
                rectangle: {
                  position: {
                    x: 22000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '66',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '68',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '64',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '62',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '65',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '67',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '61',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '26',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '24',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '22',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '25',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '23',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '21',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '16',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '14',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '12',
                rectangle: {
                  position: {
                    x: 36000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '15',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '13',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '11',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
            ],
          },
        ],
        graphicElements: [
          {
            rectangle: {
              position: {
                x: 2000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 2000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 16000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 16000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 26000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 26000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 29000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 29000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 32000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 32000,
                y: 8000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 39000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 39000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 41000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 41000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 42000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'LUGGAGE_AREA',
          },
          {
            rectangle: {
              position: {
                x: 42000,
                y: 8000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'LUGGAGE_AREA',
          },
          {
            rectangle: {
              position: {
                x: 44000,
                y: 8000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TOILET_AREA',
          },
          {
            rectangle: {
              position: {
                x: 46000,
                y: 8000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TOILET_AREA',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 0,
            type: 'COACH_WALL_NO_PASSAGE',
          },
          {
            rectangle: {
              position: {
                x: 47000,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 180,
            type: 'COACH_WALL_NO_PASSAGE',
          },
        ],
        serviceIcons: [
          {
            rectangle: {
              position: {
                x: 16000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'MOBILE_PHONE_ICON',
          },
          {
            rectangle: {
              position: {
                x: 34000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'MOBILE_PHONE_ICON',
          },
        ],
      },
      {
        name: 'coach information missing',
        dimension: {
          width: 46000,
          height: 10000,
        },
        id: '963969b0-da7a-4684-8331-4f4ac674b8f5',
        deckLevel: 'SINGLE_DECK',
        placeGroups: [
          {
            serviceClass: 'HIGH',
            accommodationType: 'SEAT',
            places: [
              {
                number: '82',
                rectangle: {
                  position: {
                    x: 2000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '86',
                rectangle: {
                  position: {
                    x: 2000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '81',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '83',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '85',
                rectangle: {
                  position: {
                    x: 6000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '72',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '74',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '76',
                rectangle: {
                  position: {
                    x: 8000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '71',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: ['RESTRICTED_VIEW'],
                placeLocations: [],
              },
              {
                number: '73',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '75',
                rectangle: {
                  position: {
                    x: 12000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '62',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '64',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '66',
                rectangle: {
                  position: {
                    x: 14000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '61',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '63',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '65',
                rectangle: {
                  position: {
                    x: 18000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '52',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '54',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 6000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '56',
                rectangle: {
                  position: {
                    x: 20000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '46',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '55',
                rectangle: {
                  position: {
                    x: 24000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '45',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '43',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '41',
                rectangle: {
                  position: {
                    x: 28000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '36',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '34',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '32',
                rectangle: {
                  position: {
                    x: 30000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '35',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '33',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '31',
                rectangle: {
                  position: {
                    x: 32000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '26',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '24',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '22',
                rectangle: {
                  position: {
                    x: 34000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '25',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '23',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '21',
                rectangle: {
                  position: {
                    x: 38000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 180,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '16',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '14',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '12',
                rectangle: {
                  position: {
                    x: 42000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '15',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 0,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '13',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 2000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
              {
                number: '11',
                rectangle: {
                  position: {
                    x: 44000,
                    y: 8000,
                    z: 1,
                  },
                  dimension: {
                    width: 2000,
                    height: 2000,
                  },
                },
                orientation: 0,
                placeProperties: [],
                placeLocations: [],
              },
            ],
          },
        ],
        graphicElements: [
          {
            rectangle: {
              position: {
                x: 4000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 4000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 8000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'WALL_LEFT_2',
          },
          {
            rectangle: {
              position: {
                x: 10000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 13000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_2',
          },
          {
            rectangle: {
              position: {
                x: 16000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 16000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 18000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'WALL_RIGHT_2',
          },
          {
            rectangle: {
              position: {
                x: 22000,
                y: 6000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 26000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 36000,
                y: 0,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 4000,
              },
            },
            orientation: 0,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 36000,
                y: 8000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'TABLE',
          },
          {
            rectangle: {
              position: {
                x: 39000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 39000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 41000,
                y: 1000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 41000,
                y: 7000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 180,
            type: 'WALL_COMPARTMENTS_1',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 8000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            orientation: 0,
            type: 'LUGGAGE_AREA',
          },
          {
            rectangle: {
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 0,
            type: 'COACH_WALL_NO_PASSAGE',
          },
          {
            rectangle: {
              position: {
                x: 45000,
                y: 0,
                z: 0,
              },
              dimension: {
                width: 1000,
                height: 10000,
              },
            },
            orientation: 180,
            type: 'COACH_WALL_NO_PASSAGE',
          },
        ],
        serviceIcons: [
          {
            rectangle: {
              position: {
                x: 20000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'MOBILE_PHONE_ICON',
          },
          {
            rectangle: {
              position: {
                x: 36000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'EASY_ACCESS_ICON',
          },
          {
            rectangle: {
              position: {
                x: 42000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'SILENCE_ICON',
          },
          {
            rectangle: {
              position: {
                x: 44000,
                y: 4000,
                z: 2,
              },
              dimension: {
                width: 2000,
                height: 2000,
              },
            },
            type: 'MOBILE_PHONE_FORBIDDEN_ICON',
          },
        ],
      },
    ],
  },
];

export const MOCK_DB_WALLS_TRAIN: SeatReservation = {
  vehicleType: 'TRAIN',
  deckCoachIndex: 0,
  deckCoachLevel: 'SINGLE_DECK',
  coachItems: [
    {
      id: '21',
      number: 'coach information missing',
      dimension: {
        w: 58000,
        h: 10000,
      },
      places: [
        {
          number: '15',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 0,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '17',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 0,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '13',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 0,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '11',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 0,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '16',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 2000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '18',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 2000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '14',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 2000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '12',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 2000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '25',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 4000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '27',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 4000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '23',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 4000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '21',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 4000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '26',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 8000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '28',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 8000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '24',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 8000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '22',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 8000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '35',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 10000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '37',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 10000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '33',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 10000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '31',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 10000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '36',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 12000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '38',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 12000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '34',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 12000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '32',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 12000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '43',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 14000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '41',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 14000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '46',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 16000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '48',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 16000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '44',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 16000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '42',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 16000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '55',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 18000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '57',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 18000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '53',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 18000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '51',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 18000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '65',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 20000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '67',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 20000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '63',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 20000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '61',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 20000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '66',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 24000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '68',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 24000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '64',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 24000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '62',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 24000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '75',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 26000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '77',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 26000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '76',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 28000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '78',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 28000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '85',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 30000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '83',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 30000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '81',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 30000,
            y: 4000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '86',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 34000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '84',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 34000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '82',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 34000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '95',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 36000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '93',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 36000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '91',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 36000,
            y: 4000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '96',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 40000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '94',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 40000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '92',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 40000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '105',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 42000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '103',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 42000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '101',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 42000,
            y: 4000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '106',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 46000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '104',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 46000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '102',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 46000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '115',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 48000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '113',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 48000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '111',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 48000,
            y: 4000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '116',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 52000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '114',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 52000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '112',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 52000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
      ],
      serviceElements: [
        {
          icon: 'MOBILE_PHONE_ICON',
          position: {
            x: 14000,
            y: 4000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
        },
        {
          icon: 'SILENCE_ICON',
          position: {
            x: 40000,
            y: 6000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
        },
        {
          icon: 'MOBILE_PHONE_FORBIDDEN_ICON',
          position: {
            x: 42000,
            y: 6000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
        },
      ],
      graphicElements: [
        {
          icon: 'TABLE',
          position: {
            x: 6000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 6000,
            y: 6000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE',
          position: {
            x: 22000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 22000,
            y: 6000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 180,
        },
        {
          icon: 'WALL_RIGHT_3',
          position: {
            x: 30000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 32000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'T_WALL_COMPARTMENTS_3',
          position: {
            x: 35000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 38000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'T_WALL_COMPARTMENTS_3',
          position: {
            x: 41000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 44000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'T_WALL_COMPARTMENTS_3',
          position: {
            x: 47000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 50000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'WALL_LEFT_3',
          position: {
            x: 52000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 0,
        },
        {
          icon: 'LUGGAGE_AREA',
          position: {
            x: 14000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'LUGGAGE_AREA',
          position: {
            x: 26000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TOILET_AREA',
          position: {
            x: 54000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TOILET_AREA',
          position: {
            x: 56000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1000,
            h: 10000,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 57000,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1000,
            h: 10000,
          },
          rotation: 180,
        },
      ],
      travelClass: ['SECOND'],
      propertyIds: ['SEAT', 'MOBILE_PHONE_ICON'],
    },
    {
      id: '22',
      number: 'coach all partition walls',
      dimension: {
        w: 58000,
        h: 10000,
      },
      places: [
        {
          number: '211',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 1000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '212',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 1000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '213',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 1000,
            y: 4000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '214',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 1000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '221',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 5000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '222',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 5000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '223',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 5000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '224',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 5000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '231',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 7000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '232',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 7000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '233',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 7000,
            y: 4000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '234',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 7000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '241',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 11000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '242',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 11000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '243',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 11000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '244',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 11000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '251',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 13000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '252',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 13000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '253',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 13000,
            y: 4000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '254',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 13000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '261',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 17000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '262',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 17000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '263',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 17000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '264',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 17000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '271',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 19000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '272',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 19000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '273',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 19000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '274',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 19000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '281',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 23000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '282',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 23000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '283',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 23000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '284',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 23000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '291',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 25000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '292',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 25000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '293',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 25000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '294',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 25000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '301',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 29000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '302',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 29000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '303',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 29000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '304',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 29000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '311',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 31000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '312',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 31000,
            y: 2000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '313',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 31000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '314',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 31000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '321',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 35000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '322',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 35000,
            y: 2000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '323',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 35000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '324',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 35000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '342',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 41000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '343',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 41000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '344',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 41000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '351',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 43000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '352',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 43000,
            y: 4000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '353',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 43000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '354',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 43000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '361',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 47000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '362',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 47000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '363',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 47000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '364',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 47000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '371',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 49000,
            y: 0,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '372',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 49000,
            y: 4000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '373',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 49000,
            y: 6000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '374',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 49000,
            y: 8000,
            z: 1,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '381',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 53000,
            y: 0,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '382',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 53000,
            y: 4000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '383',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 53000,
            y: 6000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
        {
          number: '384',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2000,
            h: 2000,
          },
          position: {
            x: 53000,
            y: 8000,
            z: 1,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: [],
        },
      ],
      serviceElements: [
        {
          icon: 'SILENCE_ICON',
          position: {
            x: 19000,
            y: 4000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
        },
        {
          icon: 'MOBILE_PHONE_ICON',
          position: {
            x: 37000,
            y: 2000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
        },
      ],
      graphicElements: [
        {
          icon: 'TABLE',
          position: {
            x: 3000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 3000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE',
          position: {
            x: 9000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 9000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE',
          position: {
            x: 15000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 15000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'WALL_RIGHT_3',
          position: {
            x: 1000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 0,
        },
        {
          icon: 'T_WALL_COMPARTMENTS_3',
          position: {
            x: 6000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 0,
        },
        {
          icon: 'WALL_COMPARTMENTS_3',
          position: {
            x: 12000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 0,
        },
        {
          icon: 'WALL_LEFT_3',
          position: {
            x: 17000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 0,
        },
        {
          icon: 'WALL_LEFT_1',
          position: {
            x: 1000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'T_WALL_COMPARTMENTS_1',
          position: {
            x: 6000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'WALL_COMPARTMENTS_1',
          position: {
            x: 12000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'WALL_RIGHT_1',
          position: {
            x: 17000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE',
          position: {
            x: 21000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 21000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE',
          position: {
            x: 27000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 27000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE',
          position: {
            x: 33000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 33000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'T_WALL_COMPARTMENTS_2',
          position: {
            x: 24000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 0,
        },
        {
          icon: 'WALL_COMPARTMENTS_2',
          position: {
            x: 30000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 0,
        },
        {
          icon: 'WALL_LEFT_2',
          position: {
            x: 35000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 0,
        },
        {
          icon: 'T_WALL_COMPARTMENTS_2',
          position: {
            x: 24000,
            y: 6000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 180,
        },
        {
          icon: 'WALL_COMPARTMENTS_2',
          position: {
            x: 30000,
            y: 6000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 180,
        },
        {
          icon: 'WALL_RIGHT_2',
          position: {
            x: 35000,
            y: 6000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 4000,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE',
          position: {
            x: 39000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 39000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE',
          position: {
            x: 45000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 45000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE',
          position: {
            x: 51000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE',
          position: {
            x: 51000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 180,
        },
        {
          icon: 'T_WALL_COMPARTMENTS_3',
          position: {
            x: 42000,
            y: 4000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 180,
        },
        {
          icon: 'WALL_COMPARTMENTS_3',
          position: {
            x: 48000,
            y: 4000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 180,
        },
        {
          icon: 'WALL_RIGHT_3',
          position: {
            x: 53000,
            y: 4000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 6000,
          },
          rotation: 180,
        },
        {
          icon: 'TOILET_AREA',
          position: {
            x: 55000,
            y: 0,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'LUGGAGE_AREA',
          position: {
            x: 55000,
            y: 8000,
            z: 2,
          },
          dimension: {
            w: 2000,
            h: 2000,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1000,
            h: 10000,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 57000,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1000,
            h: 10000,
          },
          rotation: 180,
        },
      ],
      travelClass: ['SECOND'],
      propertyIds: ['SEAT', 'SILENCE_ICON'],
    },
  ],
};
