import { durationToTime, isProductIcon, renderTime } from './sbb-timetable-row.helper';

describe('durationToTime', () => {
  it('durationToTime only minutes', () => {
    expect(durationToTime(40)).toBe('40 min');
  });

  it('durationToTime with day', () => {
    expect(durationToTime(3000)).toBe('2 d 2 h ');
  });

  it('durationToTime with hours', () => {
    expect(durationToTime(60)).toBe('1 h ');
  });
});

describe('isProductIcon', () => {
  it('isProductIcon should return true', () => {
    expect(isProductIcon('ic')).toBe(true);
  });

  it('isProductIcon should return false', () => {
    expect(isProductIcon('icc')).toBe(false);
  });
});

describe('renderTime', () => {
  it('renderTime should return time', () => {
    expect(renderTime(new Date('2022-07-28T13:16:00+02:00'))).toBe('13:16');
  });
});
