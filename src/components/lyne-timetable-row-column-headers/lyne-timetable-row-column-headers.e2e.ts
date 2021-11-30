import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-row-column-headers', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-row-column-headers></lyne-timetable-row-column-headers>');

    element = await page.find('lyne-timetable-row-column-headers');
    expect(element)
      .toHaveClass('hydrated');
  });

});
