import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '../sbb-option';
import './sbb-select';
import { isSafari } from '../core/dom';

describe('sbb-select', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-select>
        <sbb-option value="1">Option 1</sbb-option>
        <sbb-option value="2">Option 2</sbb-option>
        <sbb-option value="3">Option 3</sbb-option>
      </sbb-select>
    `);
    const listboxAttr = 'id="sbb-select-1" role="listbox"';

    expect(root.shadowRoot.host).to.have.attribute('dir', 'ltr');
    expect(root.shadowRoot.host).to.have.attribute('data-state', 'closed');
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-select__trigger" aria-hidden="true">
        <span class="sbb-select__trigger--placeholder"></span>
      </div>
      <div class="sbb-select__gap-fix"></div>
      <div class="sbb-select__container">
        <div class="sbb-select__gap-fix">
          <div class="sbb-gap-fix-wrapper">
            <div class="sbb-gap-fix-corner" id="left"></div>
          </div>
          <div class="sbb-gap-fix-wrapper">
            <div class="sbb-gap-fix-corner" id="right"></div>
          </div>
        </div>
        <div class="sbb-select__panel">
          <div class="sbb-select__wrapper">
            <div class="sbb-select__options" ${!isSafari() ? listboxAttr : ''}>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it('renders multiple', async () => {
    const root = await fixture(html`
      <sbb-select multiple>
        <sbb-option value="1">Option 1</sbb-option>
        <sbb-option value="2">Option 2</sbb-option>
        <sbb-option value="3">Option 3</sbb-option>
      </sbb-select>
    `);
    const listboxAttr = 'id="sbb-select-2" role="listbox"';

    expect(root.shadowRoot.host).to.have.attribute('dir', 'ltr');
    expect(root.shadowRoot.host).to.have.attribute('data-state', 'closed');
    expect(root.shadowRoot.host).to.have.attribute('data-multiple');
    expect(root.shadowRoot.host).to.have.attribute('multiple');
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-select__trigger" aria-hidden="true">
        <span class="sbb-select__trigger--placeholder"></span>
      </div>
      <div class="sbb-select__gap-fix"></div>
      <div class="sbb-select__container">
        <div class="sbb-select__gap-fix">
          <div class="sbb-gap-fix-wrapper">
            <div class="sbb-gap-fix-corner" id="left"></div>
          </div>
          <div class="sbb-gap-fix-wrapper">
            <div class="sbb-gap-fix-corner" id="right"></div>
          </div>
        </div>
        <div class="sbb-select__panel">
          <div class="sbb-select__wrapper">
            <div class="sbb-select__options" aria-multiselectable="" ${
              !isSafari() ? listboxAttr : ''
            }>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
