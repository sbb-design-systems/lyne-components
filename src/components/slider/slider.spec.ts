import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private';

import './slider';

describe(`sbb-slider`, () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-slider
        start-icon="walk-slow-small"
        end-icon="walk-fast-small"
        max="500"
        value="100"
      ></sbb-slider>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-slider
        role="slider"
        tabindex="0"
        start-icon="walk-slow-small"
        end-icon="walk-fast-small"
        max="500"
        value="100"
        name=''
        aria-disabled="false"
        aria-readonly="false"
        aria-valuemax="500"
        aria-valuemin="0"
        aria-valuenow="100">
      </sbb-slider>
    `);

    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with no icons and default min/max', async () => {
    const root = await fixture(html`<sbb-slider value="1"></sbb-slider>`);

    expect(root).dom.to.be.equal(`
      <sbb-slider aria-disabled="false" aria-readonly="false" aria-valuemax="100" aria-valuemin="0" aria-valuenow="1" role="slider" tabindex="0" value='1' name=''></sbb-slider>
    `);

    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-slider value="1"></sbb-slider>`);
});
