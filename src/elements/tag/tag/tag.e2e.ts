import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender, EventSpy } from '../../core/testing.js';

import { SbbTagElement } from './tag.js';

describe(`sbb-tag with ${fixture.name}`, () => {
  let element: SbbTagElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-tag value="tag">Tag</sbb-tag>`, { modules: ['./tag.ts'] });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTagElement);
  });

  it('should be checked after click', async () => {
    expect(element).not.to.have.attribute('checked');
    const changeSpy = new EventSpy('change');
    const inputSpy = new EventSpy('input');

    element.click();
    await waitForLitRender(element);

    expect(changeSpy.count).to.be.greaterThan(0);
    expect(inputSpy.count).to.be.greaterThan(0);
    expect(element).to.have.attribute('checked');
  });

  it('should not be checked after click when disabled', async () => {
    expect(element).not.to.have.attribute('checked');
    element.toggleAttribute('disabled', true);
    await waitForLitRender(element);

    const changeSpy = new EventSpy('change');
    const inputSpy = new EventSpy('input');

    element.click();
    await waitForLitRender(element);

    expect(changeSpy.count).not.to.be.greaterThan(0);
    expect(inputSpy.count).not.to.be.greaterThan(0);
    expect(element).not.to.have.attribute('checked');
  });

  it('should be checked after "Space" keypress', async () => {
    expect(element).not.to.have.attribute('checked');
    const changeSpy = new EventSpy('change');
    const inputSpy = new EventSpy('input');

    element.focus();
    await sendKeys({ press: 'Space' });

    await waitForLitRender(element);
    expect(changeSpy.count).to.be.greaterThan(0);
    expect(inputSpy.count).to.be.greaterThan(0);
    expect(element).to.have.attribute('checked');
  });

  it('should be unchecked after "Space" keypress', async () => {
    element = await fixture(html`<sbb-tag value="tag" checked>Tag</sbb-tag>`, {
      modules: ['./tag.ts'],
    });

    const changeSpy = new EventSpy('change');
    const inputSpy = new EventSpy('input');

    element.focus();
    await sendKeys({ press: 'Space' });

    await waitForLitRender(element);
    expect(changeSpy.count).to.be.greaterThan(0);
    expect(inputSpy.count).to.be.greaterThan(0);
    expect(element).not.to.have.attribute('checked');
  });
});
