import type { SeatReservationLayout } from './seat-reservation.js';

export const MOCK_SEAT_RESERVATION_LAYOUT_0: SeatReservationLayout = {
  coachItems: [
    {
      id: 'coach-layout-0',
      number: '1',
      dimension: {
        w: 64,
        h: 10,
      },
      places: [
        {
          icon: 'string',
          number: '21',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'RESTRICTED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 31,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '22',
          rotation: 180,
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'ALLOCATED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 37,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '41',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'ALLOCATED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 39,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '42',
          rotation: 180,
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '61',
          type: 'SEAT',
          propertyIds: ['WINDOW', 'POWER'],
          state: 'FREE',
          travelClass: 'FIRST',
          remarkId: 'First class seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 47,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '62',
          rotation: 180,
          type: 'SEAT',
          propertyIds: ['WINDOW', 'POWER'],
          state: 'FREE',
          travelClass: 'FIRST',
          remarkId: 'First class seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 53,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '13',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          travelClass: 'SECOND',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 31,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '14',
          rotation: 180,
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'RESTRICTED',
          travelClass: 'SECOND',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 37,
            y: 6,
            z: 0,
          },
        },

        {
          icon: 'string',
          number: '11',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'RESTRICTED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 31,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '12',
          rotation: 180,
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'ALLOCATED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 37,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '33',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 39,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '34',
          rotation: 180,
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '31',
          type: 'SEAT',
          propertyIds: ['WINDOW', 'POWER'],
          state: 'ALLOCATED',
          travelClass: 'FIRST',
          remarkId: 'First class seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 39,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '32',
          rotation: 180,
          type: 'SEAT',
          propertyIds: ['WINDOW', 'POWER'],
          state: 'RESTRICTED',
          travelClass: 'FIRST',
          remarkId: 'First class seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '53',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          travelClass: 'SECOND',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 47,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '51',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'RESTRICTED',
          travelClass: 'SECOND',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 47,
            y: 8,
            z: 0,
          },
        },
      ],
      signs: [
        {
          icon: 'WHEELCHAIR',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 36,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'RESTAURANT_ICON',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 32,
            y: 3,
            z: 0,
          },
        },
        {
          icon: 'RESTAURANT_ICON',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 20,
            y: 3,
            z: 0,
          },
        },
      ],
      internals: [
        {
          icon: 'ENTRY_EXIT',
          position: {
            x: 20,
            y: 9,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'DRIVER_AREA_FULL',
          dimension: {
            w: 12,
            h: 10,
          },
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'COACH_PASSAGE',
          dimension: {
            w: 1,
            h: 10,
          },
          position: {
            x: 63,
            y: 0,
            z: 0,
          },
          rotation: 180,
        },
      ],
      directedInternals: [
        {
          position: {
            x: 20,
            y: 9,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 4,
          },
          position: {
            x: 50,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 4,
          },
          position: {
            x: 42,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 50,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 34,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 4,
          },
          position: {
            x: 34,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 42,
            y: 0,
            z: 0,
          },
        },
      ],
      compartmentNumbers: [
        {
          number: '2',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 3,
            z: 0,
          },
        },
        {
          number: '1',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 40,
            y: 3,
            z: 0,
          },
        },
      ],
    },
    {
      id: 'coach-layout-1',
      number: '2',
      dimension: {
        w: 64,
        h: 10,
      },
      places: [
        {
          icon: 'string',
          number: '1',
          type: 'BIKE',
          propertyIds: ['WINDOW'],
          state: 'RESTRICTED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 10,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '2',
          type: 'BIKE',
          propertyIds: ['WINDOW'],
          state: 'RESTRICTED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 14,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '3',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'ALLOCATED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 18,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '4',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'ALLOCATED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 22,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '5',
          type: 'SEAT',
          propertyIds: ['WINDOW', 'POWER'],
          state: 'ALLOCATED',
          travelClass: 'FIRST',
          remarkId: 'First class seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 10,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '6',
          type: 'SEAT',
          propertyIds: ['WINDOW', 'POWER'],
          state: 'ALLOCATED',
          travelClass: 'FIRST',
          remarkId: 'First class seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 14,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '7',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          travelClass: 'SECOND',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 18,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '8',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          travelClass: 'SECOND',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 22,
            y: 8,
            z: 0,
          },
        },
      ],
      signs: [
        {
          icon: 'WHEELCHAIR',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 36,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'RESTAURANT_ICON',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 32,
            y: 3,
            z: 0,
          },
        },
        {
          icon: 'RESTAURANT_ICON',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 46,
            y: 3,
            z: 0,
          },
        },
      ],
      internals: [
        {
          icon: 'COACH_PASSAGE',
          dimension: {
            w: 1,
            h: 10,
          },
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'COACH_PASSAGE',
          dimension: {
            w: 1,
            h: 10,
          },
          position: {
            x: 63,
            y: 0,
            z: 0,
          },
          rotation: 180,
        },
      ],
      directedInternals: [
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 4,
          },
          position: {
            x: 42,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 50,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 34,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 4,
          },
          position: {
            x: 34,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 42,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 4,
          },
          position: {
            x: 50,
            y: 6,
            z: 0,
          },
        },
      ],
      compartmentNumbers: [
        {
          number: '2',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 10,
            y: 4,
            z: 0,
          },
        },
        {
          number: '1',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 40,
            y: 3,
            z: 0,
          },
        },
      ],
    },
    {
      id: 'coach-layout-1',
      number: '2',
      dimension: {
        w: 64,
        h: 10,
      },
      places: [
        {
          icon: 'string',
          number: '1',
          type: 'BIKE',
          propertyIds: ['WINDOW'],
          state: 'RESTRICTED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 10,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '2',
          type: 'BIKE',
          propertyIds: ['WINDOW'],
          state: 'RESTRICTED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 14,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '3',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'ALLOCATED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 18,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '4',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'ALLOCATED',
          travelClass: 'ANY_CLASS',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 22,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '5',
          type: 'SEAT',
          propertyIds: ['WINDOW', 'POWER'],
          state: 'ALLOCATED',
          travelClass: 'FIRST',
          remarkId: 'First class seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 10,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '6',
          type: 'SEAT',
          propertyIds: ['WINDOW', 'POWER'],
          state: 'ALLOCATED',
          travelClass: 'FIRST',
          remarkId: 'First class seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 14,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '7',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          travelClass: 'SECOND',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 18,
            y: 8,
            z: 0,
          },
        },
        {
          icon: 'string',
          number: '8',
          type: 'SEAT',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          travelClass: 'SECOND',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 22,
            y: 8,
            z: 0,
          },
        },
      ],
      signs: [
        {
          icon: 'WHEELCHAIR',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 36,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'RESTAURANT_ICON',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 32,
            y: 3,
            z: 0,
          },
        },
        {
          icon: 'RESTAURANT_ICON',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 46,
            y: 3,
            z: 0,
          },
        },
      ],
      internals: [
        {
          icon: 'DRIVER_AREA_FULL',
          rotation: 180,
          dimension: {
            w: 12,
            h: 10,
          },
          position: {
            x: 52,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'COACH_PASSAGE',
          dimension: {
            w: 1,
            h: 10,
          },
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      ],
      directedInternals: [
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 4,
          },
          position: {
            x: 42,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 34,
            y: 0,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 4,
          },
          position: {
            x: 34,
            y: 6,
            z: 0,
          },
        },
        {
          icon: 'TABLE_RESTAURANT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 42,
            y: 0,
            z: 0,
          },
        },
      ],
      compartmentNumbers: [
        {
          number: '2',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 10,
            y: 4,
            z: 0,
          },
        },
        {
          number: '1',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 40,
            y: 3,
            z: 0,
          },
        },
      ],
    },
  ],
};

