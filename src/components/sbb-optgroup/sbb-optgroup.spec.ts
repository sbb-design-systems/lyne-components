import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '../sbb-autocomplete';
import '../sbb-option';
import './sbb-optgroup';
import { isSafari } from '../core/dom';

describe('sbb-optgroup', () => {
  describe('autocomplete', function () {
    it('renders', async () => {
      const root = (
        await fixture(html`
          <sbb-autocomplete origin="anchor">
            <sbb-optgroup label="Label">
              <sbb-option value="1">1</sbb-option>
              <sbb-option value="2">2</sbb-option>
            </sbb-optgroup>
          </sbb-autocomplete>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-optgroup');
      const groupRoleAttr = 'aria-disabled="false" aria-label="Label" role="group"';

      expect(root).dom.to.be.equal(`
        <sbb-optgroup data-variant="autocomplete" label="Label" ${!isSafari() ? groupRoleAttr : ''}>
          <sbb-option value="1" aria-disabled="false" aria-selected="false" data-variant="autocomplete" id="sbb-option-1" role="option">1</sbb-option>
          <sbb-option value="2" aria-disabled="false" aria-selected="false" data-variant="autocomplete" id="sbb-option-2" role="option">2</sbb-option>
        </sbb-optgroup>
      `);
      expect(root).shadowDom.to.be.equal(`
        <div class="sbb-optgroup__divider">
          <sbb-divider aria-orientation="horizontal" orientation="horizontal" role="separator"></sbb-divider>
        </div>
        <div class="sbb-optgroup__label" aria-hidden="true">
          <div class="sbb-optgroup__icon-space"></div>
          <span>Label</span>
        </div>
        <slot></slot>
      `);
    });

    it('renders disabled', async () => {
      const root = (
        await fixture(html`
          <sbb-autocomplete origin="anchor">
            <sbb-optgroup label="Label" disabled="true">
              <sbb-option value="1">1</sbb-option>
              <sbb-option value="2">2</sbb-option>
            </sbb-optgroup>
          </sbb-autocomplete>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-optgroup');
      const groupRoleAttr = 'aria-disabled="true" aria-label="Label" role="group"';

      expect(root).dom.to.be.equal(`
        <sbb-optgroup disabled="true" data-variant="autocomplete" label="Label" ${
          !isSafari() ? groupRoleAttr : ''
        }>
          <sbb-option value="1" data-group-disabled aria-disabled="true" aria-selected="false" data-variant="autocomplete" id="sbb-option-7" role="option">1</sbb-option>
          <sbb-option value="2" data-group-disabled aria-disabled="true" aria-selected="false" data-variant="autocomplete" id="sbb-option-8" role="option">2</sbb-option>
        </sbb-optgroup>
      `);

      expect(root).shadowDom.to.be.equal(`
        <div class="sbb-optgroup__divider">
          <sbb-divider aria-orientation="horizontal" orientation="horizontal" role="separator"></sbb-divider>
        </div>
        <div class="sbb-optgroup__label" aria-hidden="true">
          <div class="sbb-optgroup__icon-space"></div>
          <span>Label</span>
        </div>
        <slot></slot>
      `);
    });
  });
});
