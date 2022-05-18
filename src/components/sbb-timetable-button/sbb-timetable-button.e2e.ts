import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-button', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-button></lyne-timetable-button>');

    element = await page.find('lyne-timetable-button');
    expect(element)
      .toHaveClass('hydrated');
  });

});
