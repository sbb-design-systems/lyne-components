import { SbbDatepicker } from './sbb-datepicker';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import {
  findNextAvailableDate,
  findPreviousAvailableDate,
  getAvailableDate,
  getDatePicker,
  getInput,
  isDateAvailable,
} from './sbb-datepicker.helper';
import { NativeDateAdapter } from '../../global/helpers/native-date-adapter';

describe('getDatePicker', () => {
  it('returns the datepicker if no trigger', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <sbb-form-field>
          <input/>
          <sbb-datepicker />
          <sbb-datepicker-next-day />
        </sbb-form-field>
      `,
    });
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const elementNext: HTMLSbbDatepickerNextDayElement =
      page.doc.querySelector('sbb-datepicker-next-day');
    expect(getDatePicker(elementNext)).toEqual(picker);
  });

  it('returns the datepicker if its id is passed as trigger', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input/>
        <sbb-datepicker id="picker"/>
        <sbb-datepicker-previous-day />
      `,
    });
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('#picker');
    const elementPrevious: HTMLSbbDatepickerPreviousDayElement = page.doc.querySelector(
      'sbb-datepicker-previous-day',
    );
    expect(getDatePicker(elementPrevious, 'picker')).toEqual(picker);
  });
});

describe('getInput', () => {
  it('returns the input if no trigger', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <sbb-form-field>
          <input/>
          <sbb-datepicker />
        </sbb-form-field>
      `,
    });
    const element: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const input: HTMLInputElement = page.doc.querySelector('input');
    expect(getInput(element)).toEqual(input);
  });

  it('returns the input if its id is passed as trigger', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input id="input"/>
        <sbb-datepicker/>
        <sbb-datepicker-previous-day />
      `,
    });
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const input: HTMLInputElement = page.doc.querySelector('input');
    expect(getInput(picker, 'input')).toEqual(input);
  });
});

describe('getAvailableDate', () => {
  it('with dateFilter', async () => {
    const availableDate: Date = getAvailableDate(
      new Date(2024, 0, 1, 0, 0, 0, 0),
      1,
      (d: Date) => d.getDay() === 1,
      new NativeDateAdapter(),
    );
    expect(availableDate.getTime()).toEqual(new Date(2024, 0, 8, 0, 0, 0, 0).getTime());
  });

  it('without dateFilter', async () => {
    const availableDate: Date = getAvailableDate(
      new Date(2024, 0, 1, 0, 0, 0, 0),
      1,
      () => true,
      new NativeDateAdapter(),
    );
    expect(availableDate.getTime()).toEqual(new Date(2024, 0, 2, 0, 0, 0, 0).getTime());
  });
});

describe('findPreviousAvailableDate', () => {
  it('get date without dateFilter and without min', async () => {
    const availableDate: Date = findPreviousAvailableDate(
      new Date(2023, 1, 26, 0, 0, 0, 0),
      null,
      new NativeDateAdapter(),
      null,
    );
    expect(availableDate.getTime()).toEqual(new Date(2023, 1, 25, 0, 0, 0, 0).getTime());
  });

  it('get date without dateFilter and with current date equal to min date', async () => {
    const date = new Date(2023, 1, 26, 0, 0, 0, 0);
    const availableDate: Date = findPreviousAvailableDate(
      date,
      null,
      new NativeDateAdapter(),
      date.valueOf() / 1000,
    );
    expect(availableDate.getTime()).toEqual(date.getTime());
  });

  it('get date with dateFilter and min', async () => {
    const minDate = new Date(2023, 1, 26, 0, 0, 0, 0);
    const availableDate: Date = findPreviousAvailableDate(
      new Date(2023, 1, 28, 0, 0, 0, 0),
      (d: Date) => d.getDate() !== 27,
      new NativeDateAdapter(),
      minDate.valueOf() / 1000,
    );
    expect(availableDate.getTime()).toEqual(minDate.getTime());
  });
});

describe('findNextAvailableDate', () => {
  it('get date without max and without dateFilter', async () => {
    const availableDate: Date = findNextAvailableDate(
      new Date(2023, 1, 26, 0, 0, 0, 0),
      null,
      new NativeDateAdapter(),
      null,
    );
    expect(availableDate.getTime()).toEqual(new Date(2023, 1, 27, 0, 0, 0, 0).getTime());
  });

  it('get date without dateFilter with current date equal to max date', async () => {
    const date: Date = new Date(2023, 1, 26, 0, 0, 0, 0);
    const availableDate: Date = findNextAvailableDate(
      date,
      null,
      new NativeDateAdapter(),
      date.valueOf() / 1000,
    );
    expect(availableDate.getTime()).toEqual(date.getTime());
  });

  it('get date with dateFilter and max', async () => {
    const maxDate = new Date(2023, 1, 28, 0, 0, 0, 0);
    const availableDate: Date = findNextAvailableDate(
      new Date(2023, 1, 26, 0, 0, 0, 0),
      (d: Date) => d.getDate() !== 27,
      new NativeDateAdapter(),
      maxDate.valueOf() / 1000,
    );
    expect(availableDate.getTime()).toEqual(maxDate.getTime());
  });
});

describe('isDateAvailable', () => {
  describe('invalid', () => {
    it('get invalid date with min', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-20'),
          null,
          new Date('2023-02-26').valueOf() / 1000,
          null,
        ),
      ).toBeFalsy();
    });

    it('get invalid date with max', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-28'),
          null,
          null,
          new Date('2023-02-26').valueOf() / 1000,
        ),
      ).toBeFalsy();
    });

    it('get invalid date with dateFilter', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-28'),
          (d: Date) => d.getTime() > new Date('2024-12-31').valueOf(),
          null,
          null,
        ),
      ).toBeFalsy();
    });
  });

  describe('valid', function () {
    it('get valid date without dateFilter, min and max', async () => {
      expect(isDateAvailable(new Date('2023-02-25'), null, null, null)).toBeTruthy();
    });

    it('get valid date with min', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-20'),
          null,
          new Date('2023-02-01').valueOf() / 1000,
          null,
        ),
      ).toBeTruthy();
    });

    it('get valid date with max', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-28'),
          null,
          null,
          new Date('2023-03-31').valueOf() / 1000,
        ),
      ).toBeTruthy();
    });

    it('get invalid date with dateFilter', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-28'),
          (d: Date) => d.getTime() > new Date('2022-01-01').valueOf(),
          null,
          null,
        ),
      ).toBeTruthy();
    });
  });
});
