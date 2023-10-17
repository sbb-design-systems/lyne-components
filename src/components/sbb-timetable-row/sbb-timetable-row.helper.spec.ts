import { ITripItem, Notice, PtSituation } from '../../global/timetable';
import {
  getCus,
  getHimIcon,
  getTransportIcon,
  filterNotices,
  isProductIcon,
  sortSituation,
} from './sbb-timetable-row.helper';
import { walkTimeTrip, partiallyCancelled } from './sbb-timetable-row.sample-data';
import { expect } from '@open-wc/testing';

describe('getTransportIcon', () => {
  it('should return ship / jetty', () => {
    expect(getTransportIcon('SHIP', '', 'de')).to.be.equal('jetty-right');
  });

  it('should return empty string', () => {
    expect(getTransportIcon('UNKNOWN', '', 'de')).to.be.equal('');
  });

  it('should return metro string', () => {
    expect(getTransportIcon('METRO', 'PB', 'fr')).to.be.equal('metro-right-fr');
  });

  it('should return metro en string', () => {
    expect(getTransportIcon('METRO', 'PB', 'en')).to.be.equal('metro-right-de');
  });

  it('should return cableway string', () => {
    expect(getTransportIcon('GONDOLA', 'PB', 'de')).to.be.equal('cableway-right');
  });

  it('should return gondola string', () => {
    expect(getTransportIcon('GONDOLA', 'GB', 'de')).to.be.equal('gondola-lift-right');
  });
});

describe('isProductIcon', () => {
  it('should return true', () => {
    expect(isProductIcon('ic')).to.be.equal(true);
  });

  it('should return false', () => {
    expect(isProductIcon('icc')).to.be.equal(false);
  });
});

describe('sortSituation', () => {
  it('should return sorted array', () => {
    expect(
      sortSituation([
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
      ]),
    ).to.be.eql([
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
      ]),
    ).to.be.eql([
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
    expect(getHimIcon(situation).name).to.be.equal('replacementbus');
    expect(getHimIcon(situation).text).to.be.equal('');
  });

  it('should return info', () => {
    const situation: PtSituation = {
      cause: null,
      broadcastMessages: [],
    };
    expect(getHimIcon(situation).name).to.be.equal('info');
  });
});

describe('getCus', () => {
  it('should return cancellation', () => {
    expect(getCus(partiallyCancelled as ITripItem, 'en')).to.be.eql({
      name: 'cancellation',
      text: undefined,
    });
  });
});

describe('filterNotices', () => {
  it('should return sa-rr', () => {
    expect(filterNotices(walkTimeTrip?.notices as Notice[])).to.be.eql([]);
  });
});
