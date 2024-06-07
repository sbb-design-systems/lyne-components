import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import './tab-label.js';

describe(`sbb-tab-label`, () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-tab-label></sbb-tab-label>`);

    expect(root).dom.to.be.equal(`<sbb-tab-label></sbb-tab-label>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders correctly an H2 heading tag', async () => {
    const root = await fixture(
      html`<sbb-tab-label level="2" icon-name="pie-small"></sbb-tab-label>`,
    );

    expect(root).dom.to.be.equal(`<sbb-tab-label level="2" icon-name="pie-small"></sbb-tab-label>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders an H1 heading tag if the provided level is greater than 6', async () => {
    const root = await fixture(html`<sbb-tab-label level="7" amount="78"></sbb-tab-label>`);

    expect(root).dom.to.be.equal(`<sbb-tab-label level="7" amount="78"></sbb-tab-label>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-tab-label>Tab title</sbb-tab-label>`);
});
