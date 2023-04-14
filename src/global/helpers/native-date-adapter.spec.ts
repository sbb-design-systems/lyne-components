import { NativeDateAdapter } from './native-date-adapter';

describe('NativeDateAdapter', () => {
  let nativeDateAdapter: NativeDateAdapter;

  beforeAll(() => {
    nativeDateAdapter = new NativeDateAdapter();
  });

  it('getFirstWeekOffset should return the right value', () => {
    expect(nativeDateAdapter.getFirstWeekOffset(2023, 4)).toEqual(0);
    expect(nativeDateAdapter.getFirstWeekOffset(2023, 7)).toEqual(1);
    expect(nativeDateAdapter.getFirstWeekOffset(2023, 1)).toEqual(2);
    expect(nativeDateAdapter.getFirstWeekOffset(2023, 5)).toEqual(3);
    expect(nativeDateAdapter.getFirstWeekOffset(2023, 8)).toEqual(4);
    expect(nativeDateAdapter.getFirstWeekOffset(2023, 3)).toEqual(5);
    expect(nativeDateAdapter.getFirstWeekOffset(2023, 0)).toEqual(6);
  });

  it('should return the right value for year month, date and weekday', () => {
    const date: Date = new Date(2023, 0, 1);
    expect(nativeDateAdapter.getYear(date)).toEqual(2023);
    expect(nativeDateAdapter.getMonth(date)).toEqual(0);
    expect(nativeDateAdapter.getDate(date)).toEqual(1);
    expect(nativeDateAdapter.getDayOfWeek(date)).toEqual(0);
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

    expect(nativeDateAdapter.getMonthNames('long')).toEqual(longMonths);
    expect(nativeDateAdapter.getMonthNames('short')).toEqual(shortMonths);
    expect(nativeDateAdapter.getMonthNames('narrow')).toEqual(narrowMonths);

    expect(nativeDateAdapter.getDayOfWeekNames('long')).toEqual(longWeek);
    expect(nativeDateAdapter.getDayOfWeekNames('short')).toEqual(shortWeek);
    expect(nativeDateAdapter.getDayOfWeekNames('narrow')).toEqual(narrowWeek);

    expect(nativeDateAdapter.getDateNames()).toEqual(datesArray);
  });

  it('getNumDaysInMonth should return the correct value', () => {
    expect(nativeDateAdapter.getNumDaysInMonth(2023, 1)).toEqual(28);
    expect(nativeDateAdapter.getNumDaysInMonth(2024, 1)).toEqual(29);
    expect(nativeDateAdapter.getNumDaysInMonth(2023, 3)).toEqual(30);
    expect(nativeDateAdapter.getNumDaysInMonth(2023, 0)).toEqual(31);
  });

  it('createDate should return the correct value or error', () => {
    expect(() => nativeDateAdapter.createDate(2023, 17, 1)).toThrow(Error);
    expect(() => nativeDateAdapter.createDate(2023, 3, -11)).toThrow(Error);
    expect(() => nativeDateAdapter.createDate(2023, -5, 1)).toThrow(Error);
    expect(() => nativeDateAdapter.createDate(2023, 3, 99)).toThrow(Error);
    const firstDate: Date = nativeDateAdapter.createDate(2023, 0, 1);
    expect(firstDate instanceof Date).toEqual(true);
    expect(`${firstDate.getDate()}.${firstDate.getMonth() + 1}.${firstDate.getFullYear()}`).toEqual(
      '1.1.2023'
    );
    const secondDate: Date = nativeDateAdapter.createDate(18, 0, 1);
    expect(secondDate instanceof Date).toEqual(true);
    expect(
      `${secondDate.getDate()}.${secondDate.getMonth() + 1}.${secondDate.getFullYear()}`
    ).toEqual('1.1.18');
  });

  it('hasSameMonthAndYear should return the correct value', () => {
    expect(nativeDateAdapter.hasSameMonthAndYear(new Date(), new Date(0))).toEqual(false);
    expect(
      nativeDateAdapter.hasSameMonthAndYear(new Date(2023, 0, 1), new Date(2023, 1, 4))
    ).toEqual(false);
    expect(nativeDateAdapter.hasSameMonthAndYear(null, new Date(2023, 1, 4))).toEqual(false);
    expect(nativeDateAdapter.hasSameMonthAndYear(new Date(2023, 0, 1), undefined)).toEqual(false);
    expect(
      nativeDateAdapter.hasSameMonthAndYear(new Date(1677000000), new Date(1676000000))
    ).toEqual(true);
  });

  it('isDateInstance and isValid should return the correct value', () => {
    expect(nativeDateAdapter.isDateInstance(null)).toBeFalsy();
    expect(nativeDateAdapter.isDateInstance({ test: 'test' })).toBeFalsy();
    expect(nativeDateAdapter.isDateInstance(new Date(0))).toBeTruthy();
    expect(nativeDateAdapter.isDateInstance(100)).toBeFalsy();
    expect(nativeDateAdapter.isDateInstance('Test')).toBeFalsy();

    expect(nativeDateAdapter.isValid(null)).toBeFalsy();
    expect(nativeDateAdapter.isValid(undefined)).toBeFalsy();
    expect(nativeDateAdapter.isValid(new Date(0))).toBeTruthy();
    expect(nativeDateAdapter.isValid(new Date('TEST'))).toBeFalsy();
  });

  it('addCalendarMonths should return the correct value', () => {
    const firstDate: Date = nativeDateAdapter.addCalendarMonths(new Date(2023, 0, 15), 6);
    expect(firstDate instanceof Date).toEqual(true);
    expect(`${firstDate.getDate()}.${firstDate.getMonth() + 1}.${firstDate.getFullYear()}`).toEqual(
      '15.7.2023'
    );

    const secondDate: Date = nativeDateAdapter.addCalendarMonths(new Date(2023, 0, 31), 1);
    expect(secondDate instanceof Date).toEqual(true);
    expect(
      `${secondDate.getDate()}.${secondDate.getMonth() + 1}.${secondDate.getFullYear()}`
    ).toEqual('28.2.2023');

    const thirdDate: Date = nativeDateAdapter.addCalendarMonths(new Date(2023, 2, 31), 6);
    expect(thirdDate instanceof Date).toEqual(true);
    expect(`${thirdDate.getDate()}.${thirdDate.getMonth() + 1}.${thirdDate.getFullYear()}`).toEqual(
      '30.9.2023'
    );
  });

  it('addCalendarDays should return the correct value', () => {
    const date: Date = new Date(2023, 0, 15);

    const plusFifteen: Date = nativeDateAdapter.addCalendarDays(date, 15);
    expect(plusFifteen instanceof Date).toEqual(true);
    expect(
      `${plusFifteen.getDate()}.${plusFifteen.getMonth() + 1}.${plusFifteen.getFullYear()}`
    ).toEqual('30.1.2023');

    const plusThirty: Date = nativeDateAdapter.addCalendarDays(date, 30);
    expect(plusThirty instanceof Date).toEqual(true);
    expect(
      `${plusThirty.getDate()}.${plusThirty.getMonth() + 1}.${plusThirty.getFullYear()}`
    ).toEqual('14.2.2023');

    const plusOneYear: Date = nativeDateAdapter.addCalendarDays(date, 365);
    expect(plusOneYear instanceof Date).toEqual(true);
    expect(
      `${plusOneYear.getDate()}.${plusOneYear.getMonth() + 1}.${plusOneYear.getFullYear()}`
    ).toEqual('15.1.2024');
  });

  it('compareDate should return the correct value', () => {
    const dateZero: Date = new Date(0);
    const dateMillennium: Date = new Date(946684800000);
    const dateNow: Date = new Date();
    expect(nativeDateAdapter.compareDate(dateZero, dateZero)).toEqual(0);
    expect(nativeDateAdapter.compareDate(dateZero, dateMillennium)).toBeLessThan(0);
    expect(nativeDateAdapter.compareDate(dateMillennium, dateNow)).toBeLessThan(0);
    expect(nativeDateAdapter.compareDate(dateNow, dateMillennium)).toBeGreaterThan(0);
    expect(nativeDateAdapter.compareDate(dateNow, dateZero)).toBeGreaterThan(0);
  });

  it('deserializeDate should return the correct value', () => {
    expect(nativeDateAdapter.deserializeDate(null)).toBeNull();

    const date: Date = nativeDateAdapter.deserializeDate(new Date(0));
    expect(date instanceof Date).toEqual(true);
    expect(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`).toEqual('1.1.1970');

    const dateNumber: Date = nativeDateAdapter.deserializeDate(946684800);
    expect(dateNumber instanceof Date).toEqual(true);
    expect(
      `${dateNumber.getDate()}.${dateNumber.getMonth() + 1}.${dateNumber.getFullYear()}`
    ).toEqual('1.1.2000');

    const dateNumAsStr: Date = nativeDateAdapter.deserializeDate('946684800');
    expect(dateNumAsStr instanceof Date).toEqual(true);
    expect(
      `${dateNumAsStr.getDate()}.${dateNumAsStr.getMonth() + 1}.${dateNumAsStr.getFullYear()}`
    ).toEqual('1.1.2000');

    const dateString: Date = nativeDateAdapter.deserializeDate('2024-1-1');
    expect(dateString instanceof Date).toEqual(true);
    expect(
      `${dateString.getDate()}.${dateString.getMonth() + 1}.${dateString.getFullYear()}`
    ).toEqual('1.1.2024');

    const fakeDate: Date = nativeDateAdapter.deserializeDate({} as string);
    expect(fakeDate instanceof Date).toEqual(false);
    expect(fakeDate).toBeNull();
  });

  it('formatValueAsDate should return the correct value', function () {
    expect(nativeDateAdapter.formatValueAsDate(null)).toBeUndefined();
    expect(nativeDateAdapter.formatValueAsDate('Test')).toBeUndefined();
    expect(nativeDateAdapter.formatValueAsDate('1.1')).toBeUndefined();
    expect(nativeDateAdapter.formatValueAsDate('1/1/2000')).toBeUndefined();
    const formattedDate: Date = nativeDateAdapter.formatValueAsDate('1.1.2000');
    expect(formattedDate.getFullYear()).toEqual(2000);
    expect(formattedDate.getMonth()).toEqual(0);
    expect(formattedDate.getDate()).toEqual(1);
  });

  it('should generate localized accessibility labels', async () => {
    document.documentElement.setAttribute('lang', 'en-US');
    expect(nativeDateAdapter.getAccessibilityFormatDate(new Date(2017, 11, 5, 0, 0, 0))).toEqual(
      'December 5, 2017'
    );

    document.documentElement.setAttribute('lang', 'de-DE');
    expect(nativeDateAdapter.getAccessibilityFormatDate(new Date(2023, 8, 13, 0, 0, 0))).toEqual(
      '13. September 2023'
    );

    document.documentElement.setAttribute('lang', 'it-IT');
    expect(nativeDateAdapter.getAccessibilityFormatDate(new Date(2015, 2, 24, 0, 0, 0))).toEqual(
      '24 marzo 2015'
    );

    document.documentElement.setAttribute('lang', 'fr-FR');
    expect(nativeDateAdapter.getAccessibilityFormatDate(new Date(2018, 7, 15, 0, 0, 0))).toEqual(
      '15 août 2018'
    );
  });
});
