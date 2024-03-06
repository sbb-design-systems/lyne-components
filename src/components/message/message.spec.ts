import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import type { SbbMessageElement } from './message';
import './message';
import '../image';
import '../button/button';

describe('sbb-message', () => {
  describe('renders', () => {
    let root: SbbMessageElement;

    beforeEach(async () => {
      root = await fixture(
        html` <sbb-message title-content="Title.">
          <sbb-image slot="image"></sbb-image>
          <p slot="subtitle">Subtitle.</p>
          <p slot="legend">Error code: 0001</p>
          <sbb-button slot="action" icon-name="arrows-circle-small"></sbb-button>
        </sbb-message>`,
      );
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  it('renders without optional slots', async () => {
    const root = await fixture(
      html` <sbb-message title-content="Title.">
        <p slot="subtitle">Subtitle.</p>
      </sbb-message>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-message title-content="Title.">
          <p slot="subtitle">
            Subtitle.
          </p>
        </sbb-message>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
