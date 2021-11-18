import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-row', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-row></lyne-timetable-row>');

    element = await page.find('lyne-timetable-row');
    expect(element)
      .toHaveClass('hydrated');
  });

});
