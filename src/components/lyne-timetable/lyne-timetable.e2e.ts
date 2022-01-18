import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable></lyne-timetable>');

    element = await page.find('lyne-timetable');
    expect(element)
      .toHaveClass('hydrated');
  });

});
