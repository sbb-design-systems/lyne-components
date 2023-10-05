import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbTag } from './sbb-tag';

describe('sbb-tag', () => {
  let element: SbbTag;

  beforeEach(async () => {
    element = await fixture(html`<sbb-tag value="tag">Tag</sbb-tag>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTag);
  });

  it('should be checked after click', async () => {
    expect(element).not.to.have.attribute('checked');
    const changeSpy = new EventSpy('change', document);
    const inputSpy = new EventSpy('input', document);

    element.click();
    await element.updateComplete;

    expect(changeSpy.count).to.be.greaterThan(0);
    expect(inputSpy.count).to.be.greaterThan(0);
    expect(element).to.have.attribute('checked');
  });

  it('should not be checked after click when disabled', async () => {
    expect(element).not.to.have.attribute('checked');
    element.setAttribute('disabled', '');
    await element.updateComplete;

    const changeSpy = new EventSpy('change', document);
    const inputSpy = new EventSpy('input', document);

    element.click();
    await element.updateComplete;

    expect(changeSpy.count).not.to.be.greaterThan(0);
    expect(inputSpy.count).not.to.be.greaterThan(0);
    expect(element).not.to.have.attribute('checked');
  });

  it('should be checked after "Space" keypress', async () => {
    expect(element).not.to.have.attribute('checked');
    const changeSpy = new EventSpy('change', document);
    const inputSpy = new EventSpy('input', document);

    element.focus();
    await sendKeys({ press: 'Space' });

    await element.updateComplete;
    expect(changeSpy.count).to.be.greaterThan(0);
    expect(inputSpy.count).to.be.greaterThan(0);
    expect(element).to.have.attribute('checked');
  });

  it('should be unchecked after "Space" keypress', async () => {
    element = await fixture(html`<sbb-tag value="tag" checked>Tag</sbb-tag>`);

    const changeSpy = new EventSpy('change', document);
    const inputSpy = new EventSpy('input', document);

    element.focus();
    await sendKeys({ press: 'Space' });

    await element.updateComplete;
    expect(changeSpy.count).to.be.greaterThan(0);
    expect(inputSpy.count).to.be.greaterThan(0);
    expect(element).not.to.have.attribute('checked');
  });
});
