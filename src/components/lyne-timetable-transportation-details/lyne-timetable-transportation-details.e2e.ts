import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-transportation-details', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-transportation-details></lyne-timetable-transportation-details>');

    element = await page.find('lyne-timetable-transportation-details');
    expect(element)
      .toHaveClass('hydrated');
  });

});
