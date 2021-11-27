import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-row-button', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-row-button></lyne-timetable-row-button>');

    element = await page.find('lyne-timetable-row-button');
    expect(element)
      .toHaveClass('hydrated');
  });

});
