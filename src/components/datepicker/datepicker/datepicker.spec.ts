import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { NativeDateAdapter } from '../../core/datetime/index.js';
import { findInput } from '../../core/dom/index.js';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private/index.js';
import type { SbbFormFieldElement } from '../../form-field/index.js';
import type { SbbDatepickerNextDayElement, SbbDatepickerPreviousDayElement } from '../index.js';

import type { SbbDatepickerElement } from './datepicker.js';
import {
  getDatePicker,
  getAvailableDate,
  findPreviousAvailableDate,
  findNextAvailableDate,
  isDateAvailable,
} from './datepicker.js';

import '../datepicker-next-day/index.js';
import '../datepicker-previous-day/index.js';
import '../datepicker-toggle/index.js';
import '../../form-field/index.js';

describe(`sbb-datepicker`, () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-datepicker></sbb-datepicker>`);

    expect(root).dom.to.be.equal(`<sbb-datepicker></sbb-datepicker>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`
    <sbb-form-field>
      <input />
      <sbb-datepicker></sbb-datepicker>
      <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      <sbb-datepicker-next-day></sbb-datepicker-next-day>
      <sbb-datepicker-toggle></sbb-datepicker-toggle>
    </sbb-form-field>
  `);
});

describe(`getDatePicker`, () => {
  it('returns the datepicker if no trigger', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
      </sbb-form-field>
    `);
    const picker: SbbDatepickerElement =
      page.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    const elementNext: SbbDatepickerNextDayElement =
      page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    expect(getDatePicker(elementNext)).to.equal(picker);
  });

  it('returns the datepicker if its id is passed as trigger', async () => {
    const page = await fixture(html`
      <div>
        <input />
        <sbb-datepicker id="picker"></sbb-datepicker>
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      </div>
    `);
    const picker: SbbDatepickerElement = page.querySelector<SbbDatepickerElement>('#picker')!;
    const elementPrevious: SbbDatepickerPreviousDayElement =
      page.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
    expect(getDatePicker(elementPrevious, 'picker')).to.equal(picker);
  });
});

describe(`getInput`, () => {
  it('returns the input if no trigger', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
    `);
    const element: SbbDatepickerElement =
      page.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    const input: HTMLInputElement = page.querySelector<HTMLInputElement>('input')!;
    expect(findInput(element)).to.equal(input);
  });

  it('returns the input if its id is passed as trigger', async () => {
    const page = await fixture(html`
      <div>
        <input id="input" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      </div>
    `);
    const picker: SbbDatepickerElement =
      page.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    const input: HTMLInputElement = page.querySelector<HTMLInputElement>('input')!;
    expect(findInput(picker, 'input')).to.equal(input);
  });
});

describe(`getAvailableDate`, () => {
  it('with dateFilter', async () => {
    const availableDate: Date = getAvailableDate(
      new Date(2024, 0, 1, 0, 0, 0, 0),
      1,
      (d: Date) => d.getDay() === 1,
      new NativeDateAdapter(),
    );
    expect(availableDate.getTime()).to.equal(new Date(2024, 0, 8, 0, 0, 0, 0).getTime());
  });

  it('without dateFilter', async () => {
    const availableDate: Date = getAvailableDate(
      new Date(2024, 0, 1, 0, 0, 0, 0),
      1,
      () => true,
      new NativeDateAdapter(),
    );
    expect(availableDate.getTime()).to.equal(new Date(2024, 0, 2, 0, 0, 0, 0).getTime());
  });
});

describe(`findPreviousAvailableDate`, () => {
  it('get date without dateFilter and without min', async () => {
    const availableDate: Date = findPreviousAvailableDate(
      new Date(2023, 1, 26, 0, 0, 0, 0),
      null,
      new NativeDateAdapter(),
      null,
    );
    expect(availableDate.getTime()).to.equal(new Date(2023, 1, 25, 0, 0, 0, 0).getTime());
  });

  it('get date without dateFilter and with current date equal to min date', async () => {
    const date = new Date(2023, 1, 26, 0, 0, 0, 0);
    const availableDate: Date = findPreviousAvailableDate(
      date,
      null,
      new NativeDateAdapter(),
      date.valueOf() / 1000,
    );
    expect(availableDate.getTime()).to.equal(date.getTime());
  });

  it('get date with dateFilter and min', async () => {
    const minDate = new Date(2023, 1, 26, 0, 0, 0, 0);
    const availableDate: Date = findPreviousAvailableDate(
      new Date(2023, 1, 28, 0, 0, 0, 0),
      (d: Date) => d.getDate() !== 27,
      new NativeDateAdapter(),
      minDate.valueOf() / 1000,
    );
    expect(availableDate.getTime()).to.equal(minDate.getTime());
  });
});

describe(`findNextAvailableDate`, () => {
  it('get date without max and without dateFilter', async () => {
    const availableDate: Date = findNextAvailableDate(
      new Date(2023, 1, 26, 0, 0, 0, 0),
      null,
      new NativeDateAdapter(),
      null,
    );
    expect(availableDate.getTime()).to.equal(new Date(2023, 1, 27, 0, 0, 0, 0).getTime());
  });

  it('get date without dateFilter with current date equal to max date', async () => {
    const date: Date = new Date(2023, 1, 26, 0, 0, 0, 0);
    const availableDate: Date = findNextAvailableDate(
      date,
      null,
      new NativeDateAdapter(),
      date.valueOf() / 1000,
    );
    expect(availableDate.getTime()).to.equal(date.getTime());
  });

  it('get date with dateFilter and max', async () => {
    const maxDate = new Date(2023, 1, 28, 0, 0, 0, 0);
    const availableDate: Date = findNextAvailableDate(
      new Date(2023, 1, 26, 0, 0, 0, 0),
      (d: Date) => d.getDate() !== 27,
      new NativeDateAdapter(),
      maxDate.valueOf() / 1000,
    );
    expect(availableDate.getTime()).to.equal(maxDate.getTime());
  });
});

describe(`isDateAvailable`, () => {
  describe('invalid', () => {
    it('get invalid date with min', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-20'),
          null,
          new Date('2023-02-26').valueOf() / 1000,
          null,
        ),
      ).to.be.false;
    });

    it('get invalid date with max', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-28'),
          null,
          null,
          new Date('2023-02-26').valueOf() / 1000,
        ),
      ).to.be.false;
    });

    it('get invalid date with dateFilter', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-28'),
          (d: Date) => d.getTime() > new Date('2024-12-31').valueOf(),
          null,
          null,
        ),
      ).to.be.false;
    });
  });

  describe('valid', function () {
    it('get valid date without dateFilter, min and max', async () => {
      expect(isDateAvailable(new Date('2023-02-25'), null, null, null)).to.be.true;
    });

    it('get valid date with min', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-20'),
          null,
          new Date('2023-02-01').valueOf() / 1000,
          null,
        ),
      ).to.be.true;
    });

    it('get valid date with max', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-28'),
          null,
          null,
          new Date('2023-03-31').valueOf() / 1000,
        ),
      ).to.be.true;
    });

    it('get invalid date with dateFilter', async () => {
      expect(
        isDateAvailable(
          new Date('2023-02-28'),
          (d: Date) => d.getTime() > new Date('2022-01-01').valueOf(),
          null,
          null,
        ),
      ).to.be.true;
    });
  });
});
