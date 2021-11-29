import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-travel-hints', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-travel-hints></lyne-timetable-travel-hints>');

    element = await page.find('lyne-timetable-travel-hints');
    expect(element)
      .toHaveClass('hydrated');
  });

});
