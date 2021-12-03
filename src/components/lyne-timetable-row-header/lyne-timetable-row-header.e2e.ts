import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-row-header', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-row-header></lyne-timetable-row-header>');

    element = await page.find('lyne-timetable-row-header');
    expect(element)
      .toHaveClass('hydrated');
  });

});
