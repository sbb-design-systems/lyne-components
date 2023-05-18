import {
  getCus,
  getHimIcon,
  getTransportIcon,
  filterNotices,
  isProductIcon,
  sortSituation,
} from './sbb-timetable-row.helper';
import { walkTimeTrip, partiallyCancelled } from './sbb-timetable-row.sample-data';
import { PtSituation } from '../../global/interfaces/timetable-properties';

describe('getTransportIcon', () => {
  it('should return ship / jetty', () => {
    expect(getTransportIcon('SHIP', '', 'de')).toBe('jetty-right');
  });

  it('should return empty string', () => {
    expect(getTransportIcon('UNKNOWN', '', 'de')).toBe('');
  });

  it('should return metro string', () => {
    expect(getTransportIcon('METRO', 'PB', 'fr')).toBe('metro-right-fr');
  });

  it('should return metro en string', () => {
    expect(getTransportIcon('METRO', 'PB', 'en')).toBe('metro-right-de');
  });

  it('should return cableway string', () => {
    expect(getTransportIcon('GONDOLA', 'PB', 'de')).toBe('cableway-right');
  });

  it('should return gondola string', () => {
    expect(getTransportIcon('GONDOLA', 'GB', 'de')).toBe('gondola-lift-right');
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
      sortSituation([
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
      ])
    ).toStrictEqual([
      { cause: 'DISTURBANCE', broadcastMessages: [] },
      { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
    ]);
  });

  it('should return sorted array even with double causes', () => {
    expect(
      sortSituation([
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
      ])
    ).toStrictEqual([
      { cause: 'DISTURBANCE', broadcastMessages: [] },
      { cause: 'DISTURBANCE', broadcastMessages: [] },
      { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
    ]);
  });
});

describe('getHimIcon', () => {
  it('should return replacementbus', () => {
    const situation: PtSituation = {
      cause: 'TRAIN_REPLACEMENT_BY_BUS',
      broadcastMessages: [],
    };
    expect(getHimIcon(situation).name).toEqual('replacementbus');
    expect(getHimIcon(situation).text).toEqual('');
  });

  it('should return info', () => {
    const situation: PtSituation = {
      cause: null,
      broadcastMessages: [],
    };
    expect(getHimIcon(situation).name).toEqual('info');
  });
});

describe('getCus', () => {
  it('should return cancellation', () => {
    expect(getCus(partiallyCancelled, 'en')).toStrictEqual({
      name: 'cancellation',
      text: undefined,
    });
  });
});

describe('filterNotices', () => {
  it('should return sa-rr', () => {
    expect(filterNotices(walkTimeTrip?.notices)).toStrictEqual([]);
  });
});