/*
{
    "warnings": null,
    "coachDeckLayout": {
        "id": "32801",
        "name": "WR6(501) - not touch",
        "dimension": {
            "width": 58,
            "height": 10,
            "borderRadius": null
        },
        "lowFloorEntry": false,
        "deckLevel": "LOWER_DECK",
        "placeGroups": [
            {
                "travelClass": "SECOND",
                "accommodationSubType": "RESTAURANT",
                "places": [
                    {
                        "number": "21",
                        "rectangle": {
                            "position": {
                                "x": 31,
                                "y": 0,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 0,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "22",
                        "rectangle": {
                            "position": {
                                "x": 37,
                                "y": 0,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 180,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    }
                ]
            },
            {
                "travelClass": "SECOND",
                "accommodationSubType": "RESTAURANT",
                "places": [
                    {
                        "number": "41",
                        "rectangle": {
                            "position": {
                                "x": 39,
                                "y": 0,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 0,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "42",
                        "rectangle": {
                            "position": {
                                "x": 45,
                                "y": 0,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 180,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    }
                ]
            },
            {
                "travelClass": "SECOND",
                "accommodationSubType": "RESTAURANT",
                "places": [
                    {
                        "number": "61",
                        "rectangle": {
                            "position": {
                                "x": 47,
                                "y": 0,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 0,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "62",
                        "rectangle": {
                            "position": {
                                "x": 53,
                                "y": 0,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 180,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    }
                ]
            },
            {
                "travelClass": "SECOND",
                "accommodationSubType": "RESTAURANT",
                "places": [
                    {
                        "number": "13",
                        "rectangle": {
                            "position": {
                                "x": 31,
                                "y": 6,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 0,
                        "placeLocations": [
                            "AISLE"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "14",
                        "rectangle": {
                            "position": {
                                "x": 37,
                                "y": 6,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 180,
                        "placeLocations": [
                            "AISLE"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "11",
                        "rectangle": {
                            "position": {
                                "x": 31,
                                "y": 8,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 0,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "12",
                        "rectangle": {
                            "position": {
                                "x": 37,
                                "y": 8,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 180,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    }
                ]
            },
            {
                "travelClass": "SECOND",
                "accommodationSubType": "RESTAURANT",
                "places": [
                    {
                        "number": "33",
                        "rectangle": {
                            "position": {
                                "x": 39,
                                "y": 6,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 0,
                        "placeLocations": [
                            "AISLE"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "34",
                        "rectangle": {
                            "position": {
                                "x": 45,
                                "y": 6,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 180,
                        "placeLocations": [
                            "AISLE"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "31",
                        "rectangle": {
                            "position": {
                                "x": 39,
                                "y": 8,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 0,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "32",
                        "rectangle": {
                            "position": {
                                "x": 45,
                                "y": 8,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 180,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    }
                ]
            },
            {
                "travelClass": "SECOND",
                "accommodationSubType": "RESTAURANT",
                "places": [
                    {
                        "number": "53",
                        "rectangle": {
                            "position": {
                                "x": 47,
                                "y": 6,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 0,
                        "placeLocations": [
                            "AISLE"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "51",
                        "rectangle": {
                            "position": {
                                "x": 47,
                                "y": 8,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 0,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    },
                    {
                        "number": "52",
                        "rectangle": {
                            "position": {
                                "x": 53,
                                "y": 8,
                                "z": 0
                            },
                            "dimension": {
                                "width": 2,
                                "height": 2,
                                "borderRadius": null
                            }
                        },
                        "orientation": 180,
                        "placeLocations": [
                            "WINDOW"
                        ],
                        "placeProperties": []
                    }
                ]
            }
        ],
        "graphicElements": [
            {
                "rectangle": {
                    "position": {
                        "x": 57,
                        "y": 3,
                        "z": 0
                    },
                    "dimension": {
                        "width": 1,
                        "height": 4,
                        "borderRadius": null
                    }
                },
                "orientation": 0,
                "type": "COACH_PASSAGE"
            },
            {
                "rectangle": {
                    "position": {
                        "x": 42,
                        "y": 6,
                        "z": 0
                    },
                    "dimension": {
                        "width": 2,
                        "height": 4,
                        "borderRadius": null
                    }
                },
                "orientation": 0,
                "type": "TABLE_RESTAURANT"
            },
            {
                "rectangle": {
                    "position": {
                        "x": 50,
                        "y": 0,
                        "z": 0
                    },
                    "dimension": {
                        "width": 2,
                        "height": 2,
                        "borderRadius": null
                    }
                },
                "orientation": 0,
                "type": "TABLE_RESTAURANT"
            },
            {
                "rectangle": {
                    "position": {
                        "x": 34,
                        "y": 0,
                        "z": 0
                    },
                    "dimension": {
                        "width": 2,
                        "height": 2,
                        "borderRadius": null
                    }
                },
                "orientation": 0,
                "type": "TABLE_RESTAURANT"
            },
            {
                "rectangle": {
                    "position": {
                        "x": 34,
                        "y": 6,
                        "z": 0
                    },
                    "dimension": {
                        "width": 2,
                        "height": 4,
                        "borderRadius": null
                    }
                },
                "orientation": 0,
                "type": "TABLE_RESTAURANT"
            },
            {
                "rectangle": {
                    "position": {
                        "x": 42,
                        "y": 0,
                        "z": 0
                    },
                    "dimension": {
                        "width": 2,
                        "height": 2,
                        "borderRadius": null
                    }
                },
                "orientation": 0,
                "type": "TABLE_RESTAURANT"
            },
            {
                "rectangle": {
                    "position": {
                        "x": 0,
                        "y": 3,
                        "z": 0
                    },
                    "dimension": {
                        "width": 1,
                        "height": 4,
                        "borderRadius": null
                    }
                },
                "orientation": 0,
                "type": "COACH_PASSAGE"
            },
            {
                "rectangle": {
                    "position": {
                        "x": 50,
                        "y": 6,
                        "z": 0
                    },
                    "dimension": {
                        "width": 2,
                        "height": 4,
                        "borderRadius": null
                    }
                },
                "orientation": 0,
                "type": "TABLE_RESTAURANT"
            }
        ],
        "serviceIcons": [
            {
                "rectangle": {
                    "position": {
                        "x": 32,
                        "y": 3,
                        "z": 0
                    },
                    "dimension": {
                        "width": 2,
                        "height": 2,
                        "borderRadius": null
                    }
                },
                "type": "RESTAURANT_ICON"
            },
            {
                "rectangle": {
                    "position": {
                        "x": 46,
                        "y": 3,
                        "z": 0
                    },
                    "dimension": {
                        "width": 2,
                        "height": 2,
                        "borderRadius": null
                    }
                },
                "type": "RESTAURANT_ICON"
            }
        ]
    }
}*/
