import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing';

describe('sbb-tag', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-tag>Tag</sbb-tag>');
    element = await page.find('sbb-tag');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('checked on click', async () => {
    expect(element).toEqualAttribute('checked', null);
    const changeSpy: EventSpy = await page.spyOnEvent('change');
    await element.click();
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
    expect(element).toEqualAttribute('checked', '');
  });

  it('checked on "Space" keypress', async () => {
    expect(element).toEqualAttribute('checked', null);
    const changeSpy: EventSpy = await page.spyOnEvent('change');
    await element.focus();
    await element.press('Space');
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
    expect(element).toEqualAttribute('checked', '');
  });
});
