import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import '../form-field';
import '../option';
import './autocomplete';
import { isSafari } from '../core/dom';

describe('sbb-autocomplete', () => {
  it('renders standalone', async () => {
    await fixture(html`
      <div id="origin"></div>
      <input id="trigger" />
      <sbb-autocomplete origin="origin" trigger="trigger">
        <sbb-option value="1">1</sbb-option>
        <sbb-option value="2">2</sbb-option>
      </sbb-autocomplete>
    `);
    const elem = document.querySelector('sbb-autocomplete');
    const listboxAttr = 'id="sbb-autocomplete-1" role="listbox"';

    expect(elem).dom.to.be.equal(`
      <sbb-autocomplete data-state="closed" origin="origin" trigger="trigger" 
        dir="ltr" ${isSafari() ? listboxAttr : ''}>
        <sbb-option value="1" aria-disabled="false" aria-selected="false" data-variant="autocomplete" id="sbb-option-1" role="option" data-slot-names="unnamed">1</sbb-option>
        <sbb-option value="2" aria-disabled="false" aria-selected="false" data-variant="autocomplete" id="sbb-option-2" role="option" data-slot-names="unnamed">2</sbb-option>
      </sbb-autocomplete>
    `);
    expect(elem).shadowDom.to.be.equal(`
      <div class="sbb-autocomplete__gap-fix"></div>
      <div class="sbb-autocomplete__container">
        <div class="sbb-autocomplete__gap-fix">
          <div class="sbb-gap-fix-wrapper">
            <div class="sbb-gap-fix-corner" id="left"></div>
          </div>
          <div class="sbb-gap-fix-wrapper">
            <div class="sbb-gap-fix-corner" id="right"></div>
          </div>
        </div>
        <div class="sbb-autocomplete__panel">
          <div class="sbb-autocomplete__wrapper">
            <div class="sbb-autocomplete__options" ${!isSafari() ? listboxAttr : ''}>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it('renders in form field', async () => {
    const root = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-autocomplete>
          <sbb-option value="1">1</sbb-option>
          <sbb-option value="2">2</sbb-option>
        </sbb-autocomplete>
      </sbb-form-field>
    `);
    const elem = root.querySelector('sbb-autocomplete');
    const listboxAttr = 'id="sbb-autocomplete-4" role="listbox"';

    expect(root).dom.to.be.equal(`
      <sbb-form-field error-space="none" size="m" width="default" data-input-empty data-input-type="input" data-slot-names="unnamed">
        <input
          aria-autocomplete="list" aria-controls="sbb-autocomplete-4" aria-expanded="false" aria-haspopup="listbox"
          aria-owns="sbb-autocomplete-4" autocomplete="off" role="combobox">
        <sbb-autocomplete data-state="closed" dir="ltr" ${isSafari() ? listboxAttr : ''}>
          <sbb-option value="1" aria-disabled="false" aria-selected="false" data-variant="autocomplete" id="sbb-option-7" role="option" data-slot-names="unnamed">1</sbb-option>
          <sbb-option value="2" aria-disabled="false" aria-selected="false" data-variant="autocomplete" id="sbb-option-8" role="option" data-slot-names="unnamed">2</sbb-option>
        </sbb-autocomplete>
      </sbb-form-field>
    `);
    expect(elem).shadowDom.to.equal(`
      <div class="sbb-autocomplete__gap-fix"></div>
      <div class="sbb-autocomplete__container">
        <div class="sbb-autocomplete__gap-fix">
          <div class="sbb-gap-fix-wrapper">
            <div class="sbb-gap-fix-corner" id="left"></div>
          </div>
          <div class="sbb-gap-fix-wrapper">
            <div class="sbb-gap-fix-corner" id="right"></div>
          </div>
        </div>
        <div class="sbb-autocomplete__panel">
          <div class="sbb-autocomplete__wrapper">
            <div class="sbb-autocomplete__options" ${!isSafari() ? listboxAttr : ''}>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
