import { removeTimezoneFromDate } from './timezone-helper';

describe('removeTimezoneFromDate', () => {
  it('returns date in local timezone', () => {
    expect(removeTimezoneFromDate('2022-10-28T21:16:00+03:00')).toStrictEqual(
      new Date('2022-10-28T21:16:00')
    );
  });
  it('returns undefined when date string is invalid', () => {
    expect(removeTimezoneFromDate('10-28T21:16:00+03:00')).toBe(undefined);
  });
});
