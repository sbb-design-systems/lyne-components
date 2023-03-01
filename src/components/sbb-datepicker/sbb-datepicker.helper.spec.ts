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
      'sbb-datepicker-previous-day'
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
  // It seems not to be possible to add the filter as datepicker prop, even in e2e tests.
  it('datepicker without dateFilter', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input id="input"/>
        <sbb-datepicker/>
      `,
    });
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const availableDate: Date = getAvailableDate(
      new Date('2024-01-01'),
      1,
      picker,
      new NativeDateAdapter()
    );
    const nextDate: number = new Date('2024-01-02').setHours(0, 0, 0, 0);
    expect(availableDate.getTime()).toEqual(nextDate);
  });
});

describe('findPreviousAvailableDate', () => {
  it('get date without min', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input id="input"/>
        <sbb-datepicker/>
      `,
    });
    await page.waitForChanges();
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const input: HTMLInputElement = await page.doc.querySelector('input');
    const min: string = input.getAttribute('min');
    const availableDate: Date = findPreviousAvailableDate(
      new Date('2023-02-26'),
      picker,
      new NativeDateAdapter(),
      min
    );
    const nextDate: number = new Date('2023-02-25').setHours(0, 0, 0, 0);
    expect(availableDate.getTime()).toEqual(nextDate);
  });

  it('get date with current date equal to min date', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input id="input" min="1677369600"/>
        <sbb-datepicker/>
      `,
    });
    await page.waitForChanges();
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const input: HTMLInputElement = await page.doc.querySelector('input');
    const min: string = input.getAttribute('min');
    const availableDate: Date = findPreviousAvailableDate(
      new Date('2023-02-26'),
      picker,
      new NativeDateAdapter(),
      min
    );
    const nextDate: Date = new Date('2023-02-26');
    expect(availableDate.getTime()).toEqual(nextDate.getTime());
  });
});

describe('findNextAvailableDate', () => {
  it('get date without max', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input id="input"/>
        <sbb-datepicker/>
      `,
    });
    await page.waitForChanges();
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const input: HTMLInputElement = await page.doc.querySelector('input');
    const max: string = input.getAttribute('max');
    const availableDate: Date = findNextAvailableDate(
      new Date('2023-02-26'),
      picker,
      new NativeDateAdapter(),
      max
    );
    const nextDate: number = new Date('2023-02-27').setHours(0, 0, 0, 0);
    expect(availableDate.getTime()).toEqual(nextDate);
  });

  it('get date with current date equal to max date', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input id="input" max="1677369600"/>
        <sbb-datepicker/>
      `,
    });
    await page.waitForChanges();
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const input: HTMLInputElement = await page.doc.querySelector('input');
    const max: string = input.getAttribute('max');
    const availableDate: Date = findNextAvailableDate(
      new Date('2023-02-26'),
      picker,
      new NativeDateAdapter(),
      max
    );
    const nextDate: Date = new Date('2023-02-26');
    expect(availableDate.getTime()).toEqual(nextDate.getTime());
  });
});

// It is not possible to test with dateFilter set on sbb-datepicker.
describe('isDateAvailable', () => {
  it('get valid date without min and max', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input id="input"/>
        <sbb-datepicker/>
      `,
    });
    await page.waitForChanges();
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const input: HTMLInputElement = await page.doc.querySelector('input');
    const min: string = input.getAttribute('min');
    const max: string = input.getAttribute('max');
    expect(isDateAvailable(new Date('2023-02-25'), picker, min, max)).toBeTruthy();
  });

  it('get invalid date with min', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input id="input" min="1677369600"/>
        <sbb-datepicker/>
      `,
    });
    await page.waitForChanges();
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const input: HTMLInputElement = await page.doc.querySelector('input');
    const min: string = input.getAttribute('min');
    const max: string = input.getAttribute('max');
    expect(isDateAvailable(new Date('2023-02-20'), picker, min, max)).toBeFalsy();
  });

  it('get invalid date with max', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepicker],
      html: `
        <input id="input" max="1677366000"/>
        <sbb-datepicker/>
      `,
    });
    await page.waitForChanges();
    const picker: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const input: HTMLInputElement = await page.doc.querySelector('input');
    const min: string = input.getAttribute('min');
    const max: string = input.getAttribute('max');
    expect(isDateAvailable(new Date('2023-02-28'), picker, min, max)).toBeFalsy();
  });
});
