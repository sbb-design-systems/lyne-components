import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';
import type { SbbToggleOptionElement } from '../toggle-option.js';

import type { SbbToggleElement } from './toggle.js';
import './toggle.js';
import '../toggle-option.js';

describe(`sbb-toggle`, () => {
  let option: SbbToggleOptionElement, page: SbbToggleElement;
  const simpleToggleTemplate = html`
    <sbb-toggle>
      <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
      <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
    </sbb-toggle>
  `;

  it('renders', async () => {
    const root = await fixture(html`<sbb-toggle></sbb-toggle>`);

    expect(root).dom.to.be.equal(`<sbb-toggle role="radiogroup" size="m"></sbb-toggle>`);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-toggle">
        <slot></slot>
      </div>
      `);
  });

  describe('value', () => {
    it('should select the correct option by setting value via attribute', async () => {
      page = await fixture(html`
        <sbb-toggle value="Value two">
          <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
          <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
        </sbb-toggle>
      `);
      option = page.querySelectorAll('sbb-toggle-option')[1];
      expect(option).to.have.attribute('checked');
    });

    it('should select the correct option by setting value programmatically', async () => {
      page = await fixture(simpleToggleTemplate);
      option = page.querySelectorAll('sbb-toggle-option')[1];
      page.value = 'Value two';

      await waitForLitRender(page);

      expect(option).to.have.attribute('checked');
    });

    it('should update the value of the sbb-toggle when the value of a checked option changes', async () => {
      page = await fixture(simpleToggleTemplate);
      option = page.querySelectorAll('sbb-toggle-option')[0];
      option.value = 'Changed';

      await waitForLitRender(page);

      expect(page.value).to.be.equal(option.value);
    });

    it('should not update the value of the sbb-toggle when the value of a unchecked option changes', async () => {
      page = await fixture(simpleToggleTemplate);
      option = page.querySelectorAll('sbb-toggle-option')[1];
      option.value = 'Changed';

      await waitForLitRender(page);

      expect(page.value).not.to.be.equal(option.value);
    });
  });

  describe('checked', () => {
    it('should initially have the checked attributes on the first option by default', async () => {
      page = await fixture(simpleToggleTemplate);
      option = page.querySelectorAll('sbb-toggle-option')[0];

      expect(option).to.have.attribute('checked');
    });

    it('should initially have the checked property set to true on the first option by default', async () => {
      page = await fixture(simpleToggleTemplate);
      option = page.querySelectorAll('sbb-toggle-option')[0];

      expect(option.checked).to.be.equal(true);
    });

    it('should select the correct option by setting checked on the option', async () => {
      page = await fixture(simpleToggleTemplate);
      option = page.querySelectorAll('sbb-toggle-option')[1];
      option.checked = true;

      await waitForLitRender(option);

      expect(option).to.have.attribute('checked');
    });

    it('should select the correct option by setting the checked attribute on the option', async () => {
      page = await fixture(html`
        <sbb-toggle>
          <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
          <sbb-toggle-option value="Value two" checked>Value two</sbb-toggle-option>
        </sbb-toggle>
      `);
      option = page.querySelectorAll('sbb-toggle-option')[1];

      expect(option.checked).to.be.equal(true);
    });

    it('should check first option when unchecking all options', async () => {
      page = await fixture(simpleToggleTemplate);
      option = page.querySelectorAll('sbb-toggle-option')[0];
      option.setAttribute('checked', 'false');

      await waitForLitRender(option);

      expect(option.checked).to.be.equal(true);
    });
  });

  describe('disabled', () => {
    it('should sync disabled state with options', async () => {
      page = await fixture(html`
        <sbb-toggle disabled>
          <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
          <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
        </sbb-toggle>
      `);
      const options = Array.from(page.querySelectorAll('sbb-toggle-option'));

      options.forEach((option) => expect(option).to.have.attribute('disabled'));
    });

    it('should prevent disabled option from unsetting disabled', async () => {
      page = await fixture(html`
        <sbb-toggle disabled>
          <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
          <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
        </sbb-toggle>
      `);
      option = page.querySelectorAll('sbb-toggle-option')[0];
      option.disabled = false;

      await waitForLitRender(page);

      expect(option).to.have.attribute('disabled');
    });

    it('should prevent enabled option from setting disabled', async () => {
      page = await fixture(simpleToggleTemplate);
      option = page.querySelectorAll('sbb-toggle-option')[0];
      option.disabled = true;

      await waitForLitRender(page);

      expect(option).not.to.have.attribute('disabled');
    });
  });

  testA11yTreeSnapshot(simpleToggleTemplate);
});
