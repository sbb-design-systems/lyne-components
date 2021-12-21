import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-transportation-number', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-transportation-number></lyne-timetable-transportation-number>');

    element = await page.find('lyne-timetable-transportation-number');
    expect(element)
      .toHaveClass('hydrated');
  });

});
