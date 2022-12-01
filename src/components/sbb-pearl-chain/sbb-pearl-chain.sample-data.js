import { format } from 'date-fns';

const dayAfterYesterday = format(new Date().setDate(new Date().getDate() - 2), 'yyyy-MM-dd');
const yesterday = format(new Date().setDate(new Date().getDate() - 1), 'yyyy-MM-dd');
const tomorrow = format(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
const dayAfterTomorrow = format(new Date().setDate(new Date().getDate() + 2), 'yyyy-MM-dd');
const nextWeek = format(new Date().setDate(new Date().getDate() + 7), 'yyyy-MM-dd');

const defaultService = {
  serviceAlteration: {
    cancelled: false,
    delayText: 'string',
    reachable: true,
    redirected: false,
    reachableText: '',
    unplannedStopPointsText: '',
  },
};

const cancelledService = {
  serviceAlteration: {
    cancelled: true,
  },
};

const delayedService = {
  serviceAlteration: {
    delay: true,
  },
};

const isNotReachableService = {
  serviceAlteration: {
    reachable: false,
  },
};

const unplannedStopService = {
  serviceAlteration: {
    unplannedStopPointsText: 'unplannedStop',
  },
};

const redirectedService = {
  serviceAlteration: {
    redirected: 'true',
  },
};

export const futureLeg = {
  __typename: 'PTRideLeg',
  arrival: {
    time: dayAfterTomorrow,
  },
  departure: {
    time: tomorrow,
  },
  serviceJourney: defaultService,
};

export const longFutureLeg = {
  __typename: 'PTRideLeg',
  arrival: {
    time: nextWeek,
  },
  departure: {
    time: tomorrow,
  },
  serviceJourney: defaultService,
};

export const cancelledLeg = {
  __typename: 'PTRideLeg',
  arrival: {
    time: dayAfterTomorrow,
  },
  departure: {
    time: tomorrow,
  },
  serviceJourney: cancelledService,
};

export const progressLeg = {
  __typename: 'PTRideLeg',
  arrival: {
    time: tomorrow,
  },
  departure: {
    time: yesterday,
  },
  serviceJourney: defaultService,
};

export const pastLeg = {
  __typename: 'PTRideLeg',
  arrival: {
    time: yesterday,
  },
  departure: {
    time: dayAfterYesterday,
  },
  serviceJourney: defaultService,
};

export const delayedLeg = {
  __typename: 'PTRideLeg',
  arrival: {
    time: dayAfterTomorrow,
  },
  departure: {
    time: tomorrow,
  },
  serviceJourney: delayedService,
};

export const notReachableLeg = {
  __typename: 'PTRideLeg',
  arrival: {
    time: dayAfterTomorrow,
  },
  departure: {
    time: tomorrow,
  },
  serviceJourney: isNotReachableService,
};

export const unplannedStopLeg = {
  __typename: 'PTRideLeg',
  arrival: {
    time: dayAfterTomorrow,
  },
  departure: {
    time: tomorrow,
  },
  serviceJourney: unplannedStopService,
};

export const redirectedLeg = {
  __typename: 'PTRideLeg',
  arrival: {
    time: dayAfterTomorrow,
  },
  departure: {
    time: tomorrow,
  },
  serviceJourney: redirectedService,
};
