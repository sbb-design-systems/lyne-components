import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import '../../autocomplete';
import './option';

describe('sbb-option', () => {
  describe('autocomplete', () => {
    it('renders selected and active', async () => {
      const option = (
        await fixture(html`
          <sbb-autocomplete origin="anchor">
            <sbb-option value="1" selected active>Option 1</sbb-option>
          </sbb-autocomplete>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-option');

      expect(option).dom.to.be.equal(`
        <sbb-option selected="" active="" aria-disabled="false" aria-selected="true" data-variant="autocomplete" id="sbb-option-1" role="option" value="1" data-slot-names="unnamed">
          Option 1
        </sbb-option>
      `);
      await expect(option).shadowDom.to.be.equalSnapshot();
    });

    it('renders disabled', async () => {
      const option = (
        await fixture(html`
          <sbb-autocomplete origin="anchor">
            <sbb-option value="1" disabled>Option 1</sbb-option>
          </sbb-autocomplete>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-option');

      expect(option).dom.to.be.equal(`
        <sbb-option disabled aria-disabled="true" aria-selected="false" data-variant="autocomplete" id="sbb-option-4" role="option" value="1" data-slot-names="unnamed">
          Option 1
        </sbb-option>
      `);
      await expect(option).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot(
      undefined,
      html`<sbb-option value="1" selected active>Option 1</sbb-option>`,
    );
  });
});
