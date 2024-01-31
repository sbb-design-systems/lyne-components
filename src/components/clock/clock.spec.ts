import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import { SbbClockElement } from './clock';

describe('sbb-clock', () => {
  let element: SbbClockElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-clock></sbb-clock>`);
    assert.instanceOf(element, SbbClockElement);

    expect(element).dom.to.be.equal(`<sbb-clock></sbb-clock>`);

    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  it('renders with a fixed time', async () => {
    element = await fixture(html`<sbb-clock data-now="1674732600000"></sbb-clock>`);
    assert.instanceOf(element, SbbClockElement);

    expect(element).to.have.attribute('data-initialized');

    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(undefined, html`<sbb-clock></sbb-clock>`);
});
