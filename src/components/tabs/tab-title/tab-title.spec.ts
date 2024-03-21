import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private';

import './tab-title';

describe(`sbb-tab-title`, () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-tab-title></sbb-tab-title>`);

    expect(root).dom.to.be.equal(`<sbb-tab-title></sbb-tab-title>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders correctly an H2 heading tag', async () => {
    const root = await fixture(
      html`<sbb-tab-title level="2" icon-name="pie-small"></sbb-tab-title>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`<sbb-tab-title level="2" icon-name="pie-small"></sbb-tab-title>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders an H1 heading tag if the provided level is greater than 6', async () => {
    const root = await fixture(html`<sbb-tab-title level="7" amount="78"></sbb-tab-title>`);

    expect(root).dom.to.be.equal(`<sbb-tab-title level="7" amount="78"></sbb-tab-title>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-tab-title>Tab title</sbb-tab-title>`);
});
