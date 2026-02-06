import { expect } from '@open-wc/testing';

import { TemporalDateAdapter } from './temporal-date-adapter.ts';

describe('TemporalDateAdapter', () => {
  let dateAdapter: TemporalDateAdapter;

  beforeEach(() => {
    dateAdapter = new TemporalDateAdapter();
  });

  it('getFirstWeekOffset should return the right value', () => {
    expect(
      dateAdapter.getFirstWeekOffset(Temporal.PlainDate.from({ year: 2023, month: 5, day: 1 })),
    ).to.be.equal(0);
    expect(
      dateAdapter.getFirstWeekOffset(Temporal.PlainDate.from({ year: 2023, month: 8, day: 1 })),
    ).to.be.equal(1);
    expect(
      dateAdapter.getFirstWeekOffset(Temporal.PlainDate.from({ year: 2023, month: 2, day: 1 })),
    ).to.be.equal(2);
    expect(
      dateAdapter.getFirstWeekOffset(Temporal.PlainDate.from({ year: 2023, month: 6, day: 1 })),
    ).to.be.equal(3);
    expect(
      dateAdapter.getFirstWeekOffset(Temporal.PlainDate.from({ year: 2023, month: 9, day: 1 })),
    ).to.be.equal(4);
    expect(
      dateAdapter.getFirstWeekOffset(Temporal.PlainDate.from({ year: 2023, month: 4, day: 1 })),
    ).to.be.equal(5);
    expect(
      dateAdapter.getFirstWeekOffset(Temporal.PlainDate.from({ year: 2023, month: 1, day: 1 })),
    ).to.be.equal(6);
  });

  it('should return the right value for year month, date and weekday', () => {
    const date = Temporal.PlainDate.from('2023-01-01');
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
    expect(
      dateAdapter.getNumDaysInMonth(Temporal.PlainDate.from({ year: 2023, month: 2, day: 1 })),
    ).to.be.equal(28);
    expect(
      dateAdapter.getNumDaysInMonth(Temporal.PlainDate.from({ year: 2024, month: 2, day: 1 })),
    ).to.be.equal(29);
    expect(
      dateAdapter.getNumDaysInMonth(Temporal.PlainDate.from({ year: 2023, month: 4, day: 1 })),
    ).to.be.equal(30);
    expect(
      dateAdapter.getNumDaysInMonth(Temporal.PlainDate.from({ year: 2023, month: 1, day: 1 })),
    ).to.be.equal(31);
  });

  it('createDate should return the correct value or error', () => {
    expect(() => dateAdapter.createDate(2023, 17, 1)).to.throw();
    expect(() => dateAdapter.createDate(2023, 3, -11)).to.throw();
    expect(() => dateAdapter.createDate(2023, -5, 1)).to.throw();
    expect(() => dateAdapter.createDate(2023, 3, 99)).to.throw();
    const firstDate: Temporal.PlainDate = dateAdapter.createDate(2023, 1, 1)!;
    expect(firstDate instanceof Temporal.PlainDate).to.be.equal(true);
    expect(`${firstDate.day}.${firstDate.month}.${firstDate.year}`).to.be.equal('1.1.2023');
    const secondDate: Temporal.PlainDate = dateAdapter.createDate(18, 1, 1)!;
    expect(secondDate instanceof Temporal.PlainDate).to.be.equal(true);
    expect(`${secondDate.day}.${secondDate.month}.${secondDate.year}`).to.be.equal('1.1.18');
  });

  it('isDateInstance and isValid should return the correct value', () => {
    expect(dateAdapter.isDateInstance(null)).to.be.false;
    expect(dateAdapter.isDateInstance({ test: 'test' })).to.be.false;
    expect(dateAdapter.isDateInstance(Temporal.PlainDate.from({ year: 0, month: 1, day: 1 }))).to.be
      .true;
    expect(dateAdapter.isDateInstance(100)).to.be.false;
    expect(dateAdapter.isDateInstance('Test')).to.be.false;

    expect(dateAdapter.isValid(null)).to.be.false;
    expect(dateAdapter.isValid(undefined)).to.be.false;
    expect(dateAdapter.isValid(Temporal.PlainDate.from({ year: 0, month: 1, day: 1 }))).to.be.true;
  });

  it('addCalendarMonths should return the correct value', () => {
    const firstDate = dateAdapter.addCalendarMonths(
      Temporal.PlainDate.from({ year: 2023, month: 1, day: 15 }),
      6,
    );
    expect(firstDate instanceof Temporal.PlainDate).to.be.equal(true);
    expect(`${firstDate.day}.${firstDate.month}.${firstDate.year}`).to.be.equal('15.7.2023');

    const secondDate = dateAdapter.addCalendarMonths(
      Temporal.PlainDate.from({ year: 2023, month: 1, day: 31 }),
      1,
    );
    expect(secondDate instanceof Temporal.PlainDate).to.be.equal(true);
    expect(`${secondDate.day}.${secondDate.month}.${secondDate.year}`).to.be.equal('28.2.2023');

    const thirdDate = dateAdapter.addCalendarMonths(
      Temporal.PlainDate.from({ year: 2023, month: 3, day: 31 }),
      6,
    );
    expect(thirdDate instanceof Temporal.PlainDate).to.be.equal(true);
    expect(`${thirdDate.day}.${thirdDate.month}.${thirdDate.year}`).to.be.equal('30.9.2023');
  });

  it('addCalendarDays should return the correct value', () => {
    const date = Temporal.PlainDate.from({ year: 2023, month: 1, day: 15 });

    const plusFifteen = dateAdapter.addCalendarDays(date, 15);
    expect(plusFifteen instanceof Temporal.PlainDate).to.be.equal(true);
    expect(`${plusFifteen.day}.${plusFifteen.month}.${plusFifteen.year}`).to.be.equal('30.1.2023');

    const plusThirty = dateAdapter.addCalendarDays(date, 30);
    expect(plusThirty instanceof Temporal.PlainDate).to.be.equal(true);
    expect(`${plusThirty.day}.${plusThirty.month}.${plusThirty.year}`).to.be.equal('14.2.2023');

    const plusOneYear = dateAdapter.addCalendarDays(date, 365);
    expect(plusOneYear instanceof Temporal.PlainDate).to.be.equal(true);
    expect(`${plusOneYear.day}.${plusOneYear.month}.${plusOneYear.year}`).to.be.equal('15.1.2024');
  });

  it('compareDate should return the correct value', () => {
    const dateZero = Temporal.PlainDate.from({ year: 1970, month: 1, day: 1 });
    const dateMillennium = Temporal.PlainDate.from({ year: 2000, month: 1, day: 1 });
    const dateNow = Temporal.PlainDate.from({ year: 2023, month: 9, day: 15 });
    expect(dateAdapter.compareDate(dateZero, dateZero)).to.be.equal(0);
    expect(dateAdapter.compareDate(dateZero, dateMillennium)).to.be.lessThan(0);
    expect(dateAdapter.compareDate(dateMillennium, dateNow)).to.be.lessThan(0);
    expect(dateAdapter.compareDate(dateNow, dateMillennium)).to.be.greaterThan(0);
    expect(dateAdapter.compareDate(dateNow, dateZero)).to.be.greaterThan(0);
  });

  it('deserializeDate should return the correct value', () => {
    expect(dateAdapter.deserialize(null)).to.be.null;

    const date = dateAdapter.deserialize(
      Temporal.PlainDate.from({ year: 1970, month: 1, day: 1 }),
    )!;
    expect(date instanceof Temporal.PlainDate, 'Instance should be unix timestamp 0').to.be.equal(
      true,
    );
    expect(`${date.day}.${date.month}.${date.year}`).to.be.equal('1.1.1970');

    const dateString = dateAdapter.deserialize('2024-01-01')!;
    expect(dateString instanceof Temporal.PlainDate, 'Instance should be 2024-01-01').to.be.equal(
      true,
    );
    expect(`${dateString.day}.${dateString.month}.${dateString.year}`).to.be.equal('1.1.2024');

    const fakeDate = dateAdapter.deserialize({} as string)!;
    expect(fakeDate, 'Instance should be invalid date').to.be.equal(dateAdapter.invalid());
    expect(fakeDate).to.be.null;
  });

  it('parse should return the correct value', function () {
    expect(dateAdapter.parse(null)).to.be.null;
    expect(dateAdapter.parse('Test')).to.be.null;
    expect(dateAdapter.parse('1.1')).to.be.null;
    expect(dateAdapter.parse('2000.0.1')).to.be.null;
    expect(dateAdapter.parse('12.0.2000')).to.be.null;
    expect(dateAdapter.parse('0.12.2000')).to.be.null;
    for (const dateString of ['1/1/2000', '1.1.2000', '2000-01-01']) {
      const date = dateAdapter.parse(dateString)!;
      expect(date.year).to.be.equal(2000);
      expect(date.month).to.be.equal(1);
      expect(date.day).to.be.equal(1);
    }
  });

  it('format should return the correct string', function () {
    document.documentElement.setAttribute('lang', 'de-CH');
    expect(dateAdapter.format(null)).to.be.equal('');
    expect(
      dateAdapter.format(Temporal.PlainDate.from({ year: 2020, month: 10, day: 31 })),
    ).to.be.equal('Sa, 31.10.2020');
  });

  it('should generate localized accessibility labels', async () => {
    document.documentElement.setAttribute('lang', 'en-US');
    expect(
      dateAdapter.getAccessibilityFormatDate(
        Temporal.PlainDate.from({ year: 2017, month: 12, day: 5 }),
      ),
    ).to.be.equal('December 5, 2017');

    document.documentElement.setAttribute('lang', 'de-DE');
    expect(
      dateAdapter.getAccessibilityFormatDate(
        Temporal.PlainDate.from({ year: 2023, month: 9, day: 13 }),
      ),
    ).to.be.equal('13. September 2023');

    document.documentElement.setAttribute('lang', 'it-IT');
    expect(
      dateAdapter.getAccessibilityFormatDate(
        Temporal.PlainDate.from({ year: 2015, month: 3, day: 24 }),
      ),
    ).to.be.equal('24 marzo 2015');

    document.documentElement.setAttribute('lang', 'fr-FR');
    expect(
      dateAdapter.getAccessibilityFormatDate(
        Temporal.PlainDate.from({ year: 2018, month: 8, day: 15 }),
      ),
    ).to.be.equal('15 août 2018');
  });
});
