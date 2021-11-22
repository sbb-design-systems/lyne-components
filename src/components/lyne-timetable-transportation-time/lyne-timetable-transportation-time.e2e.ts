import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-transportation-time', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-transportation-time></lyne-timetable-transportation-time>');

    element = await page.find('lyne-timetable-transportation-time');
    expect(element)
      .toHaveClass('hydrated');
  });

});
