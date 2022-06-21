import { newE2EPage } from '@stencil/core/testing';

describe('sbb-timetable', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-timetable></sbb-timetable>');

    element = await page.find('sbb-timetable');
    expect(element).toHaveClass('hydrated');
  });
});
