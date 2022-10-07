import { removeTimezoneFromISOTimeString } from './timezone-helper';

describe('removeTimezoneFromDate', () => {
  it('returns date in local timezone', () => {
    expect(removeTimezoneFromISOTimeString('2022-10-28T21:16:00+03:00')).toStrictEqual(
      new Date('2022-10-28T21:16:00')
    );
  });
  it('returns undefined when date string is invalid', () => {
    expect(removeTimezoneFromISOTimeString('10-28T21:16:00+03:00')).toBe(undefined);
  });

  it('returns date when date string has no timezone', () => {
    expect(removeTimezoneFromISOTimeString('2022-10-28T21:16:00')).toStrictEqual(
      new Date('2022-10-28T21:16:00')
    );
  });
});
