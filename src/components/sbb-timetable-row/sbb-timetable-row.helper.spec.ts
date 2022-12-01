import { PtSituation } from './sbb-timetable-row.custom';
import {
  durationToTime,
  getCus,
  getHimIcon,
  getTransportIcon,
  handleNotices,
  isProductIcon,
  sortSituation,
} from './sbb-timetable-row.helper';
import { walkTimeTrip, partiallyCancelled } from './sbb-timetable-row.sample-data';

describe('durationToTime', () => {
  it('should return only minutes', () => {
    expect(durationToTime(40)).toBe('40 min');
  });

  it('should return day with hours', () => {
    expect(durationToTime(3000)).toBe('2 d 2 h');
  });

  it('should return hours', () => {
    expect(durationToTime(60)).toBe('1 h');
  });
});

describe('getTransportIcon', () => {
  it('should return schiff', () => {
    expect(getTransportIcon('SHIP')).toBe('schiff');
  });

  it('should return empty string', () => {
    expect(getTransportIcon('UNKNOWN')).toBe('');
  });
});

describe('isProductIcon', () => {
  it('should return true', () => {
    expect(isProductIcon('ic')).toBe(true);
  });

  it('should return false', () => {
    expect(isProductIcon('icc')).toBe(false);
  });
});

describe('sortSituation', () => {
  it('should return sorted array', () => {
    expect(
      sortSituation([{ cause: 'TRAIN_REPLACEMENT_BY_BUS' }, { cause: 'DISTURBANCE' }])
    ).toStrictEqual([{ cause: 'DISTURBANCE' }, { cause: 'TRAIN_REPLACEMENT_BY_BUS' }]);
  });

  it('should return sorted array even with double causes', () => {
    expect(
      sortSituation([
        { cause: 'TRAIN_REPLACEMENT_BY_BUS' },
        { cause: 'DISTURBANCE' },
        { cause: 'DISTURBANCE' },
      ])
    ).toStrictEqual([
      { cause: 'DISTURBANCE' },
      { cause: 'DISTURBANCE' },
      { cause: 'TRAIN_REPLACEMENT_BY_BUS' },
    ]);
  });
});

describe('getHimIcon', () => {
  it('should return replacementbus', () => {
    const situation: PtSituation = {
      cause: 'TRAIN_REPLACEMENT_BY_BUS',
    };
    expect(getHimIcon(situation)).toBe('replacementbus');
  });

  it('should return info', () => {
    const situation: PtSituation = {
      cause: null,
    };
    expect(getHimIcon(situation)).toBe('info');
  });
});

describe('getCus', () => {
  it('should return cancellation', () => {
    expect(getCus(partiallyCancelled)).toStrictEqual(['cancellation']);
  });
});

describe('handleNotices', () => {
  it('should return sa-rr', () => {
    expect(handleNotices(walkTimeTrip?.notices)).toStrictEqual(['sa-rr']);
  });
});
