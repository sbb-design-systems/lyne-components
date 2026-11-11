import { expect } from '@open-wc/testing';

import { NativeDateAdapter } from './native-date-adapter.ts';

describe('NativeDateAdapter', () => {
  const toString = (date: Date): string =>
    `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  let dateAdapter: NativeDateAdapter;

  beforeEach(() => {
    dateAdapter = new NativeDateAdapter();
  });

  it('getFirstWeekOffset should return the right value', () => {
    expect(dateAdapter.getFirstWeekOffset(new Date(2023, 4, 1))).to.be.equal(0);
    expect(dateAdapter.getFirstWeekOffset(new Date(2023, 7, 1))).to.be.equal(1);
    expect(dateAdapter.getFirstWeekOffset(new Date(2023, 1, 1))).to.be.equal(2);
    expect(dateAdapter.getFirstWeekOffset(new Date(2023, 5, 1))).to.be.equal(3);
    expect(dateAdapter.getFirstWeekOffset(new Date(2023, 8, 1))).to.be.equal(4);
    expect(dateAdapter.getFirstWeekOffset(new Date(2023, 3, 1))).to.be.equal(5);
    expect(dateAdapter.getFirstWeekOffset(new Date(2023, 0, 1))).to.be.equal(6);
  });

  it('should return the right value for year month, date and weekday', () => {
    const date: Date = new Date('2023-01-01T00:00:00.000Z');
    expect(dateAdapter.getYear(date)).to.be.equal(2023);
    expect(dateAdapter.getMonth(date)).to.be.equal(1);
    expect(dateAdapter.getDate(date)).to.be.equal(1);
    expect(dateAdapter.getDayOfWeek(date)).to.be.equal(0);
  });

  it('getMonthNames, getDateNames and getDayOfWeekNames should return the correct arrays', () => {
    const longMonths: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const shortMonths: string[] = longMonths.map((el: string) => el.substring(0, 3));
    const narrowMonths: string[] = shortMonths.map((el: string) => el.substring(0, 1));

    const longWeek: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const shortWeek: string[] = longWeek.map((el: string) => el.substring(0, 3));
    const narrowWeek: string[] = shortWeek.map((el: string) => el.substring(0, 1));

    const datesArray: string[] = new Array(31).fill(undefined).map((_, i) => String(i + 1));

    expect(dateAdapter.getMonthNames('long')).to.be.deep.equal(longMonths);
    expect(dateAdapter.getMonthNames('short')).to.be.deep.equal(shortMonths);
    expect(dateAdapter.getMonthNames('narrow')).to.be.deep.equal(narrowMonths);

    expect(dateAdapter.getDayOfWeekNames('long')).to.be.deep.equal(longWeek);
    expect(dateAdapter.getDayOfWeekNames('short')).to.be.deep.equal(shortWeek);
    expect(dateAdapter.getDayOfWeekNames('narrow')).to.be.deep.equal(narrowWeek);

    expect(dateAdapter.getDateNames()).to.be.deep.equal(datesArray);
  });

  it('getNumDaysInMonth should return the correct value', () => {
    expect(dateAdapter.getNumDaysInMonth(new Date(2023, 1, 1))).to.be.equal(28);
    expect(dateAdapter.getNumDaysInMonth(new Date(2024, 1, 1))).to.be.equal(29);
    expect(dateAdapter.getNumDaysInMonth(new Date(2023, 3, 1))).to.be.equal(30);
    expect(dateAdapter.getNumDaysInMonth(new Date(2023, 0, 1))).to.be.equal(31);
  });

  it('createDate should return the correct value or error', () => {
    expect(() => dateAdapter.createDate(2023, 17, 1)).to.throw();
    expect(() => dateAdapter.createDate(2023, 3, -11)).to.throw();
    expect(() => dateAdapter.createDate(2023, -5, 1)).to.throw();
    expect(() => dateAdapter.createDate(2023, 3, 99)).to.throw();
    const firstDate: Date = dateAdapter.createDate(2023, 1, 1)!;
    expect(firstDate instanceof Date).to.be.equal(true);
    expect(toString(firstDate)).to.be.equal('1.1.2023');
    const secondDate: Date = dateAdapter.createDate(18, 1, 1)!;
    expect(secondDate instanceof Date).to.be.equal(true);
    expect(toString(secondDate)).to.be.equal('1.1.18');
  });

  it('isDateInstance and isValid should return the correct value', () => {
    expect(dateAdapter.isDateInstance(null)).to.be.false;
    expect(dateAdapter.isDateInstance({ test: 'test' })).to.be.false;
    expect(dateAdapter.isDateInstance(new Date(0))).to.be.true;
    expect(dateAdapter.isDateInstance(100)).to.be.false;
    expect(dateAdapter.isDateInstance('Test')).to.be.false;

    expect(dateAdapter.isValid(null)).to.be.false;
    expect(dateAdapter.isValid(undefined)).to.be.false;
    expect(dateAdapter.isValid(new Date(0))).to.be.true;
    expect(dateAdapter.isValid(new Date('TEST'))).to.be.false;
  });

  it('addCalendarMonths should return the correct value', () => {
    const firstDate: Date = dateAdapter.addCalendarMonths(new Date(2023, 0, 15), 6);
    expect(firstDate instanceof Date).to.be.equal(true);
    expect(toString(firstDate)).to.be.equal('15.7.2023');

    const secondDate: Date = dateAdapter.addCalendarMonths(new Date(2023, 0, 31), 1);
    expect(secondDate instanceof Date).to.be.equal(true);
    expect(toString(secondDate)).to.be.equal('28.2.2023');

    const thirdDate: Date = dateAdapter.addCalendarMonths(new Date(2023, 2, 31), 6);
    expect(thirdDate instanceof Date).to.be.equal(true);
    expect(toString(thirdDate)).to.be.equal('30.9.2023');
  });

  it('addCalendarDays should return the correct value', () => {
    const date: Date = new Date(2023, 0, 15);

    const plusFifteen: Date = dateAdapter.addCalendarDays(date, 15);
    expect(plusFifteen instanceof Date).to.be.equal(true);
    expect(toString(plusFifteen)).to.be.equal('30.1.2023');

    const plusThirty: Date = dateAdapter.addCalendarDays(date, 30);
    expect(plusThirty instanceof Date).to.be.equal(true);
    expect(toString(plusThirty)).to.be.equal('14.2.2023');

    const plusOneYear: Date = dateAdapter.addCalendarDays(date, 365);
    expect(plusOneYear instanceof Date).to.be.equal(true);
    expect(toString(plusOneYear)).to.be.equal('15.1.2024');
  });

  it('compareDate should return the correct value', () => {
    const dateZero: Date = new Date(0);
    const dateMillennium: Date = new Date(946684800000);
    const dateNow: Date = new Date(2023, 8, 15, 0, 0, 0, 0);
    expect(dateAdapter.compareDate(dateZero, dateZero)).to.be.equal(0);
    expect(dateAdapter.compareDate(dateZero, dateMillennium)).to.be.lessThan(0);
    expect(dateAdapter.compareDate(dateMillennium, dateNow)).to.be.lessThan(0);
    expect(dateAdapter.compareDate(dateNow, dateMillennium)).to.be.greaterThan(0);
    expect(dateAdapter.compareDate(dateNow, dateZero)).to.be.greaterThan(0);
  });

  it('deserializeDate should return the correct value', () => {
    expect(dateAdapter.deserialize(null)).to.be.null;

    const date: Date = dateAdapter.deserialize(new Date(0))!;
    expect(date instanceof Date).to.be.equal(true);
    expect(toString(date)).to.be.equal('1.1.1970');

    const dateString: Date = dateAdapter.deserialize('2024-01-01')!;
    expect(dateString instanceof Date).to.be.equal(true);
    expect(toString(dateString)).to.be.equal('1.1.2024');

    const fakeDate: Date = dateAdapter.deserialize({} as string)!;
    expect(fakeDate instanceof Date).to.be.equal(true);
    expect(+fakeDate).to.be.NaN;
  });

  it('parse should return the correct value', function () {
    expect(dateAdapter.parse(null)).to.be.null;
    expect(dateAdapter.parse('Test')).to.be.null;
    expect(dateAdapter.parse('1.1')).to.be.null;
    expect(dateAdapter.parse('2000.0.1')).to.be.null;
    expect(dateAdapter.parse('12.0.2000')).to.be.null;
    expect(dateAdapter.parse('0.12.2000')).to.be.null;
    expect(dateAdapter.parse('0122000')).to.be.null;
    for (const dateString of ['1/1/2000', '1.1.2000', '2000-01-01', '01012000']) {
      const date = dateAdapter.parse(dateString)!;
      expect(date.getFullYear()).to.be.equal(2000);
      expect(date.getMonth()).to.be.equal(0);
      expect(date.getDate()).to.be.equal(1);
    }
    expect(dateAdapter.parse('30.02.2023')).to.be.null;
  });

  it('format should return the correct string', function () {
    document.documentElement.setAttribute('lang', 'de-CH');
    expect(dateAdapter.format(null)).to.be.equal('');
    expect(dateAdapter.format(new Date(2020, 9, 31))).to.be.equal('Sa, 31.10.2020');
  });

  it('should generate localized accessibility labels', async () => {
    document.documentElement.setAttribute('lang', 'en-US');
    expect(dateAdapter.getAccessibilityFormatDate(new Date(2017, 11, 5, 0, 0, 0))).to.be.equal(
      'December 5, 2017',
    );

    document.documentElement.setAttribute('lang', 'de-DE');
    expect(dateAdapter.getAccessibilityFormatDate(new Date(2023, 8, 13, 0, 0, 0))).to.be.equal(
      '13. September 2023',
    );

    document.documentElement.setAttribute('lang', 'it-IT');
    expect(dateAdapter.getAccessibilityFormatDate(new Date(2015, 2, 24, 0, 0, 0))).to.be.equal(
      '24 marzo 2015',
    );

    document.documentElement.setAttribute('lang', 'fr-FR');
    expect(dateAdapter.getAccessibilityFormatDate(new Date(2018, 7, 15, 0, 0, 0))).to.be.equal(
      '15 août 2018',
    );
  });

  it('should convert to ISO8601 format', () => {
    const date = new Date(2023, 8, 15);
    expect(dateAdapter.toIso8601(date)).to.be.equal('2023-09-15');
  });
});
