import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing';

describe('sbb-tag', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-tag value="tag">Tag</sbb-tag>');
    element = await page.find('sbb-tag');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should be checked after click', async () => {
    expect(element).toEqualAttribute('checked', null);
    const changeSpy: EventSpy = await page.spyOnEvent('change');
    const inputSpy: EventSpy = await page.spyOnEvent('input');

    await element.click();

    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
    expect(inputSpy).toHaveReceivedEvent();
    expect(element).toEqualAttribute('checked', '');
  });

  it('should not be checked after click when disabled', async () => {
    expect(element).toEqualAttribute('checked', null);
    element.setAttribute('disabled', '');
    await page.waitForChanges();

    const changeSpy: EventSpy = await page.spyOnEvent('change');
    const inputSpy: EventSpy = await page.spyOnEvent('input');

    await element.click();

    await page.waitForChanges();
    expect(changeSpy).not.toHaveReceivedEvent();
    expect(inputSpy).not.toHaveReceivedEvent();
    expect(element).not.toHaveAttribute('checked');
  });

  it('should be checked after "Space" keypress', async () => {
    expect(element).toEqualAttribute('checked', null);
    const changeSpy: EventSpy = await page.spyOnEvent('change');
    const inputSpy: EventSpy = await page.spyOnEvent('input');

    await element.focus();
    await element.press('Space');

    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
    expect(inputSpy).toHaveReceivedEvent();
    expect(element).toEqualAttribute('checked', '');
  });

  it('should be unchecked after "Space" keypress', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-tag value="tag" checked>Tag</sbb-tag>');
    element = await page.find('sbb-tag');

    const changeSpy: EventSpy = await page.spyOnEvent('change');
    const inputSpy: EventSpy = await page.spyOnEvent('input');

    await element.focus();
    await element.press('Space');

    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
    expect(inputSpy).toHaveReceivedEvent();
    expect(element).toEqualAttribute('checked', null);
  });
});
