import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './screenreader-only';

describe('sbb-screenreader-only', () => {
  describe('renders', async () => {
    const root = await fixture(html`<sbb-screenreader-only></sbb-screenreader-only>`);

    it('with Light DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('with Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });
});
