import { durationToTime, isProductIcon, convertCauseInIconName } from './sbb-timetable-row.helper';

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

describe('convertCauseInIconName', () => {
  it('should return construction', () => {
    expect(convertCauseInIconName('CONSTRUCTION_SITE')).toBe('construction');
  });
  it('should return info', () => {
    expect(convertCauseInIconName('INFORMATION')).toBe('info');
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
