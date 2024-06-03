import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbMessageElement } from './message.js';
import './message.js';
import '../image.js';
import '../button/button.js';

describe(`sbb-message`, () => {
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

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
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
