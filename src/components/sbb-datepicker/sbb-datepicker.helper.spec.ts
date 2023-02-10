import { SbbDatepicker } from './sbb-datepicker';
import { newSpecPage } from '@stencil/core/testing';
import { getDatePicker } from './sbb-datepicker.helper';

describe('getDatePicker', () => {
  it('returns the datepicker if no trigger', async () => {
    const page = await newSpecPage({
      components: [SbbDatepicker],
      html: '<sbb-form-field><sbb-datepicker /><sbb-datepicker-next-day /></sbb-form-field>',
    });
    const element: HTMLSbbDatepickerElement = page.doc.querySelector('sbb-datepicker');
    const elementNext: HTMLSbbDatepickerNextDayElement =
      page.doc.querySelector('sbb-datepicker-next-day');
    expect(getDatePicker(elementNext)).toEqual(element);
  });

  it('returns the datepicker if its id is passed as trigger', async () => {
    const page = await newSpecPage({
      components: [SbbDatepicker],
      html: '<sbb-form-field><sbb-datepicker id="picker"/><sbb-datepicker-next-day /></sbb-form-field>',
    });
    const element: HTMLSbbDatepickerElement = page.doc.querySelector('#picker');
    const elementNext: HTMLSbbDatepickerNextDayElement =
      page.doc.querySelector('sbb-datepicker-next-day');
    expect(getDatePicker(elementNext, 'picker')).toEqual(element);
  });
});
