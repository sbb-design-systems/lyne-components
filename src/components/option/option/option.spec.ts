import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '../../autocomplete';
import './option';

describe('sbb-option', () => {
  describe('autocomplete', () => {
    it('renders selected and active', async () => {
      const root = (
        await fixture(html`
          <sbb-autocomplete origin="anchor">
            <sbb-option value="1" selected active>Option 1</sbb-option>
          </sbb-autocomplete>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-option');

      expect(root).dom.to.be.equal(`
        <sbb-option selected="" active="" aria-disabled="false" aria-selected="true" data-variant="autocomplete" id="sbb-option-1" role="option" value="1">
          Option 1
        </sbb-option>
      `);
      expect(root).shadowDom.to.be.equal(`
        <div class="sbb-option__container">
          <div class="sbb-option">
            <span class="sbb-option__icon sbb-option__icon--empty">
              <slot name="icon"></slot>
            </span>
            <span class="sbb-option__label">
              <slot></slot>
              Option 1
            </span>
          </div>
        </div>
      `);
    });

    it('renders disabled', async () => {
      const root = (
        await fixture(html`
          <sbb-autocomplete origin="anchor">
            <sbb-option value="1" disabled>Option 1</sbb-option>
          </sbb-autocomplete>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-option');

      expect(root).dom.to.be.equal(`
        <sbb-option disabled aria-disabled="true" aria-selected="false" data-variant="autocomplete" id="sbb-option-4" role="option" value="1">
          Option 1
        </sbb-option>
      `);
      expect(root).shadowDom.to.be.equal(`
        <div class="sbb-option__container">
          <div class="sbb-option">
            <span class="sbb-option__icon sbb-option__icon--empty">
              <slot name="icon"></slot>
            </span>
            <span class="sbb-option__label">
              <slot></slot>
              Option 1
            </span>
          </div>
        </div>
      `);
    });
  });
});
